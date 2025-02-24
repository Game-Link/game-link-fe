/* eslint-disable react/no-unstable-nested-components */
import {createStackNavigator} from '@react-navigation/stack';
import {
  ChatUserList,
  Header,
  Main,
  NavigationStackHeaderLeftButton,
} from '@src/components';
import {
  DEFAULT_STYLES,
  HEADER_STYLES,
  ROOM_NAME_LENGTH,
  sliceText,
} from '@src/util';
import React from 'react';
import {HomeStackParamList} from '../navigation';
import {Pressable, StyleSheet, Text} from 'react-native';
import {ChatRoom} from '@src/api';
import {useModalStore} from '@src/store';
import APP_ICON from '@src/assets/appstore.png';

const Stack = createStackNavigator<HomeStackParamList>();

export default function Home() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{...HEADER_STYLES}}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerTitle: () => <Header title="Game Link" image={APP_ICON} />,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="ChatUserList"
        component={ChatUserList}
        options={({route, navigation}) => ({
          headerTitle: () => (
            <Header
              title={sliceText(route.params.roomName, ROOM_NAME_LENGTH)}
            />
          ),
          headerLeft: () => (
            <NavigationStackHeaderLeftButton
              navigate={() => {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'Main',
                    },
                  ],
                });
              }}
            />
          ),
          headerRight: () => <JoinButton {...route.params} />,
        })}
      />
    </Stack.Navigator>
  );
}

function JoinButton(props: ChatRoom) {
  const {roomId, roomName, positions} = props;
  const {openModal} = useModalStore();

  return (
    <Pressable
      style={joinButtonStyle.button}
      onPress={() => {
        openModal('PositionModal', {
          roomName,
          roomId,
          positions,
        });
      }}>
      <Text style={joinButtonStyle.text}>참 여</Text>
    </Pressable>
  );
}

const joinButtonStyle = StyleSheet.create({
  button: {
    marginRight: DEFAULT_STYLES.size['12'],
    alignSelf: 'flex-end',
  },
  text: {
    color: 'lime',
    fontSize: DEFAULT_STYLES.fontSize.large,
  },
});
