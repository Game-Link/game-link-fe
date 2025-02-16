import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';
import {getLocalStorage, saveLocalStorage} from './local-storage';
import Config from 'react-native-config';

export interface NotificationStore {
  state: boolean;
  loading: boolean;
  setState: () => void;
}

export const notificationStore = createStore<NotificationStore>((set, get) => {
  const initializeStore = async () => {
    const state =
      ((await getLocalStorage(
        Config.LOCALSTORAGE_NOTIFICATION_KEY,
      )) as boolean) || true;

    await saveLocalStorage(Config.LOCALSTORAGE_NOTIFICATION_KEY, true);

    set({
      state,
      loading: false,
    });
  };

  // 초기화 중임을 표시하기 위해 `loading`을 true로 설정
  set({loading: true});
  initializeStore();

  return {
    state: true,
    loading: true,
    setState: () => {
      if (get().state) {
        saveLocalStorage(Config.LOCALSTORAGE_NOTIFICATION_KEY, false).then(
          () => {
            set({state: false});
          },
        );
      } else {
        saveLocalStorage(Config.LOCALSTORAGE_NOTIFICATION_KEY, true).then(
          () => {
            set({state: true});
          },
        );
      }
    },
  };
});

export const useNotificationStore = () => useStore(notificationStore);
