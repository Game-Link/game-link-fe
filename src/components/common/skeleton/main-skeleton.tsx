import {View, StyleSheet} from 'react-native';
import React from 'react';
import {DeferredComponent, SkeletonArray} from '@src/components';

import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

export default function MainSkeleton() {
  return (
    <DeferredComponent>
      <View style={styles.container}>
        <View style={styles.header}>
          <SkeletonArray
            length={3}
            component={<View style={styles.button} />}
          />
        </View>
        <View style={styles.main}>
          <SkeletonArray
            length={6}
            component={
              <View>
                <View style={styles.chatContainer}>
                  <View style={styles.profileContainer}>
                    <View style={styles.profile} />
                  </View>
                  <View style={styles.titleContainer}>
                    <View style={styles.title} />
                    <View style={styles.content} />
                  </View>
                  <View style={styles.positionContainer} />
                </View>
              </View>
            }
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveScreenHeight(2),
  },
  main: {
    display: 'flex',
  },
  button: {
    width: responsiveScreenWidth(30),
    height: responsiveScreenHeight(4),
    borderRadius: 20,
    backgroundColor: 'gray',
    marginRight: 8,
  },
  chatContainer: {
    height: responsiveScreenHeight(10),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileContainer: {
    flex: 0.2,
  },
  profile: {
    width: responsiveScreenWidth(14),
    height: responsiveScreenWidth(14),
    borderRadius: responsiveScreenWidth(7),
    backgroundColor: 'gray',
    marginRight: 8,
  },
  titleContainer: {
    flex: 0.7,
  },
  title: {
    width: responsiveScreenWidth(50),
    height: responsiveScreenHeight(3),
    backgroundColor: 'gray',
    marginBottom: 8,
  },
  content: {
    width: responsiveScreenWidth(40),
    height: responsiveScreenHeight(2),
    backgroundColor: 'gray',
  },
  positionContainer: {
    flex: 0.1,
    backgroundColor: 'gray',
    width: responsiveScreenWidth(10),
    height: responsiveScreenWidth(10),
  },
});
