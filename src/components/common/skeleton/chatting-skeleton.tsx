import {View, StyleSheet} from 'react-native';
import React from 'react';
import DeferredComponent from '../deferred';
import SkeletonItem from './skeleton-item';

export default function ChattingSkeleton() {
  return (
    <DeferredComponent>
      <View style={styles.container}>
        <SkeletonItem style={styles.chatting}>
          <View />
        </SkeletonItem>
        <View style={styles.input} />
      </View>
    </DeferredComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chatting: {
    flex: 0.9,
    backgroundColor: 'gray',
  },
  input: {
    flex: 0.1,
    backgroundColor: 'white',
  },
});
