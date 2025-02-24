import {ChatRoom} from '@src/api';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {HomeStackProps} from '@src/page';
import {IMAGES, LEADER_TIER, POSITION_IMAGES, sliceText} from '@src/util';
import {
  responsiveHeight,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

export const LeftContent = ({
  source,
  size = 60,
}: {
  source?: string;
  size?: number;
}) => {
  return (
    <View>
      {source ? (
        <Avatar.Image size={size} source={{uri: source}} />
      ) : (
        <Avatar.Icon icon="account" size={size} />
      )}
    </View>
  );
};

type RigthProps = Pick<ChatRoom, 'positions'>;

const RightContent = ({positions}: RigthProps) => {
  const representativePosition = positions[0];
  const source = POSITION_IMAGES[representativePosition];
  return (
    <View>
      <View style={rightStyles.imageBox}>
        <Image
          source={source}
          style={
            positions.length === 1
              ? rightStyles.positionImage
              : rightStyles.positionImages
          }
        />
        {positions.length > 1 && <Icon name="plus" size={24} color="#C8AA6E" />}
      </View>
    </View>
  );
};

const rightStyles = StyleSheet.create({
  imageBox: {
    width: 50,
    height: 50,
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  positionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  positionImages: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
});

const SubTitle = ({
  userCount,
  maxUserCount,
  leaderTier,
}: Pick<ChatRoom, 'maxUserCount' | 'userCount' | 'leaderTier'>) => {
  const tier = leaderTier.match(/\D/g)?.join('') as string;

  const source = IMAGES[LEADER_TIER[tier]];

  return (
    <View style={cardStyles.underTextContainer}>
      <Icon name="account" size={24} />
      <Text>
        {userCount}/{maxUserCount}
      </Text>
      <Image source={source!} style={cardStyles.myTierImage} />
      <Text>{leaderTier}</Text>
    </View>
  );
};

type Porps = ChatRoom;
export default function ChatCard({
  roomId,
  roomName,
  userCount,
  maxUserCount,
  leaderTier,
  positions,
}: Porps) {
  const navigation = useNavigation<HomeStackProps>();

  const onPress = () => {
    navigation.navigate('Home', {
      screen: 'ChatUserList',
      params: {
        roomId,
        roomName,
        userCount,
        maxUserCount,
        leaderTier,
        positions,
      },
    });
  };
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'white' : '#F5F5F5',
        },
        cardStyles.view,
      ]}>
      <View style={cardStyles.leftContainer}>
        <LeftContent size={48} />
        <View style={cardStyles.titleBox}>
          <Text style={cardStyles.title}>{sliceText(roomName)}</Text>
          <SubTitle
            userCount={userCount}
            maxUserCount={maxUserCount}
            leaderTier={leaderTier}
          />
        </View>
      </View>
      <RightContent positions={positions} />
    </Pressable>
  );
}

const cardStyles = StyleSheet.create({
  leftContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  view: {
    height: responsiveHeight(10),
    paddingVertical: 4,
    paddingHorizontal: 16,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleBox: {
    marginLeft: 10,
  },
  title: {
    color: 'black',
    fontSize: responsiveScreenFontSize(2),
    fontWeight: 'bold',
    marginBottom: 4,
  },
  myTierImage: {
    width: 36,
    height: 28,
    resizeMode: 'contain',
    marginLeft: 4,
  },
  underTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
