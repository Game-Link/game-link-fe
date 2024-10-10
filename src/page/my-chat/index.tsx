import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HEADER_STYLES} from '@src/util';
import {Chatting, MyChat} from '@src/components';

export type ChatStackParamList = {
  MyChat: undefined;
  Chatting: {roomId: string};
};

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
        options={{
          headerTitle: 'Chatting',
        }}
      />
    </Stack.Navigator>
  );
}
