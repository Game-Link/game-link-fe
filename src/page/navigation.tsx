import type {NavigatorScreenParams} from '@react-navigation/native';

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
  Profile: {userId: string; type: ProfileType};
};

export type ChatStackParamList = {
  MyChat: undefined;
  Chatting: {roomId: string; roomName: string};
  UserProfile: {userId?: string; type: ProfileType};
  UserMatchDetailInfo: {userId: string};
};

export type MyPageStackParamList = {
  MyPageStack: {userId?: string; type: ProfileType};
  LoLAccountStack: {method: 'patch' | 'post'};
  MyMatchDetailInfo: {userId: string};
};

// // Declare the global namespace
// declare global {
//   namespace ReactNavigation {
//     // Extending the global RootParamList with the RootStackParamList
//     interface RootParamList extends RootStackParamList {}
//   }
// }
