import {StackNavigationOptions} from '@react-navigation/stack';

export const REFRESH_TOKEN = 'refreshToken' as const;

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
