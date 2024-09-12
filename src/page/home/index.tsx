import {getInfo} from '@util';
import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';

export default function Home() {
  const [info, setInfo] = useState<any>(null);
  const onPress = async () => {
    const info = await getInfo();
    console.log(info);
    setInfo(info);
  };
  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={onPress}>
        <Text>Get Info</Text>
      </Pressable>
      <Text>{JSON.stringify(info)}</Text>
    </View>
  );
}
