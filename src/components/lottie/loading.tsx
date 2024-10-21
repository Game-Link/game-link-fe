import React from 'react';
import LottieView from 'lottie-react-native';

export default function Animation() {
  return (
    <LottieView
      source={require('../../lottie/circle-star.json')}
      autoPlay
      loop
      style={{width: 300, height: 250}}
    />
  );
}
