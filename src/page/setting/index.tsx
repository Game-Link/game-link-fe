/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationStackHeaderLeftButton,
  ProfileSetting,
  TeamInfoSetting,
  TermOfUseSetting,
} from '@src/components';
import {HEADER_STYLES} from '@src/util';

import {SettingStackParamList} from '../navigation';
import {DefaultSetting} from '@src/components';

const Stack = createStackNavigator<SettingStackParamList>();

export default function Setting() {
  return (
    <Stack.Navigator
      initialRouteName="defaultSetting"
      screenOptions={{
        headerMode: 'float',
        ...HEADER_STYLES,
      }}>
      <Stack.Screen
        name="defaultSetting"
        component={DefaultSetting}
        options={{
          headerTitle: '설정',
        }}
      />
      <Stack.Screen
        name="profileSetting"
        component={ProfileSetting}
        options={{
          headerTitle: '닉네임 변경',
          headerLeft: () => <NavigationStackHeaderLeftButton />,
        }}
      />
      <Stack.Screen
        name="teamInfoSetting"
        component={TeamInfoSetting}
        options={{
          headerTitle: '팀 소개',
          headerLeft: () => <NavigationStackHeaderLeftButton />,
        }}
      />
      <Stack.Screen
        name="termOfUseSetting"
        component={TermOfUseSetting}
        options={{
          headerTitle: '서비스 이용 약관',
          headerLeft: () => <NavigationStackHeaderLeftButton />,
        }}
      />
    </Stack.Navigator>
  );
}
