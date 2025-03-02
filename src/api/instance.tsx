import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
} from 'axios';
import Config from 'react-native-config';
import {Platform} from 'react-native';
import {postReissue} from './login';
import {saveLocalStorage, loginStore} from '@src/store';
import {CustomError, REFRESH_TOKEN} from '@src/util';

const PRODUCTION_API_URL = Config.PRODUCTION_API;
const DEV_API_REMOTE_SERVER_URL = Config.DEV_API_REMOTE_SERVER_URL;
const baseURL = !__DEV__
  ? Config.PRODUCTION_API
  : Platform.OS === 'android'
  ? Config.DEV_API_ANDROID
  : Config.DEV_API_IOS;

export const instance = axios.create({
  baseURL: PRODUCTION_API_URL,
  //baseURL,
  // baseURL: DEV_API_REMOTE_SERVER_URL,
});

export const getHeaders = (option?: AxiosRequestConfig['headers']) => {
  const accessToken = loginStore.getState().token;
  return {
    ...(option || {}),
    Authorization: `Bearer ${accessToken}`,
  };
};

instance.interceptors.request.use();

const callbackSucess = (response: AxiosResponse<any, any>) => response;

const useCallbackError = async (error: AxiosError<CustomError>) => {
  const saveToken = loginStore.getState().saveToken;

  if (isAxiosError(error)) {
    // 토큰이 만료된 경우 토큰 갱신
    // 본래 요청에 대한 정보는 error.config에 담겨져 있습니다.

    const {response, config} = error;
    console.error(error);
    console.error('ERROR: ', response?.data);

    if (response?.data.statusCode === 401) {
      const originalRequest = config!;
      //  토큰 reissue 요청
      const data = await postReissue();
      if (data?.accessToken && data?.refreshToken) {
        saveToken(data?.accessToken);
        await saveLocalStorage(REFRESH_TOKEN, data.refreshToken);
        return instance(originalRequest);
      }
    }
    // 리프레시 토큰 만료

    error.message = error.response?.data?.message?.[0] as string;
    return Promise.reject(error);
  }
  return Promise.reject(error);
};

instance.interceptors.response.use(callbackSucess, useCallbackError);

export const path = {
  user: {
    kakao: '/user/oauth/kakao/login',
    naver: '/user/oauth/naver/login',
    reissue: '/user/reissue',
    nickname: '/user/nickname',
    info: (userid: string) => `/user/profile/${userid}`,
    withdraw: '/user/withdraw',
  },
  riot: {
    account: '/riot/lol/account',
    register: '/riot/lol/account/register',
    refresh: '/riot/lol/account/refresh',
    user: (userId: string) => `/user/profile/${userId}`,
    match: (userId: string) => `/riot/lol/account/match/${userId}`,
    check: '/user/check/riot',
  },
  chatRoom: {
    create: '/chatroom/create',
    list: '/chatroom',
    previousChatting: '/chatroom/message/list',
    users: '/chatroom/users',
    images: '/chat/image/upload',
    usersInfo: '/chatroom/users/info',
    choicePostion: (roomId: string) => `/chatroom/${roomId}/position`,
    userCount: (roomId: string) => `/chatroom/check/${roomId}/enter`,
    myChat: '/chatroom/my',
  },
} as const;

export const hookKeys = {
  riot: {
    my: 'my-info',
    user: 'user-info',
    match: 'riot-match',
  },
  chat: {
    all: 'chattings',
    chatUser: 'chat-user-info',
    room: (roomId: string) => roomId,
    user: (roomId: string) => roomId + '-' + 'user',
    roomCount: 'check-room-count',
    my: 'chattings-my',
  },
  user: {
    info: 'user-info',
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
