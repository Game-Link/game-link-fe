import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Chatting, ChatroomUser} from '@src/api';
import {Avatar, Icon} from 'react-native-paper';
import {responsiveWidth} from 'react-native-responsive-dimensions';

type Props = {
  chatting: Chatting;
  user: ChatroomUser | undefined;
  myId: string;
};

export default function SpeechBubble({chatting, user, myId}: Props) {
  //console.log('말풍선 단일 채팅 테스트: ', chatting, 'myId: ', myId);
  // console.log('user 데이터: ', user);

  if (chatting.dateChanged) {
    console.log('요일 변화: ', chatting);
    return <DateChat chatting={chatting} />;
  }
  const mine = chatting.userId === myId;

  if (chatting.type === 'ENTER') {
    return <EnterChat chatting={chatting} />;
  }

  if (mine) {
    return <MySpeechBubble chatting={chatting} />;
  }

  return <YourSpeechBubble chatting={chatting} user={user} />;
}

function MySpeechBubble({chatting}: OnlyChat) {
  if (chatting.continuous) {
    return (
      <View style={styles.myChatWithDateContainer}>
        {chatting.timeNotation && <TimeMessage date={chatting.createdAt} />}
        <View style={styles.myContinuous}>
          <Chat chatting={chatting} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.myChatWithDateContainer}>
      {chatting.timeNotation && <TimeMessage date={chatting.createdAt} />}
      <View style={styles.myChating}>
        <Chat chatting={chatting} />
      </View>
    </View>
  );
}

function YourSpeechBubble({chatting, user}: Omit<Props, 'myId'>) {
  if (chatting.continuous) {
    return (
      <View style={styles.yourChatWithDateContainer}>
        <View style={styles.yourContinuous}>
          <Chat chatting={chatting} />
        </View>
        {chatting.timeNotation && <TimeMessage date={chatting.createdAt} />}
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
          {chatting.timeNotation && <TimeMessage date={chatting.createdAt} />}
        </View>
      </View>
    </View>
  );
}

type OnlyChat = Omit<Props, 'user' | 'myId'>;
function Chat({chatting}: OnlyChat) {
  if (chatting.content) {
    return (
      <Text
        style={[
          styles.message,
          chatting.content.length > 15 && styles.longChat,
        ]}>
        {chatting.content}
      </Text>
    );
  }
  if (chatting.fileType === 'IMAGE') {
    const imageUrls = chatting.fileUrl.split(',');
    const imageNames = chatting.fileName.split(',');

    return (
      <View>
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
      </View>
    );
  }
}

function DateChat({chatting}: OnlyChat) {
  const dateObj = new Date(chatting.createdAt);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDay();
  console.log(year, month, day);
  return (
    <View style={styles.dateChatContainer}>
      <Icon source="calendar" color="black" size={20} />
      <Text style={styles.dateChat}>
        {year}년 {month.toString().padStart(2, '0')}월{' '}
        {day.toString().padStart(2, '0')}일
      </Text>
    </View>
  );
}

type DateProps = {
  date: string;
};
function TimeMessage({date}: DateProps) {
  const dateObj = new Date(date);
  const hours = dateObj.getHours().toLocaleString();
  const minutes = dateObj.getMinutes();

  return (
    <Text style={styles.date}>
      {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
    </Text>
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
    marginTop: 8,
  },
  yourChatting: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
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
    marginBottom: 8,
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
    marginLeft: responsiveWidth(14),
  },
  myContinuous: {
    ...baseStyles.myChatting,
    ...baseStyles.continuous,
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
    maxWidth: '80%',
    position: 'relative',
    marginVertical: 8,
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
  longChat: {
    width: responsiveWidth(60),
  },
  dateChatContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#e1ebf7',
    padding: 10,
    borderRadius: 10,
    marginVertical: 12,
    alignSelf: 'center',
  },
  dateChat: {
    color: 'black',
    marginHorizontal: 8,
  },
  image: {},
});
