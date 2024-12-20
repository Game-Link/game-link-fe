/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Header,
  LoLAccount,
  MatchDetailInfo,
  NavigationStackHeaderLeftButton,
  Profile,
} from '@src/components';
import {HEADER_STYLES} from '@src/util';

import RiotImage from '@src/assets/riot-icon.png';
import {MyPageStackParamList} from '../navigation';

const Stack = createStackNavigator<MyPageStackParamList>();

export default function Mypage() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerMode: 'float',
        ...HEADER_STYLES,
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: '마이페이지',
          headerShown: false,
        }}
        initialParams={{type: 'MY_INFO'}}
      />
      <Stack.Screen
        name="LoLAccount"
        component={LoLAccount}
        options={() => ({
          headerTitle: () => <Header title="LoL 연동" image={RiotImage} />,
          headerLeft: () => <NavigationStackHeaderLeftButton />,
        })}
      />
      <Stack.Screen
        name="MyMatchDetailInfo"
        component={MatchDetailInfo}
        options={{
          headerTitle: () => <Header title="LoL 전적 정보" image={RiotImage} />,
          headerLeft: () => <NavigationStackHeaderLeftButton />,
        }}
      />
    </Stack.Navigator>
  );
}
