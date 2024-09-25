import {Dimensions} from 'react-native';
import React from 'react';
import {PieChart as Chart} from 'react-native-chart-kit';
import {AbstractChartConfig} from 'react-native-chart-kit/dist/AbstractChart';
import {PieChartProps} from 'react-native-chart-kit/dist/PieChart';

type Props = {
  config?: AbstractChartConfig;
  width?: number;
  height?: number;
} & Omit<PieChartProps, 'width' | 'height'>;

export default function PieChart({width, height, config, ...props}: Props) {
  const pieWidth = width || Dimensions.get('screen').width;
  const pieHeight = height || Dimensions.get('screen').height;
  const chartConfig: AbstractChartConfig = config || {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    fillShadowGradientTo: 'black',
    strokeWidth: 5,
    color: (opacity = 1) => `rgba(22, 39, 102, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(22, 39, 102, ${opacity})`,
    barPercentage: 1,
  };
  return (
    <Chart
      width={pieWidth}
      chartConfig={chartConfig}
      height={pieHeight}
      {...props}
    />
  );
}
