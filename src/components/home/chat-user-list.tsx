import {View, StyleSheet} from 'react-native';
import React, {Suspense} from 'react';

import {HomeStackParamList} from '@src/page';
import {StackScreenProps} from '@react-navigation/stack';
import {useChatroomUsersInfoQuery} from '@src/api';
import UserCard from './user-card';
import {CardSkeleton, Carousel, LinkButton} from '@src/components';
import {WINDOW_WIDTH} from '@src/util';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import {useTabBarHide} from '@src/hooks';

type Props = StackScreenProps<HomeStackParamList, 'ChatUserList'>;

export default function ChatUserList(props: Props) {
  useTabBarHide();
  return (
    <Suspense fallback={<CardSkeleton />}>
      <ChatUserListComponent {...props} />
    </Suspense>
  );
}

function ChatUserListComponent({
  route,
}: StackScreenProps<HomeStackParamList, 'ChatUserList'>) {
  const {roomId, roomName} = route.params;

  const userInfoQuery = useChatroomUsersInfoQuery(roomId);

  return (
    <View style={styles.container}>
      <Carousel
        data={userInfoQuery.data}
        renderItem={({item}) => (
          <UserCard
            info={item}
            roomName={roomName}
            navigationButton={
              <LinkButton
                to={{
                  screen: 'Chat',
                  params: {
                    screen: 'ChatUserProfile',
                    params: {
                      userId: item.userId,
                      tyope: 'USER_INFO',
                    },
                  },
                }}
                mode="contained">
                상세 정보 확인하기
              </LinkButton>
            }
          />
        )}
        keyExtractor={data => data.userId}
        isIconButton={false}
        itemStyle={styles.itemContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    flex: 1,
    paddingHorizontal: 8,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  itemContainer: {
    //paddingHorizontal: 8,
    backgroundColor: 'rgba(36, 46, 69, 1)',
    borderWidth: 1,
    height: WINDOW_HEIGHT * 0.8,
    width: WINDOW_WIDTH - 18 * 2,
    marginLeft: 8,
    borderRadius: 10,
  },
});
