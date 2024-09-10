import {View, Text, StyleSheet, Button} from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
const LoginScreen = () => {
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'Your-web-client-id',
      offlineAccess: true,
    });
  }, []);

  const GoogleSingUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then(result => {
        console.log(result);
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login to continue</Text>
      <Button
        title="Login Google"
        color={GoogleSigninButton.Color.Dark}
        onPress={GoogleSingUp}
        // disabled={this.state.isSigninInProgress}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: '800',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    rowGap: 10,
    justifyContent: 'center',
  },
});
