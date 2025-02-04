import React, {Suspense} from 'react';
import {StyleSheet, View} from 'react-native';

import {useRiotInfo} from '@src/api';

import {
  MypageHeader,
  RankInfo,
  GameMatchSegmentedButton,
  LinkButton,
  ProfileSkeleton,
} from '@src/components';

import {useMatchStore} from '@src/store';
import {ChatStackParamList} from '@src/page';
import {StackScreenProps} from '@react-navigation/stack';

import {useTabBarHide} from '@src/hooks';

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
  useTabBarHide(navigation, false);
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
        phone={data?.email || ''}
        uri={data?.summonerIconUrl}
        profileType={profileType}
        background={data?.backgroundImageUrl}
        lol={lol}
        linkButton={
          <LinkButton
            to={{
              screen: 'ChatUserMatchDetail',
              params: {userId, nickname: data?.nickname},
            }}
            mode="contained"
            labelStyle={styles.headerButtonText}
            style={styles.headerButton}
            theme={{colors: {primary: '#8e7cc3', outline: 'white'}}}>
            매치 상세 정보
          </LinkButton>
        }
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
  headerButton: {
    marginRight: 4,
  },
  headerButtonText: {
    fontSize: 12,
  },
});
