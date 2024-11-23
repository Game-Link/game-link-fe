import {useMyChatInfinityQuery} from '@src/api';
import React from 'react';
import {View, Text, StyleSheet, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {PagenationLoading} from '../common';
import {useRefreshByUser} from '@src/hooks';
import MyChatLink from './my-chat-link';

export default function MyChat() {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    error,
  } = useMyChatInfinityQuery({page: 0});

  const {isRefetchingByUser, refetchByUser} = useRefreshByUser(refetch);
  console.log(data);

  if (isError) {
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={data?.pages.flatMap(page => page.content)}
      keyExtractor={(item, index) => `${index}`}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.1}
      ListFooterComponent={<PagenationLoading isLoading={isFetchingNextPage} />}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
      refreshing={isRefetchingByUser}
      style={styles.flatList}
      renderItem={({item}) => <MyChatLink {...item} />}
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
});
