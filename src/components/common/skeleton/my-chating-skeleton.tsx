import {View, StyleSheet} from 'react-native';
import React from 'react';
import {DeferredComponent, SkeletonArray} from '@src/components';

import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

export default function MyChattingSkeleton() {
  return (
    <DeferredComponent>
      <View style={styles.container}>
        <View style={styles.main}>
          <SkeletonArray
            length={7}
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
                  <View style={styles.positionContainer}>
                    <View style={styles.date} />
                    <View style={styles.new} />
                  </View>
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
  main: {
    display: 'flex',
  },
  chatContainer: {
    height: responsiveScreenHeight(9),
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
    borderRadius: responsiveScreenWidth(5),
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
    display: 'flex',
    justifyContent: 'center',
  },
  date: {
    width: responsiveScreenWidth(10),
    height: responsiveScreenHeight(1.6),
    backgroundColor: 'gray',
    marginBottom: 8,
  },
  new: {
    width: responsiveScreenWidth(5),
    height: responsiveScreenWidth(5),
    borderRadius: responsiveScreenWidth(2.5),
    backgroundColor: 'gray',
    alignSelf: 'flex-end',
  },
});
