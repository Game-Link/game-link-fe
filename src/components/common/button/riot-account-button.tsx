import {Button, ButtonProps} from 'react-native-paper';
import React from 'react';
import RiotImage from '@src/assets/riot-icon.png';
import {useLinkProps} from '@react-navigation/native';

export type Props = {
  style?: ButtonProps['style'];
  isLogin?: boolean | string;
};

export default function RiotAccountButton({style, isLogin = false}: Props) {
  const navigation = useLinkProps({
    to: {
      screen: 'LoLAccountStack',
      params: {method: isLogin ? 'patch' : 'post'},
    },
  });

  const handlePress = () => {
    navigation.onPress();
  };

  return (
    <Button
      icon={RiotImage}
      mode="contained"
      style={[{flex: 1}, style]}
      onPress={handlePress}>
      {isLogin ? '라이엇 계정 변경' : '라이엇 연동'}
    </Button>
  );
}