import {View, StyleSheet, Button, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

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
      webClientId: getClientId(),
      offlineAccess: true,
    });
  }, []);

  const GoogleSingUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      console.log('Google Oauth Success: ', result);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Button
        title="Login Google"
        color={GoogleSigninButton.Color.Dark}
        onPress={GoogleSingUp}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: '800',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    rowGap: 10,
    justifyContent: 'center',
  },
});
