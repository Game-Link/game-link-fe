import {Button} from 'react-native-paper';
import React from 'react';
import {useGenericMutation} from '@hooks';
import {hookKeys, refreshRiotAccount} from '@src/api';

type Props = {
  userId: string;
};
export default function RiotRefreshButton({userId}: Props) {
  const {mutation, loading} = useGenericMutation(refreshRiotAccount, [
    hookKeys.myInfo.riot,
    userId,
  ]);
  const onPress = () => {
    mutation.mutate(userId);
  };
  return (
    <Button icon="refresh" loading={loading} onPress={onPress}>
      라이엇 정보 갱신
    </Button>
  );
}
