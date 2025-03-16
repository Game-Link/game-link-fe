import {REFRESH_TOKEN, USER_ID} from '@util';
import {instance, path} from '@api';
import {useMutation} from '@tanstack/react-query';
import {saveLocalStorage, useLoginStore} from '@src/store';
import {EnrolledType} from '@src/components';
import {Alert} from 'react-native';

export type postGoogleOauth = {
  accessToken: string;
  refreshToken: string;
  uniqueId: string;
  userId: string;
  enrolledType: EnrolledType;
};

export type GoogleOauth = {
  name: string;
  email: string;
  fcmToken: string | null;
};

async function postGoogleOauth(googleInfo: GoogleOauth) {
  if (googleInfo.fcmToken === null) {
    throw new Error('FCM TOKEN이 존재하지 않습니다.');
  }

  const response = await instance.post<postGoogleOauth>(
    path.user.google,
    {
      name: googleInfo.name,
      email: googleInfo.email,
      deviceId: googleInfo.fcmToken,
    },
    {},
  );

  return response.data;
}

export function useGoogleOauthMutation() {
  const {saveToken, saveEnrolledType} = useLoginStore();

  const mutation = useMutation({
    mutationFn: (googleOauth: GoogleOauth) => postGoogleOauth(googleOauth),
    onError: err => {
      console.error('GOOGLE LOGIN ERROR : ', err);

      Alert.alert(err.message);
    },
    onSuccess: async data => {
      saveToken(data.accessToken);
      saveEnrolledType(data.enrolledType);
      await saveLocalStorage(REFRESH_TOKEN, data.refreshToken);
      await saveLocalStorage(USER_ID, data.userId);
    },
  });
  return mutation;
}
