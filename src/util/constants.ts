import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {StackNavigationOptions} from '@react-navigation/stack';
import {Tier} from '@src/api';
import {IMAGES, Position, POSITION_IMAGES} from './image';
import {Dimensions} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

export const REFRESH_TOKEN = 'refreshToken' as const;

export const USER_ID = 'userId';

export const LOGIN_TYPE = 'login-type';

export const GAMELINK_ACCESS = 'gamelink-access' as const;

export const GAEM_TYPE = {
  ALL: '전체',
  SOLO_RANK: '솔로랭크',
  FLEX_RANK: '팀랭크',
  NORMAL: '일반게임',
} as const;

export const GAME_TYPE_KEY = Object.keys(
  GAEM_TYPE,
) as (keyof typeof GAEM_TYPE)[];

export const GAME_TYPE_BUTTON_VALUE = GAME_TYPE_KEY.map(key => ({
  label: GAEM_TYPE[key],
  value: key,
}));

export const RANK_TIERS: {readonly [key in Tier]: string} = {
  ANY: '상관 없음',
  UNRANKED: '언랭크',
  IRON: '아이언',
  BRONZE: '브론즈',
  SILVER: '실버',
  GOLD: '골드',
  EMERALD: '애매랄드',
  PLATINUM: '플래티넘',
  DIAMOND: '다이아',
  MASTER: '마스터',
  GRANDMASTER: '그랜드마스터',
  CHALLENGER: '첼린져',
};

export const RANK_KEYS = Object.keys(RANK_TIERS) as Tier[];

export const RANK_BUTTON_VALUE = RANK_KEYS.map(key => ({
  label: RANK_TIERS[key],
  value: key,
}));

export const RANK_BUTTON_VALUE_ICON = RANK_BUTTON_VALUE.map(key => ({
  ...key,
  icon: IMAGES[key.value],
}));

export const POSITION: {readonly [key in Position]: string} = {
  ANY: '상관없음',
  TOP: '탑',
  JUNGLE: '정글',
  MID: '미드',
  ADC: '원딜',
  SUPPORT: '서포터',
};

export const POSITION_KEYS = Object.keys(POSITION) as Position[];

export const POSITION_BUTTON_VALUE = POSITION_KEYS.map(key => ({
  label: POSITION[key],
  value: key,
}));

export const POSITION_BUTTON_VALUE_ICON = POSITION_BUTTON_VALUE.map(item => ({
  ...item,
  icon: POSITION_IMAGES[item.value],
}));

export const LEADER_TIER: {[key in string]: Tier} = {
  UNRANK: 'UNRANKED',
  I: 'IRON',
  B: 'BRONZE',
  S: 'SILVER',
  G: 'GOLD',
  E: 'EMERALD',
  P: 'PLATINUM',
  D: 'DIAMOND',
  M: 'MASTER',
  GM: 'GRANDMASTER',
  C: 'CHALLENGER',
};

export const HEADER_STYLES: StackNavigationOptions &
  BottomTabNavigationOptions = {
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

export const TabBarStyle: BottomTabNavigationOptions['tabBarStyle'] = {
  backgroundColor: 'white',
  borderWidth: 0,
  borderRadius: 15,
  position: 'absolute',
  bottom: 10,
  left: 10,
  right: 10,
  elevation: 0,
  height: 60,
  borderTopWidth: 0,
  borderColor: 'transparent',
};

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

const labelStyle = {
  fontSize: responsiveFontSize(1.2),
  fontWeight: 'bold',
};
export const POSITION_SEGMENT_BUTTONS = [
  {
    value: 'TOP',
    label: '탑',
    labelStyle,
  },
  {
    value: 'JUNGLE',
    label: '정글',
    labelStyle,
  },
  {
    value: 'MID',
    label: '미드',
    labelStyle,
  },
  {
    value: 'ADC',
    label: '원딜',
    labelStyle,
  },
  {
    value: 'SUPPORT',
    label: '서포트',
    labelStyle,
  },
];

export type MatchInfoTeamPosition =
  | 'MIDDLE'
  | 'BOTTOM'
  | 'UTILITY'
  | 'TOP'
  | 'JUNGLE';

export const MatchInfoPosition: {
  [key in MatchInfoTeamPosition]: string;
} = {
  MIDDLE: 'MID',
  BOTTOM: 'BOT',
  UTILITY: 'SUPPORT',
  TOP: 'TOP',
  JUNGLE: 'JUNGLE',
};

export const EMAIL = 'kd02109@gmail.com';
export const FIRST_VISIT = 'FIRST_VISIT';
export const OPEN_DEEP_LINKING_URL = 'OPEN_DEEP_LINKING_URL';
export const ROOM_NAME_LENGTH = 18;
