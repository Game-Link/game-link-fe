import {removeLocalStorage, useLoginStore} from '@src/store';
import {REFRESH_TOKEN, USER_ID} from '@src/util';
import {useQueryClient} from '@tanstack/react-query';

export default function useLogout() {
  const {removeToken} = useLoginStore();
  const queryClient = useQueryClient();

  const onLogout = async () => {
    queryClient.clear();
    await removeLocalStorage(REFRESH_TOKEN);
    await removeLocalStorage(USER_ID);
    removeToken();
  };
  return onLogout;
}
