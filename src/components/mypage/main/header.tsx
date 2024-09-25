import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';
import {Span} from '@src/components';

type Props = {
  nickname: string;
  phone: string;
  lol?: {
    summonerName: string;
    summonerTag: string;
  };
};

export default function MypageHeader({lol, nickname, phone}: Props) {
  return (
    <View style={styles.avatarContainer}>
      <Avatar.Image
        size={70}
        source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
        style={{marginRight: 10}}
      />
      <View>
        <View style={styles.nicknameContainer}>
          <Span
            style={styles.avatarName}
            text={
              lol
                ? `${nickname} ${lol.summonerName}#${lol.summonerTag}`
                : nickname
            }
          />
          <Pressable style={styles.nicknameButton}>
            <Text style={styles.nicknameButtonText}>변경</Text>
          </Pressable>
        </View>
        <Span text={phone} />
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
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarName: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  nicknameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nicknameButton: {
    padding: 3,
    backgroundColor: '#8e7cc3',
    marginLeft: 4,
    borderRadius: 5,
  },
  nicknameButtonText: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
  },
});
