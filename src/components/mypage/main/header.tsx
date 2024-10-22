import {View, Text, StyleSheet, Pressable, ImageBackground} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';
import {LinkButton, RiotRefreshButton, Span} from '@src/components';

type Props = {
  userId: string;
  nickname: string;
  phone: string;
  uri?: string;
  background?: string;
  lol?: {
    summonerName: string;
    summonerTag: string;
  };
};

export default function MypageHeader({
  userId,
  lol,
  nickname,
  phone,
  uri,
  background,
}: Props) {
  return (
    <ImageBackground
      resizeMode="cover"
      source={
        background
          ? {uri: background}
          : require('../../../assets/background.jpeg')
      }
      style={styles.avatarContainer}>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={70}
          source={{
            uri: uri || 'https://bootdey.com/img/Content/avatar/avatar6.png',
          }}
          style={styles.avatar}
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
          <Span text={phone} style={styles.email} />
          <View style={styles.headerButtonBox}>
            <LinkButton
              to={{screen: 'MatchDetailInfo'}}
              mode="contained"
              labelStyle={styles.headerButtonText}
              style={styles.headerButton}
              theme={{colors: {primary: 'black', outline: 'white'}}}>
              매치 상세 정보
            </LinkButton>
            <RiotRefreshButton
              userId={userId}
              type="MY_INFO"
              mode="contained"
              labelStyle={styles.headerButtonText}
              theme={{colors: {primary: 'black', outline: 'white'}}}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    flex: 0.6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },

  avatarName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  email: {
    fontSize: 12,
    color: 'white',
  },
  headerButtonBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  headerButton: {
    marginRight: 4,
  },
  headerButtonText: {
    fontSize: 12,
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
  avatar: {
    marginRight: 8,
  },
});
