import {ChatFileResponse, Chatting} from '@src/api';
import {Client} from '@stomp/stompjs';
import {useCallback, useEffect, useRef, useState} from 'react';
import {NativeEventSubscription, Platform} from 'react-native';
import Config from 'react-native-config';
import SockJS from 'sockjs-client';
import {useUserId} from '@src/hooks';
import {AppState, AppStateStatus} from 'react-native';

const PRODUCTION_API = Config.PRODUCTION_STOMP_URL;

const DEV_API = !__DEV__
  ? Config.PRODUCTION_API
  : Platform.OS === 'android'
  ? Config.DEV_API_ANDROID
  : Config.DEV_API_IOS;

export default function UseStomp(roomId: string) {
  const userId = useUserId();
  const [messages, setMessages] = useState<Chatting[]>([]);
  const [isLoading, setisLoading] = useState(true);
  const client = useRef<Client | null>(null);

  // text message 전달
  const publishTextMessage = useCallback(
    (content: string) => {
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
    },
    [userId, roomId],
  );

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
    [userId, roomId],
  );

  // disconnect message 비활성화 여부 확인
  const publichDisconnect = () => {
    client.current?.publish({
      destination: '/pub/chat/disconnect',
      body: JSON.stringify({
        roomId,
        userId,
        type: 'DISCONNECT',
        fileType: 'NONE',
      }),
    });
  };

  useEffect(() => {
    let subscription: null | NativeEventSubscription = null;
    if (!client.current && userId) {
      client.current = new Client({
        webSocketFactory: () => new SockJS(`${PRODUCTION_API}/ws-stomp`),
        reconnectDelay: 500, // 자동 재 연결
        heartbeatIncoming: 3000, // 서버측에서 오는 신호 확인
        heartbeatOutgoing: 3000, // 서버측으로 가는 신호 확인
        debug: function (str) {
          console.log('DEBUG: ', str);
        },
        onConnect: async () => {
          // 구독해서 메시지를 뿌려주는 역할
          client.current?.subscribe(
            '/sub/chatRoom/enter' + roomId,
            payload => {
              const data = JSON.parse(payload.body) as Chatting;

              if (data.type === 'ENTER') {
                setisLoading(false);
                if (data.userId !== userId && data.content !== '') {
                  console.log('상대방 입장 엔터 메시지');
                  setMessages(prev => [...prev, data]);
                }
              } else if (data.type) {
                console.log('NOT ENTER DATA: ', data);
                setMessages(prev => [...prev, data]);
              }
            },
            {userId},
          );

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
          setMessages([]);
          setisLoading(true);
        },
        onStompError: error => {
          console.error('Error command: ', error.command);
          console.error('Error body data: ', error.body);
          console.log('WebSocket connection failed');
          setMessages([]);
          setisLoading(true);
        },
        onWebSocketClose: () => {
          console.log('WebSocket connection closed');
          setMessages([]);
          setisLoading(true);
        },
      });

      // App State에 따른 stomp 관리
      const handleAppStateChange = (status: AppStateStatus) => {
        console.log('APP STATUS EVENT 연결', status);
        if (status !== 'active' && client.current) {
          console.log('DEACTIVATE CONNECT SOCKET');
          publichDisconnect();
          client.current.deactivate();
        } else if (status === 'active' && client.current) {
          console.log('ACTIVATE CONNECT SOCKET');

          client.current.activate();
        }
      };

      subscription = AppState.addEventListener('change', handleAppStateChange);
      // stomp js 활성화
      client.current.activate();
    }

    return () => {
      console.log('unMount 콜백 함수 실행');
      if (subscription) {
        console.log('AppState 추적 EVENT 종료');
        subscription.remove();
      }
      if (client.current) {
        console.log('채팅방 완전히 나가기');
        publichDisconnect();
        client.current.deactivate();
      }
    };
  }, [roomId, userId]);

  // useEffect(() => {
  //   return () => {
  //     subscription.remove();
  //     if (client.current) {
  //       console.log('백그라운드 테스트');
  //       //publichDisconnect();
  //       client.current.deactivate();
  //     }
  //   };
  // }, []);

  return {isLoading, messages, client, publishTextMessage, publishFileMessage};
}
