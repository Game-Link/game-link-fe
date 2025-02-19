import {StyleSheet, Text, TextStyle, TouchableOpacity} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {StyleProp} from 'react-native';

import {Icon} from 'react-native-paper';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

type Props = PropsWithChildren<{
  iconName: IconSource;
  onPress: () => void;
  textStyle?: StyleProp<TextStyle>;
  iconSize?: number;
  children: string;
}>;
export default function ListButton({
  iconName,
  onPress,
  children,
  textStyle,
  iconSize = 24,
}: Props) {
  return (
    <TouchableOpacity style={[styles.rowContainer]} onPress={onPress}>
      <Icon source={iconName} size={iconSize} />
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 8,
    gap: 4,
  },
  text: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});
