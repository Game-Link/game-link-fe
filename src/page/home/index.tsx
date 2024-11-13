import {createStackNavigator} from '@react-navigation/stack';
import {ChatUserList, Main} from '@src/components';
import {HEADER_STYLES} from '@src/util';
import React from 'react';
import {HomeStackParamList} from '../navigation';

const Stack = createStackNavigator<HomeStackParamList>();

export default function Home() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{...HEADER_STYLES}}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerTitle: 'Game-Link Home',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen name="ChatUserList" component={ChatUserList} />
    </Stack.Navigator>
  );
}

/**
 * 채팅 목록 가지고 오기 - O
 * 채팅 정보 modal로 보여주기
 * 유저를 클릭하면 유저 상세정보 stack으로 이동
 * 채팅 리스트 보여주기
 * 채팅 옵션 설정하기
 */
