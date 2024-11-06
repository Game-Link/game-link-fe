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
function Chat({chatting}: OnlyChat) {
  if (chatting.content) {
    return <Text style={styles.message}>{chatting.content}</Text>;
  }
}

type DateProps = {
  date: string;
};
function DateMessage({date}: DateProps) {
  console.log(date);
  const dateObj = new Date(date);
  const hours = dateObj.getHours().toLocaleString();
  const minutes = dateObj.getMinutes();
  console.log(hours, minutes);
  return (
    <Text style={styles.date}>
      {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
    </Text>
  );
}

function MySpeechBubble({chatting}: OnlyChat) {
  if (chatting.continuous) {
    return (
      <View style={styles.myContinuous}>
        <Chat chatting={chatting} />
      </View>
    );
  }

  return (
    <View style={styles.myChatWithDateContainer}>
      <DateMessage date={chatting.createdAt} />
      <View style={styles.myChating}>
        <Chat chatting={chatting} />
      </View>
    </View>
  );
}

function YourSpeechBubble({chatting, user}: Omit<Props, 'myId'>) {
  if (chatting.continuous) {
    return (
      <View style={styles.yourContinuous}>
        <Chat chatting={chatting} />
      </View>
    );
  }
  return (
    <View style={styles.profileContainer}>
      <Avatar.Image
        source={{
          uri:
            user?.summonerIconUrl ||
            'https://avatars.githubusercontent.com/u/57277708?s=400&v=4',
        }}
        size={40}
        style={styles.profile}
      />
      <View style={styles.chatPosition}>
        <Text style={styles.nickname}>{user?.nickname || 'NickName'}</Text>
        <View style={styles.yourChatWithDateContainer}>
          <View style={styles.yourChatting}>
            <Chat chatting={chatting} />
          </View>
          <DateMessage date={chatting.createdAt} />
        </View>
      </View>
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
    padding: 12,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  yourStartChatting: {
    padding: 12,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  continuous: {
    padding: 12,
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
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  profile: {
    marginRight: 8,
  },
  chatPosition: {
    position: 'absolute',
    top: 4,
    left: 48,
  },
  yourChatWithDateContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  myChatWithDateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  message: {
    fontSize: 16,
    fontWeight: 'medium',
    color: 'black',
  },
  nickname: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: 'bold',
    color: 'black',
  },
  date: {
    alignSelf: 'flex-end',
    marginHorizontal: 4,
    color: 'black',
    fontSize: 12,
    fontWeight: 'normal',
  },
});
