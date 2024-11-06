import {ChatFileResponse, Chatting} from '@src/api';
import {Client} from '@stomp/stompjs';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import Config from 'react-native-config';
import SockJS from 'sockjs-client';
import {useUserId} from '@src/hooks';
import {MESSAGE_MOCK} from '@src/util';

const PRODUCTION_API = Config.PRODUCTION_STOMP_URL;

const DEV_API = !__DEV__
  ? Config.PRODUCTION_API
  : Platform.OS === 'android'
  ? Config.DEV_API_ANDROID
  : Config.DEV_API_IOS;

export default function UseStomp(roomId: string) {
  const userId = useUserId();
  const [messages, setMessages] = useState<Chatting[]>(MESSAGE_MOCK);
  const [isLoading, setisLoading] = useState(true);
  const client = useRef<Client | null>(null);

  // text message 전달
  const publishTextMessage = useCallback((content: string) => {
    client.current?.publish({
      destination: '/pub/chat/sendMessage',
      body: JSON.stringify({
        roomId,
        userId,
        type: 'TALK',
        content,
        fileType: 'NONE',
      }),
    });
  }, []);

  // file message 전달
  const publishFileMessage = useCallback(
    ({roomId, fileName, fileType, fileUrl}: ChatFileResponse) => {
      client.current?.publish({
        destination: '/pub/chat/sendMessage',
        body: JSON.stringify({
          roomId,
          userId,
          type: 'TALK',
          content: null,
          fileType,
          fileUrl,
          fileName,
        }),
      });
    },
    [],
  );

  useEffect(() => {
    if (!client.current && userId) {
      console.log('PRODUCTION API: ', PRODUCTION_API);
      console.log('DEV API: ', DEV_API);

      client.current = new Client({
        webSocketFactory: () => new SockJS(`${PRODUCTION_API}/ws-stomp`),
        reconnectDelay: 5000, // 자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: function (str) {
          console.log('DEBUG: ', str);
        },
        onConnect: async () => {
          // 구독해서 메시지를 뿌려주는 역할
          client.current?.subscribe('/sub/chatRoom/enter' + roomId, payload => {
            const data = JSON.parse(payload.body) as Chatting;
            console.log('SUBSRIBE DATA : ', data);

            if (data.type === 'ENTER') {
              setisLoading(false);
            }
            if (data.content !== '') {
              setMessages(prev => [...prev, data]);
            }
          });

          // 등록해서 해당 유저가 메시지를 보내는 역할
          client.current?.publish({
            destination: '/pub/chat/enterUser',
            body: JSON.stringify({
              roomId,
              userId,
              type: 'ENTER',
              fileType: 'NONE',
            }),
          });
        },
        onDisconnect: () => {
          console.log('DisLoading from STOMP server');
        },
        onStompError: error => {
          console.error('Error command: ', error.command);
          console.error('Error body data: ', error.body);
          console.log('WebSocket connection failed');
        },
        onWebSocketClose: () => {
          console.log('WebSocket connection closed');
        },
      });

      // stomp js 활성화
      // client.current.activate();
    }

    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, [roomId, userId]);

  return {isLoading, messages, client, publishTextMessage, publishFileMessage};
}
