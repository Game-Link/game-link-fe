import {View, StyleSheet} from 'react-native';
import React from 'react';
import {IconButton} from 'react-native-paper';
import {useBottomSheet} from '@src/hooks';
import {BottomSheetComponent} from '@src/components';
import ImagePicker from 'react-native-image-picker';

export default function PlusButton() {
  const {
    bottomSheetRef,
    handleSheetChanges,
    handleClosePress,
    handlePresentModalPress,
  } = useBottomSheet();

  const [image, setImage] =
    React.useState<null | ImagePicker.ImagePickerResponse>(null);

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response);
      }
    });
  };

  const handleTakePhoto = () => {
    const options = {
      saveToPhotos: true, // 촬영한 사진을 디바이스의 갤러리에 저장
      mediaType: 'photo', // 'photo', 'video', 또는 'mixed' 중 선택 가능
    };

    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response);
      }
    });
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
