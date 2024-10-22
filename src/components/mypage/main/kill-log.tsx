import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

type Props = {
  avgKills: number;
  avgDeaths: number;
  avgAssists: number;
  wins: number;
  losses: number;
};

export default function KillLog({
  avgKills,
  avgAssists,
  avgDeaths,
  wins,
  losses,
}: Props) {
  const killLog = [avgKills, avgDeaths, avgAssists];
  const killDeathRatio = ((avgKills + avgAssists) / avgDeaths).toFixed(2);
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.log}>{wins}W</Text>
        <Text> / </Text>
        <Text style={styles.death}>{losses}L</Text>
      </View>

      <View style={styles.container}>
        {killLog.map((log, index) => (
          <>
            <Text
              key={`${index}-${log}`}
              style={[styles.log, index === 1 && styles.death]}>
              {`${log}`}
            </Text>
            {index !== 2 && <Text key={`${index}-indicator`}> / </Text>}
          </>
        ))}
      </View>
      <Text style={styles.killDeatRatio}>{killDeathRatio} : 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  death: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'red',
  },
  log: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  killDeatRatio: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
