import React from 'react';

import {ChatUserDrawer} from './drawer-provider';
import {useChatRoomUsersQuery} from '@src/api';
import {Pressable, Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {Avatar} from 'react-native-paper';

export function ChatUserDrawerContent({roomId, roomName}: ChatUserDrawer) {
  console.log(roomId, roomName);
  const userQuery = useChatRoomUsersQuery(roomId, false);

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
    <View>
      <Text>{roomName}</Text>
      {userQuery.data?.map(item => (
        <Pressable key={item.userId}>
          <Avatar.Image source={{uri: item.summonerIconUrl}} size={24} />
          <Text>{item.nickname}</Text>
        </Pressable>
      ))}
    </View>
  );
}
