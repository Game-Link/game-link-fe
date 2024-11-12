import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ModalComponent, UserSimpleInfo} from '@src/components';
import {useModalStore} from '@src/store';

export type ChatLinkMoadlProps = {
  roomId: string;
  roomName: string;
};

export default function ChatLinkMoadl({roomId, roomName}: ChatLinkMoadlProps) {
  // roomId 기반으로 유저 정보가지고 오기
  console.log(roomId);
  const {isOpen, closeModal, modalType} = useModalStore();

  if (modalType !== 'ChatLinkModal') {
    return null;
  }

  return (
    <ModalComponent show={isOpen} onClose={closeModal}>
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
