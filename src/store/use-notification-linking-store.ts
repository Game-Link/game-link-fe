import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';
import {
  getLocalStorage,
  removeLocalStorage,
  saveLocalStorage,
} from './local-storage';
import {OPEN_DEEP_LINKING_URL} from '@src/util';

export interface DeepLinkingUrl {
  url: string | null;
  loading: boolean;
  saveUrl: (url: string) => void;
  deleteUrl: () => void;
}

export const deeplinkingStore = createStore<DeepLinkingUrl>(set => {
  const initializeStore = async () => {
    const url =
      ((await getLocalStorage(OPEN_DEEP_LINKING_URL)) as string) || null;

    set({
      url,
      loading: false,
    });
  };

  // 초기화 중임을 표시하기 위해 `loading`을 true로 설정
  set({loading: true});
  initializeStore();

  return {
    url: null,
    loading: true,
    saveUrl: async (url: string) => {
      await saveLocalStorage(OPEN_DEEP_LINKING_URL, url);
      set({url});
    },
    deleteUrl: async () => {
      await removeLocalStorage(OPEN_DEEP_LINKING_URL);
      set({url: null});
    },
  };
});

export const useDeeplinkingStore = () => useStore(deeplinkingStore);
