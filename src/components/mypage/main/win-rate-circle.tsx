import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg';

type Props = {
  wins: number;
  losses: number;
};

function WinRateCircle({wins, losses}: Props) {
  const radius = 50;
  const strokeWidth = 10;
  const percentage = (wins / (wins + losses)) * 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <View style={styles.container}>
      <Svg width={120} height={120} viewBox="0 0 120 120">
        <G rotation="-90" origin="60, 60">
          <Circle
            stroke="red"
            cx="60"
            cy="60"
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            stroke="#8e7cc3"
            cx="60"
            cy="60"
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            fill="none"
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <Text style={styles.percentageText}>{`${Math.floor(percentage)}%`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default WinRateCircle;
