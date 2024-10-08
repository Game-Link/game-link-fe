import {DataProps, instance, path} from '@api';
import {loginStore} from '@src/store';

export async function postRiotAccount(data: DataProps) {
  const accessToken = loginStore.getState().token;
  console.log(accessToken);

  if (!accessToken) {
    return null;
  }
  const response = await instance.post(path.riot.register, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}
