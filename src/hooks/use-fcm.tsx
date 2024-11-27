import messaging from '@react-native-firebase/messaging';
import PushNotification, {
  PushNotificationScheduleObject,
} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useEffect} from 'react';
import {useFcmTokenStore} from '@src/store';
import {Linking} from 'react-native';
import {linking} from '../../app-navigator';

interface CustomPushNotificationObject extends PushNotificationScheduleObject {
  data?: Record<string, any>; // `data` 속성을 추가
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

PushNotification.configure({
  // (optional) 토큰이 생성될 때 실행됨(토큰을 서버에 등록할 때 쓸 수 있음)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) 리모트 노티를 수신하거나, 열었거나 로컬 노티를 열었을 때 실행
  onNotification: function (notification: any) {
    console.log('NOTIFICATION:', notification);

    if (
      notification.userInteraction &&
      notification.data.roomId &&
      notification.data.roomName
    ) {
      const url =
        linking.prefixes[0] +
        'chat' +
        `/${notification.data.roomId}` +
        `/${notification.data.roomName}`;
      console.log('TEST', notification.data.roomName, notification.data.roomId);
      console.log(url);
      Linking.openURL(url).catch(err =>
        console.error('FCM LINKING ERROR : ', err),
      );
    }

    // (required) 리모트 노티를 수신하거나, 열었거나 로컬 노티를 열었을 때 실행 아이폰 쪽에서 필요
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) 등록한 액션을 누렀고 invokeApp이 false 상태일 때 실행됨, true면 onNotification이 실행됨 (Android)
  onAction: function (notification: any) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err: Error) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

// PushNotification.createChannel(
//   {
//     channelId: 'riders', // (required)
//     channelName: '앱 전반', // (required)
//     channelDescription: '앱 실행하는 알림', // (optional) default: undefined.
//     soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
//     importance: 4, // (optional) default: 4. Int value of the Android notification importance
//     vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
//   },
//   (created: boolean) =>
//     console.log(`createChannel riders returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
// );

PushNotification.createChannel(
  {
    channelId: 'fcm_fallback_notification_channel', // (required)
    channelName: 'FCM TEST', // (required)
    channelDescription: '앱 FCM TSET 용', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created: boolean) =>
    console.log(`createChannel 앱 FCM TSET 용 returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

export default function useFcm() {
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
      PushNotification.localNotification({
        channelId: 'fcm_fallback_notification_channel',
        title: message.notification?.title,
        message: message.notification?.body || '',
        smallIcon: 'ic_launcher',
        vibrate: true,
        soundName: 'default',
        data: message.data,
      } as CustomPushNotificationObject);
    });

    return () => {
      onSubscribe();
    };
  }, []);
}
