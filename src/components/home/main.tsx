import {useChatRoomInfinityQuery} from '@src/api';
import React, {Suspense} from 'react';
import {FlatList, StyleSheet, View, RefreshControl} from 'react-native';
import {
  ChatFilterBottomSheet,
  ChatLink,
  PagenationLoading,
} from '@src/components';
import {useChatFilterStore} from '@src/store';
import {useRefreshByUser} from '@src/hooks';

import MainSkeleton from '../common/skeleton/main-skeleton';

export default function Main() {
  return (
    <Suspense fallback={<MainSkeleton />}>
      <MainComponent />
    </Suspense>
  );
}

function MainComponent() {
  const {gameType, rankTiers, position} = useChatFilterStore();

  const {data, isFetchingNextPage, hasNextPage, fetchNextPage, refetch} =
    useChatRoomInfinityQuery({
      page: 0,
      position,
      rankTiers,
      gameType,
    });

  const {isRefetchingByUser, refetchByUser} = useRefreshByUser(refetch);

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
