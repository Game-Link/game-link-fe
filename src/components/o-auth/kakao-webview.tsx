import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';
import {WebView, WebViewNavigation} from 'react-native-webview';
import Config from 'react-native-config';

// 상단에 적어 탈취하여 웹뷰에 값을 가져오기

const KAKAO_LOGIN_REST_API_KEY = Config.KAKAO_LOGIN_REST_API_KEY;
const KAKAO_LOGIN_REDIRECT_URI = Config.KAKAO_LOGIN_REDIRECT_URI;

console.log(KAKAO_LOGIN_REDIRECT_URI, KAKAO_LOGIN_REST_API_KEY);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface LoginProps {
  onLogin: (token: string) => void; // onLogin의 타입을 명시
}

function Login({onLogin}: LoginProps) {
  const [showWebView, setShowWebView] = useState(false);

  const handleLogin = () => {
    setShowWebView(true);
  };

  const handleShouldStartLoad = (event: WebViewNavigation) => {
    console.log('hi');
    const url = event.url;
    // url에 붙어오는 code= 가있다면 뒤부터 parse하여 인가 코드 get
    const exp = 'code=';
    const searchIdx = url.indexOf(exp);
    if (searchIdx !== -1) {
      const code = url.substring(searchIdx + exp.length);
      console.log('인가 코드', code);
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
    <View style={styles.container}>
      <Pressable onPress={handleLogin} style={styles.pressable}>
        <Text style={styles.text}>카카오로 시작하기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  pressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    paddingVertical: 16,
    backgroundColor: '#FFE812', // assuming "bg-buy" refers to Kakao yellow
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#4a4a4a', // assuming "border-darkgray" refers to a dark gray color
  },
  image: {
    height: 32,
    width: 36,
    marginRight: 24,
  },
  text: {
    textAlign: 'center',
    color: '#4a4a4a', // assuming "text-darkgray" refers to dark gray
    fontSize: 16,
    fontFamily: 'PretendardExtraBold', // assuming you're using a custom font
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});

export default Login;
