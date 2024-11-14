import AppNavigator from './app-navigator';
import React from 'react';
import './gesture-handler';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
import {
  PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import {useAppState, useFcm, useOnlineManager} from '@hooks';
import {onAppStateChange, queryClient} from '@api';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {assignModule} from './setting';
import {DrawerProvider, GlobalModal} from '@src/components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

assignModule();

if (__DEV__) {
  require('./ReactotronConfig');
}

function App(): React.JSX.Element {
  // tanstack query setting
  useOnlineManager();
  useAppState(onAppStateChange);

  // fcm
  useFcm();

  // theme
  const isDarkMode = useColorScheme() === 'dark';

  const {LightTheme, DarkTheme} = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
    },
  };
  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...DarkTheme.colors,
    },
  };

  const theme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <GestureHandlerRootView style={styles.bottomsheetContainer}>
          <KeyboardProvider>
            <PaperProvider theme={theme}>
              <DrawerProvider>
                <BottomSheetModalProvider>
                  <AppNavigator theme={theme} />
                  <GlobalModal />
                </BottomSheetModalProvider>
              </DrawerProvider>
            </PaperProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </QueryClientProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomsheetContainer: {
    flex: 1,
    backgroundColor: 'grey',
  },
});
