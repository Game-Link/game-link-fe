import React from 'react';
import {KakaoWebview, NaverLoginService} from '@src/components';
import {useKakaoOauthLoginMutation} from '@api';
import {StyleSheet, View} from 'react-native';

export default function SignUp() {
  const mutation = useKakaoOauthLoginMutation();
  const onKakaoLogin = async (token: string) => {
    mutation.mutate(token);
  };
  return (
    <View style={styles.container}>
      <NaverLoginService style={styles.gap} />
      <KakaoWebview onLogin={onKakaoLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gap: {marginBottom: 10},
});
