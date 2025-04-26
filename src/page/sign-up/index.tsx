import React, {forwardRef} from 'react';
import {
  AppleLoginService,
  BottomSheetComponent,
  GoogleLoginService,
  KakaoWebview,
  LoginButton,
  NaverLoginService,
} from '@src/components';
import {useKakaoOauthLoginMutation} from '@api';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import Logo from '@src/assets/appstore.png';
import {DEFAULT_STYLES, sendEmail} from '@src/util';
import {useBottomSheet} from '@src/hooks';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation';
import {TouchableWithoutFeedback} from 'react-native';

type SignUpProps = StackScreenProps<RootStackParamList, 'SignUp'>;
export default function SignUp({navigation}: SignUpProps) {
  const mutation = useKakaoOauthLoginMutation();

  const onKakaoLogin = async (token: string) => {
    mutation.mutate(token);
  };

  const navigateSignUpDetaul = () => {
    navigation.navigate('SignUpDetail');
  };

  const {bottomSheetRef, handleSheetChanges, handlePresentModalPress} =
    useBottomSheet();

  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={styles.image}
        accessibilityLabel="Game Link Logo"
      />
      <Text style={styles.title}>GameLink</Text>
      <LoginButton
        title="GameLink 시작하기"
        backgroundColor={DEFAULT_STYLES.color.main}
        style={[styles.gap]}
        textStyle={styles.loginTtext}
        onPress={handlePresentModalPress}
      />
      <LoginButton
        title="GameLink 회원가입"
        backgroundColor={DEFAULT_STYLES.color.lime}
        style={[styles.gap]}
        textStyle={styles.signUpText}
        onPress={navigateSignUpDetaul}
      />
      <Text>
        오류가 발생하셨나요?&nbsp;
        <TouchableWithoutFeedback
          onPress={async () => {
            await sendEmail();
          }}>
          <Text style={styles.underline}>문의 하기</Text>
        </TouchableWithoutFeedback>
      </Text>

      <BottomSheetLogin
        ref={bottomSheetRef}
        handleSheetChanges={handleSheetChanges}
      />
    </View>
  );
}

type BottomSheetLoginProps = {
  handleSheetChanges: (index: number) => void;
  points?: number;
};

const BottomSheetLogin = forwardRef<BottomSheetModal, BottomSheetLoginProps>(
  ({handleSheetChanges, points = 40}, ref) => {
    return (
      <BottomSheetComponent
        ref={ref}
        points={points}
        handleSheetChanges={handleSheetChanges}>
        <View style={bottomSheetStyles.container}>
          <Text style={bottomSheetStyles.title}>GameLink 로그인</Text>
          <NaverLoginService style={styles.gap} />
          {/* <KakaoWebview onLogin={onKakaoLogin} /> */}
          <GoogleLoginService />
          <AppleLoginService />
        </View>
      </BottomSheetComponent>
    );
  },
);

const bottomSheetStyles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: DEFAULT_STYLES.fontSize.extraExtraLarge,
    color: DEFAULT_STYLES.color.black,
    fontWeight: 'bold',
    marginBottom: DEFAULT_STYLES.size['12'],
  },
});

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
  loginTtext: {
    color: DEFAULT_STYLES.color.white,
    fontWeight: 'bold',
    fontSize: DEFAULT_STYLES.fontSize.large,
  },
  signUpText: {
    color: DEFAULT_STYLES.color.black,
    fontWeight: 'bold',
    fontSize: DEFAULT_STYLES.fontSize.large,
  },
  button: {
    borderWidth: 1,
  },
  underline: {
    textDecorationLine: 'underline',
    color: DEFAULT_STYLES.color.main,
  },
});
