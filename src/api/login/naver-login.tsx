import {getInfo, REFRESH_TOKEN, USER_ID} from '@util';
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

async function postNaverOauth(naverInfo: NaverLoginResponse) {
  const deviceInfo = await getInfo();

  const response = await instance.post<postNaverOauth>(
    path.user.naver,
    {
      devidceId: deviceInfo.deviceId,
      accessToken: naverInfo.successResponse?.accessToken,
    },
    {},
  );

  return response.data;
}

export function useNaverOauthMutation() {
  const saveToken = useLoginStore().saveToken;
  const mutation = useMutation({
    mutationFn: (naverInfo: NaverLoginResponse) => postNaverOauth(naverInfo),
    onError: err => {
      console.error(err);
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
