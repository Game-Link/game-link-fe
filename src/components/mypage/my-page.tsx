import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {useRiotInfo} from '@src/api';

import MypageHeader from './main/header';
import MypageButtonGroup from './main/button-group';
import MypageAccordion from './main/my-page-accordion';
import {SegmentedButton, Span, TooltipBadge} from '@src/components';

export default function Profile() {
  const {data, isSuccess} = useRiotInfo();

  if (isSuccess) {
    console.log(data, '==== MY PAGE PROFILE ====');
  }
  const soloRank = data?.soloRank;
  const teamRank = data?.teamRank;

  const [tagValue, setTagValue] = useState<'All' | 'Solo' | 'Team'>('All');

  return (
    <View style={styles.container}>
      <MypageHeader
        nickname={data?.nickname || ''}
        phone={data?.email || ''}
        uri={data?.summonerIconUrl}
        lol={
          data && {
            summonerName: data.summonerName,
            summonerTag: data.summonerTag,
          }
        }
      />
      <SegmentedButton
        value={tagValue}
        onValueChange={setTagValue}
        buttons={[
          {
            value: 'All',
            label: '전체 경기',
            labelStyle: styles.button,
            checkedColor: 'black',
          },
          {
            value: 'Solo',
            label: '개인/2인 랭크',
            labelStyle: styles.button,
            checkedColor: 'black',
          },
          {
            value: 'Team',
            label: '팀 랭크',
            labelStyle: styles.button,
            checkedColor: 'black',
          },
        ]}
        style={styles.segmetedButton}
      />
      <View style={styles.dataBox}>
        <View style={styles.rankInfo}>
          <Image
            source={{uri: data?.soloRank?.rankImageUrl}}
            style={styles.logo}
          />
          <View>
            <View style={styles.toolTip}>
              {
                <TooltipBadge
                  title="신입생"
                  description="최근 티어가 상승했습니다."
                  icon="alpha-n"
                />
              }
              {
                <TooltipBadge
                  title="연전연승"
                  icon="fire"
                  description="연승을 이어나가고 있는 플레이어 입니다!"
                />
              }
              {
                <TooltipBadge
                  title="고인물"
                  description=" 해당 티어에 상주하고 있으십니다!"
                  icon="water-plus"
                />
              }
            </View>
            <View>
              <Span
                style={styles.tierInfo}
                text={`${data?.soloRank?.tier} ${data?.soloRank?.rank} ${data?.soloRank?.leaguePoints}pt`}
              />
            </View>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.rowItem}></View>
          <View style={styles.rowItem}></View>
        </View>
      </View>
      <MypageButtonGroup isLogin={data ? true : false} />
      <View style={styles.bodyContent}>
        <MypageAccordion soloRank={soloRank} teamRank={teamRank} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    fontWeight: 'bold',
  },
  bodyContent: {
    flex: 1,
  },
  segmetedButton: {
    marginVertical: 10,
    borderRadius: 0,
  },
  button: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  dataBox: {
    flex: 1,
  },
  rowContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  rowItem: {
    flex: 1,
    borderBlockColor: 'gray',
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 2,
    marginVertical: 2,
  },
  logo: {
    width: 100,
    height: 100,
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
});
