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

// linking url 생성
function makeUrl(roomId: string, roomName: string): string {
  return linking.prefixes[0] + 'chat' + `/${roomId}` + `/${roomName}`;
}

async function onDisplayNotifee(
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) {
  // Check if notifications are enabled
  const notificationsEnabled = await getLocalStorage(
    Config.LOCALSTORAGE_NOTIFICATION_KEY,
  );

  console.log(notificationsEnabled);
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

// firebase message for background when app quit && background
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  await onDisplayNotifee(remoteMessage);
});

export default function useNotifee() {
  const {saveToken} = useFcmTokenStore();

  const {state} = useNotificationStore();
  useEffect(() => {
    // Function to check notification setting

    // Initialize notifications only if enabled
    async function initNotifications() {
      if (!state) {
        console.log('Notifications disabled, skipping notification setup.');
        return;
      }

      // Register device and get token
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }

        const token = await messaging().getToken();
        console.log('phone token', token);
        saveToken(token);
      } catch (error) {
        console.error(error);
      }

      // Subscribe to foreground messages
      const onSubscribe = messaging().onMessage(async message => {
        console.log('Push notification message:', message);
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
            console.log('Foreground press event');
            await Linking.openURL(
              makeUrl(notification.data.roomId, notification.data.roomName),
            );
          }
        }
        console.log('Foreground event:', notification);
      });

      // Set up background event handling
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
            console.log('Background press event');
            await Linking.openURL(
              makeUrl(notification.data.roomId, notification.data.roomName),
            );
          }
        }
        console.log('Background event:', notification);
      });

      // Cleanup subscription on unmount
      return () => {
        onSubscribe();
      };
    }

    initNotifications();
  }, []);
}
