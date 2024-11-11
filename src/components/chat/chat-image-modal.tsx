import {Text, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Carousel, ModalComponent} from '@src/components';
import {useModalStore} from '@src/store';
import {IconButton} from 'react-native-paper';
import {ChatroomUser} from '@src/api';

export type ChatImageModalProps = {
  data: {url: string; name: string}[];
  user: ChatroomUser | undefined;
  roomName: string;
};

export function ChatImagesModal({data, user, roomName}: ChatImageModalProps) {
  const {closeModal, isOpen} = useModalStore();
  console.log(user, roomName);
  const nickname = user?.nickname || '사용자';
  return (
    <ModalComponent
      show={isOpen}
      onClose={closeModal}
      containerStyle={styles.modalContainer}>
      <IconButton
        icon="close"
        iconColor="white"
        onPress={closeModal}
        size={36}
        style={{position: 'absolute', top: 20, right: 20}}
      />
      <View style={styles.header}>
        <Text style={styles.title}>
          "{roomName}" {nickname}의 이미지
        </Text>
      </View>

      <Carousel
        data={data}
        iconColor="white"
        renderItem={({item}) => (
          <Image source={{uri: item.url}} style={styles.image} />
        )}
        keyExtractor={item => item.name}
      />
    </ModalComponent>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Darker background for contrast
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
});
