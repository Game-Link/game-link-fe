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
  console.log('CHATTING COMPONENT : ', user, mine);
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
  if (chatting.fileType === 'IMAGE') {
    const imageUrls = chatting.fileUrl.split(',');
    const imageNames = chatting.fileName.split(',');

    return (
      <>
        {imageUrls.map((url, index) => (
          <Image
            key={imageNames[index]}
            source={{uri: url}}
            alt={imageNames[index]}
            style={styles.image}
            width={120}
            height={120}
          />
        ))}
      </>
    );
  }
}

type DateProps = {
  date: string;
};
function DateMessage({date}: DateProps) {
  const dateObj = new Date(date);
  const hours = dateObj.getHours().toLocaleString();
  const minutes = dateObj.getMinutes();

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
        size={48}
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    maxWidth: '70%',
  },
  yourChatting: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    maxWidth: '70%',
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
    marginVertical: 12,
  },
  myContinuous: {
    ...baseStyles.myChatting,
    ...baseStyles.continuous,
    marginVertical: 12,
  },
  enterChat: {
    backgroundColor: '#e1ebf7',
    color: 'black',
    padding: 10,
    borderRadius: 10,
    marginVertical: 12,
    alignSelf: 'center',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 12,
    position: 'relative',
  },
  profile: {
    marginRight: 8,
  },
  chatPosition: {},
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
  image: {},
});
