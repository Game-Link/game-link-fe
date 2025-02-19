import {View, Text, StyleSheet, Image, Linking, Alert} from 'react-native';
import React from 'react';
import AppIcon from '@src/assets/appstore.png';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Icon} from 'react-native-paper';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {EMAIL} from '@src/util';

const FE_GITHUB = 'https://github.com/kd02109';
const BE_GITHUB = 'https://github.com/gutanbug';

type IntroduceDeveloperProps = {
  url: string;
  title: string;
  nickname: string;
  start?: boolean;
  end?: boolean;
};
function IntroduceDeveloper({
  url,
  title,
  nickname,
  start,
  end,
}: IntroduceDeveloperProps) {
  const linkGithub = () => {
    Linking.openURL(url);
  };
  return (
    <View
      style={[
        introduceStyle.container,
        start && introduceStyle.startLine,
        end && introduceStyle.endLine,
      ]}>
      <View>
        <Text style={introduceStyle.title}>{title}</Text>
        <Text style={introduceStyle.nickname}>{nickname}</Text>
      </View>
      <TouchableWithoutFeedback onPress={linkGithub}>
        <Icon source={'github'} size={32} />
      </TouchableWithoutFeedback>
    </View>
  );
}

const introduceStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderColor: '#8e7cc3',
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  startLine: {
    borderTopWidth: 1,
    borderBottomWidth: 0,
  },
  endLine: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  imageContainer: {
    borderWidth: 1,
  },
  title: {
    color: '#8e7cc3',
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
  },
  nickname: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    fontWeight: 'bold',
  },
});

export default function TeamInfoSetting() {
  const sendEmail = () => {
    const mailto = `mailto:${EMAIL}`;

    Linking.openURL(mailto).catch(() => {
      Alert.alert('Error', '메일 앱을 열 수 없습니다.');
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={AppIcon} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <TouchableWithoutFeedback onPress={sendEmail}>
          <View style={styles.rowContainer}>
            <Icon source={'email'} size={32} />
            <Text style={styles.title}>Contact GameLink</Text>
          </View>
        </TouchableWithoutFeedback>

        <View>
          <IntroduceDeveloper
            title="FE DEVELOPER"
            nickname="Jun"
            url={FE_GITHUB}
            start
          />
          <IntroduceDeveloper
            title="BE DEVELOPER"
            nickname="Gutanbug"
            url={BE_GITHUB}
            end
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    flex: 1.2,
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
    resizeMode: 'cover',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#8e7cc3',
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
