import React, {useState} from 'react';
import {StyleSheet, Dimensions, StyleProp, ViewStyle} from 'react-native';
import {WebView, WebViewNavigation} from 'react-native-webview';
import Config from 'react-native-config';
import {LoginButton} from '@src/components';

// 상단에 적어 탈취하여 웹뷰에 값을 가져오기

const KAKAO_LOGIN_REST_API_KEY = Config.KAKAO_LOGIN_REST_API_KEY;
const KAKAO_LOGIN_REDIRECT_URI = Config.KAKAO_LOGIN_REDIRECT_URI;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface LoginProps {
  onLogin: (token: string) => void; // onLogin의 타입을 명시
  style?: StyleProp<ViewStyle>;
}

function Login({onLogin, style}: LoginProps) {
  const [showWebView, setShowWebView] = useState(false);

  const handleLogin = () => {
    setShowWebView(true);
  };

  const handleShouldStartLoad = (event: WebViewNavigation) => {
    console.log('hi');
    const url = event.url;
    const exp = 'code=';
    const searchIdx = url.indexOf(exp);
    if (searchIdx !== -1) {
      const code = url.substring(searchIdx + exp.length);
      onLogin(code); // 로그인 성공 시
      return false;
    }
    return true;
  };

  if (showWebView) {
    return (
      <WebView
        className={styles.webview}
        // 웹뷰 보여줄 페이지 주소
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_LOGIN_REST_API_KEY}&redirect_uri=${KAKAO_LOGIN_REDIRECT_URI}`,
        }}
        onShouldStartLoadWithRequest={handleShouldStartLoad}
      />
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
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});

export default Login;
