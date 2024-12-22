import React from 'react';

import {ChatUserDrawer} from './drawer-provider';
import {useChatRoomUsersQuery} from '@src/api';
import {Pressable, Text, View} from 'react-native';
import {Avatar, Button, IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';
import {useDrawerStore} from '@src/store/use-drawer-store';
import {useNavigation} from '@react-navigation/native';
import {ChatStackProps, ChattingRoomStackProps} from '@src/page';
import {WINDOW_WIDTH} from '@src/util';
import {useUnsubscriptionStore} from '@src/store';

export function ChatUserDrawerContent({roomId, roomName}: ChatUserDrawer) {
  const userQuery = useChatRoomUsersQuery(roomId);
  const {closeDrawer} = useDrawerStore();
  const {unsubscribe} = useUnsubscriptionStore();
  const navigation = useNavigation<ChatStackProps & ChattingRoomStackProps>();

  const linkToUserProfile = (userId: string) => {
    navigation.navigate('ChatUserProfile', {
      userId,
      type: 'USER_INFO', // 또는 'MY_INFO'에 따라 다름
    });

    closeDrawer();
  };

  const flagUnsubscribe = () => {
    unsubscribe(roomId);
    closeDrawer();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{roomName}</Text>
        <IconButton
          icon="close"
          size={responsiveScreenFontSize(3)}
          onPress={closeDrawer}
        />
      </View>
      <View style={styles.main}>
        {userQuery.data?.map(item => (
          <Pressable
            key={item.userId}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#F5F5F5' : 'white',
              },
              styles.avatar,
            ]}
            onPress={() => linkToUserProfile(item.userId)}>
            <Avatar.Image
              source={{uri: item.summonerIconUrl}}
              size={responsiveScreenFontSize(4)}
            />
            <Text style={styles.avatatNickname}>{item.nickname}</Text>
          </Pressable>
        ))}
      </View>
      <Button
        mode="outlined"
        style={styles.unsubscribeButton}
        onPress={flagUnsubscribe}>
        채팅방 나가기
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 0.1,
  },
  main: {
    flex: 0.9,
  },
  title: {
    fontSize: responsiveScreenFontSize(3.5),
    fontWeight: 'bold',
    color: 'black',
  },
  avatar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatatNickname: {
    marginLeft: 8,
    fontSize: responsiveScreenFontSize(2),
    color: 'black',
  },

  unsubscribeButton: {
    alignSelf: 'flex-start',
    minWidth: WINDOW_WIDTH * 0.7,
  },
});
