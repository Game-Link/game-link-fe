import {View, Text} from 'react-native';
import React, {Suspense} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {MyPageStackParamList} from '@src/page';
import {useRiotMatchInfiniteQuery} from '@src/api';

type Props = StackScreenProps<MyPageStackParamList, 'MyMatchDetailInfo'>;
export default function MathDetailInfo({route, navigation}: Props) {
  const userId = route.params.userId;
  console.log('매치상세 정보: ', userId);
  return (
    <Suspense fallback={<View></View>}>
      <MatchDetailUser userId={userId} />
    </Suspense>
  );
}

function MatchDetailUser({userId}: {userId: string}) {
  const query = useRiotMatchInfiniteQuery(userId);
  console.log(query.data);
  return (
    <View>
      <Text>match-detail-users</Text>
    </View>
  );
}
