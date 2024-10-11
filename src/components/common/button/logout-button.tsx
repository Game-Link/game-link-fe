import {Button} from 'react-native-paper';
import React from 'react';
import {Props} from '@components';
import {removeLocalStorage, useLoginStore} from '@src/store';
import {REFRESH_TOKEN, USER_ID} from '@src/util';

export default function LogoutButton({style}: Props) {
  const deleteAccessToken = useLoginStore().removeToken;

  const onLogout = async () => {
    await removeLocalStorage(REFRESH_TOKEN);
    await removeLocalStorage(USER_ID);
    deleteAccessToken();
  };

  return (
    <Button
      icon="logout"
      mode="outlined"
      style={[{flex: 1}, style]}
      textColor="gray"
      onPress={onLogout}>
      로그아웃
    </Button>
  );
}
