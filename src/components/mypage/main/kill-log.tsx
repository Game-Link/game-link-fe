import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

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
  const killDeathRatio = (avgKills + avgAssists) / avgDeaths;
  console.log(killDeathRatio);
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.log}>{wins}W</Text>
        <Text> / </Text>
        <Text style={styles.death}>{losses}L</Text>
      </View>

      <View style={styles.container}>
        {killLog.map((log, index) => (
          <View key={`${index}-${log}`} style={styles.container}>
            <Text style={[styles.log, index === 1 && styles.death]}>
              {`${log.toFixed(2)}`}
            </Text>
            {index !== 2 && <Text> / </Text>}
          </View>
        ))}
      </View>
      <View style={styles.killDeathRatioContainer}>
        <Text
          style={[
            styles.killDeathRatio,
            killDeathRatio >= 3 && killDeathRatio <= 5 && {color: 'green'},
            killDeathRatio > 5 && {color: 'red'},
          ]}>
          {Number.isNaN(killDeathRatio) ? '0' : `${killDeathRatio.toFixed(2)}`}
        </Text>
        {!Number.isNaN(killDeathRatio) && (
          <Text style={styles.killDeathRatio}> : 1</Text>
        )}
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
    fontSize: responsiveFontSize(1.6),
    fontWeight: 'bold',
    color: 'red',
  },
  log: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: 'bold',
    color: 'black',
  },
  killDeathRatioContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  killDeathRatio: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: 'black',
  },
});
