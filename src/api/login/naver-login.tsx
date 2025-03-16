import {REFRESH_TOKEN, USER_ID} from '@util';
import {instance, path} from '@api';
import {useMutation} from '@tanstack/react-query';
import {saveLocalStorage, useLoginStore} from '@src/store';
import {NaverLoginResponse} from '@react-native-seoul/naver-login';
import {EnrolledType} from '@src/components';
import {Alert} from 'react-native';
import * as Sentry from '@sentry/react-native';

export type postNaverOauth = {
  accessToken: string;
  refreshToken: string;
  uniqueId: string;
  userId: string;
  enrolledType: EnrolledType;
};

export type NaverLoginParam = NaverLoginResponse & {
  fcmToken: string | null;
};

async function postNaverOauth(naverInfo: NaverLoginParam) {
  if (!naverInfo.fcmToken) {
    throw new Error('FCM TOKEN이 존재하지 않습니다.');
  }
  const response = await instance.post<postNaverOauth>(
    path.user.naver,
    {
      deviceId: naverInfo.fcmToken,
      accessToken: naverInfo.successResponse?.accessToken,
    },
    {},
  );

  return response.data;
}

export function useNaverOauthMutation() {
  const {saveToken, saveEnrolledType} = useLoginStore();
  const mutation = useMutation({
    mutationFn: (naverInfo: NaverLoginParam) => postNaverOauth(naverInfo),
    onError: err => {
      console.error('NAVER LOGIN ERROR : ', err);
      Alert.alert(err.message);
      Sentry.captureException(err);
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
