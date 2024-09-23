import {instance, path} from '@api';

import {loginStore} from '@src/store';

export type DataProps = {
  gameName: string;
  tagLine: string;
};

export async function patchRiotAccount(data: DataProps) {
  const accessToken = loginStore.getState().token;
  console.log(accessToken);
  if (!accessToken) {
    return null;
  }
  const response = await instance.post(path.riot.account, data, {
    headers: {
      'gamelink-access': `Bearer ${accessToken}`,
    },
  });
  return response.data;
}
