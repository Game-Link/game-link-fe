import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function LeftButton() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <Pressable onPress={handlePress}>
      <Icon name="chevron-left" size={30} color={'black'} />
    </Pressable>
  );
}
