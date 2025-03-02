import React, {useState} from 'react';
import {StyleSheet, Dimensions, StyleProp, ViewStyle, View} from 'react-native';
import {WebView, WebViewNavigation} from 'react-native-webview';
import Config from 'react-native-config';
import {LoginButton} from '@src/components';
import {IconButton} from 'react-native-paper';
import {DEFAULT_STYLES} from '@src/util';
import KakaoLogo from '@src/assets/kakao.png';

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

  const onClose = () => {
    setShowWebView(false);
  };

  if (showWebView) {
    return (
      <View style={styles.webview}>
        <IconButton icon="close" onPress={onClose} size={36} />
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
      logo={KakaoLogo}
      title="카카오로 시작하기"
      backgroundColor="#FFE812"
      style={style}
      textStyle={styles.text}
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
  closeButton: {
    position: 'absolute',
    top: 40, // 필요한 경우 조정
    left: 20, // 필요한 경우 조정
    zIndex: 1000, // WebView보다 위에 위치하게 설정
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: DEFAULT_STYLES.fontSize.large,
    fontWeight: 'bold',
    color: DEFAULT_STYLES.color.black,
    textAlign: 'center',
  },
});

export default Login;
