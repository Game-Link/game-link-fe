import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Chatting, ChatroomUser} from '@src/api';
import {Avatar} from 'react-native-paper';

type Props = {
  chatting: Chatting;
  user: ChatroomUser | undefined;
  myId: string;
};

export default function SpeechBubble({chatting, user, myId}: Props) {
  console.log(user);
  console.log(chatting);

  const mine = user?.id === myId;
  if (chatting.type === 'ENTER') {
    return <EnterChat chatting={chatting} />;
  }

  if (mine) {
    return <MySpeechBubble chatting={chatting} />;
  }

  return <YourSpeechBubble chatting={chatting} user={user} />;
}

type OnlyChat = Omit<Props, 'user' | 'myId'>;
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

function YourSpeechBubble({chatting, user}: Omit<Props, 'myId'>) {
  if (chatting.continuous) {
    return (
      <View style={styles.yourContinuous}>
        <Text>{chatting.content}</Text>
      </View>
    );
  }
  return (
    <View>
      <Avatar.Image
        source={{
          uri:
            user?.summonerIconUrl ||
            'https://avatars.githubusercontent.com/u/57277708?s=400&v=4',
        }}
        size={24}
      />
      <Text>{user?.nickname || 'NickName'}</Text>
      <View style={styles.yourChatting}>
        <Text>{chatting.content}</Text>
      </View>
      <Text>{chatting.createdAt}</Text>
    </View>
  );
}

function EnterChat({chatting}: OnlyChat) {
  return <Text style={styles.enterChat}>{chatting.content}</Text>;
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
  enterChat: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
});
