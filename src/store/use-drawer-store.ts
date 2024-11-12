import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';

// 모달 타입과 해당 모달의 Props를 매핑합니다.
// export type DrawerPropsMap = {
//   ChatUserDrawer: ChatLinkMoadlProps;
//   ChatImageModal: ChatImageModalProps;
//   // 다른 모달 타입을 추가합니다.
// };

// type DrawerType = keyof DrawerPropsMap;

export interface DrawerStore {
  isOpen: boolean;
  //   drawerType: DrawerType | null;
  //   drawerProps: DrawerPropsMap[DrawerType] | null;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const drawerStore = createStore<DrawerStore>(set => ({
  isOpen: false,
  //   drawerType: null,
  //   drawerProps: null,
  openDrawer: () => set({isOpen: true}),
  closeDrawer: () => set({isOpen: false}),
}));

export const useDrawerStore = () => useStore(drawerStore);
