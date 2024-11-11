import {Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Carousel, ModalComponent} from '@src/components';
import {useModalStore} from '@src/store';

export type ChatImageModalProps = {
  data: {url: string; name: string}[];
};

export function ChatImagesModal({data}: ChatImageModalProps) {
  const {closeModal, isOpen} = useModalStore();
  return (
    <ModalComponent
      show={isOpen}
      onClose={closeModal}
      containerStyle={styles.modalContainer}>
      <Text style={styles.title}>Image Carousel</Text>
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
  title: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
