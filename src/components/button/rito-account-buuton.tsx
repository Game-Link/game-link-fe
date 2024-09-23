import {Button, ButtonProps} from 'react-native-paper';
import React from 'react';
import RiotImage from '@src/assets/riot-icon.png';

export type Props = {
  style?: ButtonProps['style'];
  isLogin?: boolean | string;
};

export default function RiotAccountButton({style, isLogin = false}: Props) {
  return (
    <Button
      icon={RiotImage}
      mode="contained"
      style={[{flex: 1}, style]}
      onPress={() => console.log('Pressed')}>
      {isLogin ? '라이엇 계정 변경' : '라이엇 연동'}
    </Button>
  );
}
