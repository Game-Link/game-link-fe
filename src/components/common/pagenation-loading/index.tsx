import {DEFAULT_STYLES} from '@src/util';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

type Props = {
  isLoading: boolean;
};
export default function PageNationLoading({isLoading}: Props) {
  return (
    <>
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color={DEFAULT_STYLES.color.main}
        />
      )}
    </>
  );
}
