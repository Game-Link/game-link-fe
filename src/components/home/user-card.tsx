import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ChatRoomUsers} from '@src/api';

// const width

export default function UserCard(props: ChatRoomUsers) {
  return (
    <View style={styles.container}>
      <Text>UserCard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
});
