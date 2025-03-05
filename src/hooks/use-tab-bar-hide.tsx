import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {TabBarStyle} from '@src/util';

export default function useTabBarHide(restoreTabBarOnBlur: boolean = true) {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const parentNavigation = navigation.getParent();

      navigation.setOptions({
        tabBarStyle: {display: 'none'},
      });
      parentNavigation?.setOptions({
        tabBarStyle: {display: 'none'},
      });

      return () => {
        // Restore the tab bar when the screen loses focus
        if (restoreTabBarOnBlur) {
          parentNavigation?.setOptions({
            tabBarStyle: TabBarStyle,
          });
          navigation.setOptions({
            tabBarStyle: TabBarStyle,
          });
        }
      };
    }, [restoreTabBarOnBlur]),
  );
}
