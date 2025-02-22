import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {Suspense} from 'react';
import {useCheckRiotQuery, useUserInfoQuery} from '@src/api';
import {Avatar} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {StackScreenProps} from '@react-navigation/stack';
import {RootBottomTapParamList, SettingStackParamList} from '@src/page';
import {ListButton} from '@src/components';
import {useLogout} from '@src/hooks';
import {CompositeScreenProps} from '@react-navigation/native';

type Props = CompositeScreenProps<
  StackScreenProps<SettingStackParamList, 'defaultSetting'>,
  StackScreenProps<RootBottomTapParamList, 'Setting'>
>;
export default function DefaultSetting({navigation}: Props) {
  return (
    <View style={styles.basicContainer}>
      <Suspense
        fallback={
          <View>
            <Text>Loading</Text>
          </View>
        }>
        <SettingInfoHeader />
        <SettingList navigation={navigation} />
      </Suspense>
    </View>
  );
}

function SettingInfoHeader() {
  const {data} = useUserInfoQuery();
  const {
    data: {result},
  } = useCheckRiotQuery();

  return (
    <View style={headerStyles.container}>
      <Avatar.Image
        source={{uri: data?.summonerIconUrl}}
        size={responsiveScreenWidth(28)}
      />
      <Text style={[styles['font-2'], styles['font-bold'], styles.black]}>
        닉네임 : {data?.nickname}
      </Text>
      <Text style={[styles['font-2'], styles['font-bold'], styles.black]}>
        이메일 : {data?.email}
      </Text>
      <View style={styles.rowContainer}>
        <Text style={[styles['font-2'], styles['font-bold'], styles.black]}>
          롤 연동:
        </Text>
        <Text
          style={[
            styles['font-2'],
            styles['font-bold'],
            result ? styles.blue : styles.red,
          ]}>
          {result ? ' LoL 연동' : ' LoL 미연동'}
        </Text>
      </View>
    </View>
  );
}

function SettingList({navigation}: {navigation: Props['navigation']}) {
  const {
    data: {result},
  } = useCheckRiotQuery();
  const {data} = useUserInfoQuery();

  const navigateProfileSetting = () => {
    navigation.navigate('Setting', {
      screen: 'profileSetting',
      params: {nickname: data?.nickname || ''},
    });
  };

  const navigateTeamInfoSetting = () => {
    navigation.navigate('Setting', {screen: 'teamInfoSetting'});
  };

  const navigateLoLAccess = () => {
    navigation.navigate('MyPage', {
      screen: 'LoLAccount',
      params: {method: 'post', back: 'setting'},
    });
  };

  const logout = useLogout();

  const withDraw = () => {
    Alert.alert(
      '회원 탈퇴',
      '탈퇴 후에 그동안의 기록들을 복구 할 수 없어요! 정말 탈퇴하시겠어요?',
      [
        {
          text: '취소',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: '확인', onPress: () => console.log('OK Pressed')},
      ],
    );
  };
  return (
    <View style={menuStyles.menuContainer}>
      <View>
        <Text style={menuStyles.menuSubTitle}>사용자 설정</Text>
        {result && (
          <ListButton iconName={'gamepad-square'} onPress={navigateLoLAccess}>
            LoL 연동
          </ListButton>
        )}
        <ListButton iconName={'volume-high'} onPress={navigateProfileSetting}>
          알림 설정
        </ListButton>
        <ListButton iconName={'account'} onPress={navigateProfileSetting}>
          닉네임 변경
        </ListButton>
        <ListButton iconName={'door'} onPress={logout}>
          로그아웃
        </ListButton>
        <ListButton iconName={'delete'} onPress={withDraw}>
          회원탈퇴
        </ListButton>
      </View>
      <View>
        <Text style={menuStyles.menuSubTitle}>앱 정보</Text>
        <ListButton iconName={'thumb-up'} onPress={navigateProfileSetting}>
          평점 남기기
        </ListButton>
        <ListButton iconName={'group'} onPress={navigateTeamInfoSetting}>
          팀 소개
        </ListButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 4,
  },
  basicContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  'font-2': {
    fontSize: responsiveFontSize(2),
  },
  'font-bold': {
    fontWeight: 'bold',
  },
  black: {
    color: 'black',
  },
  red: {
    color: 'red',
  },
  blue: {
    color: 'blue',
  },
});

const headerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
});

const menuStyles = StyleSheet.create({
  menuContainer: {
    flex: 2,
    gap: 4,
    marginBottom: 100,
  },
  menuSubTitle: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: 'bold',
    marginVertical: 12,
  },
});
