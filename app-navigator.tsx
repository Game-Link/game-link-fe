/* eslint-disable react/no-unstable-nested-components */
import React, {PropsWithChildren, Suspense, useEffect} from 'react';

import {
  LinkingOptions,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Home,
  Introduce,
  MyChat,
  MyPage,
  RootBottomTapParamList,
  RootStackParamList,
  Setting,
  SignUp,
} from '@pages';
import {getLocalStorage, useFirstVisitStore, useLoginStore} from '@store';
import {useCheckRiotQuery, useReissueMutation} from '@api';
import {CreateChat, GlobalModal, Header} from '@src/components';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Alert,
  GestureResponderEvent,
} from 'react-native';
import {HEADER_STYLES, REFRESH_TOKEN, TabBarStyle} from '@src/util';
import {usePermission} from '@src/hooks';
import {createStackNavigator} from '@react-navigation/stack';
import CustomErrorBoundary from './error-provider';
import SplashScreen from 'react-native-splash-screen';

function CreateChatButton({
  children,
  style,
  onPress,
  ...props
}: BottomTabBarButtonProps) {
  const {
    data: {result},
  } = useCheckRiotQuery();
  const navigateChatCreate = (e: GestureResponderEvent) => {
    if (!result) {
      Alert.alert('롤 계정 연동을 먼저 해주세요!', '', [{text: '확인'}]);
      return;
    }
    if (onPress) {
      onPress(e);
    }
  };
  return (
    <>
      <TouchableOpacity
        style={[style, chatButtonStyles.button]}
        onPress={navigateChatCreate}
        {...props}>
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
      <Icon name={icon} size={24} color={color} />
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

// DEEP LINKING OPTIONS
export const linking: LinkingOptions<RootBottomTapParamList> = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    initialRouteName: 'Home',
    screens: {
      Chat: {
        initialRouteName: 'MyChat',
        screens: {
          Chatting: {
            path: 'chat/:roomId/:roomName', // 각 경로에 대해 `path` 속성을 명확히 지정
          },
        },
      },
      Home: {
        path: 'home',
      },
      Setting: {
        path: 'setting',
      },
      PostChat: {
        path: 'post-chat',
      },
      MyPage: {
        screens: {
          Profile: {
            path: 'profile/:userId?/:type?', // 선택적 매개변수는 `?`로 표시
          },
        },
      },
    },
  },
};
const Tab = createBottomTabNavigator<RootBottomTapParamList>();
const Stack = createStackNavigator<RootStackParamList>();

type Props = {
  theme: Theme;
};
export default function AppNavigator({theme}: Props) {
  const {isLoggedIn} = useLoginStore();
  const mutation = useReissueMutation();
  const {visited} = useFirstVisitStore();
  usePermission();

  useEffect(() => {
    async function reissue() {
      const refreshToken = await getLocalStorage(REFRESH_TOKEN);
      if (refreshToken) {
        mutation.mutate();
      } else {
        SplashScreen.hide();
      }
    }
    reissue();
  }, []);

  return (
    <NavigationContainer theme={theme} linking={linking}>
      {isLoggedIn() ? (
        <CustomErrorBoundary>
          <Tab.Navigator
            initialRouteName="Home"
            backBehavior="initialRoute"
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarStyle: TabBarStyle,
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
                unmountOnBlur: true,
              }}
              listeners={({navigation}) => {
                return {
                  tabPress: e => {
                    e.preventDefault(); // 기본 탭 동작 방지
                    navigation.navigate('Home', {
                      screen: 'Main',
                    });
                  },
                };
              }}
            />

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
                unmountOnBlur: true,
              }}
              listeners={({navigation}) => {
                return {
                  tabPress: e => {
                    e.preventDefault(); // 기본 탭 동작 방지
                    navigation.navigate('Chat', {
                      screen: 'MyChat',
                    });
                  },
                };
              }}
            />

            <Tab.Screen
              name="PostChat"
              component={CreateChat}
              options={{
                headerShown: true,
                headerTitle: () => <Header title="채팅 생성" />,

                tabBarIcon: () => (
                  <Icon name="chat-plus" size={30} color={'white'} />
                ),
                tabBarButton: props => (
                  <Suspense>
                    <CreateChatButton {...props} />
                  </Suspense>
                ),
                tabBarShowLabel: false,
                unmountOnBlur: true,
              }}
            />

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
          </Tab.Navigator>
        </CustomErrorBoundary>
      ) : (
        <Stack.Navigator
          initialRouteName={visited ? 'SignUp' : 'Introduce'}
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Introduce" component={Introduce} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
      <GlobalModal />
    </NavigationContainer>
  );
}
