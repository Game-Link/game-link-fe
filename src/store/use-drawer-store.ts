import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';
import {ChatUserDrawer} from '@src/components';
import {Keyboard} from 'react-native';

// 모달 타입과 해당 모달의 Props를 매핑합니다.

export type DrawerPropsMap = {
  ChatUserDrawer: ChatUserDrawer;
  // 다른 모달 타입을 추가합니다.
};

type DrawerType = keyof DrawerPropsMap;

export interface DrawerStore {
  isOpen: boolean;
  drawerType: DrawerType | null;
  drawerProps: DrawerPropsMap[DrawerType] | null;
  openDrawer: <T extends DrawerType>(
    drawerType: T | null,
    drawerProps: DrawerPropsMap[T] | null,
  ) => void;
  // openDrawer: () => void;
  closeDrawer: () => void;
}

export const drawerStore = createStore<DrawerStore>(set => ({
  isOpen: false,
  drawerType: null,
  drawerProps: null,
  // openDrawer: () => set({isOpen: true}),
  openDrawer: (drawerType, drawerProps) => {
    Keyboard.dismiss();
    set({isOpen: true, drawerType, drawerProps});
  },
  closeDrawer: () => set({isOpen: false, drawerType: null, drawerProps: null}),
}));

export const useDrawerStore = () => useStore(drawerStore);
