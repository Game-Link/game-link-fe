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
import {useAppState, useNotifee, useOnlineManager} from '@hooks';
import {onAppStateChange, queryClient} from '@api';
import {assignModule} from './setting';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import * as Sentry from '@sentry/react-native';

export const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});

Sentry.init({
  dsn: 'https://a8680ea8c0556d22d8774883a87f5e41@o4507110752911360.ingest.us.sentry.io/4508871980417024',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  // profilesSampleRate is relative to tracesSampleRate.
  // Here, we'll capture profiles for 100% of transactions.
  profilesSampleRate: 1.0,
  integrations: [navigationIntegration],
});

assignModule();

if (__DEV__) {
  require('./ReactotronConfig');
}

function App(): React.JSX.Element {
  // tanstack query setting
  useOnlineManager();
  useAppState(onAppStateChange);

  // fcm
  useNotifee();

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
          <PaperProvider theme={theme}>
            <BottomSheetModalProvider>
              <AppNavigator theme={theme} />
            </BottomSheetModalProvider>
          </PaperProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </QueryClientProvider>
  );
}

export default Sentry.wrap(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomsheetContainer: {
    flex: 1,
    backgroundColor: 'grey',
  },
});
