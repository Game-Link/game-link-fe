import {StackScreenProps} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import {useEffect} from 'react';

type Navigation<Stack extends ParamListBase> = StackScreenProps<
  Stack,
  keyof Stack
>;

export default function useTabBarHid<T extends ParamListBase>(
  navigation: Navigation<T>['navigation'],
) {
  const parentNavigation = navigation.getParent();

  useEffect(() => {
    // 화면이 포커스될 때 탭 바 숨기기
    parentNavigation?.setOptions({
      tabBarStyle: {display: 'none'},
    });

    return () => {
      // 화면에서 벗어날 때 탭 바 다시 보이기
      parentNavigation?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [parentNavigation]);

  return parentNavigation;
}
