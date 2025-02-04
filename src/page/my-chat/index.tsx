/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HEADER_STYLES} from '@src/util';
import {
  Chatting,
  ChatUserMatchDetail,
  DrawerButtonChatUser,
  DrawerProvider,
  Header,
  MyChat,
  NavigationStackHeaderLeftButton,
} from '@src/components';
import {ChatStackParamList} from '../navigation';
import ChatUserProfile from '@src/components/chat/chat-user-profile';

const Stack = createStackNavigator<ChatStackParamList>();

export default function MyChatPage() {
  return (
    <DrawerProvider>
      <Stack.Navigator
        initialRouteName="MyChat"
        screenOptions={{...HEADER_STYLES}}>
        <Stack.Screen
          name="MyChat"
          component={MyChat}
          options={{
            headerTitle: () => <Header title="나의 채팅" />,
          }}
        />

        <Stack.Screen
          name="Chatting"
          component={Chatting}
          options={({route, navigation}) => ({
            headerTitle: () => <Header title={route.params.roomName} />,
            headerLeft: () => (
              <NavigationStackHeaderLeftButton
                navigate={() => {
                  navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'MyChat',
                      },
                    ],
                  });
                }}
              />
            ),
            headerRight: () => (
              <DrawerButtonChatUser
                roomId={route.params.roomId}
                roomName={route.params.roomName}
              />
            ),
          })}
        />

        <Stack.Screen
          name="ChatUserProfile"
          component={ChatUserProfile}
          options={() => ({
            headerTitle: () => <Header title="유저 상세 정보" />,
            headerLeft: () => <NavigationStackHeaderLeftButton />,
          })}
          initialParams={{type: 'USER_INFO'}}
        />

        <Stack.Screen
          name="ChatUserMatchDetail"
          component={ChatUserMatchDetail}
          options={({route}) => ({
            headerTitle: () => (
              <Header title={`${route.params.nickname}의 전적`} />
            ),
            headerLeft: () => <NavigationStackHeaderLeftButton />,
          })}
        />
      </Stack.Navigator>
    </DrawerProvider>
  );
}
