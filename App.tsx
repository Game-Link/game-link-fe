import AppNavigator from './app-navigator';
import React from 'react';

import {Platform, SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
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

if (__DEV__) {
  require('./ReactotronConfig');
}

function App(): React.JSX.Element {
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

  const os = Platform.OS;
  if (os === 'ios') {
    return (
      <SafeAreaView style={styles.container}>
        <PaperProvider theme={theme}>
          <AppNavigator theme={theme} />
        </PaperProvider>
      </SafeAreaView>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <AppNavigator theme={theme} />
    </PaperProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
