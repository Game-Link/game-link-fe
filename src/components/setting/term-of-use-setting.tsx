import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Linking,
  Alert,
} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {SettingStackParamList} from '@src/page';
import {useTabBarHide} from '@src/hooks';
import {Icon} from 'react-native-paper';

type TermOfUseSettingProps = StackScreenProps<
  SettingStackParamList,
  'termOfUseSetting'
>;

export default function TermOfUseSetting({navigation}: TermOfUseSettingProps) {
  useTabBarHide(navigation);
  return (
    <View style={styles.container}>
      <NavigateService title="서비스 이용약관" url="" />
      <NavigateService title="개인정보 처리방침" url="" />
    </View>
  );
}

function NavigateService({title, url}: {title: string; url: string}) {
  const navigate = () => {
    Linking.openURL(url).catch(() => {
      Alert.alert('해당 페이지를 찾을 수 없습니다.');
    });
  };
  return (
    <TouchableWithoutFeedback onPress={navigate}>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>{title}</Text>
        <Icon source={'chevron-right'} size={28} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
});
