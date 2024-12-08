import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {ChatroomUser, MyChatResponse} from '@src/api';
import {Avatar, Badge} from 'react-native-paper';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {convertTime, WINDOW_WIDTH} from '@src/util';
import {useNavigation} from '@react-navigation/native';
import {MyChattingRoomStackProps} from '@src/page';
import {useUserId} from '@src/hooks';

function MultiProfile({data}: {data: ChatroomUser[]}) {
  const myId = useUserId();
  const imageData = data.filter(({userId}) => userId !== myId);
  if (data.length === 0 || data.length === 1) {
    return (
      <View style={profileStyle.profileContainer}>
        {data.length === 0 && (
          <Avatar.Icon
            icon="account"
            size={responsiveScreenWidth(14)}
            style={profileStyle.profile}
          />
        )}
        {data.length === 1 && (
          <Avatar.Image
            source={{uri: data[0].summonerIconUrl}}
            size={responsiveScreenWidth(14)}
            style={profileStyle.profile}
          />
        )}
      </View>
    );
  }
  if (data.length === 2) {
    return (
      <View style={profileStyle.profileContainer}>
        {imageData.map(({summonerIconUrl, userId}) => (
          <Avatar.Image
            key={userId}
            source={{uri: summonerIconUrl}}
            size={responsiveScreenWidth(14)}
            style={profileStyle.doubleProfile}
          />
        ))}
      </View>
    );
  }

  return (
    <View style={profileStyle.profileMultipleContainer}>
      {data.slice(0, 4).map(({summonerIconUrl, userId}) => (
        <Avatar.Image
          key={userId}
          source={{uri: summonerIconUrl}}
          size={responsiveScreenWidth(7)}
          style={profileStyle.doubleProfile}
        />
      ))}
    </View>
  );
}

const profileStyle = StyleSheet.create({
  profileContainer: {
    flex: 0.15,
    marginRight: responsiveScreenWidth(2),
    alignItems: 'center',
  },
  profileMultipleContainer: {
    flex: 0.2,
    width: 60,
    height: 60,
    marginRight: responsiveScreenWidth(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 2,
  },
  profile: {
    borderRadius: 12,
  },
  doubleProfile: {
    borderRadius: 12,
    marginRight: 2,
    marginBottom: 2,
  },
});

export default function MyChatLink(props: MyChatResponse) {
  const {
    roomId,
    roomName,
    users,
    lastMessageContent,
    lastMessageTime,
    newMessageCount,
  } = props;

  const navigation = useNavigation<MyChattingRoomStackProps>();
  const onPress = () => {
    navigation.navigate('Chatting', {
      roomId,
      roomName,
    });
  };

  const convertLastMessage = (message: string | null) => {
    if (message === null) {
      return '';
    }
    const lastMessage =
      message.length > 20 ? message.slice(0, 20) + '...' : message;

    return lastMessage;
  };

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? 'white' : '#F5F5F5',
        },
        styles.container,
      ]}>
      <View style={styles.innerContainer}>
        <MultiProfile data={users} />
        <View style={styles.leftContaier}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{roomName}</Text>
            <Text style={styles.userCountText}>{users.length}</Text>
          </View>
          <Text style={styles.messageText}>
            {convertLastMessage(lastMessageContent)}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.timeText}>{convertTime(lastMessageTime)}</Text>
          {newMessageCount !== 0 && (
            <Badge style={styles.badge} size={24}>
              {newMessageCount > 99 ? '99+' : newMessageCount}
            </Badge>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: WINDOW_WIDTH,
    height: responsiveScreenHeight(9),
    flex: 1,
    // backgroundColor: 'red',
    // marginBottom: 12,
  },
  innerContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  leftContaier: {
    flex: 0.65,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: responsiveScreenFontSize(2.5),
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  userCountText: {
    fontSize: responsiveScreenFontSize(2.5),
    color: 'gray',
    marginLeft: 4,
    textAlign: 'center',
  },
  messageText: {
    flexWrap: 'wrap',
    fontSize: responsiveScreenFontSize(1.5),
  },

  rightContainer: {
    flex: 0.2,
    marginLeft: 8,
    paddingVertical: 8,

    // backgroundColor: 'green',
    alignSelf: 'flex-start',
  },

  timeText: {
    fontSize: responsiveScreenFontSize(1.8),
    color: 'gray',
    marginBottom: 8,
  },

  badge: {
    backgroundColor: 'yellow',
    color: 'black',
    fontSize: responsiveScreenFontSize(1.8),
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
});
