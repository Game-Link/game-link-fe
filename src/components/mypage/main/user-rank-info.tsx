import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {LoLRankInfo} from '@src/api';
import WinLoosePieChart from './win-loose-pie-chart';
import {Span, TooltipBadge} from '@src/components';
import {IMAGES} from '@util';

export default function UserRankInfo({
  rank,
  tier,
  leaguePoints,
  wins,
  losses,
  veteran,
  freshBlood,
  hotStreak,
}: LoLRankInfo) {
  return (
    <View style={styles.accordionContainer}>
      <View style={styles.accordionHeader}>
        <Image source={IMAGES[tier]} style={styles.logo} />
        <Span style={styles.span} text={`${tier} ${rank} ${leaguePoints}pt`} />
      </View>
      <View style={styles.accordionTooltip}>
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
      <WinLoosePieChart win={wins} loose={losses} />
    </View>
  );
}

const styles = StyleSheet.create({
  accordionContainer: {
    paddingHorizontal: 15,
  },
  accordionHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionTooltip: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  span: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
