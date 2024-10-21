import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {LoadingAnimation} from '@src/components/lottie';

export default function Loading() {
  return (
    <View style={styles.container}>
      <LoadingAnimation />
      <Text style={styles.text}>Riot 계정 연동에</Text>
      <Text style={styles.text}>최대 15초까지 소요 될 수 있습니다.</Text>
      <Text style={styles.text}>조금만 기다려 주실 수 있을까요?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
