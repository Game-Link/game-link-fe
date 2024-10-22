import {getHeaders, instance, path} from '@api';

import {loginStore} from '@src/store';

export async function refreshRiotAccount(userId: string) {
  const accessToken = loginStore.getState().token;

  if (!accessToken) {
    return null;
  }
  const response = await instance.patch(
    path.riot.refresh,
    {},
    {
      params: {userId},
      headers: getHeaders(),
    },
  );
  return response.data;
}
