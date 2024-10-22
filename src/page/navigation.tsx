import type {NavigatorScreenParams} from '@react-navigation/native';

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
  Profile: {userId: string};
};

export type ChatStackParamList = {
  MyChat: undefined;
  Chatting: {roomId: string};
  UserProfile: {userId: string};
};

export type MyPageStackParamList = {
  MyPageStack: {userId?: string};
  LoLAccountStack: {method: 'patch' | 'post'};
  MatchDetailInfo: undefined;
};

// // Declare the global namespace
// declare global {
//   namespace ReactNavigation {
//     // Extending the global RootParamList with the RootStackParamList
//     interface RootParamList extends RootStackParamList {}
//   }
// }
