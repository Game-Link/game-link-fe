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
            <Text key={index} style={[styles.log, index === 1 && styles.death]}>
              {`${log}`}
            </Text>
            {index !== 2 && <Text key={`${index}-indicator`}> / </Text>}
          </>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  death: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
  },
  log: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
});
