import {Icon, Tooltip} from 'react-native-paper';
import React from 'react';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {DEFAULT_STYLES} from '@src/util';

type Props = {
  icon?: IconSource;
  title: string;
  description: string;
  style?: StyleProp<ViewStyle>;
};
export function TooltipBadge({icon, title, style, description}: Props) {
  return (
    <Tooltip title={description}>
      <View style={[styles.container, style]}>
        {icon && <Icon source={icon} color="white" size={16} />}
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
    padding: DEFAULT_STYLES.size['4'],
    borderRadius: DEFAULT_STYLES.size['4'],
    backgroundColor: DEFAULT_STYLES.color.main,
    color: DEFAULT_STYLES.color.main,
    marginRight: DEFAULT_STYLES.size['4'],
  },
  text: {
    fontSize: DEFAULT_STYLES.fontSize.medium,
    color: DEFAULT_STYLES.color.white,
    fontWeight: '600',
    marginLeft: 2,
  },
});
