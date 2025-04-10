import {saveLocalStorage} from '@src/store';
import {useEffect} from 'react';
import {Alert, Linking, Platform, PermissionsAndroid} from 'react-native';
import Config from 'react-native-config';
import {
  check,
  request,
  RESULTS,
  PERMISSIONS,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

export default function usePermissions() {
  useEffect(() => {
    // 알림 권한 확인
    async function requestAndroid() {
      const {status} = await checkNotifications();
      if (
        status === RESULTS.DENIED ||
        status === RESULTS.BLOCKED ||
        status === RESULTS.UNAVAILABLE
      ) {
        console.log(status);
        const result = await PermissionsAndroid.request(
          'android.permission.POST_NOTIFICATIONS',
        );
        if (result === 'granted') {
          await saveLocalStorage(Config.LOCALSTORAGE_NOTIFICATION_KEY, true);
        } else {
          await saveLocalStorage(Config.LOCALSTORAGE_NOTIFICATION_KEY, false);
        }
      }

      // 1. CAMERA 권한 요청
      const cameraResult = await check(PERMISSIONS.ANDROID.CAMERA);

      if (cameraResult === RESULTS.DENIED) {
        return request(PERMISSIONS.ANDROID.CAMERA);
      } else if (cameraResult === RESULTS.BLOCKED) {
        Alert.alert(
          '카메라 권한 필요',
          '이 앱은 카메라를 사용하기 위해 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
          [
            {text: '설정으로 이동', onPress: () => Linking.openSettings()},
            {text: '취소', style: 'cancel'},
          ],
        );
      }

      // 2. 저장소 권한 요청 (Android 12 이하)
      if (Platform.OS === 'android' && Platform.Version <= 31) {
        const storageResult = await check(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );

        if (storageResult === RESULTS.DENIED) {
          return request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        } else if (storageResult === RESULTS.BLOCKED) {
          Alert.alert(
            '저장소 접근 권한 필요',
            '이 앱은 파일에 접근하기 위해 저장소 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
            [
              {
                text: '설정으로 이동',
                onPress: () => Linking.openSettings(),
              },
              {text: '취소', style: 'cancel'},
            ],
          );
        }

        const storageWriteResult = await check(
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );

        if (storageWriteResult === RESULTS.DENIED) {
          return request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        } else if (storageWriteResult === RESULTS.BLOCKED) {
          Alert.alert(
            '저장소 쓰기 권한 필요',
            '이 앱은 파일을 저장하기 위해 저장소 쓰기 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
            [
              {
                text: '설정으로 이동',
                onPress: () => Linking.openSettings(),
              },
              {text: '취소', style: 'cancel'},
            ],
          );
        }
      }

      // 3. ACCESS_MEDIA_LOCATION 권한 요청 (Android 10 이상)
      if (Platform.OS === 'android' && Platform.Version >= 29) {
        const mediaResult = await check(
          PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
        );

        if (mediaResult === RESULTS.DENIED) {
          return request(PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION);
        } else if (mediaResult === RESULTS.BLOCKED) {
          Alert.alert(
            '미디어 위치 접근 권한 필요',
            '이 앱은 미디어 파일의 위치 정보에 접근하기 위해 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
            [
              {
                text: '설정으로 이동',
                onPress: () => Linking.openSettings(),
              },
              {text: '취소', style: 'cancel'},
            ],
          );
        }
      }

      // 4. 미디어 파일 접근 권한 요청 (Android 13 이상)
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        // 이미지 파일 접근 권한 요청
        const readMediaImagesResult = await check(
          PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        );

        if (readMediaImagesResult === RESULTS.DENIED) {
          return request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        } else if (readMediaImagesResult === RESULTS.BLOCKED) {
          Alert.alert(
            '이미지 파일 접근 권한 필요',
            '이 앱은 이미지 파일에 접근하기 위해 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
            [
              {
                text: '설정으로 이동',
                onPress: () => Linking.openSettings(),
              },
              {text: '취소', style: 'cancel'},
            ],
          );
        }

        // 비디오 파일 접근 권한 요청
        const videoReadResult = await check(
          PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
        );
        if (videoReadResult === RESULTS.DENIED) {
          return request(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
        } else if (videoReadResult === RESULTS.BLOCKED) {
          Alert.alert(
            '비디오 파일 접근 권한 필요',
            '이 앱은 비디오 파일에 접근하기 위해 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
            [
              {
                text: '설정으로 이동',
                onPress: () => Linking.openSettings(),
              },
              {text: '취소', style: 'cancel'},
            ],
          );
        }
      }
    }

    async function requestNotificationPermissionWithIOS() {
      // 알림 권한
      const {status} = await checkNotifications();
      if (status === RESULTS.DENIED) {
        const {status: requestStatus} = await requestNotifications([
          'alert',
          'sound',
          'badge',
        ]);
        if (requestStatus === RESULTS.GRANTED) {
          Alert.alert('알림 설정', '알림 권한이 허용되었습니다.');
          await saveLocalStorage(Config.LOCALSTORAGE_NOTIFICATION_KEY, true);
        } else {
          Alert.alert(
            '알림 권한 필요',
            '알림 기능을 사용하려면 알림 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
            [
              {text: '설정으로 이동', onPress: () => Linking.openSettings()},
              {text: '취소', style: 'cancel'},
            ],
          );
          await saveLocalStorage(Config.LOCALSTORAGE_NOTIFICATION_KEY, false);
        }
      } else if (status === RESULTS.GRANTED) {
        await saveLocalStorage(Config.LOCALSTORAGE_NOTIFICATION_KEY, true);
      } else if (status === RESULTS.BLOCKED) {
        Alert.alert(
          '알림 권한 차단됨',
          '알림 권한이 차단되었습니다. 설정에서 권한을 허용해주세요.',
          [
            {text: '설정으로 이동', onPress: () => Linking.openSettings()},
            {text: '취소', style: 'cancel'},
          ],
        );
        await saveLocalStorage(Config.LOCALSTORAGE_NOTIFICATION_KEY, false);
      }

      // 카메라 권한
      const cameraResult = await check(PERMISSIONS.IOS.CAMERA);
      if (cameraResult === RESULTS.DENIED || cameraResult === RESULTS.LIMITED) {
        return request(PERMISSIONS.IOS.CAMERA);
      } else if (cameraResult === RESULTS.BLOCKED) {
        Alert.alert(
          '카메라 권한 필요',
          '이 앱은 카메라 접근 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
          [
            {text: '설정으로 이동', onPress: () => Linking.openSettings()},
            {text: '취소', style: 'cancel'},
          ],
        );
      }

      // 4. 사진 라이브러리 읽기 권한 요청
      const photoResult = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (photoResult === RESULTS.DENIED || photoResult === RESULTS.LIMITED) {
        return request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      } else if (photoResult === RESULTS.BLOCKED) {
        Alert.alert(
          '사진 라이브러리 접근 권한 필요',
          '이 앱은 사진 라이브러리에 접근하기 위해 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
          [
            {text: '설정으로 이동', onPress: () => Linking.openSettings()},
            {text: '취소', style: 'cancel'},
          ],
        );
      }

      // 5. 사진 라이브러리 쓰기 권한 요청 (iOS 14 이상)
      const photoAddOnlyResult = await check(
        PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
      );

      if (
        photoAddOnlyResult === RESULTS.DENIED ||
        photoAddOnlyResult === RESULTS.LIMITED
      ) {
        return request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
      } else if (photoAddOnlyResult === RESULTS.BLOCKED) {
        Alert.alert(
          '사진 저장 권한 필요',
          '이 앱은 사진을 저장하기 위해 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
          [
            {text: '설정으로 이동', onPress: () => Linking.openSettings()},
            {text: '취소', style: 'cancel'},
          ],
        );
      }
    }

    // 📌 iOS 플랫폼별 권한 요청
    if (Platform.OS === 'ios') {
      // 1. 알림 권한
      requestNotificationPermissionWithIOS();
    } else if (Platform.OS === 'android') {
      requestAndroid();
    }
  }, []);
}
