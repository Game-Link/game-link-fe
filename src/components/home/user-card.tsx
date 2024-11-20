import {
  View,
  Text,
  StyleSheet,
  Image,
  ViewStyle,
  StyleProp,
} from 'react-native';
import React from 'react';
import {ChatRoomUsers} from '@src/api';
import {Avatar} from 'react-native-paper';
import {
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {POSITION_IMAGES} from '@src/util';
import {ChampionInfo} from '../mypage';

// const width
type Props = {
  info: ChatRoomUsers;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function UserCard({info, containerStyle}: Props) {
  const {position, summonerIconUrl, summonerName, summonerTag, gameInfo} = info;

  const {
    tier,
    rank,
    leaguePoints,
    wins,
    losses,
    winRate,
    rankImageUrl,
    avgAssists,
    avgKills,
    avgDeaths,
    best3champions,
  } = gameInfo;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Avatar.Image
          source={{uri: summonerIconUrl}}
          size={responsiveWidth(22)}
        />
        <Text style={[styles.textColor, styles.name]}>
          {summonerName} #{summonerTag}
        </Text>
      </View>
      <View>
        {/* 티어 정보 */}
        <View style={styles.mainTop}>
          <View style={styles.rankImageContainer}>
            <Image
              source={{uri: rankImageUrl}}
              alt={rank}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.rankInfoContainer}>
            <Text
              style={[
                styles.textColor,
                styles.tierText,
                styles.texMarginVertical,
              ]}>{`${tier} ${rank}`}</Text>
            <Text style={[styles.tierDetailText, styles.texMarginVertical]}>
              {leaguePoints}LP
            </Text>
            <Text style={styles.tierDetailText}>
              {wins}승 {losses}패 {(winRate * 100).toFixed(0)}%
            </Text>
          </View>
        </View>
        {/* 승률 정보 */}
        <View style={styles.mainHorizontal}>
          <View style={styles.mainLeft}>
            <Text style={[styles.mainLeftTitle, styles.texMarginVertical]}>
              최근 20경기 정보
            </Text>
            <View style={[styles.leftRow, styles.texMarginVertical]}>
              <Text style={styles.leftKeyText}>승률</Text>
              <Text style={styles.leftValueText}>
                {(winRate * 100).toFixed(0)}%
              </Text>
            </View>
            <View style={styles.leftRow}>
              <Text style={styles.leftKeyText}>KDA</Text>
              <Text style={styles.leftValueText}>
                {avgKills}/{avgDeaths}/{avgAssists}
              </Text>
            </View>
          </View>
          <View style={styles.mainRigth}>
            <Text style={[styles.mainLeftTitle, styles.texMarginVertical]}>
              참여 포지션
            </Text>
            <Image
              source={POSITION_IMAGES[position]}
              alt={position}
              style={styles.positionImage}
            />
          </View>
        </View>
        {/* 챔피언 정보 */}
        <View style={styles.championContainer}>
          <View>
            {best3champions.map(champion => (
              <ChampionInfo
                champion={champion}
                avatarSize={48}
                winLoosesTextStyle={styles.championWhiteTextStyle}
                kdaTextStyle={styles.championWhiteTextStyle}
                winRateStyle={styles.championWinRateText}
                key={champion.championImageUrl}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: '80%',
    flex: 1,
    paddingVertical: responsiveHeight(2),
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveHeight(1),
  },
  textColor: {
    color: 'white',
  },
  texMarginVertical: {marginBottom: 4},
  name: {
    fontSize: responsiveScreenFontSize(2.5),
    marginTop: 8,
    fontWeight: 'bold',
  },
  mainTop: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainHorizontal: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rankImageContainer: {flexGrow: 1},
  rankImage: {
    width: responsiveWidth(32),
    height: responsiveHeight(16),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  rankInfoContainer: {
    flexGrow: 1,
    alignSelf: 'center',
  },
  tierText: {
    fontSize: responsiveScreenFontSize(2.5),
    fontWeight: 'bold',
  },
  tierDetailText: {
    color: '#B4C2DC',
    fontSize: responsiveScreenFontSize(1.5),
  },
  mainLeft: {
    borderRightColor: 'white',
    borderRightWidth: 1,
    flex: 0.5,
    padding: 8,
  },
  mainLeftTitle: {
    fontSize: responsiveScreenFontSize(1.6),
    color: '#CDFAFA',
    fontWeight: 'bold',
  },
  leftRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftKeyText: {
    color: '#B4C2DC',
    fontSize: responsiveScreenFontSize(1.5),
    marginRight: 8,
  },
  leftValueText: {
    color: 'white',
    fontSize: responsiveScreenFontSize(1.5),
  },
  mainRigth: {flex: 0.5, padding: 8},
  positionImage: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  championContainer: {
    marginVertical: 12,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  championWhiteTextStyle: {
    color: 'white',
    fontSize: responsiveScreenFontSize(2),
  },
  championWinRateText: {
    color: '#FF8085',
    fontSize: responsiveScreenFontSize(2),
  },
});
