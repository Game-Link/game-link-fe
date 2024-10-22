/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  LoLAccount,
  MatchDetailInfo,
  NavigationStackHeaderLeftBuuton,
  Profile,
} from '@src/components';
import {HEADER_STYLES} from '@src/util';
import {Image, StyleSheet, Text, View} from 'react-native';
import RiotImage from '@src/assets/riot-icon.png';
import {MyPageStackParamList} from '../navigation';

const Stack = createStackNavigator<MyPageStackParamList>();

export default function Mypage() {
  return (
    <Stack.Navigator
      initialRouteName="MyPageStack"
      screenOptions={{
        headerMode: 'float',
        ...HEADER_STYLES,
      }}>
      <Stack.Screen
        name="MyPageStack"
        component={Profile}
        options={{
          headerTitle: '마이페이지',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoLAccountStack"
        component={LoLAccount}
        options={{
          headerTitle: () => (
            <View style={styles.header}>
              <Image style={styles.image} source={RiotImage} />
              <Text style={styles.text}>LoL 연동</Text>
            </View>
          ),
          headerLeft: props => <NavigationStackHeaderLeftBuuton {...props} />,
        }}
      />
      <Stack.Screen
        name="MatchDetailInfo"
        component={MatchDetailInfo}
        options={{
          headerTitle: () => (
            <View style={styles.header}>
              <Image style={styles.image} source={RiotImage} />
              <Text style={styles.text}>LOL 전적 정보</Text>
            </View>
          ),
          headerLeft: props => <NavigationStackHeaderLeftBuuton {...props} />,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  text: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
