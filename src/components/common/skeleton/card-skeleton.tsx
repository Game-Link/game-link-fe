import {View, StyleSheet} from 'react-native';
import React from 'react';
import {DeferredComponent, SkeletonArray, SkeletonItem} from '@src/components';

import {WINDOW_WIDTH, WINDOW_HEIGHT} from '@src/util';

export default function CardSkelton() {
  return (
    <DeferredComponent>
      <View style={styles.container}>
        <SkeletonItem>
          <View style={styles.card} />
        </SkeletonItem>

        <View style={styles.rowContainer}>
          <SkeletonArray
            length={3}
            component={<View style={styles.circle} />}
          />
        </View>
      </View>
    </DeferredComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  card: {
    backgroundColor: 'rgba(36, 46, 69, 0.2)',
    height: WINDOW_HEIGHT * 0.84,
    width: WINDOW_WIDTH - 18 * 2,
    marginBottom: 8,
    alignSelf: 'center',
    borderRadius: 10,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(36, 46, 69, 0.2)',
    marginHorizontal: 8,
    marginBottom: 8,
  },
});
