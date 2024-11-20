import {View, StyleSheet} from 'react-native';
import React from 'react';

import {HomeStackParamList} from '@src/page';
import {StackScreenProps} from '@react-navigation/stack';
import {ChatRoomUsers, useChatroomUsersInfoQuery} from '@src/api';
import UserCard from './user-card';
import {Carousel, LinkButton} from '@src/components';
import {POSITION_IMAGES, WINDOW_WIDTH} from '@src/util';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import {useTabBarHide} from '@src/hooks';

const Mock: ChatRoomUsers[] = [
  {
    userId: '07e5c1bb-1b21-4663-9ac5-1ac6c79dc966',
    position: 'JUNGLE',
    nickname: '준석 닉네임',
    backgroundImageUrl:
      'https://gamelink-dev.s3.ap-northeast-2.amazonaws.com/champion-background/Khazix_1.jpg',
    email: 'js9534@jr.naver.com',
    puuid:
      'Fad8QpaTI_reQHaas-wrCnrjt2MLuXXlDs9Bk1CoITpfaew_q6Z8HUDmpeJeVE8zwMj_gXdDBnlq5w',
    summonerId: 'YgSUCfXQLo9TesdY16mWtlSIaEahuj9uAjLVkNgNE2CLDA',
    summonerName: '꾸레식 축구',
    summonerTag: 'KR1',
    summonerIconUrl:
      'https://ddragon.leagueoflegends.com/cdn/14.18.1/img/profileicon/4832.png',
    revisionDate: '2024-11-20T13:15:38.856672',
    summonerLevel: 314,
    gameInfo: {
      gameType: 'SOLO_RANK',
      rankImageUrl:
        'https://gamelink-dev.s3.ap-northeast-2.amazonaws.com/lol-tier-image/silver.png',
      tier: 'SILVER',
      rank: 'I',
      leaguePoints: 75,
      wins: 10,
      losses: 10,
      winRate: 0.5,
      kda: 2.7555555555555555,
      avgKills: 4.6,
      avgDeaths: 4.5,
      avgAssists: 7.8,
      avgCs: 95.35,
      best3champions: [
        {
          championImageUrl:
            'https://gamelink-dev.s3.ap-northeast-2.amazonaws.com/champion-profile/TahmKench_0.jpg',
          kills: 4.8,
          deaths: 3,
          assists: 14.6,
          winRate: 1,
          wins: 5,
          losses: 0,
        },
        {
          championImageUrl:
            'https://gamelink-dev.s3.ap-northeast-2.amazonaws.com/champion-profile/Teemo_0.jpg',
          kills: 6.666666666666667,
          deaths: 5.666666666666667,
          assists: 2.6666666666666665,
          winRate: 0.3333333333333333,
          wins: 1,
          losses: 2,
        },
        {
          championImageUrl:
            'https://gamelink-dev.s3.ap-northeast-2.amazonaws.com/champion-profile/Graves_0.jpg',
          kills: 3.3333333333333335,
          deaths: 4.666666666666667,
          assists: 3,
          winRate: 0,
          wins: 0,
          losses: 3,
        },
      ],
      veteran: false,
      inactive: false,
      freshBlood: false,
      hotStreak: false,
    },
  },
  {
    userId: '07e5c1bb-1b21-4663-9ac5-1ac6c79dc962',
    nickname: '준석 닉네임2',
    backgroundImageUrl:
      'https://gamelink-dev.s3.ap-northeast-2.amazonaws.com/champion-background/Khazix_1.jpg',
    email: 'js9534@jr.naver.com',
    position: 'MID',
    puuid:
      'Fad8QpaTI_reQHaas-wrCnrjt2MLuXXlDs9Bk1CoITpfaew_q6Z8HUDmpeJeVE8zwMj_gXdDBnlq5w',
    summonerId: 'YgSUCfXQLo9TesdY16mWtlSIaEahuj9uAjLVkNgNE2CLDA',
    summonerName: '꾸레식 축구',
    summonerTag: 'KR1',
    summonerIconUrl:
      'https://ddragon.leagueoflegends.com/cdn/14.18.1/img/profileicon/4832.png',
    revisionDate: '2024-11-20T13:15:38.856672',
    summonerLevel: 314,
    gameInfo: {
      gameType: 'SOLO_RANK',
      rankImageUrl:
        'https://gamelink-dev.s3.ap-northeast-2.amazonaws.com/lol-tier-image/challenger.png',
      tier: 'GOLD',
      rank: 'I',
      leaguePoints: 75,
      wins: 10,
      losses: 10,
      winRate: 0.5,
      kda: 2.7555555555555555,
      avgKills: 4.6,
      avgDeaths: 4.5,
      avgAssists: 7.8,
      avgCs: 95.35,
      best3champions: [
        {
          championImageUrl:
            'https://gamelink-dev.s3.ap-northeast-2.amazonaws.com/champion-profile/TahmKench_0.jpg',
          kills: 4.8,
          deaths: 3,
          assists: 14.6,
          winRate: 1,
          wins: 5,
          losses: 0,
        },
        {
          championImageUrl:
            'https://gamelink-dev.s3.ap-northeast-2.amazonaws.com/champion-profile/Teemo_0.jpg',
          kills: 6.666666666666667,
          deaths: 5.666666666666667,
          assists: 2.6666666666666665,
          winRate: 0.3333333333333333,
          wins: 1,
          losses: 2,
        },
        {
          championImageUrl:
            'https://gamelink-dev.s3.ap-northeast-2.amazonaws.com/champion-profile/Graves_0.jpg',
          kills: 3.3333333333333335,
          deaths: 4.666666666666667,
          assists: 3,
          winRate: 0,
          wins: 0,
          losses: 3,
        },
      ],
      veteran: false,
      inactive: false,
      freshBlood: false,
      hotStreak: false,
    },
  },
];

export default function ChatUserList({
  navigation,
  route,
}: StackScreenProps<HomeStackParamList, 'ChatUserList'>) {
  console.log(navigation, route);
  const {roomId, roomName, userCount, maxUserCount, positions, leaderTier} =
    route.params;

  // const userInfoQuery = useChatroomUsersInfoQuery(roomId);
  useTabBarHide(navigation);

  return (
    <View style={styles.container}>
      <Carousel
        data={Mock}
        renderItem={({item}) => (
          <UserCard
            info={item}
            navigationButton={
              <LinkButton
                to={{
                  screen: 'Chat',
                  params: {
                    screen: 'ChatUserProfile',
                    params: {
                      userId: item.userId,
                      tyope: 'USER_INFO',
                    },
                  },
                }}
                mode="contained">
                상세 정보 확인하기
              </LinkButton>
            }
          />
        )}
        keyExtractor={data => data.userId}
        isIconButton={false}
        itemStyle={styles.itemContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    flex: 1,
    paddingHorizontal: 8,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  itemContainer: {
    backgroundColor: 'rgba(36, 46, 69, 1)',
    borderWidth: 1,
    height: WINDOW_HEIGHT * 0.86,
    width: WINDOW_WIDTH - 18 * 2,
    marginLeft: 8,
    borderRadius: 10,
  },
});
