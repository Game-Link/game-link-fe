import {LogoutButton, RiotAccountButton} from '@src/components/common';
import React from 'react';
import {StyleSheet, View} from 'react-native';

type Props = {
  isLogin: boolean;
};

export default function MypageButtonGroup({isLogin}: Props) {
  return (
    <View style={styles.buttonView}>
      <RiotAccountButton style={styles.ritotAccountButton} isLogin={isLogin} />
      <LogoutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ritotAccountButton: {
    marginRight: 4,
  },
});
