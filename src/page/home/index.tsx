/* eslint-disable react/no-unstable-nested-components */
import {createStackNavigator} from '@react-navigation/stack';
import {
  ChatUserList,
  Header,
  Main,
  NavigationStackHeaderLeftButton,
} from '@src/components';
import {HEADER_STYLES} from '@src/util';
import React from 'react';
import {HomeStackParamList, HomeStackProps} from '../navigation';
import {Pressable, StyleSheet, Text} from 'react-native';
import {ChatRoom} from '@src/api';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator<HomeStackParamList>();

export default function Home() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{...HEADER_STYLES}}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
          headerTitle: 'GameLink',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="ChatUserList"
        component={ChatUserList}
        options={({route}) => ({
          headerTitle: () => <Header title={route.params.roomName} />,
          headerLeft: () => <NavigationStackHeaderLeftButton />,
          headerRight: () => <JoinButton {...route.params} />,
        })}
      />
    </Stack.Navigator>
  );
}

function JoinButton(props: ChatRoom) {
  const {roomId} = props;
  const navigation = useNavigation<HomeStackProps>();
  return (
    <Pressable style={joinButtonStyle.button}>
      <Text style={joinButtonStyle.text}>참 여</Text>
    </Pressable>
  );
}

const joinButtonStyle = StyleSheet.create({
  button: {
    marginRight: 12,
    alignSelf: 'flex-end',
  },
  text: {
    color: 'lime',
    fontSize: 16,
  },
});
