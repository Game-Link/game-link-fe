import notifee, {AndroidStyle, EventType} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {useFcmTokenStore} from '@src/store';
import {Linking} from 'react-native';
import {linking} from '../../app-navigator';

import LargeIcon from '@src/assets/app-icon.png';

// linking url 생성
function makeUrl(roomId: string, roomName: string): string {
  return linking.prefixes[0] + 'chat' + `/${roomId}` + `/${roomName}`;
}

// firebase message for background when app quit && background
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  await onDisplayNotifee(remoteMessage);
});

async function onDisplayNotifee(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'game-link',
    name: 'game-link-chat-channel',
  });

  if (
    typeof remoteMessage.data?.roomName === 'string' &&
    typeof remoteMessage.data?.roomId === 'string'
  ) {
    const {roomId, roomName} = remoteMessage.data;
    await notifee.displayNotification({
      title: `<p style="font-size: 16px; font-weight: bold;">${roomName}</p>`,
      body: remoteMessage.notification?.body || '',
      data: {
        roomId,
        roomName,
      },

      android: {
        channelId,
        smallIcon: 'ic_tab_icon',
        color: '#8e7cc3',
        largeIcon: LargeIcon,
        style: {
          type: AndroidStyle.MESSAGING,
          person: {
            name: roomName,
          },
          messages: [
            {
              text: `<p style="font-size: 16px; font-weight: bold;">${
                remoteMessage.notification?.body || ''
              }</p>`,
              timestamp: Date.now(),
            },
          ],
        },
      },
    });
  }
}

export default function useNotifee() {
  const {saveToken} = useFcmTokenStore();

  useEffect(() => {
    async function getToken() {
      // remote message를 위해 기기를 등록합니다.
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }

        // 해당 토큰 정보를 store에 저장
        const token = await messaging().getToken();
        console.log('phone token', token);
        saveToken(token);
      } catch (error) {
        console.error(error);
      }
    }

    getToken();

    const onSubscribe = messaging().onMessage(async message => {
      console.log('기기 내에서 푸쉬알람 메시지:', message);
      await onDisplayNotifee(message);
    });

    const linkingEvent = async (roomId: string, roomName: string) => {
      await Linking.openURL(makeUrl(roomId, roomName));
    };

    notifee.onForegroundEvent(async event => {
      const {
        detail: {notification},
        type,
      } = event;

      if (type === EventType.PRESS) {
        if (
          typeof notification?.data?.roomName === 'string' &&
          typeof notification?.data?.roomId === 'string'
        ) {
          console.log('확인 이벤트 foreground');
          await linkingEvent(
            notification?.data?.roomName,
            notification?.data?.roomId,
          );
        }
      }
      console.log('NOTIFEE FOREGROUNDEVENT:', notification);
    });

    notifee.onBackgroundEvent(async event => {
      const {
        detail: {notification},
        type,
      } = event;

      if (type === EventType.PRESS) {
        if (
          typeof notification?.data?.roomName === 'string' &&
          typeof notification?.data?.roomId === 'string'
        ) {
          console.log('확인 이벤트 background');
          await linkingEvent(
            notification?.data?.roomName,
            notification?.data?.roomId,
          );
        }
      }
      console.log('NOTIFEE BACKGROUNDEVENT:', notification);
    });

    return () => {
      onSubscribe();
    };
  }, []);
}
