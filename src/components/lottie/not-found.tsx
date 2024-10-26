import React from 'react';
import LottieView from 'lottie-react-native';

export default function NotFoundAnimation() {
  return (
    <LottieView
      source={require('../../lottie/not-found.lottie')}
      autoPlay
      loop
      style={{width: 100, height: 50}}
    />
  );
}
