import type {NavigatorScreenParams} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ChatRoom} from '@src/api';

export type ProfileType = 'MY_INFO' | 'USER_INFO';

export type RootBottomTapParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Chat: NavigatorScreenParams<ChatStackParamList>;
  Setting: NavigatorScreenParams<SettingStackParamList>;
  PostChat: undefined;
  MyPage: NavigatorScreenParams<MyPageStackParamList>;
};

export type RootStackParamList = {
  Introduce: undefined;
  SignUp: undefined;
};

export type HomeStackParamList = {
  Main: undefined;
  ChatUserList: ChatRoom;
};

export type ChatStackParamList = {
  MyChat: undefined;
  Chatting: {roomId: string; roomName: string};
  ChatUserProfile: {userId: string; type: ProfileType};
  ChatUserMatchDetail: {userId: string; nickname: string};
};

export type MyPageStackParamList = {
  Profile: {userId?: string; type: ProfileType};
  LoLAccount: {method: 'patch' | 'post'; back: 'mypage' | 'setting'};
  MyMatchDetailInfo: {userId: string};
};

export type SettingStackParamList = {
  defaultSetting: undefined;
  profileSetting: {nickname: string};
  teamInfoSetting: undefined;
  appInfoSetting: undefined;
  termOfUseSetting: undefined;
};

// navigation props

export type HomeStackProps = StackNavigationProp<
  RootBottomTapParamList,
  'Home'
>;
export type ChatStackProps = StackNavigationProp<
  RootBottomTapParamList,
  'Chat'
>;
export type MyPageSatackProps = StackNavigationProp<
  RootBottomTapParamList,
  'MyPage'
>;

// detail
export type ProfileStackProps = StackNavigationProp<
  MyPageStackParamList,
  'Profile'
>;
export type ChattingRoomStackProps = StackNavigationProp<
  ChatStackParamList,
  'Chatting'
>;

export type MyChattingRoomStackProps = StackNavigationProp<
  ChatStackParamList,
  'MyChat'
>;

// // Declare the global namespace
// declare global {
//   namespace ReactNavigation {
//     // Extending the global RootParamList with the RootBottomTapParamList
//     interface RootParamList extends RootBottomTapParamList {}
//   }
// }
