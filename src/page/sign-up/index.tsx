import React, {forwardRef} from 'react';
import {
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
import {DEFAULT_STYLES} from '@src/util';
import {useBottomSheet} from '@src/hooks';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation';

type SignUpProps = StackNavigationProp<RootStackParamList, 'SignUp'>;
export default function SignUp({navigate}: SignUpProps) {
  const mutation = useKakaoOauthLoginMutation();

  const onKakaoLogin = async (token: string) => {
    mutation.mutate(token);
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
        onPress={handlePresentModalPress}
      />

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
          <NaverLoginService style={styles.gap} />
          {/* <KakaoWebview onLogin={onKakaoLogin} /> */}
          <GoogleLoginService />
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
});
