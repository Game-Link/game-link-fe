import {StyleSheet, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginButton} from '@src/components';
import {DEFAULT_STYLES, GOOGLE_CONFIGUER} from '@src/util';
import GoogleLogo from '@src/assets/google.png';
import {useFcmTokenStore} from '@src/store';
import {useGoogleOauthMutation} from '@src/api';
import * as Sentry from '@sentry/react-native';

const GoogleLogin = ({disabled = false}) => {
  const {token} = useFcmTokenStore();
  const mutation = useGoogleOauthMutation();

  useEffect(() => {
    GoogleSignin.configure(GOOGLE_CONFIGUER);
  }, []);

  const googleSignUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {data, type} = await GoogleSignin.signIn();
      if (type === 'success') {
        const googleInfo = {
          name: data?.user.name!,
          email: data?.user.email!,
          fcmToken: token,
        };
        mutation.mutate(googleInfo);
      } else {
        throw new Error('Google sign in failed');
      }
    } catch (error) {
      Alert.alert('Google 로그인에 실패했습니다.');
      console.error(error);
      Sentry.captureException(error);
    }
  };
  return (
    <LoginButton
      logo={GoogleLogo}
      title={'구글로 시작하기'}
      style={styles.button}
      onPress={googleSignUp}
      textStyle={styles.text}
      disabled={disabled}
    />
  );
};

export default GoogleLogin;

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
