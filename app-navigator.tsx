/* eslint-disable react/no-unstable-nested-components */
import React, {PropsWithChildren, useEffect} from 'react';

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
import {CreateChat, Header} from '@src/components';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewProps,
  Text,
} from 'react-native';
import {HEADER_STYLES} from '@src/util';
import {usePermission} from '@src/hooks';

type CreateChatButtonProp = PropsWithChildren<ViewProps>;
function CreateChatButton({children, style, ...props}: CreateChatButtonProp) {
  return (
    <>
      <TouchableOpacity style={[style, chatButtonStyles.button]} {...props}>
        <View style={chatButtonStyles.buttonView}>{children}</View>
      </TouchableOpacity>
    </>
  );
}

const chatButtonStyles = StyleSheet.create({
  button: {
    top: -25,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#8e7cc3',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type TabIconProps = PropsWithChildren<{icon: string; color: string}>;
const TabIcon = ({children, icon, color}: TabIconProps) => {
  return (
    <View style={tabIconStyle.container}>
      <Icon name={icon} size={26} color={color} />
      <Text style={[{color: color}, tabIconStyle.text]}>{children}</Text>
    </View>
  );
};

const tabIconStyle = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontSize: 14, fontWeight: 'bold'},
});

const Tab = createBottomTabNavigator<RootStackParamList>();

type Props = {
  theme: Theme;
};
export default function AppNavigator({theme}: Props) {
  const isLoggedIn = useLoginStore().isLoggedIn();
  const mutation = useReissueMutation();
  usePermission();

  useEffect(() => {
    if (!isLoggedIn) {
      mutation.mutate();
    }
  }, []);
  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'white',
            borderWidth: 0,
            borderRadius: 15,
            position: 'absolute',
            bottom: 10,
            left: 10,
            right: 10,
            elevation: 0,
            height: 60,
            borderTopWidth: 0,
            borderColor: 'transparent',
          },
          ...HEADER_STYLES,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => {
              return (
                <TabIcon icon="home" color={color}>
                  홈
                </TabIcon>
              );
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
                return (
                  <TabIcon icon="chat" color={color}>
                    채팅
                  </TabIcon>
                );
              },
            }}
          />
        )}

        {isLoggedIn && (
          <Tab.Screen
            name="PostChat"
            component={CreateChat}
            options={{
              headerShown: true,
              headerTitle: () => <Header title="채팅 생성" />,

              tabBarIcon: () => (
                <Icon name="chat-plus" size={30} color={'white'} />
              ),
              tabBarButton: props => <CreateChatButton {...props} />,
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
              return (
                <TabIcon icon="cog" color={color}>
                  설정
                </TabIcon>
              );
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
                return (
                  <TabIcon icon="account" color={color}>
                    마이페이지
                  </TabIcon>
                );
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
                return (
                  <TabIcon icon="login" color={color}>
                    로그인
                  </TabIcon>
                );
              },
            }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
