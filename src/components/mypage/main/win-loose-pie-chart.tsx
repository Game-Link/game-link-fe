import React from 'react';
import {PieChart} from '@src/components';

type Props = {
  win: number;
  loose: number;
};

export default function WinLoosePieChart({win, loose}: Props) {
  const data = [
    {
      name: 'WIN',
      value: win,
      legendFontColor: 'black',
      legendFontSize: 16,
      color: 'blue',
    },
    {
      name: 'LOOSE',
      value: loose,
      legendFontColor: 'black',
      legendFontSize: 16,
      color: 'red',
    },
  ];

  return (
    <PieChart
      data={data}
      accessor={'value'}
      backgroundColor={'transparent'}
      width={300}
      absolute
      paddingLeft={''}
      height={150}
    />
  );
}
