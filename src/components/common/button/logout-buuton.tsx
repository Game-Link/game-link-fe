import {Button} from 'react-native-paper';
import React from 'react';
import {Props} from '@components';

export default function LogoutButton({style}: Props) {
  return (
    <Button
      icon="logout"
      mode="outlined"
      style={[{flex: 1}, style]}
      textColor="gray"
      onPress={() => console.log('Pressed')}>
      로그아웃
    </Button>
  );
}
