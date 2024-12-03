import {View, TextInput, StyleSheet, FlatList, Keyboard} from 'react-native';
import React, {Suspense, useMemo, useRef} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {ChatStackParamList} from '@src/page';
import {
  useChatRoomUsersQuery,
  usePreviousChatRoomInfinityQuery,
} from '@src/api';
import {IconButton} from 'react-native-paper';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';

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
  MainSkeleton,
} from '@src/components';

type ChattingProps = StackScreenProps<ChatStackParamList, 'Chatting'>;

export default function ChattingPage(props: ChattingProps) {
  useTabBarHide(props.navigation);
  return (
    <Suspense fallback={<MainSkeleton />}>
      <ChattingComponent {...props} />
    </Suspense>
  );
}

function ChattingComponent({route}: ChattingProps) {
  const roomId = route.params.roomId;

  const roomName = route.params.roomName;
  console.log(roomId, roomName);
  const myId = useUserId();

  const inputValue = useRef<string>('');
  const inputRef = useRef<TextInput>(null);

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

  const {isLoading, messages, publishFileMessage, publishTextMessage} =
    useStomp(roomId, onConnectSubscribes, OnConnectPublications);

  const messageQuery = usePreviousChatRoomInfinityQuery(roomId, isLoading);
  console.log('MESSAGE QUERY DATA : ', messageQuery.data);

  const userQuery = useChatRoomUsersQuery(roomId, isLoading);

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

  return (
    <KeyboardAvoidingView
      behavior="padding"
      contentContainerStyle={styles.keyboardContainer}
      keyboardVerticalOffset={100}
      style={styles.container}>
      <View style={styles.chatting}>
        <FlatList
          data={
            messageQuery.data?.pages
              ? [
                  ...messageQuery.data.pages.flatMap(page => page.content),
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
          onStartReached={() => {
            if (messageQuery.hasNextPage) {
              messageQuery.fetchNextPage();
            }
          }}
          onStartReachedThreshold={0.1}
          ListHeaderComponent={
            <PagenationLoading isLoading={messageQuery.isLoading} />
          }
        />
      </View>

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
