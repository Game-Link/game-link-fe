import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {BestChampion} from '@src/api';

export default function ChampionInfo({
  winRate,
  wins,
  losses,
  kills,
  deaths,
  assists,
  championName,
}: BestChampion) {
  const killDeathRatio = ((kills + assists) / deaths).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.champion}>{championName}</Text>
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
    alignItems: 'flex-start',
  },
  champion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
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
