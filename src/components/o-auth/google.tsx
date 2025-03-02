import {StyleSheet, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import {LoginButton} from '@src/components';
import {DEFAULT_STYLES} from '@src/util';
import GoogleLogo from '@src/assets/google.png';

const getClientId = () => {
  if (Platform.OS === 'ios') {
    return Config.GOOGLE_CLIENT_ID_IOS;
  } else {
    if (__DEV__) {
      return Config.GOOGLE_CLIENT_ID_DEBUG_ANDROID;
    }
    return Config.GOOGLE_CLIENT_ID_RELEASE_ANDROID;
  }
};

const LoginScreen = () => {
  console.log('GOOGLE CLIENT ID : ', getClientId());
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.GOOGLE_WEB_CLIENT_ID,
      iosClientId: Config.GOOGLE_CLIENT_ID_IOS,
      offlineAccess: true,
    });
  }, []);

  const googleSignUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      console.log('Google Oauth Success: ', result);
      console.log('Google Oauth Success Type: ', result.type);

      const userInfo = await GoogleSignin.getCurrentUser();
      console.log('Google Oauth Success User Info: ', userInfo);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <LoginButton
      logo={GoogleLogo}
      title={'구글로 시작하기'}
      style={styles.button}
      onPress={googleSignUp}
      textStyle={styles.text}
    />
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    marginTop: 8,
  },
  text: {
    fontSize: DEFAULT_STYLES.fontSize.large,
    fontWeight: 'bold',
    color: DEFAULT_STYLES.color.black,
    textAlign: 'center',
  },
});
