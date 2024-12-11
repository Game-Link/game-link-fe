import React from 'react';
import {KakaoWebview, NaverLoginService} from '@src/components';
import {useKakaoOauthLoginMutation} from '@api';
import {StyleSheet, Text, View} from 'react-native';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';

export default function SignUp() {
  const mutation = useKakaoOauthLoginMutation();

  const onKakaoLogin = async (token: string) => {
    mutation.mutate(token);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GameLink</Text>
      <NaverLoginService style={styles.gap} />
      <KakaoWebview onLogin={onKakaoLogin} />
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
