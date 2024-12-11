import {Text, Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Carousel, ModalComponent} from '@src/components';
import {useModalStore} from '@src/store';
import {IconButton} from 'react-native-paper';
import {ChatroomUser} from '@src/api';
import {WINDOW_WIDTH} from '@src/util';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

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
      <View style={styles.header}>
        <Text style={styles.title}>
          "{roomName}" {nickname}의 이미지
        </Text>
        <IconButton
          icon="close"
          iconColor="black"
          onPress={closeModal}
          size={responsiveFontSize(2)}
        />
      </View>

      <Carousel
        data={data}
        iconColor="white"
        renderItem={({item}) => (
          <Image source={{uri: item.url}} style={styles.image} />
        )}
        keyExtractor={item => item.name}
        isIconButton={false}
        itemStyle={styles.itemStyle}
      />
    </ModalComponent>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Darker background for contrast
    position: 'relative',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    color: 'black',
    fontSize: responsiveFontSize(1.6),
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  itemStyle: {
    width: WINDOW_WIDTH - 20,
    marginHorizontal: 4,
  },
});
