import {useEffect} from 'react';
import {Alert, Linking, Platform, PermissionsAndroid} from 'react-native';
import {check, request, RESULTS, PERMISSIONS} from 'react-native-permissions';

export default function usePermissions() {
  useEffect(() => {
    async function requestNotificationPermissionAndroid() {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }

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
      // 1. CAMERA 권한 요청
      check(PERMISSIONS.ANDROID.CAMERA)
        .then(result => {
          if (result === RESULTS.DENIED) {
            return request(PERMISSIONS.ANDROID.CAMERA);
          } else if (result === RESULTS.BLOCKED) {
            Alert.alert(
              '카메라 권한 필요',
              '이 앱은 카메라를 사용하기 위해 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
              [
                {text: '설정으로 이동', onPress: () => Linking.openSettings()},
                {text: '취소', style: 'cancel'},
              ],
            );
          }
        })
        .catch(console.error);

      // 2. 저장소 권한 요청 (Android 12 이하)
      if (Platform.Version <= 31) {
        check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
          .then(result => {
            if (result === RESULTS.DENIED) {
              return request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            } else if (result === RESULTS.BLOCKED) {
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
          })
          .catch(console.error);

        check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
          .then(result => {
            if (result === RESULTS.DENIED) {
              return request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
            } else if (result === RESULTS.BLOCKED) {
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
          })
          .catch(console.error);
      }

      // 3. ACCESS_MEDIA_LOCATION 권한 요청 (Android 10 이상)
      if (Platform.Version >= 29) {
        check(PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION)
          .then(result => {
            if (result === RESULTS.DENIED) {
              return request(PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION);
            } else if (result === RESULTS.BLOCKED) {
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
          })
          .catch(console.error);
      }

      // 4. 미디어 파일 접근 권한 요청 (Android 13 이상)
      if (Platform.Version >= 33) {
        // 이미지 파일 접근 권한 요청
        check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES)
          .then(result => {
            if (result === RESULTS.DENIED) {
              return request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
            } else if (result === RESULTS.BLOCKED) {
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
          })
          .catch(console.error);

        // 비디오 파일 접근 권한 요청
        check(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO)
          .then(result => {
            if (result === RESULTS.DENIED) {
              return request(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
            } else if (result === RESULTS.BLOCKED) {
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
          })
          .catch(console.error);

        // 오디오 파일 접근 권한 요청
        check(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO)
          .then(result => {
            if (result === RESULTS.DENIED) {
              return request(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO);
            } else if (result === RESULTS.BLOCKED) {
              Alert.alert(
                '오디오 파일 접근 권한 필요',
                '이 앱은 오디오 파일에 접근하기 위해 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
                [
                  {
                    text: '설정으로 이동',
                    onPress: () => Linking.openSettings(),
                  },
                  {text: '취소', style: 'cancel'},
                ],
              );
            }
          })
          .catch(console.error);
      }

      // 5. READ_SMS 권한 요청
      check(PERMISSIONS.ANDROID.READ_SMS)
        .then(result => {
          if (result === RESULTS.DENIED) {
            return request(PERMISSIONS.ANDROID.READ_SMS);
          } else if (result === RESULTS.BLOCKED) {
            Alert.alert(
              'SMS 읽기 권한 필요',
              '이 앱은 SMS 메시지를 읽기 위해 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
              [
                {text: '설정으로 이동', onPress: () => Linking.openSettings()},
                {text: '취소', style: 'cancel'},
              ],
            );
          }
        })
        .catch(console.error);

      requestNotificationPermissionAndroid();
    }
  }, []);
}
