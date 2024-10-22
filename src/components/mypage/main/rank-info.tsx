import {LoLRankInfo} from '@src/api';
import {NotFound, Span, TooltipBadge} from '@src/components';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import ChampionInfo from './champion-info';
import WinRateCircle from './win-rate-circle';
import KillLog from './kill-log';
import unRankImage from '@src/assets/unranked.png';

type Props = {
  info: LoLRankInfo | null;
};

export default function RankInfo({info}: Props) {
  if (!info) {
    return <NotFound />;
  }
  //console.log(unRankImage);

  const {
    rankImageUrl,
    tier,
    rank,
    leaguePoints,
    wins,
    losses,
    winRate,
    avgKills,
    avgDeaths,
    avgAssists,
    veteran,
    freshBlood,
    hotStreak,
    best3champions,
  } = info;

  console.log(rankImageUrl);
  return (
    <View style={styles.body}>
      <View style={styles.dataBox}>
        <View style={styles.rankInfo}>
          {rankImageUrl ? (
            <Image source={{uri: rankImageUrl}} style={styles.logo} />
          ) : (
            <Image source={unRankImage} style={styles.unRankImage} />
          )}

          <View>
            <View style={styles.toolTip}>
              {freshBlood && (
                <TooltipBadge
                  title="신입생"
                  description="최근 티어가 상승했습니다."
                  icon="alpha-n"
                />
              )}
              {hotStreak && (
                <TooltipBadge
                  title="연전연승"
                  icon="fire"
                  description="연승을 이어나가고 있는 플레이어 입니다!"
                />
              )}
              {veteran && (
                <TooltipBadge
                  title="고인물"
                  description=" 해당 티어에 상주하고 있으십니다!"
                  icon="water-plus"
                />
              )}
            </View>
            <View>
              <Span
                style={styles.tierInfo}
                text={
                  rankImageUrl
                    ? `${tier} ${rank} ${leaguePoints}pt`
                    : 'Unranked'
                }
              />
              <Span
                text={`${wins}승 ${losses}패 (${Math.floor(winRate * 100)}%)`}
              />
            </View>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.winRate}>
            <Span text="승률 요약 정보" style={styles.title} />
            <WinRateCircle wins={wins} losses={losses} />
            <KillLog
              avgAssists={avgAssists}
              avgDeaths={avgDeaths}
              avgKills={avgKills}
              wins={wins}
              losses={losses}
            />
          </View>
          <View style={styles.championBox}>
            <Span text="챔프 스코어" style={styles.title} />
            {best3champions.map(champion => (
              <ChampionInfo {...champion} key={champion.championName} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 0.8,
  },

  dataBox: {
    flex: 1,
  },
  rowContainer: {
    flex: 3,
    display: 'flex',
    flexDirection: 'row',
  },
  championBox: {
    flex: 1,
    borderBlockColor: 'gray',
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 2,
    marginVertical: 2,
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  unRankImage: {
    width: 100,
    height: 70,
    marginRight: 10,
  },
  toolTip: {
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
  tierInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 4,
  },
  winRate: {
    flex: 0.6,
    borderBlockColor: 'gray',
    display: 'flex',
    alignItems: 'center',
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 2,
    marginVertical: 2,
  },
  title: {
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
  },
});
