import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';

import {ChatImageModalProps} from '@src/components';

// 모달 타입과 해당 모달의 Props를 매핑합니다.
export type ModalPropsMap = {
  ChatImageModal: ChatImageModalProps;
  // 다른 모달 타입을 추가합니다.
};

type ModalType = keyof ModalPropsMap;

export interface ModalStore {
  isOpen: boolean;
  modalType: ModalType | null;
  modalProps: ModalPropsMap[ModalType] | null;
  openModal: <T extends ModalType>(
    modalType: T,
    modalProps: ModalPropsMap[T],
  ) => void;
  closeModal: () => void;
}

export const modalStore = createStore<ModalStore>(set => ({
  isOpen: false,
  modalType: null,
  modalProps: null,
  openModal: (modalType, modalProps) =>
    set({isOpen: true, modalType, modalProps}),
  closeModal: () => set({isOpen: false, modalType: null, modalProps: null}),
}));

export const useModalStore = () => useStore(modalStore);
