/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HEADER_STYLES} from '@src/util';
import {
  Chatting,
  Header,
  MyChat,
  NavigationStackHeaderLeftBuuton,
} from '@src/components';
import {ChatStackParamList} from '../navigation';

const Stack = createStackNavigator<ChatStackParamList>();

export default function MyChatPage() {
  return (
    <Stack.Navigator
      initialRouteName="MyChat"
      screenOptions={{...HEADER_STYLES}}>
      <Stack.Screen
        name="MyChat"
        component={MyChat}
        options={{
          headerTitle: 'MyChat',
        }}
      />

      <Stack.Screen
        name="Chatting"
        component={Chatting}
        options={({route}) => ({
          headerTitle: () => <Header title={route.params.roomName} />,
          headerLeft: () => <NavigationStackHeaderLeftBuuton />,
        })}
      />
    </Stack.Navigator>
  );
}
