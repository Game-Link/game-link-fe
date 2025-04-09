import {removeLocalStorage, useLoginStore} from '@src/store';
import {GOOGLE_CONFIGUER, REFRESH_TOKEN, USER_ID} from '@src/util';
import {useQueryClient} from '@tanstack/react-query';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import NaverLogin from '@react-native-seoul/naver-login';
import {Platform} from 'react-native';

export default function useLogout() {
  const {removeToken, enrolledType} = useLoginStore();
  const queryClient = useQueryClient();

  const onLogout = async () => {
    console.log('Log Out', enrolledType);
    if (enrolledType === 'GOOGLE') {
      GoogleSignin.configure(GOOGLE_CONFIGUER);
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }

    if (enrolledType === 'NAVER' && Platform.OS !== 'ios') {
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
