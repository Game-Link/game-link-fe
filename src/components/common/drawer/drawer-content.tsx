import React from 'react';

import {ChatUserDrawer} from './drawer-provider';
import {useChatRoomUsersQuery} from '@src/api';
import {Pressable, Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {Avatar, IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';
import {useDrawerStore} from '@src/store/use-drawer-store';
import {useNavigation} from '@react-navigation/native';
import {ChatStackProps, ChattingRoomStackProps} from '@src/page';

export function ChatUserDrawerContent({roomId, roomName}: ChatUserDrawer) {
  const userQuery = useChatRoomUsersQuery(roomId, false);
  const {closeDrawer} = useDrawerStore();
  const navigation = useNavigation<ChatStackProps & ChattingRoomStackProps>();
  console.log('Drawer Navigation state: ', navigation.getState());
  const linkToUserProfile = (userId: string) => {
    navigation.navigate('ChatUserProfile', {
      userId,
      type: 'USER_INFO', // 또는 'MY_INFO'에 따라 다름
    });

    closeDrawer();
  };

  if (userQuery.isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  if (userQuery.isError) {
    return <Text>Error</Text>;
  }

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
});
