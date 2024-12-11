import {StackScreenProps} from '@react-navigation/stack';
import {ParamListBase, useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {TabBarStyle} from '@src/util';

type Navigation<Stack extends ParamListBase> = StackScreenProps<
  Stack,
  keyof Stack
>;

export default function useTabBarHide<T extends ParamListBase>(
  navigation: Navigation<T>['navigation'],
) {
  const parentNavigation = navigation.getParent();
  console.log('현재 navigation State: ', navigation.getState());
  console.log('부모 navigation State: ', parentNavigation?.getState());
  useFocusEffect(
    useCallback(() => {
      // 화면이 포커스될 때 탭 바 숨기기
      parentNavigation?.setOptions({
        tabBarStyle: {display: 'none'},
      });

      return () => {
        // 화면에서 벗어날 때 탭 바 다시 보이기
        parentNavigation?.setOptions({
          tabBarStyle: TabBarStyle,
        });
      };
    }, []),
  );

  return parentNavigation;
}
