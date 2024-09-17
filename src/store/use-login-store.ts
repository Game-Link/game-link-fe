import {create} from 'zustand';

export interface LoginStore {
  token: null | string;
  saveToken: (token: string) => void;
  removeToken: () => void;
  isLoggedIn: () => boolean;
}

export const useLoginStore = create<LoginStore>((set, get) => ({
  token: null,
  saveToken: (token: string) => set({token}),
  removeToken: () => set({token: null}),
  isLoggedIn: () => !!get().token,
}));
