import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {NotFoundAnimation, LoadingAnimation} from '@src/components';

export default function NotFound() {
  return (
    <View style={styles.container}>
      <LoadingAnimation />
      <Text style={styles.title}>해당 전적 정보를 찾을 수 없습니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
});
