import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

type Props = {
  navigate?: () => void;
};
export default function LeftButton({navigate}: Props) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (navigate) {
      navigate();
      return;
    }
    navigation.goBack();
  };

  return (
    <Pressable onPress={handlePress}>
      <Icon name="chevron-left" size={30} color={'black'} />
    </Pressable>
  );
}
