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
    DEV_API_REMOTE_SERVER_URL: string;
    LOCALSTORAGE_NOTIFICATION_KEY: string;
    GOOGLE_CLIENT_ID_DEBUG_ANDROID: string;
    GOOGLE_CLIENT_ID_RELEASE_ANDROID: string;
    GOOGLE_CLIENT_ID_IOS: string;
    GOOGLE_WEB_CLIENT_ID: string;
    GOOGLE_WEB_CLIENT_PASSWORD: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
