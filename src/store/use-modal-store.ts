import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';
import {ChatLinkMoadlProps, CreateChatComponentProp} from '@src/components';

// 모달 타입과 해당 모달의 Props를 매핑합니다.
type ModalPropsMap = {
  ChatCreateModal: CreateChatComponentProp;
  ChatLinkModal: ChatLinkMoadlProps;
  // 다른 모달 타입을 추가합니다.
};

export interface ModalStore {
  isOpen: boolean;
  modalType: 'ChatLinkModal' | 'ChatCreateModal' | null;
  modalProps: any;
  openModal: (modalType: ModalStore['modalType'], modalProps?: any) => void;
  closeModal: () => void;
}

export const modalStore = createStore<ModalStore>(set => ({
  isOpen: false,
  modalType: null,
  modalProps: {},
  openModal: (modalType, modalProps = {}) =>
    set({isOpen: true, modalType, modalProps}),
  closeModal: () => set({isOpen: false, modalType: null, modalProps: {}}),
}));

export const useModalStore = () => useStore(modalStore);
