import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Chatting, ChatroomUser} from '@src/api';
import {Avatar} from 'react-native-paper';

type Props = {
  chatting: Chatting;
  user: ChatroomUser | undefined;
};

export default function SpeechBubble({chatting, user}: Props) {
  console.log(user);
  console.log(chatting);
  if (chatting.mine) {
    return <MySpeechBubble chatting={chatting} />;
  }

  return <YourSpeechBubble chatting={chatting} user={user} />;
}

type OnlyChat = Omit<Props, 'user'>;
function Chat({chatting}: OnlyChat) {}

function MySpeechBubble({chatting}: OnlyChat) {
  if (chatting.continuous) {
    return (
      <View style={styles.myContinuous}>
        <Text>{chatting.content}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{chatting.createdAt}</Text>
      <View style={styles.myChating}>
        <Text>{chatting.content}</Text>
      </View>
    </View>
  );
}

function YourSpeechBubble({chatting, user}: Props) {
  if (chatting.continuous) {
    return (
      <View style={styles.yourContinuous}>
        <Text>{chatting.content}</Text>
      </View>
    );
  }
  return (
    <View>
      {/* <Avatar.Image source={{uri: user.summonerIconUrl}} size={24} /> */}
      <Text>{user?.nickname || 'NickName'}</Text>
      <View style={styles.yourChatting}>
        <Text>{chatting.content}</Text>
      </View>
      <Text>{chatting.createdAt}</Text>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  myChatting: {
    alignSelf: 'flex-end',
    backgroundColor: 'yellow',
  },
  yourChatting: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
  },
  myStartChatting: {
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  yourStartChatting: {
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  continuous: {
    borderRadius: 10,
  },
});

const styles = StyleSheet.create({
  yourChatting: {
    ...baseStyles.yourChatting,
    ...baseStyles.yourStartChatting,
  },
  myChating: {
    ...baseStyles.myChatting,
    ...baseStyles.myStartChatting,
  },
  yourContinuous: {
    ...baseStyles.yourChatting,
    ...baseStyles.continuous,
  },
  myContinuous: {
    ...baseStyles.myChatting,
    ...baseStyles.continuous,
  },
});
