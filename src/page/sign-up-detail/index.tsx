import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
import {DEFAULT_STYLES} from '@src/util';
import {Checkbox} from 'react-native-paper';
import {GoogleLoginService, NaverLoginService} from '@src/components';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation';

type Props = StackScreenProps<RootStackParamList, 'SignUpDetail'>;

export default function SignUpDetail({navigation}: Props) {
  const [agrees, setAgrees] = useState<boolean[]>([false, false]);

  const totallyAgree = () => {
    setAgrees(prev => prev.map(agree => !agree));
  };

  const isAllAgree = () => {
    return agrees.every(agree => agree);
  };

  const eachAgree = (index?: number) => {
    if (typeof index === 'number') {
      setAgrees(prev => {
        prev[index] = !prev[index];
        return [...prev];
      });
    }
  };

  // 서비스 이용약관
  const linkService = () => {
    navigation.navigate('TermOfUse');
  };

  // 개인정보 처리방침 링크
  const linkTerm = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const datas: TermCheckBoxProps[] = [
    {
      status: agrees[0],
      setStatus: eachAgree,
      label: '[필수] 개인정보 수집 및 이용 동의',
      linkNavigate: linkTerm,
      isLink: true,
    },
    {
      status: agrees[1],
      setStatus: eachAgree,
      label: '[필수] GameLink 서비스 이용약관 동의',
      linkNavigate: linkService,
      isLink: true,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>GameLink 회원가입</Text>
        <Text style={styles.subTitle}>
          서비스를 이용하려면 약관 동의가 필요합니다.
        </Text>
      </View>

      <View>
        <TermCheckBox
          status={isAllAgree()}
          setStatus={totallyAgree}
          label="전체 동의하기"
        />
        {datas.map((data, index) => (
          <TermCheckBox {...data} index={index} key={index} />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <NaverLoginService style={styles.gap} disabled={!isAllAgree()} />
        {/* <KakaoWebview onLogin={onKakaoLogin} /> */}
        <GoogleLoginService disabled={!isAllAgree()} />
      </View>
    </View>
  );
}

type TermCheckBoxProps = {
  status: boolean | boolean[];
  setStatus: (index?: number) => void;
  label: string;
  linkNavigate?: () => void;
  isLink?: boolean;
  index?: number;
};
function TermCheckBox({
  status,
  setStatus,
  label,
  linkNavigate,
  isLink,
  index,
}: TermCheckBoxProps) {
  const checkStatus = () => {
    if (typeof status === 'boolean') {
      return status;
    } else {
      return status.every(item => item);
    }
  };
  return (
    <View style={styles.rowContainer}>
      <Checkbox.Item
        status={checkStatus() ? 'checked' : 'indeterminate'}
        onPress={() => {
          if (typeof index === 'number') {
            setStatus(index);
            return;
          }
          setStatus();
        }}
        label={label}
        labelStyle={styles.subTitle}
        position="leading"
        background={{color: DEFAULT_STYLES.color.transparent}}
        style={styles.checkbox}
      />
      {isLink && (
        <TouchableWithoutFeedback onPress={linkNavigate}>
          <View>
            <Text style={[styles.subTitle, styles.underLine]}>보기</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: DEFAULT_STYLES.size['16'],
  },
  header: {
    marginBottom: DEFAULT_STYLES.size['12'],
  },
  title: {
    fontSize: DEFAULT_STYLES.fontSize.extraLarge,
    fontWeight: 'bold',
    color: DEFAULT_STYLES.color.black,
    marginBottom: DEFAULT_STYLES.size['4'],
  },
  subTitle: {
    fontSize: DEFAULT_STYLES.fontSize.medium,
    color: DEFAULT_STYLES.color.gray,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  underLine: {
    textDecorationLine: 'underline',
  },
  checkbox: {
    marginLeft: -20,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: DEFAULT_STYLES.height['24'],
  },

  gap: {
    marginBottom: DEFAULT_STYLES.size['8'],
  },
});
