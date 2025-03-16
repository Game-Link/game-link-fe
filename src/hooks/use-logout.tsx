import {removeLocalStorage, useLoginStore} from '@src/store';
import {REFRESH_TOKEN, USER_ID} from '@src/util';
import {useQueryClient} from '@tanstack/react-query';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import NaverLogin from '@react-native-seoul/naver-login';

export default function useLogout() {
  const {removeToken, enrolledType} = useLoginStore();
  const queryClient = useQueryClient();

  const onLogout = async () => {
    if (enrolledType === 'GOOGLE') {
      // await GoogleSignin.signOut();
      // await GoogleSignin.revokeAccess();
    }

    if (enrolledType === 'NAVER') {
      await NaverLogin.logout();
      await NaverLogin.deleteToken();
    }
    queryClient.clear();
    await removeLocalStorage(REFRESH_TOKEN);
    await removeLocalStorage(USER_ID);
    removeToken();
  };
  return onLogout;
}
