import {create} from 'zustand';

export interface LoginStore {
  token: null | string;
  saveToken: (token: string) => void;
  removeToken: () => void;
}

export const useLoginStore = create<LoginStore>(set => ({
  token: null,
  saveToken: (token: string) => set({token}),
  removeToken: () => set({token: null}),
}));
