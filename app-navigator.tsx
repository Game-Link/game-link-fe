/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import {NavigationContainer, Theme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Home, MyChat, MyPage, Setting, SignUp} from '@pages';
import {useLoginStore} from '@store';
export type TabList = {
  Home: undefined;
  MyChat: undefined;
  Setting: undefined;
  MyPage: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator<TabList>();

type Props = {
  theme: Theme;
};
export default function AppNavigator({theme}: Props) {
  const isLoggedIn = useLoginStore(state => state.isLoggedIn());
  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => {
              return <Icon name="home" size={26} color={color} />;
            },
          }}
        />

        {isLoggedIn && (
          <Tab.Screen
            name="MyChat"
            component={MyChat}
            options={{
              tabBarLabel: 'Chat',
              tabBarIcon: ({color}) => {
                return <Icon name="chat" size={26} color={color} />;
              },
            }}
          />
        )}
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarLabel: 'Setting',
            tabBarIcon: ({color}) => {
              return <Icon name="cog" size={26} color={color} />;
            },
          }}
        />
        {isLoggedIn && (
          <Tab.Screen
            name="MyPage"
            component={MyPage}
            options={{
              tabBarLabel: 'MyPage',
              tabBarIcon: ({color}) => {
                return <Icon name="account" size={26} color={color} />;
              },
            }}
          />
        )}
        {!isLoggedIn && (
          <Tab.Screen
            name="SignUp"
            component={SignUp}
            options={{
              tabBarLabel: 'Login',
              tabBarIcon: ({color}) => {
                return <Icon name="login" size={26} color={color} />;
              },
            }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
