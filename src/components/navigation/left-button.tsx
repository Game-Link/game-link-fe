import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';

type HeaderLeftProps = Parameters<
  NonNullable<StackNavigationOptions['headerLeft']>
>[0];

export default function LeftButton(props: HeaderLeftProps) {
  return (
    <Pressable {...props}>
      <Icon name="chevron-left" size={30} color={'black'} />
    </Pressable>
  );
}
