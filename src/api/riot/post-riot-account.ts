import {DataProps, getHeaders, instance, path} from '@api';
import {loginStore} from '@src/store';

export async function postRiotAccount(data: DataProps) {
  const accessToken = loginStore.getState().token;

  if (!accessToken) {
    return null;
  }
  const response = await instance.post(path.riot.register, data, {
    headers: getHeaders(),
  });
  return response.data;
}
