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
        options={({route, navigation}) => ({
          headerTitle: () => <Header title="LoL 연동" />,
          headerLeft: () => (
            <NavigationStackHeaderLeftButton
              navigate={() => {
                if (route.params.back === 'mypage') {
                  navigation.navigate('MyPage', {
                    screen: 'Profile',
                    params: {type: 'MY_INFO'},
                  });
                }
                if (route.params.back === 'setting') {
                  navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'Setting',
                      },
                    ],
                  });
                }
              }}
            />
          ),
        })}
        initialParams={{method: 'post', back: 'mypage'}}
      />
      <Stack.Screen
        name="MyMatchDetailInfo"
        component={MatchDetailInfo}
        options={{
          headerTitle: () => <Header title="LoL 전적 정보" />,
          headerLeft: () => <NavigationStackHeaderLeftButton />,
        }}
      />
    </Stack.Navigator>
  );
}
