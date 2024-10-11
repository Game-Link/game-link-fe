import {StackNavigationOptions} from '@react-navigation/stack';

export const REFRESH_TOKEN = 'refreshToken' as const;

export const USER_ID = 'userId';

export const GAMELINK_ACCESS = 'gamelink-access' as const;

export const GAME_MODE = {
  SOLO: '솔로랭크',
  TEAM: '팀랭크',
  CUSTOM: '커스텀 게임',
  NORMAL: '일반게임',
} as const;

export const HEADER_STYLES: StackNavigationOptions = {
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: 'rgba(255, 251, 254, 1)',
    shadowColor: 'rgba(255, 251, 254, 1)', // 닫는 따옴표와 괄호 추가
    shadowOpacity: 0,
    elevation: 0,
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
};
