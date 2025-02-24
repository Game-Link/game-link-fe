import {instance, path} from '@api';
import {
  getLocalStorage,
  removeLocalStorage,
  saveLocalStorage,
  useLoginStore,
} from '@store';
import {useMutation} from '@tanstack/react-query';
import {REFRESH_TOKEN} from '@util';
import SplashScreen from 'react-native-splash-screen';

export type PostReissue = {
  accessToken: string;
  refreshToken: string;
};

export async function postReissue() {
  const refreshToken = await getLocalStorage(REFRESH_TOKEN);

  if (refreshToken) {
    const response = await instance.post<PostReissue>(path.user.reissue, {
      refreshToken,
    });

    return response.data;
  }
}

export function useReissueMutation() {
  const saveToken = useLoginStore().saveToken;
  const mutation = useMutation({
    mutationFn: postReissue,
    onError: () => {
      removeLocalStorage(REFRESH_TOKEN);
    },
    onSuccess: async data => {
      if (data) {
        await saveLocalStorage(REFRESH_TOKEN, data.refreshToken);
        saveToken(data.accessToken);
      }
    },
    onSettled: () => {
      SplashScreen.hide();
    },
    retry: 0,
  });

  return mutation;
}
