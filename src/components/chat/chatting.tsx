import {View, Text, Platform, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import {Client, Frame} from '@stomp/stompjs';
import Config from 'react-native-config';
import SockJS from 'sockjs-client';
import {getLocalStorage} from '@src/store';

import {ChatStackParamList} from '@src/page';
import {
  Chatting,
  useChatRoomUsersQuery,
  usePreviousChatRoomInfinityQuery,
} from '@src/api';
import {IconButton} from 'react-native-paper';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import SpeechBubble from './speech-bubble';

type ChattingProps = StackScreenProps<ChatStackParamList, 'Chatting'>;

const Mock: Chatting[] = [
  {
    userId: '123',
    nickname: 'hi',
    content: 'hello',
    type: 'TALK',
    createdAt: Date.now().toLocaleString(),
    fileName: null,
    fileUrl: null,
    fileType: 'NONE',
    continuous: false,
    isMine: true,
  },
  {
    userId: '456',
    nickname: 'yang',
    content: 'hello',
    type: 'TALK',
    createdAt: Date.now().toLocaleString(),
    fileName: null,
    fileUrl: null,
    fileType: 'NONE',
    continuous: false,
    isMine: false,
  },
];

export default function ChattingPage({navigation, route}: ChattingProps) {
  const parentNavigation = navigation.getParent();
  const url = !__DEV__
    ? Config.PRODUCTION_API
    : Platform.OS === 'android'
    ? Config.DEV_API_ANDROID
    : Config.DEV_API_IOS;

  const production = Config.PRODUCTION_STOMP_URL;
  console.log(production);
  const roomId = route.params.roomId;
  const client = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [value, setValue] = useState('');
  const [userId, setUserId] = useState<null | string>(null);
  const [messages, setMessages] = useState<Chatting[]>([]);

  const query = usePreviousChatRoomInfinityQuery(roomId, isConnected);
  console.log(query.data?.pages.flatMap(p => p));

  const userQuery = useChatRoomUsersQuery(roomId);
  console.log(userQuery.data);

  const handleSandText = () => {
    if (value.trim() === '') {
      return;
    }
    console.log('Test');
    console.log('USERID ==== > ', userId);
    console.log(value);
    client.current?.publish({
      destination: '/pub/chat/sendMessage',
      body: JSON.stringify({
        roomId,
        userSubId: userId,
        type: 'TALK',
        content: value,
        fileType: 'NONE',
      }),
    });

    setValue('');
  };

  useEffect(() => {
    // Set up the STOMP client
    console.log(production);
    if (!client.current && userId) {
      client.current = new Client({
        webSocketFactory: () => new SockJS(`${production}/ws-stomp`),
        reconnectDelay: 5000, // 자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: function (str) {
          console.log('DEBUG: ', str);
        },
        onConnect: async () => {
          console.log('Connected to STOMP server');
          setIsConnected(true);
          // 구독해서 메시지를 뿌려주는 역할
          client.current?.subscribe('/sub/chatRoom/enter' + roomId, payload => {
            console.log('PAYLOAD');
            const data = JSON.parse(payload.body) as Chatting;

            console.log('DATA', data);
            setMessages(prev => [...prev, data]);
          });

          // 등록해서 해당 유저가 메시지를 보내는 역할
          client.current?.publish({
            destination: '/pub/chat/enterUser',
            body: JSON.stringify({
              roomId,
              userSubId: userId,
              type: 'ENTER',
              fileType: 'NONE',
            }),
          });
          //setIsConnected(true); // Update the connection status here
        },
        onDisconnect: () => {
          console.log('Disconnected from STOMP server');
          setIsConnected(false); // Update the connection status here
        },
        onStompError: (frame: Frame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
          setIsConnected(false); // Update the connection status here
        },
        onWebSocketClose: () => {
          console.log('WebSocket connection closed');
          setIsConnected(false); // Update the connection status here
        },
      });
      client.current.activate();
    }

    return () => {
      if (client.current) {
        console.log(
          '========================DISCONNECTED========================',
        );
        client.current.deactivate();
        client.current = null;
      }
    };
  }, [roomId, userId]);

  useEffect(() => {
    const getUserId = async () => {
      const myId = await getLocalStorage('userId');
      if (myId && typeof myId === 'string') {
        setUserId(myId);
      }
    };
    getUserId();
  }, []);

  useEffect(() => {
    // 화면이 포커스될 때 탭 바 숨기기
    parentNavigation?.setOptions({
      tabBarStyle: {display: 'none'},
    });

    return () => {
      // 화면에서 벗어날 때 탭 바 다시 보이기
      parentNavigation?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [parentNavigation]);

  if (userQuery.isError) {
    return <Text>Error</Text>;
  }

  const users = userQuery.data;

  const findUser = (userId: string) =>
    users?.filter(user => user.id === userId)[0];

  return (
    <KeyboardAvoidingView
      behavior="padding"
      contentContainerStyle={{flex: 1}}
      keyboardVerticalOffset={100}
      style={styles.container}>
      <View style={styles.chatting}>
        {messages.map((message, index) => (
          <SpeechBubble
            key={index}
            chatting={message}
            user={findUser(message.userId)}
          />
        ))}
      </View>

      <View style={styles.inputContainer}>
        <IconButton icon="file" mode="contained" style={styles.fileButton} />
        <TextInput
          editable
          multiline
          onChangeText={text => setValue(text)}
          value={value}
          style={styles.input}
        />
        <IconButton
          icon="send"
          onPress={handleSandText}
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
