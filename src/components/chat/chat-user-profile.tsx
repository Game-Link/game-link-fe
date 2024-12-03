import React, {Suspense} from 'react';
import {StyleSheet, View} from 'react-native';

import {useRiotInfo} from '@src/api';

import MypageHeader from '../mypage/main/header';

import RankInfo from '../mypage/main/rank-info';
import GameMatchSegmentedButton from '../mypage/main/game-match-segmented-buttons';
import {useMatchStore} from '@src/store';
import {ChatStackParamList} from '@src/page';
import {StackScreenProps} from '@react-navigation/stack';
import useTabBarHid from '@src/hooks/use-tab-bar-hide';
import {ProfileSkeleton} from '../common';

type Props = StackScreenProps<ChatStackParamList, 'ChatUserProfile'>;
export default function ChatUserProfile(props: Props) {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ChatUserProfileComponent {...props} />
    </Suspense>
  );
}

function ChatUserProfileComponent({route, navigation}: Props) {
  const userId = route.params.userId;
  const profileType = route.params!.type;

  const {data} = useRiotInfo({userId});

  const match = useMatchStore().match;

  useTabBarHid(navigation);

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
        phone={data?.email || ''}
        uri={data?.summonerIconUrl}
        profileType={profileType}
        background={data?.backgroundImageUrl}
        lol={lol}
      />
      <View style={styles.body}>
        <GameMatchSegmentedButton />
        <RankInfo info={infos[match]} />
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
