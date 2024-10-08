import {getHeaders, instance, path} from '@api';

import {loginStore} from '@src/store';

export async function refreshRiotAccount(userId: string) {
  const accessToken = loginStore.getState().token;
  console.log(accessToken);
  if (!accessToken) {
    return null;
  }
  const response = await instance.post(
    path.riot.refresh,
    {},
    {
      params: {userId},
      headers: getHeaders(),
    },
  );
  return response.data;
}
