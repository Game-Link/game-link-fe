import React from 'react';
import {KakaoWebview, NaverLoginService} from '@src/components';
import {useKakaoOauthLoginMutation} from '@api';

export default function SignUp() {
  const mutation = useKakaoOauthLoginMutation();
  const onKakaoLogin = async (token: string) => {
    mutation.mutate(token);
  };
  return (
    <>
      <NaverLoginService />
      <KakaoWebview onLogin={onKakaoLogin} />
    </>
  );
}
