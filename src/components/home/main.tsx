import {useChatRoomQuery} from '@src/api';
import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {ChatLink} from '@src/components';

export default function Main() {
  const {data, isLoading, isError, error} = useChatRoomQuery();
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
  return (
    <View style={homeStyle.container}>
      {data && (
        <FlatList
          data={data}
          renderItem={props => <ChatLink {...props.item} />}
          keyExtractor={item => item.roomId}
        />
      )}
    </View>
  );
}

const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
});
