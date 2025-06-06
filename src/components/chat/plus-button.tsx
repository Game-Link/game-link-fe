import {View, StyleSheet, Text, Keyboard} from 'react-native';
import React from 'react';
import {IconButton} from 'react-native-paper';
import {useBottomSheet, useGenericMutation} from '@src/hooks';
import {BottomSheetComponent} from '@src/components';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';
import {ChatFileResponse, postChatImage} from '@src/api';

type Props = {
  roomId: string;
  handleSendImage: ({
    roomId,
    fileName,
    fileType,
    fileUrl,
  }: ChatFileResponse) => void;
};

export default function PlusButton({roomId, handleSendImage}: Props) {
  const {
    bottomSheetRef,
    handleSheetChanges,
    handleClosePress,
    handlePresentModalPress,
  } = useBottomSheet();

  const onOpen = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    handlePresentModalPress();
  };

  const {mutation, loading} = useGenericMutation(postChatImage, [], {
    onSucess: async (data: ChatFileResponse | undefined) => {
      if (data) {
        handleSendImage(data);
      }
      bottomSheetRef.current?.close();
    },
  });

  const handleChoosePhoto = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 20,
    };

    try {
      const response = await launchImageLibrary(options);
      if (response.didCancel) {
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        await mutation.mutateAsync({roomId, images: response.assets});
      }
    } catch (error) {
      console.error('An error occurred: ', error);
    }
  };

  const handleTakePhoto = async () => {
    const options: CameraOptions = {
      saveToPhotos: true,
      mediaType: 'photo',
    };

    try {
      const response = await launchCamera(options);
      if (response.didCancel) {
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        await mutation.mutateAsync({roomId, images: response.assets});
      }
    } catch (error) {
      console.error('An error occurred: ', error);
    }
  };

  return (
    <View>
      <IconButton
        onPress={onOpen}
        icon="plus"
        mode="contained"
        style={styles.fileButton}
      />
      <BottomSheetComponent
        ref={bottomSheetRef}
        points={25}
        handleSheetChanges={handleSheetChanges}>
        {loading ? (
          <Text>Loading</Text>
        ) : (
          <View>
            <View style={styles.titleContainer}>
              <IconButton icon="close" onPress={handleClosePress} size={30} />
            </View>
            <View style={styles.buttonContainer}>
              <IconButton
                onPress={handleChoosePhoto}
                icon="image"
                size={40}
                mode="contained"
              />
              <IconButton
                onPress={handleTakePhoto}
                icon="camera"
                size={40}
                mode="contained"
              />
              <IconButton icon="video" size={40} mode="contained" />
              <IconButton icon="file" size={40} mode="contained" />
            </View>
          </View>
        )}
      </BottomSheetComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  fileButton: {
    flex: 1,
  },
});
