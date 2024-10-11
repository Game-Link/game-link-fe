import {getInfo, REFRESH_TOKEN, USER_ID} from '@util';
import {instance, path} from '@api';
import {useMutation} from '@tanstack/react-query';
import Config from 'react-native-config';
import axios from 'axios';
import {saveLocalStorage, useLoginStore} from '@src/store';

export type PostKakaoOauth = {
  accessToken: string;
  refreshToken: string;
  uniqueId: string;
  userId: string;
};

export type KakaoOauth = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
};

async function postKakaoOauth(kakaoInfo: KakaoOauth) {
  const deviceInfo = await getInfo();

  const response = await instance.post<PostKakaoOauth>(
    path.user.kakao,
    {
      deviceInfo,
      kakaoInfo,
    },
    {},
  );

  return response.data;
}

function useKakaoOauthMutation() {
  const saveToken = useLoginStore().saveToken;
  const mutation = useMutation({
    mutationFn: (kakaoOauth: KakaoOauth) => postKakaoOauth(kakaoOauth),
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

async function postAccessToekeRefreshToken(code: string) {
  const response = await axios.post<KakaoOauth>(
    'https://kauth.kakao.com/oauth/token',
    {},
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: {
        code,
        redirect_uri: Config.KAKAO_LOGIN_REDIRECT_URI,
        client_id: Config.KAKAO_LOGIN_REST_API_KEY,
        grant_type: 'authorization_code',
      },
    },
  );
  const data = response.data;
  return data;
}

export function useKakaoOauthLoginMutation() {
  const loginMutation = useKakaoOauthMutation();
  const mutation = useMutation({
    mutationFn: (code: string) => postAccessToekeRefreshToken(code),
    onError: err => {
      console.error(err);
    },
    onSuccess: async data => {
      loginMutation.mutate(data);
    },
  });
  return mutation;
}
