import NaverLogin from '@react-native-seoul/naver-login';
import React, {type ReactElement, useEffect} from 'react';
import Config from 'react-native-config';
import {LoginButton} from '@src/components';
import {StyleProp, ViewStyle} from 'react-native';
import {useNaverOauthMutation} from '@src/api';
import {useFcmTokenStore} from '@src/store';

const consumerKey = Config.NAVER_CLIENT_ID;
const consumerSecret = Config.NAVER_CLIENT_SECRET;
const appName = Config.NAVER_APP_NAME;

const serviceUrlScheme = 'gamelink';

const App = ({style}: {style?: StyleProp<ViewStyle>}): ReactElement => {
  const mutation = useNaverOauthMutation();
  const fcmToken = useFcmTokenStore().token;

  useEffect(() => {
    NaverLogin.initialize({
      appName,
      consumerKey,
      consumerSecret,
      serviceUrlSchemeIOS: serviceUrlScheme,
      disableNaverAppAuthIOS: true,
    });
  }, []);

  const login = async () => {
    const data = await NaverLogin.login();

    await mutation.mutateAsync({...data, fcmToken});
  };

  return (
    <LoginButton
      title="네이버로 시작하기"
      backgroundColor="#2DB400"
      onPress={login}
      style={style}
    />
  );
};

export default App;
