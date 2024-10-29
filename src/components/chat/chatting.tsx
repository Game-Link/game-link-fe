import {View, Text, Platform} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import {Client, Frame} from '@stomp/stompjs';
import Config from 'react-native-config';
import SockJS from 'sockjs-client';
import {getLocalStorage} from '@src/store';
import {USER_ID} from '@src/util';
import {ChatStackParamList} from '@src/page';
import {
  Chatting as ChattingType,
  usePreviousChatRoomInfinityQuery,
} from '@src/api';

type ChattingProps = StackScreenProps<ChatStackParamList, 'Chatting'>;
export default function ChattingPage({navigation, route}: ChattingProps) {
  const url = !__DEV__
    ? Config.PRODUCTION_API
    : Platform.OS === 'android'
    ? Config.DEV_API_ANDROID
    : Config.DEV_API_IOS;

  const roomId = route.params.roomId;
  const client = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const query = usePreviousChatRoomInfinityQuery(roomId, isConnected);
  console.log(query.data?.pages.flatMap(p => p));

  useEffect(() => {
    // Set up the STOMP client
    console.log(url);
    if (!client.current) {
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
          const userId = await getLocalStorage(USER_ID);

          // 구독해서 메시지를 뿌려주는 역할
          client.current?.subscribe('/sub/chatRoom/enter' + roomId, payload => {
            console.log('PAYLOAD');
            const data = JSON.parse(payload.body) as ChattingType;

            console.log('DATA', data);
            if (data.type === 'ENTER') {
              setIsConnected(true);
            }
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
  }, [roomId]);

  return (
    <View>
      <Text>Chatting Room: {roomId}</Text>
      <Text>
        Connection Status: {isConnected ? 'Connected' : 'Disconnected'}
      </Text>

      {/* Add your chat UI components here */}
    </View>
  );
}
