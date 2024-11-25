import type {NavigatorScreenParams} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ChatRoom} from '@src/api';

export type ProfileType = 'MY_INFO' | 'USER_INFO';

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Chat: NavigatorScreenParams<ChatStackParamList>;
  Setting: undefined;
  PostChat: undefined;
  MyPage: NavigatorScreenParams<MyPageStackParamList>;
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
};

export type MyPageStackParamList = {
  Profile: {userId?: string; type: ProfileType};
  LoLAccount: {method: 'patch' | 'post'};
  MyMatchDetailInfo: {userId: string};
};

// navigation props

export type HomeStackProps = StackNavigationProp<RootStackParamList, 'Home'>;
export type ChatStackProps = StackNavigationProp<RootStackParamList, 'Chat'>;
export type MyPageSatackProps = StackNavigationProp<
  RootStackParamList,
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
//     // Extending the global RootParamList with the RootStackParamList
//     interface RootParamList extends RootStackParamList {}
//   }
// }
