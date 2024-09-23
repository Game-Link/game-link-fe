import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

type Props = {
  text: string;
} & TextProps;

export default function Span({text, style, ...props}: Props) {
  return (
    <Text style={[styles.text, style]} {...props}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: 400,
  },
});
