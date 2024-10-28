import {useChatRoomInfinityQuery} from '@src/api';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BottomSheetComponent, ChatLink} from '@src/components';
import {useChatFilterStore} from '@src/store';
import {Button} from 'react-native-paper';
import {useBottomSheet} from '@src/hooks';
import {changeFilterButtonText} from '@src/util';

export default function Main() {
  const {gameType, rankTiers, position, loading} = useChatFilterStore();
  const {bottomSheetRef, handleSheetChanges, handlePresentModalPress} =
    useBottomSheet();
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
      <View style={homeStyle.buttonContainer}>
        <Button
          icon={'chevron-down'}
          mode="outlined"
          onPress={handlePresentModalPress}
          contentStyle={homeStyle.buttonContent}
          style={homeStyle.button}
          labelStyle={homeStyle.buttonText}>
          {changeFilterButtonText(gameType)}
        </Button>
        <Button
          icon={'chevron-down'}
          mode="outlined"
          onPress={handlePresentModalPress}
          contentStyle={homeStyle.buttonContent}
          labelStyle={homeStyle.buttonText}
          style={homeStyle.button}>
          {changeFilterButtonText(rankTiers)}
        </Button>
        <Button
          icon={'chevron-down'}
          mode="outlined"
          onPress={handlePresentModalPress}
          labelStyle={homeStyle.buttonText}
          contentStyle={homeStyle.buttonContent}>
          {changeFilterButtonText(position)}
        </Button>
      </View>
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
      <BottomSheetComponent
        ref={bottomSheetRef}
        handleSheetChanges={handleSheetChanges}>
        <View>
          <View>
            <Text>게임모드</Text>
          </View>
          <View>
            <Text>포지션</Text>
          </View>
          <View>
            <Text>티어</Text>
          </View>
        </View>
      </BottomSheetComponent>
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  buttonContent: {
    flexDirection: 'row-reverse',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  button: {
    marginRight: 4,
  },
});
