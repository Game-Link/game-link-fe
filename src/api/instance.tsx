import axios, {AxiosRequestConfig, AxiosResponse, isAxiosError} from 'axios';
import Config from 'react-native-config';
import {Platform} from 'react-native';
import {postReissue} from './login';
import {saveLocalStorage, loginStore} from '@src/store';
import {REFRESH_TOKEN} from '@src/util';

const PRODUCTION_API_URL = Config.PRODUCTION_API;

const baseURL = !__DEV__
  ? Config.PRODUCTION_API
  : Platform.OS === 'android'
  ? Config.DEV_API_ANDROID
  : Config.DEV_API_IOS;

console.log('PRODUCTION_API_URL : ', PRODUCTION_API_URL);
export const instance = axios.create({
  //baseURL: PRODUCTION_API_URL,
  baseURL,
});

export const getHeaders = (option?: AxiosRequestConfig['headers']) => {
  const accessToken = loginStore.getState().token;
  console.log(accessToken, 'GET HEADERS');
  return {
    ...(option || {}),
    Authorization: `Bearer ${accessToken}`,
  };
};

instance.interceptors.request.use();

const callbackSucess = (response: AxiosResponse<any, any>) => response;

const useCallbackError = async (error: any) => {
  const saveToken = loginStore.getState().saveToken;
  if (isAxiosError(error)) {
    // 토큰이 만료된 경우 토큰 갱신
    // 본래 요청에 대한 정보는 error.config에 담겨져 있습니다.
    const {response, config} = error;
    const message: string = response!.data.message;
    console.log(
      ' =============ERROR INTERSEPT===============',
      error.code,
      error.config,
      message,
    );
    if (response?.status === 601) {
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
    naver: '/user/oauth/naver/login',
    reissue: 'user/reissue',
  },
  riot: {
    account: '/riot/lol/account',
    register: '/riot/lol/account/register',
    refresh: 'riot/lol/account/refresh',
    user: 'user/profile',
  },
  chatRoom: {
    create: '/chatroom/create',
    list: '/chatroom',
    previousChatting: 'chatroom/message/list',
    users: 'chatroom/users',
    images: 'chat/image/upload',
  },
} as const;

export const hookKeys = {
  riot: {
    my: 'my-info',
    user: 'user-info',
  },
  chat: {
    all: 'chattings',
    room: (roomId: string) => roomId,
    user: (roomId: string) => roomId + '-' + 'user',
  },
} as const;

export type PageNation<T> = {
  content: T[];
  hasNext: boolean;
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
  first: boolean;
  last: boolean;
};
