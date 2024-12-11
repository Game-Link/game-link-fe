import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

type Props = {
  isLoading: boolean;
};
export default function PageNationLoading({isLoading}: Props) {
  return (
    <>
      {isLoading && <ActivityIndicator animating={isLoading} color="#8e7cc3" />}
    </>
  );
}
