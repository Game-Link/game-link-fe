/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  LoLAccount,
  MyPage as MyPageComponent,
  NavigationStackHeaderLeftBuuton,
} from '@src/components';
import {HEADER_STYLES} from '@src/util';

export type MyPageStackParamList = {
  MyPageStack: undefined;
  LoLAccountStack: undefined;
};

const Stack = createStackNavigator<MyPageStackParamList>();

export default function Mypage() {
  return (
    <Stack.Navigator
      initialRouteName="MyPageStack"
      screenOptions={{
        headerMode: 'float',
        ...HEADER_STYLES,
      }}>
      <Stack.Screen
        name="MyPageStack"
        component={MyPageComponent}
        options={{
          headerTitle: '마이페이지',
        }}
      />
      <Stack.Screen
        name="LoLAccountStack"
        component={LoLAccount}
        options={{
          title: 'LOL 연동하기',
          headerLeft: props => <NavigationStackHeaderLeftBuuton {...props} />,
        }}
      />
    </Stack.Navigator>
  );
}
