import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg';
import {
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

type Props = {
  wins: number | null;
  losses: number | null;
};

function WinRateCircle({wins, losses}: Props) {
  const radius = responsiveScreenWidth(14);
  const strokeWidth = responsiveScreenWidth(1.2);
  const percentage =
    typeof wins === 'number' && typeof losses === 'number'
      ? (wins / (wins + losses)) * 100
      : 0;

  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;
  console.log(strokeDashoffset);
  return (
    <View style={styles.container}>
      <Svg
        width={responsiveScreenWidth(24)}
        height={responsiveScreenWidth(24)}
        viewBox="0 0 120 120">
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
            stroke="blue"
            cx="60"
            cy="60"
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={
              Number.isNaN(strokeDashoffset) ? 0 : strokeDashoffset
            }
            fill="none"
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <Text style={styles.percentageText}>
        {Number.isNaN(percentage) ? '0%' : `${Math.floor(percentage)}%`}
      </Text>
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
    fontSize: responsiveScreenFontSize(3),
    fontWeight: 'bold',
  },
});

export default WinRateCircle;
