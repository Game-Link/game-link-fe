import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';
export interface FCMTockenStore {
  token: null | string;
  saveToken: (token: string) => void;
}

// 상태 관리를 위한 store 객체 생성
export const fcmTokenStore = createStore<FCMTockenStore>(set => ({
  token: null,
  saveToken: (token: string) => set({token}),
}));

export const useFcmTokenStore = () => useStore(fcmTokenStore);
