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
  const killDeathRatio = ((kills + assists) / deaths).toFixed(2);

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={avatarSize}
        source={{uri: championImageUrl}}
        style={styles.champion}
      />
      <Text style={[styles.winRate, winRateStyle]}>{`${Math.floor(
        winRate * 100,
      )}%`}</Text>
      <Text style={[winLoosesTextStyle]}>{`(${wins}W ${losses}L)`}</Text>
      <Text style={[styles.kda, kdaTextStyle]}>{`${killDeathRatio} KDA`}</Text>
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
    color: 'red',
    marginRight: 4,
  },
  kda: {
    marginHorizontal: 4,
    color: 'black',
  },
});
