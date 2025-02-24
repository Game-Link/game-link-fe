import React, {Suspense} from 'react';
import {StyleSheet, View} from 'react-native';

import {useRiotInfo} from '@src/api';

import MypageHeader from './main/header';
import MypageButtonGroup from './main/button-group';

import RankInfo from './main/rank-info';
import GameMatchSegmentedButton from './main/game-match-segmented-buttons';
import {useMatchStore} from '@src/store';
import {MyPageStackParamList} from '@src/page';
import {StackScreenProps} from '@react-navigation/stack';
import {LinkButton, ProfileSkeleton} from '../common';
import {DEFAULT_STYLES} from '@src/util';

type Props = StackScreenProps<MyPageStackParamList, 'Profile'>;

export default function Profile(props: Props) {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileComponent {...props} />
    </Suspense>
  );
}

function ProfileComponent({route}: Props) {
  const userId = route.params?.userId || null;
  const profileType = route.params!.type;

  const {data} = useRiotInfo({userId});

  const match = useMatchStore().match;

  const solo = data?.soloRank;
  const team = data?.teamRank;
  const all = data?.total;

  const lol =
    data?.summonerName && data?.summonerTag
      ? {
          summonerName: data.summonerName,
          summonerTag: data.summonerTag,
        }
      : undefined;

  const infos = {
    SOLO: solo,
    TEAM: team,
    ALL: all,
  };

  return (
    <View style={styles.container}>
      <MypageHeader
        userId={data?.userId || ''}
        nickname={data?.nickname || ''}
        uri={data?.summonerIconUrl}
        profileType={profileType}
        background={data?.backgroundImageUrl}
        lol={lol}
        linkButton={
          <LinkButton
            to={{screen: 'MyMatchDetailInfo', params: {userId: data?.userId}}}
            mode="contained"
            labelStyle={styles.headerButtonText}
            style={styles.headerButton}
            theme={{
              colors: {
                primary: DEFAULT_STYLES.color.main,
                outline: DEFAULT_STYLES.color.white,
              },
            }}>
            매치 상세 정보
          </LinkButton>
        }
      />
      <View style={styles.body}>
        <GameMatchSegmentedButton />
        <RankInfo info={infos[match]} />

        <MypageButtonGroup isLogin={data?.backgroundImageUrl ? true : false} />
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
    paddingHorizontal: DEFAULT_STYLES.size['12'],
    paddingBottom: DEFAULT_STYLES.size['32'],
  },
  headerButton: {
    marginRight: DEFAULT_STYLES.size['4'],
  },
  headerButtonText: {
    fontSize: DEFAULT_STYLES.fontSize.medium,
  },
});
