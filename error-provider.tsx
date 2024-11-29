/* eslint-disable react/no-unstable-nested-components */
import {View, Text, Pressable} from 'react-native';
import React, {ReactElement} from 'react';
import {QueryErrorResetBoundary} from '@tanstack/react-query';
import ErrorBoundary from 'react-native-error-boundary';

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
  error: Error;
};
function FallbackComponent({resetError, error}: FallbackComponentProps) {
  return (
    <View>
      <Text>An error occurred: {error.message}</Text>
      <Pressable onPress={resetError}>
        <Text>Try again</Text>
      </Pressable>
    </View>
  );
}
