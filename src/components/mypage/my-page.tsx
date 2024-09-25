import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useRiotInfo} from '@src/api';

import MypageHeader from './main/header';
import MypageButtonGroup from './main/button-group';
import MypageAccordion from './main/my-page-accordion';

export default function Profile() {
  const {data, isSuccess} = useRiotInfo();

  if (isSuccess) {
    console.log(data);
  }
  const soloRank = data?.soloRank;
  const teamRank = data?.teamRank;

  return (
    <View style={styles.container}>
      <MypageHeader
        nickname={'닉네임'}
        phone={'전화번호'}
        lol={
          data && {
            summonerName: data.summonerName,
            summonerTag: data.summonerTag,
          }
        }
      />
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
});
