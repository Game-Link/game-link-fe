import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
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
  useTabBarHide();
  return (
    <View style={styles.container}>
      <NavigateService
        title="서비스 이용약관"
        url="termOfUseDetailSetting"
        navigation={navigation}
      />
      <NavigateService
        title="개인정보 처리방침"
        url="privacyDetailSetting"
        navigation={navigation}
      />
    </View>
  );
}

type NoParamScreens = {
  [K in keyof SettingStackParamList]: SettingStackParamList[K] extends undefined
    ? K
    : never;
}[keyof SettingStackParamList];

type NavigateServiceProps = {
  title: string;
  url: NoParamScreens;
  navigation: TermOfUseSettingProps['navigation'];
};
function NavigateService({title, url, navigation}: NavigateServiceProps) {
  const navigate = () => {
    navigation.navigate(url);
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
