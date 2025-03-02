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
  ...props
}: Props) {
  return (
    <Pressable style={[styles.pressable, {backgroundColor}, style]} {...props}>
      {logo && <Image source={logo} style={styles.logo} />}
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: 280,
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
});
