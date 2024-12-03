import {Button} from 'react-native-paper';
import React from 'react';
import {Props} from '@components';
import {removeLocalStorage, useLoginStore} from '@src/store';
import {REFRESH_TOKEN, USER_ID} from '@src/util';
import {useQueryClient} from '@tanstack/react-query';

export default function LogoutButton({style}: Props) {
  const {removeToken} = useLoginStore();
  const queryClient = useQueryClient();

  const onLogout = async () => {
    queryClient.clear();
    await removeLocalStorage(REFRESH_TOKEN);
    await removeLocalStorage(USER_ID);
    removeToken();
  };

  return (
    <Button
      icon="logout"
      mode="outlined"
      style={[style]}
      textColor="gray"
      onPress={onLogout}>
      로그아웃
    </Button>
  );
}
