/* eslint-disable react/no-unstable-nested-components */
import {View, Text, StyleSheet} from 'react-native';
import React, {ReactElement} from 'react';
import {QueryErrorResetBoundary} from '@tanstack/react-query';
import ErrorBoundary from 'react-native-error-boundary';
import {Button} from 'react-native-paper';
import {CustomError, isCustomError} from '@src/util';
import {
  responsiveScreenFontSize,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {LogoutButton} from '@src/components';

type CustomErrorBoundaryProps = {
  children: ReactElement | ReactElement[];
};

export default function CustomErrorBoundary({
  children,
}: CustomErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({reset}) => (
        <ErrorBoundary
          onError={reset}
          FallbackComponent={({error, resetError}) => (
            <FallbackComponent resetError={resetError} error={error} />
          )}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

type FallbackComponentProps = {
  resetError: () => void;
  error: Error | CustomError;
};

function FallbackComponent({resetError, error}: FallbackComponentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isCustomError(error) ? error.message[0] : error.message}
      </Text>

      <Button onPress={resetError} mode="contained" style={styles.button}>
        다시 시도하기
      </Button>
      <LogoutButton style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: responsiveScreenFontSize(2.4),
    marginBottom: 4,
    color: 'black',
    fontWeight: 'bold',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  button: {
    marginVertical: 4,
    width: responsiveScreenWidth(50),
  },
});
