import {View, Text, StyleSheet, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import {BestChampion} from '@src/api';
import {Avatar} from 'react-native-paper';

type Props = {
  champion: BestChampion;
  avatarSize?: number;
  winLoosesTextStyle?: StyleProp<TextStyle>;
  kdaTextStyle?: StyleProp<TextStyle>;
  winRateStyle?: StyleProp<TextStyle>;
};

export default function ChampionInfo({
  champion,
  winLoosesTextStyle,
  kdaTextStyle,
  winRateStyle,
  avatarSize = 40,
}: Props) {
  const {kills, assists, deaths, championImageUrl, winRate, wins, losses} =
    champion;
  const killDeathRatio = (kills + assists) / deaths;

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={avatarSize}
        source={{uri: championImageUrl}}
        style={styles.champion}
      />
      <Text
        style={[
          styles.winRate,
          winRateStyle,
          winRate * 100 >= 60 && {color: 'red'},
        ]}>{`${Math.floor(winRate * 100)}%`}</Text>
      <Text style={[winLoosesTextStyle]}>{`(${wins}W ${losses}L)`}</Text>
      <Text
        style={[
          styles.kda,
          kdaTextStyle,
          killDeathRatio >= 3 && killDeathRatio <= 5 && {color: 'green'},
          killDeathRatio > 5 && {color: 'red'},
        ]}>
        {killDeathRatio.toFixed(2)}
      </Text>
      <Text style={[styles.kdastring, kdaTextStyle]}>KDA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  champion: {
    marginRight: 4,
  },
  winRate: {
    color: 'black',
    marginRight: 4,
  },
  kda: {
    marginLeft: 4,
    marginRight: 2,
    color: 'black',
  },
  kdastring: {
    color: 'black',
  },
});
