import axios, {AxiosResponse, isAxiosError} from 'axios';
import Config from 'react-native-config';
import {Platform} from 'react-native';
import {postReissue} from './login';
import {saveLocalStorage, loginStore} from '@src/store';
import {REFRESH_TOKEN} from '@src/util';

export const instance = axios.create({
  baseURL: !__DEV__
    ? Config.PRODUCTION_API
    : Platform.OS === 'android'
    ? Config.DEV_API_ANDROID
    : Config.DEV_API_IOS,
});

instance.interceptors.request.use();

const callbackSucess = (response: AxiosResponse<any, any>) => response;

const useCallbackError = async (error: any) => {
  const saveToken = loginStore.getState().saveToken;
  if (isAxiosError(error)) {
    // 토큰이 만료된 경우 토큰 갱신
    // 본래 요청에 대한 정보는 error.config에 담겨져 있습니다.
    const {response, config} = error;
    const message: string = response!.data.message;
    console.log('ERROR INTERSEPT', error.code, error.config, message);
    if (response?.status === 401) {
      const originalRequest = config!;
      //  토큰 reissue 요청
      const data = await postReissue();
      if (data) {
        saveToken(data?.accessToken);
        await saveLocalStorage(REFRESH_TOKEN, data.refreshToken);
        return instance(originalRequest);
      }
    }
    // 리프레시 토큰 만료
    return Promise.reject(error);
  }
  return Promise.reject(error);
};

instance.interceptors.response.use(callbackSucess, useCallbackError);

export const path = {
  user: {
    kakao: '/user/oauth/kakao/login',
    reissue: 'user/reissue',
  },
  riot: {
    account: '/riot/lol/account',
    register: '/riot/lol/account/register',
    refresh: 'riot/lol/account/refresh',
  },
} as const;

export const hookKeys = {
  myInfo: {
    riot: 'riot-user',
  },
} as const;
