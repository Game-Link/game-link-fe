import React from 'react';
import {KakaoWebview} from '@src/components';
import {useKakaoOauthLoginMutation} from '@api';

export default function SignUp() {
  const mutation = useKakaoOauthLoginMutation();
  const onKakaoLogin = async (token: string) => {
    mutation.mutate(token);
  };
  return <KakaoWebview onLogin={onKakaoLogin} />;
}
