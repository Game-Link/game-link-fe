import {useMyChatInfinityQuery} from '@src/api';
import React, {Suspense, useMemo} from 'react';
import {View, Text, StyleSheet, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {MyChattingSkeleton, PagenationLoading} from '@src/components';
import {
  OnConnectSubscribe,
  useRefreshByUser,
  useStomp,
  useUserId,
} from '@src/hooks';
import MyChatLink from './my-chat-link';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';

export default function MyChat() {
  return (
    <Suspense fallback={<MyChattingSkeleton />}>
      <MyChatComponent />
    </Suspense>
  );
}

function MyChatComponent() {
  const {data, isFetchingNextPage, hasNextPage, fetchNextPage, refetch} =
    useMyChatInfinityQuery({page: 0});
  const myId = useUserId();

  const onConnectSubscribes: OnConnectSubscribe[] = useMemo(
    () => [
      {
        url: '/sub/chatroom-list/' + myId,
        callback: payload => {
          const {refetch: isRefetchting} = JSON.parse(payload.body) as {
            refetch: boolean;
          };
          console.log('마이채팅 리페칭 테스트:', isRefetchting);
          if (isRefetchting) {
            refetch();
          }
        },
      },
    ],
    [myId],
  );
  useStomp(myId, onConnectSubscribes);

  const {isRefetchingByUser, refetchByUser} = useRefreshByUser(refetch);

  if (typeof data === 'undefined' || data?.pages[0].content.length === 0) {
    return (
      <View>
        <Text>No data</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data?.pages.flatMap(page => page.content)}
      keyExtractor={item => item.roomId}
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
    backgroundColor: '#f5f5f5',
    paddingBottom: responsiveScreenHeight(10),
  },
});
