import {useChatRoomInfinityQuery} from '@src/api';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ChatLink} from '@src/components';
import {useChatFilterStore} from '@src/store';

export default function Main() {
  const {gameType, rankTiers, position, loading} = useChatFilterStore();

  console.log(gameType, rankTiers, position, loading);

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

  console.log(data, isLoading, error);

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return <ActivityIndicator style={homeStyle.activeIndicator} />;
  };

  console.log(data?.pages);
  return (
    <View style={homeStyle.container}>
      <FlatList
        data={data?.pages.flatMap(page => page.content)}
        renderItem={({item}) => <ChatLink {...item} />}
        keyExtractor={item => item.roomId}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
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
  },
  activeIndicator: {marginVertical: 20},
});
