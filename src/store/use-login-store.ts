import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';
export interface LoginStore {
  token: null | string;
  saveToken: (token: string) => void;
  removeToken: () => void;
  isLoggedIn: () => boolean;
}

// 상태 관리를 위한 store 객체 생성
export const loginStore = createStore<LoginStore>((set, get) => ({
  token: null,
  saveToken: (token: string) => set({token}),
  removeToken: () => set({token: null}),
  isLoggedIn: () => !!get().token,
}));

export const useLoginStore = () => useStore(loginStore);
