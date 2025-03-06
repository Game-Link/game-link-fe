/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationStackHeaderLeftButton,
  ProfileSetting,
  TeamInfoSetting,
} from '@src/components';
import {HEADER_STYLES} from '@src/util';

import {SettingStackParamList} from '../navigation';
import {DefaultSetting} from '@src/components';
import {PrivacyPolicySettingPage, TermOfUseSettingPage} from '@pages';

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
        name="privacyDetailSetting"
        component={PrivacyPolicySettingPage}
        options={{
          headerTitle: '',
          headerLeft: () => <NavigationStackHeaderLeftButton />,
        }}
      />
      <Stack.Screen
        name="termOfUseDetailSetting"
        component={TermOfUseSettingPage}
        options={{
          headerTitle: '',
          headerLeft: () => <NavigationStackHeaderLeftButton />,
        }}
      />
    </Stack.Navigator>
  );
}
