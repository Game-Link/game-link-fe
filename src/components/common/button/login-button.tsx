import {
  Pressable,
  PressableProps,
  StyleSheet,
  StyleProp,
  TextStyle,
  Image,
} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import {DEFAULT_STYLES} from '@src/util';

type Props = {
  title: string;
  style?: StyleProp<any>;
  backgroundColor?: string;
  logo?: any;
  textStyle?: StyleProp<TextStyle>;
} & Omit<PressableProps, 'style'>;

export default function LoginButton({
  title,
  backgroundColor,
  style,
  textStyle,
  logo,
  disabled,
  ...props
}: Props) {
  return (
    <Pressable
      disabled={disabled}
      style={({pressed}) => [
        styles.pressable,
        {backgroundColor},
        pressed && !disabled ? {opacity: 0.7} : null,
        style,
      ]}
      {...props}>
      {logo && (
        <Image
          source={logo}
          style={[
            styles.logo,
            disabled && styles.disabledOpacity, // 예: disabled 상태일 때 로고의 불투명도 감소
          ]}
        />
      )}
      <Text
        style={[
          styles.text,
          textStyle,
          disabled && styles.disabledColor, // 비활성 상태에 맞게 텍스트 색상 변경
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: 320,
    paddingVertical: 16,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4a4a4a', // assuming "text-darkgray" refers to dark gray
    fontSize: 16,
    fontFamily: 'PretendardExtraBold', // assuming you're using a custom font
  },
  logo: {
    width: DEFAULT_STYLES.width['8'],
    height: DEFAULT_STYLES.width['8'],
    marginRight: DEFAULT_STYLES.size['8'],
  },
  disabledOpacity: {
    opacity: 0.5, // assuming you want to make the logo slightly transparent in disabled state
  },
  disabledColor: {
    color: '#d6cece',
  },
});
