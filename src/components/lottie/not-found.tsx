import React from 'react';
import LottieView from 'lottie-react-native';

export default function NotFoundAnimation() {
  return (
    <LottieView
      source={require('../../lottie/not-found')}
      autoPlay
      loop
      style={{width: 150, height: 150}}
    />
  );
}
