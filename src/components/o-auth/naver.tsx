import NaverLogin from '@react-native-seoul/naver-login';
import React, {type ReactElement, useEffect} from 'react';
import Config from 'react-native-config';
import {LoginButton} from '@src/components';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {useNaverOauthMutation} from '@src/api';
import {useFcmTokenStore} from '@src/store';
import NaverLogo from '@src/assets/naver.png';
import {DEFAULT_STYLES} from '@src/util';

const consumerKey = Config.NAVER_CLIENT_ID;
const consumerSecret = Config.NAVER_CLIENT_SECRET;
const appName = Config.NAVER_APP_NAME;

const serviceUrlScheme = 'gamelink';

const App = ({
  style,
  disabled = false,
}: {
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}): ReactElement => {
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
      logo={NaverLogo}
      title="네이버로 시작하기"
      backgroundColor="#03C75A"
      onPress={login}
      style={[style]}
      textStyle={styles.text}
      disabled={disabled}
    />
  );
};

export default App;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: DEFAULT_STYLES.fontSize.large,
  },
});
