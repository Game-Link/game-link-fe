import {Animated} from 'react-native';

import React, {useEffect, useRef} from 'react';

interface ItemProps {
  children: React.ReactNode;
}

export default function SkeletonItem({children}: ItemProps) {
  const animValue = useRef(new Animated.Value(0)).current;

  const interpolatedOpacity: Animated.AnimatedInterpolation<number> =
    animValue.interpolate({
      inputRange: [0, 0.75, 1],
      outputRange: [0, 0.75, 1],
    });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(animValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View style={{opacity: interpolatedOpacity}}>
      {children}
    </Animated.View>
  );
}
