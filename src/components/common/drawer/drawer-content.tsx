import React from 'react';

import {ChatUserDrawer} from './drawer-provider';
import {useChatRoomUsersQuery} from '@src/api';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {Avatar, Button, IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';
import {useDrawerStore} from '@src/store/use-drawer-store';
import {useNavigation} from '@react-navigation/native';
import {ChatStackProps, ChattingRoomStackProps} from '@src/page';
import {sliceText, WINDOW_WIDTH} from '@src/util';
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
        <Text style={styles.title}>{sliceText(roomName, 16)}</Text>
        <IconButton
          icon="close"
          size={responsiveScreenFontSize(3)}
          onPress={closeDrawer}
        />
      </View>
      {roomName.length > 16 && <Text style={styles.roomName}>{roomName}</Text>}
      <Text style={styles.title}>참여 유저 목록</Text>
      <ScrollView style={styles.main}>
        {userQuery.data?.map(item => (
          <Pressable
            key={item.userId}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? '#F5F5F5' : 'white',
              },
              styles.userContainer,
            ]}
            onPress={() => linkToUserProfile(item.userId)}>
            <Avatar.Image
              source={{uri: item.summonerIconUrl}}
              size={responsiveScreenFontSize(4)}
            />
            <View>
              <Text style={styles.avatatNickname}>
                {sliceText(item.nickname)}
              </Text>
              <Text style={styles.riotName}>
                {sliceText(item.summonerName)} #{item.summonerTag}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
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
    fontSize: responsiveScreenFontSize(2),
    fontWeight: 'bold',
    color: 'black',
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
  },
  avatatNickname: {
    marginLeft: 8,
    fontSize: responsiveScreenFontSize(2),
    color: 'black',
    fontWeight: 'bold',
  },
  riotName: {
    marginLeft: 8,
    fontSize: responsiveScreenFontSize(1.6),
    color: 'black',
  },
  unsubscribeButton: {
    alignSelf: 'flex-start',
    minWidth: WINDOW_WIDTH * 0.7,
  },
  roomName: {
    marginBottom: 24,
  },
});
