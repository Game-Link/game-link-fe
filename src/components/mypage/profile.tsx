import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useRiotInfo} from '@src/api';

import MypageHeader from './main/header';
import MypageButtonGroup from './main/button-group';

import RankInfo from './main/rank-info';
import GameMatchSegmentedButton from './main/game-match-segmented-buttons';
import {useMatchStore} from '@src/store';
import {HomeStackParamList, MyPageStackParamList} from '@src/page';
import {StackScreenProps} from '@react-navigation/stack';

type Props =
  | StackScreenProps<MyPageStackParamList, 'MyPageStack'>
  | StackScreenProps<HomeStackParamList, 'Profile'>;

export default function Profile({route}: Props) {
  const userId = route.params?.userId || null;
  const profileType = route.params!.type;
  const {data, isSuccess} = useRiotInfo({userId});
  const match = useMatchStore().match;

  if (isSuccess) {
    console.log(data, '==== MY PAGE PROFILE ====');
  }

  if (!data) {
    return null;
  }

  const solo = data.soloRank;
  const team = data.teamRank;
  const all = data.total;

  const infos = {
    SOLO: solo,
    TEAM: team,
    ALL: all,
  };

  return (
    <View style={styles.container}>
      <MypageHeader
        userId={data.userId}
        nickname={data.nickname}
        phone={data.email}
        uri={data.summonerIconUrl}
        profileType={profileType}
        background={data.backgroundImageUrl}
        lol={
          data && {
            summonerName: data.summonerName,
            summonerTag: data.summonerTag,
          }
        }
      />
      <View style={styles.body}>
        <GameMatchSegmentedButton />
        <RankInfo info={infos[match]} />
        {profileType === 'MY_INFO' && (
          <MypageButtonGroup isLogin={data ? true : false} />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    fontWeight: 'bold',
  },
  body: {
    flex: 2,
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
});
