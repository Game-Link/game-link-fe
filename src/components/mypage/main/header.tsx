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
      {/* 반투명한 오버레이 */}
      <View style={styles.overlay} />
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
              theme={{colors: {primary: 'black', outline: 'white'}}}>
              매치 상세 정보
            </LinkButton>
            <RiotRefreshButton
              userId={userId}
              type={profileType}
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
  imageBackground: {
    flex: 1,
    position: 'relative', // 오버레이를 위에 겹치게 하기 위해 필요
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // 전체 화면을 덮는 스타일
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 어두운 반투명 오버레이
  },
  avatarContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 5,
    paddingBottom: 10,
    zIndex: 1, // 오버레이 위에 컨텐츠를 위치시키기 위해 zIndex 설정
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
