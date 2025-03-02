import React from 'react';
import {
  GoogleLoginService,
  KakaoWebview,
  NaverLoginService,
} from '@src/components';
import {useKakaoOauthLoginMutation} from '@api';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Logo from '@src/assets/appstore.png';

export default function SignUp() {
  const mutation = useKakaoOauthLoginMutation();

  const onKakaoLogin = async (token: string) => {
    mutation.mutate(token);
  };

  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={styles.image}
        accessibilityLabel="Game Link Logo"
      />
      <Text style={styles.title}>GameLink</Text>
      <NaverLoginService style={styles.gap} />
      {/* <KakaoWebview onLogin={onKakaoLogin} /> */}
      <GoogleLoginService />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: responsiveScreenWidth(60),
    height: responsiveScreenWidth(60),
    resizeMode: 'contain',
    borderRadius: 12,
  },
  title: {
    fontSize: responsiveScreenFontSize(4),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  gap: {
    marginBottom: 8,
  },
});
