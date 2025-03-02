import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';
import {EnrolledType} from '@src/components';
export interface LoginStore {
  token: null | string;
  enrolledType: EnrolledType | null;
  saveToken: (token: string) => void;
  saveEnrolledType: (enrolledType: EnrolledType) => void;
  removeToken: () => void;
  isLoggedIn: () => boolean;
}

// 상태 관리를 위한 store 객체 생성
export const loginStore = createStore<LoginStore>((set, get) => ({
  token: null,
  enrolledType: null,
  saveToken: (token: string) => set({token}),
  saveEnrolledType: (enrolledType: EnrolledType) => set({enrolledType}),
  removeToken: () => set({token: null, enrolledType: null}),
  isLoggedIn: () => !!get().token,
}));

export const useLoginStore = () => useStore(loginStore);
