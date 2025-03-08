/* eslint-disable react/no-unstable-nested-components */
import React, {PropsWithChildren, Suspense, useEffect, useRef} from 'react';
import {
  LinkingOptions,
  NavigationContainer,
  Theme,
  useNavigationContainerRef,
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
  PrivacyPolicyRootPage,
  RootBottomTapParamList,
  RootStackParamList,
  Setting,
  SignUp,
  SignUpDetail,
  TermOfUseRootPage,
} from '@pages';
import {
  getLocalStorage,
  saveLocalStorage,
  useFirstVisitStore,
  useLoginStore,
} from '@store';
import {useCheckRiotQuery, useReissueMutation} from '@api';
import {
  CreateChat,
  GlobalModal,
  Header,
  NavigationStackHeaderLeftButton,
} from '@src/components';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Alert,
  GestureResponderEvent,
  Linking,
} from 'react-native';
import {
  DEFAULT_STYLES,
  HEADER_STYLES,
  OPEN_DEEP_LINKING_URL,
  REFRESH_TOKEN,
  TabBarStyle,
} from '@src/util';
import {usePermission} from '@src/hooks';
import {createStackNavigator} from '@react-navigation/stack';
import CustomErrorBoundary from './error-provider';
import SplashScreen from 'react-native-splash-screen';
import {makeUrl} from '@src/hooks/use-notifee';
import messaging from '@react-native-firebase/messaging';
import {navigationIntegration} from './App';
import analytics from '@react-native-firebase/analytics';

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
    backgroundColor: DEFAULT_STYLES.color.main,
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
  text: {fontSize: DEFAULT_STYLES.fontSize.medium, fontWeight: 'bold'},
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
            path: 'chat/:roomId/:roomName',
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
            path: 'profile/:userId?/:type?',
          },
        },
      },
    },
  },
  async getInitialURL() {
    // First, try to get the URL from Linking.
    const url = await Linking.getInitialURL();
    if (url != null) {
      console.log('URL이 있는 경우');
      return url;
    }

    // Try to get the initial notification from Notifee.
    let initialNotification = await messaging().getInitialNotification();

    if (!initialNotification) {
      console.log('InitialNotification이 없는 경우');
      return null;
    }

    // Extract data from the notification.
    const {data} = initialNotification;

    if (
      typeof data?.roomName === 'string' &&
      typeof data?.roomId === 'string'
    ) {
      const deepLinkUrl = makeUrl(data.roomId, data.roomName);
      await saveLocalStorage(OPEN_DEEP_LINKING_URL, deepLinkUrl);
      return deepLinkUrl;
    }

    return null;
  },
};

const Tab = createBottomTabNavigator<RootBottomTapParamList>();
const Stack = createStackNavigator<RootStackParamList>();

type Props = {
  theme: Theme;
};
export default function AppNavigator({theme}: Props) {
  const navigationContainerRef = useNavigationContainerRef();
  const routeNameRef = React.useRef<string | undefined>();
  const navigationRef = useRef();
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
    <NavigationContainer
      ref={navigationContainerRef}
      theme={theme}
      linking={linking as any}
      onReady={() => {
        navigationIntegration.registerNavigationContainer(navigationRef);
        routeNameRef.current =
          navigationContainerRef.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        // google analytics screen tracking
        const previousRouteName = routeNameRef.current;
        const currentRouteName =
          navigationContainerRef.current?.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}>
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
          // initialRouteName="Introduce"
          screenOptions={{...HEADER_STYLES, headerShown: false}}>
          <Stack.Screen
            name="SignUpDetail"
            component={SignUpDetail}
            options={() => ({
              headerShown: true,
              headerTitle: () => <Header title="회원가입" />,

              headerLeft: () => <NavigationStackHeaderLeftButton />,
            })}
          />
          <Stack.Screen name="Introduce" component={Introduce} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicyRootPage}
            options={{
              headerShown: true,
              headerTitle: '',
              headerLeft: () => <NavigationStackHeaderLeftButton />,
            }}
          />
          <Stack.Screen
            name="TermOfUse"
            component={TermOfUseRootPage}
            options={{
              headerShown: true,
              headerTitle: '',
              headerLeft: () => <NavigationStackHeaderLeftButton />,
            }}
          />
        </Stack.Navigator>
      )}
      <GlobalModal />
    </NavigationContainer>
  );
}
