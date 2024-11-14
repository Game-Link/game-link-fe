import {REFRESH_TOKEN, USER_ID} from '@util';
import {instance, path} from '@api';
import {useMutation} from '@tanstack/react-query';
import {saveLocalStorage, useLoginStore} from '@src/store';
import {NaverLoginResponse} from '@react-native-seoul/naver-login';

export type postNaverOauth = {
  accessToken: string;
  refreshToken: string;
  uniqueId: string;
  userId: string;
};

export type NaverLoginParam = NaverLoginResponse & {
  fcmToken: string | null;
};

async function postNaverOauth(naverInfo: NaverLoginParam) {
  console.log('CHECK FCM TOKEN : ', naverInfo.fcmToken);
  if (!naverInfo.fcmToken) {
    throw new Error('FCM TOKEN이 존재하지 않습니다.');
  }
  const response = await instance.post<postNaverOauth>(
    path.user.naver,
    {
      devidceId: naverInfo.fcmToken,
      accessToken: naverInfo.successResponse?.accessToken,
    },
    {},
  );

  return response.data;
}

export function useNaverOauthMutation() {
  const saveToken = useLoginStore().saveToken;
  const mutation = useMutation({
    mutationFn: (naverInfo: NaverLoginParam) => postNaverOauth(naverInfo),
    onError: err => {
      console.error('NAVER LOGIN ERROR : ', err);
    },
    onSuccess: async data => {
      saveToken(data.accessToken);
      console.log('ACCESS_TOKEN: ' + data.accessToken);
      console.log('USER_ID: ' + data.userId);
      await saveLocalStorage(REFRESH_TOKEN, data.refreshToken);
      await saveLocalStorage(USER_ID, data.userId);
    },
  });
  return mutation;
}
