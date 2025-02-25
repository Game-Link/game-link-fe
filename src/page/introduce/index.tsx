import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation';
import {useFirstVisitStore} from '@src/store';
import MatchDetail from '@src/assets/match-detail.jpeg';
import AccountRiot from '@src/assets/account-riot.jpeg';
import UserInfo from '@src/assets/user-info.jpeg';
import MainPage from '@src/assets/main.jpeg';
import ChattingPage from '@src/assets/chatting.jpeg';
import MyChatting from '@src/assets/my-chating.jpeg';
import {Carousel} from '@src/components';
import {DEFAULT_STYLES, WINDOW_HEIGHT, WINDOW_WIDTH} from '@src/util';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Button} from 'react-native-paper';

type IntroducePageProps = StackScreenProps<RootStackParamList, 'Introduce'>;
type CardData = {image: any; id: string; description: string; last?: boolean};

export default function IntroducePage(props: IntroducePageProps) {
  const data: CardData[] = [
    {
      image: AccountRiot,
      id: 'account-riot',
      description: '라이엇 계정을 연동하세요',
    },
    {image: UserInfo, id: 'user-info', description: '라이엇 정보를 확인하세요'},
    {
      image: MatchDetail,
      id: 'match-detail',
      description: '상세 전적 정보를 확인하세요',
    },
    {
      image: MainPage,
      id: 'main',
      description: '원하는 채팅에 참여하세요',
    },
    {
      image: ChattingPage,
      id: 'chating-detail',
      description: '채팅을 통해 소통하고 함께 게임을 시작하세요',
    },
    {
      image: MyChatting,
      id: 'my-chatting',
      description: '참여한 채팅방을 확인하고 쉽게 대화를 나누어보세요',
      last: true,
    },
  ];

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        keyExtractor={({id}) => id}
        renderItem={({item}) => <IntroduceCard {...item} {...props} />}
        itemStyle={introduceStyles.itemContainer}
        isIconButton={false}
      />
    </View>
  );
}

type IntroduceCardNavigationProps = StackScreenProps<
  RootStackParamList,
  'Introduce'
> &
  CardData;
function IntroduceCard({
  id,
  image,
  description,
  last,
  navigation,
}: IntroduceCardNavigationProps) {
  const {setVisited} = useFirstVisitStore();
  const onPress = () => {
    setVisited();
    navigation.navigate('SignUp');
  };
  return (
    <View style={introduceStyles.container}>
      <Text style={introduceStyles.text}>{description}</Text>
      <Image source={image} alt={id} style={introduceStyles.image} />
      {last && (
        <Button
          style={introduceStyles.button}
          mode="contained"
          onPress={onPress}>
          시작하기
        </Button>
      )}
    </View>
  );
}

const introduceStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: responsiveHeight(64),
    resizeMode: 'contain',
    borderRadius: 48,
    marginVertical: 8,
  },
  itemContainer: {
    backgroundColor: 'rgba(255, 251, 254, 1)',
    borderWidth: 1,
    borderColor: 'rgba(230, 230, 254, 1)',
    height: WINDOW_HEIGHT * 0.8,
    width: WINDOW_WIDTH - 18 * 2,
    marginLeft: 8,
    borderRadius: 10,
  },
  text: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: DEFAULT_STYLES.fontSize.large,
    color: DEFAULT_STYLES.color.black,
  },
  button: {
    width: responsiveWidth(68),
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});
