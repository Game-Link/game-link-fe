import {Button, ButtonProps} from 'react-native-paper';
import React from 'react';
import {useGenericMutation} from '@hooks';
import {hookKeys, refreshRiotAccount} from '@src/api';
import {ProfileType} from '@src/page';

type Props = {
  userId: string;
  type: ProfileType;
} & Omit<ButtonProps, 'onPress' | 'loading' | 'children'>;
export default function RiotRefreshButton({userId, type, ...props}: Props) {
  const keys =
    type === 'MY_INFO' ? [hookKeys.riot.my] : [hookKeys.riot.user, userId];
  const {mutation, loading} = useGenericMutation(refreshRiotAccount, keys);
  const onPress = () => {
    mutation.mutate(userId);
  };
  return (
    <Button icon="refresh" loading={loading} onPress={onPress} {...props}>
      라이엇 정보 갱신
    </Button>
  );
}
