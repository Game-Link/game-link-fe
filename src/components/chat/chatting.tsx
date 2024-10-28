import {View, Text, Platform} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import {Client} from '@stomp/stompjs';
import Config from 'react-native-config';
import SockJS from 'sockjs-client';
import {getLocalStorage} from '@src/store';
import {USER_ID} from '@src/util';
import {ChatStackParamList} from '@src/page';

type ChattingProps = StackScreenProps<ChatStackParamList, 'Chatting'>;
export default function Chatting({navigation, route}: ChattingProps) {
  const url = !__DEV__
    ? Config.PRODUCTION_API
    : Platform.OS === 'android'
    ? Config.DEV_API_ANDROID
    : Config.DEV_API_IOS;

  const roomId = route.params.roomId;
  const client = useRef<Client | null>(null);

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

          client.current?.subscribe('/sub/chatRoom/enter' + roomId, payload => {
            console.log('PAYLOAD');
            const data = JSON.parse(payload.body);
            console.log('DATA', data);
          });

          client.current?.publish({
            destination: '/pub/chat/enterUser',
            body: JSON.stringify({
              roomId,
              userSubId: userId,
              type: 'ENTER',
              fileType: 'NONE',
            }),
          });
        },
      });
      client.current.activate();
    }

    return () => {
      if (client.current) {
        client.current.deactivate();
        client.current = null;
      }
    };
  }, [roomId]);

  return (
    <View>
      <Text>Chatting Room: {roomId}</Text>
      <Text>Users in this room:</Text>

      {/* Add your chat UI components here */}
    </View>
  );
}
