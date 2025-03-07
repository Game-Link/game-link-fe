import {StyleSheet, Platform, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import {LoginButton} from '@src/components';
import {DEFAULT_STYLES} from '@src/util';
import GoogleLogo from '@src/assets/google.png';
import {useFcmTokenStore} from '@src/store';
import {useGoogleOauthMutation} from '@src/api';

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

const GoogleLogin = ({disabled = false}) => {
  const {token} = useFcmTokenStore();
  const mutation = useGoogleOauthMutation();

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
