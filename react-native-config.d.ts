declare module 'react-native-config' {
  export interface NativeConfig {
    KAKAO_LOGIN_REST_API_KEY: string;
    KAKAO_LOGIN_REDIRECT_URI: string;
    DEV_API_IOS: string;
    DEV_API_ANDROID: string;
    PRODUCTION_API: string;
    PRODUCTION_STOMP_URL: string;
    NAVER_CLIENT_ID: string;
    NAVER_CLIENT_SECRET: string;
    NAVER_APP_NAME: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
