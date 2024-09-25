import {Pressable, PressableProps, StyleSheet, StyleProp} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

type Props = {
  title: string;
  style?: StyleProp<any>;
  backgroundColor?: string;
} & Omit<PressableProps, 'style'>;

export default function LoginButton({
  title,
  backgroundColor,
  style,
  ...props
}: Props) {
  return (
    <Pressable style={[styles.pressable, {backgroundColor}, style]} {...props}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: 300,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4a4a4a', // assuming "border-darkgray" refers to a dark gray color
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4a4a4a', // assuming "text-darkgray" refers to dark gray
    fontSize: 16,
    fontFamily: 'PretendardExtraBold', // assuming you're using a custom font
  },
});
