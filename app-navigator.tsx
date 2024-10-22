/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect} from 'react';

import {NavigationContainer, Theme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Home,
  MyChat,
  MyPage,
  RootStackParamList,
  Setting,
  SignUp,
} from '@pages';
import {useLoginStore} from '@store';
import {useReissueMutation} from '@api';
import {CreateChat} from '@src/components';

const Tab = createBottomTabNavigator<RootStackParamList>();

type Props = {
  theme: Theme;
};
export default function AppNavigator({theme}: Props) {
  const isLoggedIn = useLoginStore().isLoggedIn();
  const mutation = useReissueMutation();

  useEffect(() => {
    if (!isLoggedIn) {
      mutation.mutate();
    }
  }, []);
  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false, tabBarShowLabel: false}}>
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
            name="Chat"
            component={MyChat}
            options={{
              tabBarLabel: 'Chat',
              tabBarIcon: ({color}) => {
                return <Icon name="chat" size={26} color={color} />;
              },
            }}
          />
        )}

        {isLoggedIn && (
          <Tab.Screen
            name="PostChat"
            component={MyChat}
            options={{
              tabBarIcon: () => (
                <Icon name="chat-plus" size={30} color={'white'} />
              ),
              tabBarButton: props => <CreateChat {...props} />,
              tabBarShowLabel: false,
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
