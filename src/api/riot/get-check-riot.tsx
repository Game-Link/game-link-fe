import {getHeaders, instance, path} from '@api';
import {useSuspenseQuery} from '@tanstack/react-query';

async function getCheckRiot() {
  const response = await instance.get<{result: boolean}>(path.riot.check, {
    headers: getHeaders(),
  });
  return response.data;
}

export function useCheckRiotQuery() {
  const query = useSuspenseQuery({
    queryKey: ['check-riot'],
    queryFn: getCheckRiot,
    retry: 1,
  });

  return query;
}
