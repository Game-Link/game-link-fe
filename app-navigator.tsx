import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, MyChat, MyPage, Setting, SignUp} from '@pages';
import React from 'react';

export type TabList = {
  Home: undefined;
  MyChat: undefined;
  Setting: undefined;
  MyPage: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator<TabList>();

export default function AppNavigator() {
  const isLoggedIn = false;
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
          }}
        />
        {isLoggedIn && (
          <Tab.Screen
            name="MyChat"
            component={MyChat}
            options={{
              headerShown: false,
            }}
          />
        )}
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            title: 'setting',
          }}
        />
        {isLoggedIn && (
          <Tab.Screen
            name="MyPage"
            component={MyPage}
            options={{
              title: 'Mypage',
            }}
          />
        )}
        <Tab.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: 'SignUp',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}