import {View, Text} from 'react-native';
import React from 'react';
import {ModalComponent} from '@src/components';
import {useModalStore} from '@src/store';

export type PositionChoiceModalProps = {
  roomId: string;
  roomName: string;
};

export function PositionChoiceModal({
  roomId,
  roomName,
}: PositionChoiceModalProps) {
  const {isOpen, closeModal} = useModalStore();
  console.log(roomId, roomName);
  return (
    <ModalComponent show={isOpen} onClose={closeModal} containerStyle={{}}>
      <View>
        <Text>PositionChoiceModal</Text>
      </View>
    </ModalComponent>
  );
}
