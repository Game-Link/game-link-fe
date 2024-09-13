import axios from 'axios';
import Config from 'react-native-config';
import {Platform} from 'react-native';

export const instance = axios.create({
  baseURL: !__DEV__
    ? Config.PRODUCTION_API
    : Platform.OS === 'android'
    ? Config.DEV_API_ANDROID
    : Config.DEV_API_IOS,
});

export const path = {
  user: {
    kakao: '/user/oauth/kakao/login',
    reissue: 'user/reissue',
  },
} as const;
