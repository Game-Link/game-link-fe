import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';

export interface Unsubcription {
  roomId: string | null;
  unsubscribe: (roomId: string) => void;
  reset: () => void;
}

export const unsubscribeStore = createStore<Unsubcription>(set => ({
  roomId: null,
  unsubscribe: (roomId: string) => {
    set({roomId});
  },
  reset: () => {
    set({roomId: null});
  },
}));

export const useUnsubscriptionStore = () => useStore(unsubscribeStore);
