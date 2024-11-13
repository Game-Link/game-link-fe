import {useChatRoomInfinityQuery} from '@src/api';
import React from 'react';
import {FlatList, StyleSheet, Text, View, RefreshControl} from 'react-native';
import {
  ChatFilterBottomSheet,
  ChatLink,
  PagenationLoading,
} from '@src/components';
import {useChatFilterStore} from '@src/store';
import {useRefreshByUser} from '@src/hooks';

export default function Main() {
  const {gameType, rankTiers, position, loading} = useChatFilterStore();

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useChatRoomInfinityQuery(
    {
      page: 0,
      position,
      rankTiers,
      gameType,
    },
    loading,
  );

  const {isRefetchingByUser, refetchByUser} = useRefreshByUser(refetch);

  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>error</Text>
      </View>
    );
  }

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
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          <PagenationLoading isLoading={isFetchingNextPage} />
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
          />
        }
        refreshing={isRefetchingByUser}
        style={homeStyle.flatList}
      />
    </View>
  );
}

const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 100,
  },
  flatList: {
    flex: 1,
  },
});
