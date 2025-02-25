import {getHeaders, instance, path} from '@api';

export async function postUserWithdraw() {
  const response = await instance.post(
    path.user.withdraw,
    {},
    {
      headers: getHeaders(),
    },
  );

  return response.data;
}
