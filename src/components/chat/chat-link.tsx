import {ChatRoom, GameMode, Tier, Line} from '@src/api';
import {useModal} from '@src/hooks';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatLinkMoadl from './chat-link-modal';
import {Link} from '@react-navigation/native';

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

type RigthProps = {
  tier: Tier[];
  lines: Line[];
  mode: GameMode;
};

const RightContent = ({tier, lines, mode}: RigthProps) => {
  return (
    <View style={rightStyles.box}>
      <View style={rightStyles.container}>
        <Text style={rightStyles.title}>티어</Text>
        {tier.map(value => (
          <Text
            key={value}
            style={[rightStyles.description, rightStyles.tierBox]}>
            {value}
          </Text>
        ))}
      </View>
      <View style={rightStyles.container}>
        <Text style={rightStyles.title}>라인</Text>
        {lines.map(line => (
          <Text
            key={line}
            style={[rightStyles.description, rightStyles.tierBox]}>
            {line}
          </Text>
        ))}
      </View>
      <View style={rightStyles.container}>
        <Text style={rightStyles.title}>게임 모드</Text>
        <Text style={[rightStyles.description, rightStyles.tierBox]}>
          {mode}
        </Text>
      </View>
    </View>
  );
};

const rightStyles = StyleSheet.create({
  box: {
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  button: {
    fontSize: 10,
  },
  tierBox: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    marginHorizontal: 5,
  },
  description: {
    fontSize: 10,
  },
});

const SubTitle = ({
  userCount,
  maxUserCount,
}: Pick<ChatRoom, 'maxUserCount' | 'userCount'>) => {
  return (
    <Text>
      <Icon name="account" size={20} />
      {userCount} / {maxUserCount}
    </Text>
  );
};

type Porps = ChatRoom;
export default function ChatCard({
  roomId,
  roomName,
  userCount,
  maxUserCount,
}: Porps) {
  const {show, onOpen, onClose} = useModal();

  return (
    <>
      <Link
        to={{screen: 'Chat', params: {screen: 'Chatting', params: {roomId}}}}>
        <View style={cardStyles.view}>
          <TouchableOpacity onPress={onOpen}>
            <LeftContent />
          </TouchableOpacity>
          <View style={cardStyles.titleBox}>
            <Text style={cardStyles.title}>{roomName}</Text>
            <SubTitle userCount={userCount} maxUserCount={maxUserCount} />
          </View>
          <RightContent
            mode="SOLO_RANK"
            lines={['AD']}
            tier={['BRONZE', 'SILVER']}
          />
        </View>
      </Link>
      <ChatLinkMoadl
        roomId={roomId}
        roomName={roomName}
        onClose={onClose}
        show={show}
      />
    </>
  );
}

const cardStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderColor: '#8e7cc3',
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleBox: {
    marginLeft: 10,
    marginRight: 60,
  },
  title: {
    color: 'black',
    maxWidth: 90,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
