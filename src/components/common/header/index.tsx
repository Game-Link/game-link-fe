import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

type Props = {
  title: string;
  image?: any;
};

export default function Header({title, image}: Props) {
  return (
    <View style={styles.header}>
      {image && <Image style={styles.image} source={image} />}
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 32,
    height: 32,
    marginRight: 12,
    resizeMode: 'contain',
  },
  text: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
