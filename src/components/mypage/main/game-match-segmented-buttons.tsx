import {StyleSheet} from 'react-native';
import React from 'react';
import {useMatchStore} from '@src/store';
import {SegmentedButton} from '@src/components';

export default function GameMatchSegmentedButton() {
  const tagValue = useMatchStore().match;
  const onValueChange = useMatchStore().changeMatch;
  return (
    <SegmentedButton
      value={tagValue}
      onValueChange={onValueChange}
      buttons={[
        {
          value: 'ALL',
          label: '전체 경기',
          labelStyle: styles.button,
          checkedColor: 'black',
        },
        {
          value: 'SOLO',
          label: '개인/2인 랭크',
          labelStyle: styles.button,
          checkedColor: 'black',
        },
        {
          value: 'TEAM',
          label: '팀 랭크',
          labelStyle: styles.button,
          checkedColor: 'black',
        },
      ]}
      style={styles.segmetedButton}
    />
  );
}

const styles = StyleSheet.create({
  segmetedButton: {
    marginVertical: 10,
    borderRadius: 0,
  },
  button: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
