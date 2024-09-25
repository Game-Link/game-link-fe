import {Icon, Tooltip} from 'react-native-paper';
import React from 'react';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';

type Props = {
  icon: IconSource;
  title: string;
  description: string;
  style?: StyleProp<ViewStyle>;
};
export function TooltipBadge({icon, title, style, description}: Props) {
  return (
    <Tooltip title={description}>
      <View style={[styles.container, style]}>
        <Icon source={icon} color="white" size={24} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </Tooltip>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#8e7cc3',
    color: '#8e7cc3',
    marginRight: 4,
  },
  text: {
    fontSize: 10,
    color: 'white',
    marginLeft: 2,
  },
});
