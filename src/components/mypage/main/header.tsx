import LinearGradient from 'react-native-linear-gradient';
import {View, Text, StyleSheet, Pressable, ImageBackground} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';
import {LinkButton, RiotRefreshButton, Span} from '@src/components';
import {ProfileType} from '@src/page';

type Props = {
  userId: string;
  nickname: string;
  profileType: ProfileType;
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
  profileType,
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
      style={styles.imageBackground}>
      {/* 하단 그림자 처리용 그라데이션 */}
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 1)']}
        style={styles.gradient}
      />

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
              to={{screen: 'MyMatchDetailInfo'}}
              mode="contained"
              labelStyle={styles.headerButtonText}
              style={styles.headerButton}
              theme={{colors: {primary: '#8e7cc3', outline: 'white'}}}>
              매치 상세 정보
            </LinkButton>
            <RiotRefreshButton
              userId={userId}
              type={profileType}
              mode="contained"
              labelStyle={styles.headerButtonText}
              theme={{colors: {primary: '#8e7cc3', outline: 'white'}}}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  avatarContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 5,
    paddingBottom: 10,
    zIndex: 1, // 그라데이션 위에 컨텐츠 배치
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
