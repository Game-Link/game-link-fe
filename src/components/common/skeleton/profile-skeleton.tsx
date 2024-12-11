import {View, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import DeferredComponent from '../deferred';
import SkeletonItem from './skeleton-item';

import Gray from '@src/assets/gray.png';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SkeletonArray from './skeleton-array';
import {SegmentedButtons} from 'react-native-paper';
import WinRateCircleSkeleton from './win-rate-circle-skeleton';

export default function ProfileSkeleton() {
  return (
    <DeferredComponent>
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          source={Gray}
          style={styles.imageBackground}>
          <View style={styles.avatarContainer}>
            <SkeletonItem>
              <View style={styles.profile} />
            </SkeletonItem>
            <View style={styles.nicknameContainer}>
              <View>
                <SkeletonItem>
                  <View style={styles.name} />
                  <View style={styles.detail} />
                </SkeletonItem>
                <View style={styles.nicknameContainer}>
                  <SkeletonArray
                    length={2}
                    component={<View style={styles.headerButton} />}
                  />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.body}>
          <SegmentedButtons
            value={''}
            onValueChange={() => {}}
            buttons={[
              {value: '', label: '', style: styles.SegmentedButtons},
              {value: '', label: '', style: styles.SegmentedButtons},
              {value: '', label: '', style: styles.SegmentedButtons},
            ]}
          />

          <View style={styles.mainBody}>
            <View style={styles.dataBox}>
              <View style={styles.rankInfo}>
                <SkeletonItem>
                  <View style={styles.rankImage} />
                </SkeletonItem>
                <View>
                  <SkeletonItem>
                    <View style={styles.id} />
                    <View style={styles.text} />
                  </SkeletonItem>
                </View>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.winRate}>
                  <SkeletonItem>
                    <View style={styles.miniTitle} />
                    <WinRateCircleSkeleton />
                    <SkeletonArray
                      length={3}
                      component={<View style={styles.content} />}
                    />
                  </SkeletonItem>
                </View>
                <View style={styles.championBox}>
                  <SkeletonItem>
                    <View style={styles.miniTitle} />
                  </SkeletonItem>
                  <View style={styles.championDetail}>
                    <SkeletonArray
                      length={3}
                      component={<View style={styles.champion} />}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </DeferredComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontWeight: 'bold',
  },
  imageBackground: {
    flex: 1,
  },
  avatarContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingBottom: 12,
    zIndex: 1, // 그라데이션 위에 컨텐츠 배치
  },
  profile: {
    width: responsiveScreenWidth(20),
    height: responsiveScreenWidth(20),
    borderRadius: responsiveScreenWidth(10),
    marginRight: 8,
    backgroundColor: 'gray',
  },
  nicknameContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  name: {
    width: responsiveScreenWidth(50),
    height: responsiveHeight(3),
    marginBottom: 4,
    backgroundColor: 'gray',
  },
  detail: {
    width: responsiveScreenWidth(40),
    height: responsiveHeight(2),
    marginBottom: 4,
    backgroundColor: 'gray',
  },
  headerButton: {
    width: responsiveScreenWidth(32),
    height: responsiveHeight(4),
    borderRadius: responsiveScreenWidth(16),
    backgroundColor: 'gray',
    marginRight: 4,
    marginTop: 4,
  },
  body: {
    flex: 2,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  SegmentedButtons: {
    backgroundColor: 'gray',
  },

  mainBody: {
    flex: 0.8,
    marginTop: 8,
  },
  dataBox: {
    flex: 1,
  },
  rowContainer: {
    flex: 3,
    display: 'flex',
    flexDirection: 'row',
  },
  rankInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderBlockColor: 'gray',
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 2,
    marginVertical: 2,
  },
  rankImage: {
    width: responsiveHeight(12),
    height: responsiveHeight(6.4),
    backgroundColor: 'gray',
    borderRadius: responsiveWidth(10),
    marginRight: 12,
  },
  id: {
    width: responsiveScreenWidth(32),
    height: responsiveHeight(3.2),
    marginBottom: 4,
    backgroundColor: 'gray',
  },
  text: {
    width: responsiveWidth(20),
    height: responsiveHeight(1.6),
    marginBottom: 4,
    backgroundColor: 'gray',
  },
  winRate: {
    flex: 0.6,
    borderBlockColor: 'gray',
    display: 'flex',
    borderWidth: 0.5,
    padding: 8,

    borderRadius: 10,
    marginHorizontal: 2,
    marginVertical: 2,
  },
  miniTitle: {
    width: responsiveScreenWidth(20),
    height: responsiveHeight(3),
    backgroundColor: 'gray',
    marginBottom: 8,
  },
  content: {
    marginVertical: 8,
    width: responsiveScreenWidth(24),
    height: responsiveHeight(2),
    backgroundColor: 'gray',
  },

  championBox: {
    flex: 1,
    borderBlockColor: 'gray',
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 10,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  championDetail: {
    marginTop: responsiveHeight(3.6),
  },

  champion: {
    width: responsiveScreenWidth(48),
    height: responsiveHeight(4),
    backgroundColor: 'gray',
    marginBottom: 8,
  },
});
