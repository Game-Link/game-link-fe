import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Svg, {Circle, G} from 'react-native-svg';
import {
  responsiveScreenFontSize,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

export default function WinRateCircleSkeleton() {
  const percentage = 0;
  const radius = responsiveScreenWidth(14);
  const strokeWidth = responsiveScreenWidth(1.2);

  return (
    <View style={styles.container}>
      <Svg
        width={responsiveScreenWidth(24)}
        height={responsiveScreenWidth(24)}
        viewBox="0 0 120 120">
        <G rotation="-90" origin="60, 60">
          <Circle
            stroke="gray"
            cx="60"
            cy="60"
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
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
