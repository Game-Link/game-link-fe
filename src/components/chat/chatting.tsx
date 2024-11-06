import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Keyboard,
} from 'react-native';
import React, {useRef} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {ChatStackParamList} from '@src/page';
import {
  useChatRoomUsersQuery,
  usePreviousChatRoomInfinityQuery,
} from '@src/api';
import {IconButton} from 'react-native-paper';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import SpeechBubble from './speech-bubble';
import PlusButton from './plus-button';
import {useStomp, useTabBarHide, useUserId} from '@src/hooks';

type ChattingProps = StackScreenProps<ChatStackParamList, 'Chatting'>;

export default function ChattingPage({navigation, route}: ChattingProps) {
  useTabBarHide(navigation);

  const roomId = route.params.roomId;
  const myId = useUserId();

  const inputValue = useRef<string>('');
  const inputRef = useRef<TextInput>(null);

  const {isLoading, messages, publishFileMessage, publishTextMessage} =
    useStomp(roomId);

  const query = usePreviousChatRoomInfinityQuery(roomId, isLoading);
  console.log(query.data?.pages.flatMap(p => p));

  const userQuery = useChatRoomUsersQuery(roomId, isLoading);
  console.log(userQuery.data);

  const handleSendText = () => {
    if (inputValue.current.trim() === '') {
      return;
    }
    publishTextMessage(inputValue.current);

    inputValue.current = '';
    inputRef.current?.clear();
    Keyboard.dismiss();
  };

  if (userQuery.isError || query.isError || !myId) {
    return <Text>Error</Text>;
  }

  if (query.isLoading || userQuery.isLoading) {
    return <Text>Loading</Text>;
  }

  const users = userQuery.data;

  const findUser = (userId: string) =>
    users?.filter(user => user.id === userId)[0];

  return (
    <KeyboardAvoidingView
      behavior="padding"
      contentContainerStyle={styles.keyboardContainer}
      keyboardVerticalOffset={100}
      style={styles.container}>
      <View style={styles.chatting}>
        <FlatList
          data={
            query.data?.pages
              ? [...query.data.pages.flatMap(page => page.content), ...messages]
              : messages
          }
          keyExtractor={(item, index) => `${index}`}
          renderItem={prop => (
            <SpeechBubble
              chatting={prop.item}
              user={findUser(prop.item.userId)}
              myId={myId}
            />
          )}
        />
        {messages.map((message, index) => (
          <SpeechBubble
            key={index}
            chatting={message}
            user={findUser(message.userId)}
            myId={myId}
          />
        ))}
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
