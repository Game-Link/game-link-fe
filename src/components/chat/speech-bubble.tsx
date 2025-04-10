import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
  Linking,
} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Chatting, ChatroomUser} from '@src/api';
import {Avatar, Icon} from 'react-native-paper';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {useModalStore} from '@src/store';
import {convertTime} from '@src/util';

type Props = {
  chatting: Chatting;
  user: ChatroomUser | undefined;
  roomName: string;
  myId: string | null;
};

export default function SpeechBubble({chatting, user, myId, roomName}: Props) {
  const mine = chatting.userId === myId;

  if (chatting.type === 'ENTER') {
    return (
      <DateChat chatting={chatting} roomName={roomName}>
        <CommandChat
          chatting={chatting}
          roomName={roomName}
          type={chatting.type}
        />
      </DateChat>
    );
  }

  if (chatting.type === 'LEAVE') {
    return (
      <CommandChat
        chatting={chatting}
        roomName={roomName}
        type={chatting.type}
      />
    );
  }

  if (mine) {
    return (
      <DateChat chatting={chatting} roomName={roomName}>
        <MySpeechBubble chatting={chatting} roomName={roomName} user={user} />
      </DateChat>
    );
  }

  return (
    <DateChat chatting={chatting} roomName={roomName}>
      <YourSpeechBubble chatting={chatting} user={user} roomName={roomName} />
    </DateChat>
  );
}

function MySpeechBubble({chatting, roomName, user}: ChatProps) {
  if (chatting.continuous) {
    return (
      <View style={styles.myChatWithDateContainer}>
        {chatting.timeNotation && <TimeMessage date={chatting.createdAt} />}
        <View style={styles.myContinuous}>
          <Chat chatting={chatting} roomName={roomName} user={user} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.myChatWithDateContainer}>
      {chatting.timeNotation && <TimeMessage date={chatting.createdAt} />}
      <View style={styles.myChating}>
        <Chat chatting={chatting} roomName={roomName} user={user} />
      </View>
    </View>
  );
}

function YourSpeechBubble({chatting, user, roomName}: Omit<Props, 'myId'>) {
  if (chatting.continuous) {
    return (
      <View style={styles.yourChatWithDateContainer}>
        <View style={styles.yourContinuous}>
          <Chat chatting={chatting} roomName={roomName} user={user} />
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
            chatting.summonerIconUrl ||
            'https://avatars.githubusercontent.com/u/57277708?s=400&v=4',
        }}
        size={48}
        style={styles.profile}
      />
      <View style={styles.chatPosition}>
        <Text style={styles.nickname}>{chatting.nickname || 'NickName'}</Text>
        <View style={styles.yourChatWithDateContainer}>
          <View style={styles.yourChatting}>
            <Chat chatting={chatting} roomName={roomName} user={user} />
          </View>
          {chatting.timeNotation && <TimeMessage date={chatting.createdAt} />}
        </View>
      </View>
    </View>
  );
}

type OnlyChat = Omit<Props, 'user' | 'myId'>;
type ChatProps = Omit<Props, 'myId'>;
function Chat({chatting, roomName, user}: ChatProps) {
  const {openModal} = useModalStore();

  if (chatting.content) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = chatting.content.split(urlRegex);
    return (
      <Text
        style={[
          styles.message,
          chatting.content.length > 15 && styles.longChat,
        ]}>
        {parts.map((part, index) => {
          if (urlRegex.test(part)) {
            return (
              <Text
                key={index}
                style={styles.link}
                onPress={() => Linking.openURL(part)}>
                {part}
              </Text>
            );
          }
          return <Text key={index}>{part}</Text>;
        })}
      </Text>
    );
  }
  if (chatting.fileType === 'IMAGE') {
    const imageUrls = chatting.fileUrl.split(',');
    const imageNames = chatting.fileName.split(',');
    const data = imageUrls.map((url, index) => ({
      url,
      name: imageNames[index],
    }));

    return (
      <Pressable
        onPress={() => {
          openModal('ChatImageModal', {data, roomName, user});
        }}>
        <ImageGrid data={data} />
      </Pressable>
    );
  }
}

function DateChat({chatting, children}: PropsWithChildren<OnlyChat>) {
  const dateObj = new Date(chatting.createdAt);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDay();

  return (
    <View>
      {chatting.dateChanged && (
        <View style={styles.dateChatContainer}>
          <Icon source="calendar" color="black" size={20} />
          <Text style={styles.dateChat}>
            {year}년 {month.toString().padStart(2, '0')}월{' '}
            {day.toString().padStart(2, '0')}일
          </Text>
        </View>
      )}
      {children}
    </View>
  );
}

type DateProps = {
  date: string;
};
function TimeMessage({date}: DateProps) {
  return <Text style={styles.date}>{convertTime(date)}</Text>;
}

function CommandChat({
  chatting,
  type,
}: OnlyChat & {type: typeof chatting.type}) {
  return (
    <Text style={type === 'ENTER' ? styles.enter : styles.leave}>
      {chatting.content}
    </Text>
  );
}

type ImageGridProps = {
  data: {url: string; name: string}[];
};
function ImageGrid({data}: ImageGridProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => `${index}`}
      numColumns={3}
      renderItem={({item}) => (
        <Image
          source={{uri: item.url}}
          alt={item.name}
          width={80}
          height={80}
          style={styles.image}
        />
      )}
    />
  );
}

const maxWidthStyles = StyleSheet.create({
  width: {
    maxWidth: '70%',
  },
});

const baseStyles = StyleSheet.create({
  myChatting: {
    alignSelf: 'flex-end',
    backgroundColor: 'yellow',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    ...maxWidthStyles.width,
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
    padding: 8,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    ...maxWidthStyles.width,
  },
  yourStartChatting: {
    padding: 8,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  continuous: {
    padding: 8,
    borderRadius: 12,
    marginBottom: 8,
    ...maxWidthStyles.width,
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
  enter: {
    backgroundColor: '#e1ebf7',
    color: 'black',
    padding: 10,
    borderRadius: 10,
    marginVertical: 12,
    alignSelf: 'center',
  },
  leave: {
    backgroundColor: 'white',
    color: 'black',
    padding: 10,
    borderRadius: 10,
    marginVertical: 12,
    alignSelf: 'center',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
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
  image: {
    resizeMode: 'cover',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
