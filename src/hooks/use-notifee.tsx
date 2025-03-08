import notifee, {AndroidStyle, EventType} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {
  getLocalStorage,
  useFcmTokenStore,
  useNotificationStore,
} from '@src/store';
import {Linking} from 'react-native';
import {linking} from '../../app-navigator';

import LargeIcon from '@src/assets/app-icon.png';
import Config from 'react-native-config';
import {useDeeplinkingStore} from '@src/store/use-notification-linking-store';
import {DEFAULT_STYLES} from '@src/util';

// linking url 생성
export function makeUrl(roomId: string, roomName: string): string {
  return linking.prefixes[0] + 'chat' + `/${roomId}` + `/${roomName}`;
}

async function onDisplayNotifee(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) {
  // Check if notifications are enabled
  const notificationsEnabled = await getLocalStorage(
    Config.LOCALSTORAGE_NOTIFICATION_KEY,
  );

  if (!notificationsEnabled) {
    console.log('Notifications are disabled by user.');
    return;
  }

  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'game-link',
    name: 'game-link-chat-channel',
  });

  if (
    typeof remoteMessage.data?.roomName === 'string' &&
    typeof remoteMessage.data?.roomId === 'string' &&
    typeof remoteMessage.data?.userName === 'string'
  ) {
    const {roomId, roomName, userName} = remoteMessage.data;
    await notifee.displayNotification({
      title: roomName,
      subtitle: `${userName} :`,
      body: remoteMessage.notification?.body || '',
      data: {
        roomId,
        roomName,
      },
      android: {
        channelId,
        smallIcon: 'ic_tab_icon',
        color: DEFAULT_STYLES.color.main,
        largeIcon: LargeIcon,
        style: {
          type: AndroidStyle.MESSAGING,
          person: {
            name: userName,
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
      ios: {
        foregroundPresentationOptions: {
          badge: true,
          sound: false,
          banner: true,
          list: true,
        },
      },
    });
  }
}

// firebase message for background when app quit && background
messaging().setBackgroundMessageHandler(async remoteMessage => {
  await onDisplayNotifee(remoteMessage);
});

export default function useNotifee() {
  const {saveToken} = useFcmTokenStore();

  const {state} = useNotificationStore();
  const {url, deleteUrl} = useDeeplinkingStore();
  useEffect(() => {
    // Initialize notifications only if enabled
    async function initNotifications() {
      // Register device and get token
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }

        if (!state) {
          return;
        }

        const token = await messaging().getToken();
        saveToken(token);
      } catch (error) {
        console.error(error);
      }

      // Subscribe to foreground messages
      const onSubscribe = messaging().onMessage(async message => {
        await onDisplayNotifee(message);
      });

      // Set up foreground event handling
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
            await Linking.openURL(
              makeUrl(notification.data.roomId, notification.data.roomName),
            );
          }
        }
      });

      // Set up background event handling
      notifee.onBackgroundEvent(async event => {
        const {
          detail: {notification},
          type,
        } = event;

        if (type === EventType.PRESS || type === EventType.ACTION_PRESS) {
          if (url) {
            await Linking.openURL(url);
            deleteUrl();
          }
        }
      });

      return () => {
        onSubscribe();
      };
    }

    initNotifications();
  }, []);
}
