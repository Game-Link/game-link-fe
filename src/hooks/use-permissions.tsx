import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {check, request, RESULTS, PERMISSIONS} from 'react-native-permissions';

export default function usePermissions() {
  useEffect(() => {
    // 📌 iOS 플랫폼별 권한 요청
    if (Platform.OS === 'ios') {
      // 2. 카메라 권한 요청
      check(PERMISSIONS.IOS.CAMERA)
        .then(result => {
          if (result === RESULTS.DENIED || result === RESULTS.LIMITED) {
            return request(PERMISSIONS.IOS.CAMERA);
          } else if (result === RESULTS.BLOCKED) {
            Alert.alert(
              '카메라 권한 필요',
              '이 앱은 카메라 접근 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
              [
                {text: '설정으로 이동', onPress: () => Linking.openSettings()},
                {text: '취소', style: 'cancel'},
              ],
            );
          }
        })
        .catch(console.error);

      // 3. Face ID 권한 요청
      check(PERMISSIONS.IOS.FACE_ID)
        .then(result => {
          if (result === RESULTS.DENIED || result === RESULTS.LIMITED) {
            return request(PERMISSIONS.IOS.FACE_ID);
          } else if (result === RESULTS.BLOCKED) {
            Alert.alert(
              'Face ID 권한 필요',
              '이 앱은 Face ID 사용을 위해 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
              [
                {text: '설정으로 이동', onPress: () => Linking.openSettings()},
                {text: '취소', style: 'cancel'},
              ],
            );
          }
        })
        .catch(console.error);

      // 4. 사진 라이브러리 읽기 권한 요청
      check(PERMISSIONS.IOS.PHOTO_LIBRARY)
        .then(result => {
          if (result === RESULTS.DENIED || result === RESULTS.LIMITED) {
            return request(PERMISSIONS.IOS.PHOTO_LIBRARY);
          } else if (result === RESULTS.BLOCKED) {
            Alert.alert(
              '사진 라이브러리 접근 권한 필요',
              '이 앱은 사진 라이브러리에 접근하기 위해 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
              [
                {text: '설정으로 이동', onPress: () => Linking.openSettings()},
                {text: '취소', style: 'cancel'},
              ],
            );
          }
        })
        .catch(console.error);

      // 5. 사진 라이브러리 쓰기 권한 요청 (iOS 14 이상)
      check(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY)
        .then(result => {
          if (result === RESULTS.DENIED || result === RESULTS.LIMITED) {
            return request(PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY);
          } else if (result === RESULTS.BLOCKED) {
            Alert.alert(
              '사진 저장 권한 필요',
              '이 앱은 사진을 저장하기 위해 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
              [
                {text: '설정으로 이동', onPress: () => Linking.openSettings()},
                {text: '취소', style: 'cancel'},
              ],
            );
          }
        })
        .catch(console.error);
    } else if (Platform.OS === 'android') {
      // 📌 Android 플랫폼별 권한 요청

      // 1. 카메라 권한 요청
      check(PERMISSIONS.ANDROID.CAMERA)
        .then(result => {
          if (result === RESULTS.DENIED) {
            return request(PERMISSIONS.ANDROID.CAMERA);
          } else if (result === RESULTS.BLOCKED) {
            Alert.alert(
              '카메라 권한 필요',
              '이 앱은 카메라 접근 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
              [
                {text: '설정으로 이동', onPress: () => Linking.openSettings()},
                {text: '취소', style: 'cancel'},
              ],
            );
          }
        })
        .catch(console.error);

      // 2. 사진 라이브러리 접근 권한 요청 (Android에서는 저장소 권한)
      check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        .then(result => {
          if (result === RESULTS.DENIED) {
            return request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
          } else if (result === RESULTS.BLOCKED) {
            Alert.alert(
              '저장소 접근 권한 필요',
              '이 앱은 사진 및 파일에 접근하기 위해 저장소 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
              [
                {text: '설정으로 이동', onPress: () => Linking.openSettings()},
                {text: '취소', style: 'cancel'},
              ],
            );
          }
        })
        .catch(console.error);

      //   // 3. 알림 권한 요청 (Android 13 이상)
      //   if (Platform.Version >= 33) {
      //     check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
      //       .then(result => {
      //         if (result === RESULTS.DENIED) {
      //           return request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      //         } else if (result === RESULTS.BLOCKED) {
      //           Alert.alert(
      //             '알림 권한 필요',
      //             '이 앱은 알림을 보내기 위해 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
      //             [
      //               {
      //                 text: '설정으로 이동',
      //                 onPress: () => Linking.openSettings(),
      //               },
      //               {text: '취소', style: 'cancel'},
      //             ],
      //           );
      //         }
      //       })
      //       .catch(console.error);
      //   }

      // 4. 기타 권한은 필요에 따라 추가합니다.
    }
  }, []);
}
