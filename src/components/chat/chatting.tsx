import {View, TextInput, StyleSheet, FlatList, Keyboard} from 'react-native';
import React, {Suspense, useCallback, useEffect, useMemo, useRef} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {ChatStackParamList} from '@src/page';
import {
  useChatRoomUsersQuery,
  usePreviousChatRoomInfinityQuery,
} from '@src/api';
import {Button, IconButton} from 'react-native-paper';
import {
  KeyboardAvoidingView,
  KeyboardEvents,
} from 'react-native-keyboard-controller';

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
} from '@src/components';
import {getSuspenseTime, WINDOW_HEIGHT} from '@src/util';
import {useFocusEffect} from '@react-navigation/native';

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

  // 키보드 열린 이후 스크롤 조절
  useEffect(() => {
    const show = KeyboardEvents.addListener('keyboardDidShow', () => {
      flatListRef.current?.scrollToEnd({animated: false});
    });

    return () => {
      show.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Scroll to bottom when component is focused
      flatListRef.current?.scrollToOffset({
        animated: false,
        offset: WINDOW_HEIGHT,
      });
    }, []),
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      contentContainerStyle={styles.keyboardContainer}
      keyboardVerticalOffset={100}
      style={styles.container}>
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
          keyExtractor={(item, index) => `${index}`}
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
              await getSuspenseTime(500);
              await messageQuery.fetchNextPage();
            }
          }}
          onStartReachedThreshold={0}
          ListHeaderComponent={
            <PagenationLoading isLoading={messageQuery.isLoading} />
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <Button
          mode="outlined"
          onPress={() => {
            leaveChatting();
            navigation.navigate('MyChat');
          }}>
          채팅방 나가기
        </Button>
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

      {/* Add your chat UI components here */}
    </KeyboardAvoidingView>
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
});
