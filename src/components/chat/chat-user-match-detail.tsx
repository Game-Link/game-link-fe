import React, {Suspense} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {ChatStackParamList} from '@src/page';
import {useTabBarHide} from '@src/hooks';
import {MatchDetailUser} from '@src/components';
import {Text, View} from 'react-native';

type Props = StackScreenProps<ChatStackParamList, 'ChatUserMatchDetail'>;

export function ChatUserMatchDetail({route, navigation}: Props) {
  useTabBarHide(navigation, false);
  const userId = route.params.userId;
  return (
    <Suspense
      fallback={
        <View>
          <Text>Loading</Text>
        </View>
      }>
      <MatchDetailUser userId={userId} />
    </Suspense>
  );
}
