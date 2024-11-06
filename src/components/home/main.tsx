import {useChatRoomInfinityQuery} from '@src/api';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ChatFilterBottomSheet, ChatLink} from '@src/components';
import {useChatFilterStore} from '@src/store';

export default function Main() {
  const {gameType, rankTiers, position, loading} = useChatFilterStore();

  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useChatRoomInfinityQuery(
    {
      page: 0,
      position,
      rankTiers,
      gameType,
    },
    loading,
  );

  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (isError) {
    console.log(error);
  }

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return <ActivityIndicator style={homeStyle.activeIndicator} />;
  };

  return (
    <View style={homeStyle.container}>
      <ChatFilterBottomSheet />
      <FlatList
        data={data?.pages.flatMap(page => page.content)}
        renderItem={({item}) => <ChatLink {...item} />}
        keyExtractor={item => item.roomId}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={10}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingBottom: 80,
  },
  activeIndicator: {marginVertical: 20},
});
