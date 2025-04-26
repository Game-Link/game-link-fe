/* eslint-disable react-native/no-inline-styles */

import appleAuth, {
  appleAuthAndroid,
  AppleButton,
  AppleError,
} from '@invertase/react-native-apple-authentication';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {v4 as uuid} from 'uuid';
import {jwtDecode} from 'jwt-decode';

interface TokenType {
  aud: string;
  auth_time: number;
  c_hash: string;
  email: string;
  email_verified: string;
  exp: number;
  iat: number;
  is_private_email: string;
  iss: string;
  nonce: string;
  nonce_supported: boolean;
  sub: string;
}

const isAppleErrorCancel = (error: unknown): error is AppleError => {
  console.log(error);
  if (error === '1001') {
    return true;
  }
  return false;
};

async function onAppleButtonPressAndroid() {
  // Generate secure, random values for state and nonce
  const rawNonce = uuid();
  const state = uuid();

  // Configure the request
  appleAuthAndroid.configure({
    // The Service ID you registered with Apple
    clientId: 'com.gamesync.gamelink',

    // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
    // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
    redirectUri: 'https://example.com/auth/callback',

    // The type of response requested - code, id_token, or both.
    responseType: appleAuthAndroid.ResponseType.ALL,

    // The amount of user information requested from Apple.
    scope: appleAuthAndroid.Scope.ALL,

    // Random nonce value that will be SHA256 hashed before sending to Apple.
    nonce: rawNonce,

    // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
    state,
  });

  // Open the browser window for user sign in
  const response = await appleAuthAndroid.signIn();
  console.log(response);

  // Send the authorization code to your backend for verification
}

async function handleSignInApple() {
  try {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // get current authentication state for user
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      const {identityToken, email, user} = appleAuthRequestResponse;
      const decodedToken: TokenType = jwtDecode(identityToken!);
      console.log('email_from_decodedToken', decodedToken.email);
      console.log('email', email);
      console.log('user', user);
    }
  } catch (error) {
    if (isAppleErrorCancel(error)) {
      // login canceled
    } else {
      // login error
    }
  }
}

type AppleLoginProps = {
  disabled?: boolean;
};

function AppleLogin({disabled}: AppleLoginProps) {
  const os = Platform.OS;
  return (
    <>
      {os === 'ios' && (
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE_OUTLINE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={[styles.pressable, disabled && styles.disable]}
          onPress={handleSignInApple}
        />
      )}
      {os === 'android' && appleAuthAndroid.isSupported && (
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE_OUTLINE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={[styles.pressable, disabled && styles.disable]}
          onPress={onAppleButtonPressAndroid}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginTop: 16,
    height: 60,
    width: 320,
    paddingVertical: 16,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disable: {
    opacity: 0.5, // assuming you want to make the logo slightly transparent in disabled state
    color: '#d6cece',
  },
});

export default AppleLogin;
