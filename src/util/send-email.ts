import {Alert, Dimensions, Linking, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {EMAIL} from './constants';
import * as Sentry from '@sentry/react-native';

export const sendEmail = async (email?: string) => {
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
    User Account: ${email}
    `;

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
    title,
  )}&body=${encodeURIComponent(body)}`;

  Linking.openURL(mailto).catch(e => {
    Alert.alert('Error', '메일을 연결할 수 없습니다.');
    console.error(e);
    Sentry.captureException(e);
  });
};
