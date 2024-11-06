import {StyleSheet} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

type Props = {
  isLoading: boolean;
};
export default function PageNationLoading({isLoading}: Props) {
  if (!isLoading) return null;

  return (
    <ActivityIndicator
      animating={true}
      color="#8e7cc3"
      style={styles.activeIndicator}
    />
  );
}
const styles = StyleSheet.create({
  activeIndicator: {marginVertical: 20},
});
