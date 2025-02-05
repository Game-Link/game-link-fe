import {getHeaders, instance, path} from '@api';

export async function patchUserNickname(newNickname: string) {
  const response = await instance.patch(
    path.user.nickname,
    {newNickname},
    {
      headers: getHeaders(),
    },
  );

  return response.data;
}
