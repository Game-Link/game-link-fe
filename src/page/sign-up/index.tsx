import React from 'react';
import {KakaoWebview} from '@src/components';
import {useLoginStore} from '@src/store';

export default function SignUp() {
  const saveToken = useLoginStore(state => state.saveToken);
  const onLogin = (token: string) => {
    saveToken(token);
  };
  return <KakaoWebview onLogin={onLogin} />;
}
