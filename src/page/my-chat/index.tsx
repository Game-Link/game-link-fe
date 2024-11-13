/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HEADER_STYLES} from '@src/util';
import {
  Chatting,
  DrawerButtonChatUser,
  Header,
  MyChat,
  NavigationStackHeaderLeftButton,
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
          headerLeft: () => <NavigationStackHeaderLeftButton />,
          headerRight: () => (
            <DrawerButtonChatUser
              roomId={route.params.roomId}
              roomName={route.params.roomName}
            />
          ),
          unmountOnBlur: true, // page 벗어날 경우 unmount
        })}
      />
    </Stack.Navigator>
  );
}
