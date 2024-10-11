import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {LeftContent} from '@src/components';
import {Tier} from '@src/api';
import {IMAGES} from '@src/util';

type Props = {
  icon?: string;
  name: string;
  tier: Tier;
};
export default function UserSimpleInfo() {
  const image = IMAGES.BRONZE;

  const onClick = () => {
    console.log('유저 상세 정보');
  };
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.left}>
          <LeftContent size={30} />
          <Text style={styles.name}>USER NAME(#TEST)</Text>
        </View>
        <View style={styles.left}>
          <Image source={image} style={styles.image} />
          <Text>Bronze</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 10,
    color: 'black',
  },
  image: {
    width: 30,
    height: 30,
  },
});
