import {View, StyleSheet} from 'react-native';
import React from 'react';
import {IconButton} from 'react-native-paper';
import {useBottomSheet} from '@src/hooks';
import {BottomSheetComponent} from '@src/components';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
  Asset,
} from 'react-native-image-picker';

export default function PlusButton() {
  const {
    bottomSheetRef,
    handleSheetChanges,
    handleClosePress,
    handlePresentModalPress,
  } = useBottomSheet();

  const [image, setImage] = React.useState<Asset | null>(null);

  const handleChoosePhoto = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    try {
      const response = await launchImageLibrary(options);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
      }
    } catch (error) {
      console.log('An error occurred: ', error);
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
        console.log('User cancelled camera picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
      }
    } catch (error) {
      console.log('An error occurred: ', error);
    }
  };

  return (
    <View>
      <IconButton
        onPress={handlePresentModalPress}
        icon="plus"
        mode="contained"
        style={styles.fileButton}
      />
      <BottomSheetComponent
        ref={bottomSheetRef}
        points={25}
        handleSheetChanges={handleSheetChanges}>
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
