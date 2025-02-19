import {getHeaders, hookKeys, instance, path} from '../instance';
import {useSuspenseQuery} from '@tanstack/react-query';
import {RiotInfo} from '@api';
import {useUserId} from '@src/hooks';

async function getUserInfo(userId: string | null) {
  if (typeof userId !== 'string') {
    return null;
  }

  const response = await instance.get<RiotInfo>(path.user.info(userId), {
    headers: getHeaders(),
  });

  return response.data;
}

export function useUserInfoQuery() {
  const userId = useUserId();

  console.log('USERID', userId);
  const query = useSuspenseQuery({
    queryKey: [hookKeys.user.info, userId],
    queryFn: () => getUserInfo(userId),
    refetchInterval: 600000, // 1 minute
    retry: false,
    staleTime: 600000, // 1 minute
  });

  return query;
}
