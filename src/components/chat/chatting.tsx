import {View, Text, Platform, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import {Client, Frame} from '@stomp/stompjs';
import Config from 'react-native-config';
import SockJS from 'sockjs-client';
import {getLocalStorage} from '@src/store';

import {ChatStackParamList} from '@src/page';
import {Chatting, usePreviousChatRoomInfinityQuery} from '@src/api';
import {Button} from 'react-native-paper';

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
  const [messages, setMessages] = useState<Chatting[]>(Mock);

  const query = usePreviousChatRoomInfinityQuery(roomId, isConnected);
  console.log(query.data?.pages.flatMap(p => p));

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
        webSocketFactory: () => new SockJS(`${url}/ws-stomp`),
        reconnectDelay: 5000, // 자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: function (str) {
          console.log('DEBUG: ', str);
        },
        onConnect: async () => {
          console.log('Connected to STOMP server');

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

  return (
    <View style={styles.container}>
      <View>
        <Text>Chatting Room: {roomId}</Text>
        <Text>
          Connection Status: {isConnected ? 'Connected' : 'Disconnected'}
        </Text>
      </View>
      <View>
        {messages.map((message, index) => (
          <Text
            key={index}
            style={[
              styles.message,
              message.userId === userId ? {alignSelf: 'flex-end'} : {},
            ]}>
            {message.content}
          </Text>
        ))}
      </View>

      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        onChangeText={text => setValue(text)}
        value={value}
        style={styles.input}
      />
      <Button onPress={handleSandText} mode="contained">
        전송
      </Button>
      {/* Add your chat UI components here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    padding: 10,
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
});
