import LinearGradient from 'react-native-linear-gradient';
import {View, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';
import {RiotRefreshButton, Span} from '@src/components';
import {ProfileType} from '@src/page';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {DEFAULT_STYLES} from '@src/util';

type Props = {
  userId: string;
  nickname: string;
  profileType: ProfileType;
  uri?: string;
  background?: string;
  lol?: {
    summonerName: string;
    summonerTag: string;
  };
  linkButton: React.ReactElement;
};

export default function MypageHeader({
  userId,
  lol,
  nickname,
  profileType,
  uri,
  background,
  linkButton,
}: Props) {
  const riotName = lol ? `${lol.summonerName}#${lol.summonerTag}` : '';
  return (
    <ImageBackground
      resizeMode="cover"
      source={background ? {uri: background} : {uri: ''}}
      style={styles.imageBackground}>
      {/* 하단 그림자 처리용 그라데이션 */}
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 1)']}
        style={styles.gradient}
      />

      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={responsiveScreenWidth(20)}
          source={{
            uri: uri || 'https://bootdey.com/img/Content/avatar/avatar6.png',
          }}
          style={styles.avatar}
        />
        <View>
          <View style={styles.nicknameContainer}>
            <Span style={styles.avatarName} text={`${nickname} `} />
          </View>
          <Span style={styles.avatarName} text={`${riotName}`} />
          {background && (
            <View style={styles.headerButtonBox}>
              {linkButton}
              <RiotRefreshButton
                userId={userId}
                type={profileType}
                mode="contained"
                labelStyle={styles.headerButtonText}
                theme={{
                  colors: {
                    primary: DEFAULT_STYLES.color.main,
                    outline: DEFAULT_STYLES.color.white,
                  },
                }}
              />
            </View>
          )}
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
    paddingHorizontal: DEFAULT_STYLES.size['4'],
    paddingBottom: DEFAULT_STYLES.size['12'],
    zIndex: 1,
  },
  avatarName: {
    fontSize: DEFAULT_STYLES.fontSize.large,
    fontWeight: 'bold',
    color: DEFAULT_STYLES.color.white,
  },
  headerButtonBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DEFAULT_STYLES.size['4'],
  },
  headerButton: {
    marginRight: DEFAULT_STYLES.size['4'],
  },
  headerButtonText: {
    fontSize: DEFAULT_STYLES.fontSize.medium,
  },
  nicknameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: DEFAULT_STYLES.size['8'],
  },
});
