import {
  View,
  Text,
  StyleSheet,
  Alert,
  Linking,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {Suspense} from 'react';
import {useCheckRiotQuery, useUserInfoQuery} from '@src/api';
import {Avatar, Icon, Switch} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {StackScreenProps} from '@react-navigation/stack';
import {RootBottomTapParamList, SettingStackParamList} from '@src/page';
import {ListButton} from '@src/components';
import {useLogout} from '@src/hooks';
import {CompositeScreenProps} from '@react-navigation/native';
import {useNotificationStore} from '@src/store';
import {EMAIL} from '@src/util';
import DeviceInfo from 'react-native-device-info';

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
      {data?.summonerIconUrl ? (
        <Avatar.Image
          source={{uri: data?.summonerIconUrl}}
          size={responsiveScreenWidth(28)}
        />
      ) : (
        <Avatar.Icon icon={'account'} size={responsiveScreenWidth(28)} />
      )}
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

  const {state, setState} = useNotificationStore();
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

  const navigateTermOfUseSetting = () => {
    navigation.navigate('Setting', {screen: 'termOfUseSetting'});
  };

  const navigateLoLAccess = () => {
    navigation.navigate('MyPage', {
      screen: 'LoLAccount',
      params: {method: 'post', back: 'setting'},
    });
  };

  const navigateRating = () => {
    const iosStoreUrl = 'https://apps.apple.com/app';
    const androidStoreUrl = 'https://play.google.com/store/apps';
    const url = Platform.OS === 'ios' ? iosStoreUrl : androidStoreUrl;
    Linking.openURL(url);
  };

  const sendEmail = async () => {
    const title = `[GAME LINK][${
      Platform.OS === 'ios' ? 'IOS' : 'ANDROID'
    }] FEEDBACK`;

    const deviceModel = DeviceInfo.getModel();
    const systemVersion = DeviceInfo.getSystemVersion();
    const appVersion = DeviceInfo.getVersion(); // 앱 버전 정보
    const {width, height} = Dimensions.get('window');

    const body = `내용을 입력해주세요
    ----------------------
    아래의 정보는 여러분의 문제를 원활히 해결하기 위한 정보입니다.
    Device Model: ${deviceModel} [${width.toFixed(0)} X ${height.toFixed(0)}]
    OS Version: ${Platform.OS} ${systemVersion}
    App Version: ${appVersion}
    User Account: ${data?.email}
    `;

    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
      title,
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailto).catch(() => {
      Alert.alert('Error', '메일을 연결할 수 없습니다.');
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
    <ScrollView style={menuStyles.menuContainer}>
      <View>
        <Text style={menuStyles.menuSubTitle}>사용자 설정</Text>
        {!result && (
          <ListButton iconName={'gamepad-square'} onPress={navigateLoLAccess}>
            LoL 연동
          </ListButton>
        )}
        <TouchableWithoutFeedback onPress={setState}>
          <View style={[styles.rowContainer, menuStyles.verticalMargin]}>
            <View style={styles.innerRowContainer}>
              <Icon source={'volume-high'} size={24} />
              <Text style={menuStyles.text}>알림 설정</Text>
            </View>
            <Switch value={state} onChange={setState} />
          </View>
        </TouchableWithoutFeedback>

        <ListButton
          iconName={'cog'}
          onPress={() => {
            Linking.openSettings();
          }}>
          상세 설정
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
        <Text style={menuStyles.menuSubTitle}>지원</Text>
        <ListButton iconName={'email'} onPress={sendEmail}>
          문의하기
        </ListButton>
      </View>

      <View>
        <Text style={menuStyles.menuSubTitle}>앱 정보</Text>
        <ListButton iconName={'thumb-up'} onPress={navigateRating}>
          평점 남기기
        </ListButton>
        <ListButton iconName={'information'} onPress={navigateTeamInfoSetting}>
          팀 소개
        </ListButton>
        <ListButton iconName={'file-check'} onPress={navigateTermOfUseSetting}>
          서비스 이용약관
        </ListButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
  },
  innerRowContainer: {
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
  },
});

const menuStyles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    gap: 4,
    marginBottom: 100,
    marginTop: 12,
  },
  menuSubTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginVertical: 12,
  },
  text: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  verticalMargin: {
    marginVertical: 8,
  },
});
