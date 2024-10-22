import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {BestChampion} from '@src/api';
import {Avatar} from 'react-native-paper';

export default function ChampionInfo({
  winRate,
  wins,
  losses,
  kills,
  deaths,
  assists,
  championImageUrl,
}: BestChampion) {
  const killDeathRatio = ((kills + assists) / deaths).toFixed(2);

  return (
    <View style={styles.container}>
      <Avatar.Image
        size={40}
        source={{uri: championImageUrl}}
        style={styles.champion}
      />
      <Text style={styles.winRate}>{`${Math.floor(winRate * 100)}%`}</Text>
      <Text>{`(${wins}W ${losses}L)`}</Text>
      <Text style={styles.kda}>{`${killDeathRatio} KDA`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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
