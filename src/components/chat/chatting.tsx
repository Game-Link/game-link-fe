import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Keyboard,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {Suspense, useEffect, useMemo, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {ChatStackParamList} from '@src/page';
import {
  Chatting,
  useChatRoomUsersQuery,
  usePreviousChatRoomInfinityQuery,
} from '@src/api';
import {IconButton} from 'react-native-paper';

import {
  OnConnectPublish,
  OnConnectSubscribe,
  useStomp,
  useTabBarHide,
  useUserId,
} from '@src/hooks';
import {
  PagenationLoading,
  SpeechBubble,
  PlusButton,
  ChattingSkeleton,
  DismissKeyboardView,
} from '@src/components';

import {useUnsubscriptionStore} from '@src/store';

type ChattingProps = StackScreenProps<ChatStackParamList, 'Chatting'>;

export default function ChattingPage(props: ChattingProps) {
  useTabBarHide(props.navigation);
  return (
    <Suspense fallback={<ChattingSkeleton />}>
      <ChattingComponent {...props} />
    </Suspense>
  );
}

function ChattingComponent({route, navigation}: ChattingProps) {
  const roomId = route.params.roomId;

  const roomName = route.params.roomName;

  const myId = useUserId();

  const inputValue = useRef<string>('');
  const inputRef = useRef<TextInput>(null);
  const flatListRef = useRef<FlatList>(null);

  const onConnectSubscribes: OnConnectSubscribe[] = useMemo(
    () => [
      {
        url: '/sub/chatRoom/enter' + roomId,
        callback: null,
        headers: {userId: myId || ''},
      },
    ],
    [myId, roomId],
  );

  const OnConnectPublications: OnConnectPublish[] = useMemo(
    () => [
      {
        destination: '/pub/chat/enterUser',
        body: JSON.stringify({
          roomId,
          userId: myId,
          type: 'ENTER',
          fileType: 'NONE',
        }),
      },
    ],
    [roomId, myId],
  );

  const {roomId: saveId, reset} = useUnsubscriptionStore();

  const {messages, publishFileMessage, publishTextMessage, leaveChatting} =
    useStomp(roomId, onConnectSubscribes, OnConnectPublications, flatListRef);

  const messageQuery = usePreviousChatRoomInfinityQuery(roomId);
  console.log(
    'MESSAGE QUERY DATA : ',
    messageQuery.data,
    messageQuery.data.pages.length,
  );

  const userQuery = useChatRoomUsersQuery(roomId);

  const handleSendText = () => {
    if (inputValue.current.trim() === '') {
      return;
    }
    publishTextMessage(inputValue.current);

    inputValue.current = '';
    inputRef.current?.clear();
    Keyboard.dismiss();
  };

  const users = userQuery.data;

  const findUser = (userId: string) =>
    users?.filter(user => user.userId === userId)[0];

  // 답장 미리보기 기능
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);
  const [newMessagePreview, setNewMessagePreview] = useState<Chatting | null>(
    null,
  );
  const prevMessagesCount = useRef(messages.length);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;

    // 유저가 현재 최하단에 있는지 감지
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    setIsUserAtBottom(isAtBottom);

    // 만약 최하단이면 미리보기 삭제
    if (isAtBottom) {
      setNewMessagePreview(null);
    }
  };

  useEffect(() => {
    if (messages.length > prevMessagesCount.current) {
      if (!isUserAtBottom) {
        // 유저가 최하단에 있지 않다면, 새 메시지 미리보기 활성화
        setNewMessagePreview(messages[messages.length - 1]);
      } else {
        // 유저가 최하단에 있었다면 자동으로 스크롤 이동
        flatListRef.current?.scrollToEnd({animated: true});
      }
    }
    prevMessagesCount.current = messages.length;
  }, [messages, isUserAtBottom]);

  // 채팅방 나가기
  useEffect(() => {
    if (roomId === saveId) {
      leaveChatting();
      reset();
      navigation.navigate('MyChat');
    }
  }, [saveId]);

  return (
    <DismissKeyboardView
      style={styles.container}
      keyboardVerticalOffset={110}
      isScrollable>
      <View style={styles.chatting}>
        <FlatList
          initialNumToRender={20}
          ref={flatListRef}
          data={
            messageQuery.data?.pages
              ? [
                  ...messageQuery.data.pages
                    .flatMap(page => page.content)
                    .reverse(),
                  ...messages,
                ]
              : messages
          }
          keyExtractor={(item: Chatting) => `${item.chatMessageId}`}
          renderItem={prop => (
            <SpeechBubble
              chatting={prop.item}
              user={findUser(prop.item.userId)}
              myId={myId}
              roomName={roomName}
            />
          )}
          onStartReached={async () => {
            if (messageQuery.hasNextPage) {
              await messageQuery.fetchNextPage();
            }
          }}
          onStartReachedThreshold={0}
          ListHeaderComponent={
            <PagenationLoading isLoading={messageQuery.isLoading} />
          }
          onScroll={handleScroll}
          onContentSizeChange={() => {
            if (isUserAtBottom) {
              flatListRef.current?.scrollToEnd({animated: false});
            }
          }}
        />
      </View>

      {!isUserAtBottom && newMessagePreview && (
        <TouchableOpacity
          style={styles.newMessageButton}
          onPress={() => {
            flatListRef.current?.scrollToEnd({animated: true});
            setNewMessagePreview(null);
          }}>
          <Text style={styles.previewText}>
            {findUser(newMessagePreview.userId)?.nickname
              ? `${newMessagePreview.nickname} : `
              : ''}
            {newMessagePreview.fileType !== 'NONE'
              ? '[Image]'
              : newMessagePreview.content}
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.inputContainer}>
        <PlusButton roomId={roomId} handleSendImage={publishFileMessage} />
        <TextInput
          editable
          multiline
          ref={inputRef}
          onChangeText={text => {
            inputValue.current = text;
          }}
          style={styles.input}
        />
        <IconButton
          icon="send"
          onPress={handleSendText}
          mode="contained"
          style={styles.summitButton}
        />
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    position: 'relative',
  },
  keyboardContainer: {
    flex: 1,
  },
  chatting: {
    flex: 1,
    backgroundColor: '#82BFE0',
    padding: 10,
  },
  inputContainer: {
    backgroundColor: 'white',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 30,
    borderColor: 'black',
  },
  message: {
    borderColor: 'black',
    fontSize: 16,
    padding: 10,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 4,
  },
  fileButton: {
    flex: 0.15,
  },
  summitButton: {
    flex: 0.15,
    marginLeft: 5,
  },
  newMessageButton: {
    position: 'absolute',
    bottom: 80,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  previewText: {
    fontSize: 14,
    color: '#000',
  },
});
