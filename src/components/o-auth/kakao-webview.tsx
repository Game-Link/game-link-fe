import React, {useState} from 'react';
import {StyleSheet, Dimensions, StyleProp, ViewStyle, View} from 'react-native';
import {WebView, WebViewNavigation} from 'react-native-webview';
import Config from 'react-native-config';
import {LoginButton} from '@src/components';

const KAKAO_LOGIN_REST_API_KEY = Config.KAKAO_LOGIN_REST_API_KEY;
const KAKAO_LOGIN_REDIRECT_URI = Config.KAKAO_LOGIN_REDIRECT_URI;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface LoginProps {
  onLogin: (token: string) => void;
  style?: StyleProp<ViewStyle>;
}

function Login({onLogin, style}: LoginProps) {
  const [showWebView, setShowWebView] = useState(false);

  const handleLogin = () => {
    setShowWebView(true);
  };

  const handleShouldStartLoad = (event: WebViewNavigation) => {
    const url = event.url;
    const exp = 'code=';
    const searchIdx = url.indexOf(exp);
    if (searchIdx !== -1) {
      const code = url.substring(searchIdx + exp.length);
      onLogin(code);
      return false;
    }
    return true;
  };

  if (showWebView) {
    return (
      <View style={styles.webview}>
        <WebView
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_LOGIN_REST_API_KEY}&redirect_uri=${KAKAO_LOGIN_REDIRECT_URI}`,
          }}
          onShouldStartLoadWithRequest={handleShouldStartLoad}
        />
      </View>
    );
  }

  return (
    <LoginButton
      title="카카오로 시작하기"
      backgroundColor="#FFE812"
      style={style}
      onPress={handleLogin}
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
    zIndex: 999, // 다른 요소들 위에 위치하게 설정
  },
});

export default Login;
