import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ModalComponent, UserSimpleInfo} from '@src/components';

export type ChatLinkMoadlProps = {
  roomId: string;
  roomName: string;
  show: boolean;
  onClose: () => void;
};

export default function ChatLinkMoadl({
  show,
  onClose,
  roomId,
  roomName,
}: ChatLinkMoadlProps) {
  // roomId 기반으로 유저 정보가지고 오기
  console.log(roomId);
  return (
    <ModalComponent show={show} onClose={onClose}>
      <View>
        <Text style={styles.title}>{roomName}</Text>
        <UserSimpleInfo />
      </View>
    </ModalComponent>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
});
