import React from 'react';

import {useModalStore} from '@src/store';
import {ChatCreateModal, ChatLinkModal} from '@src/components/chat';
// 다른 모달 컴포넌트들을 import합니다.

function GlobalModal() {
  const {isOpen, modalType, modalProps, closeModal} = useModalStore();

  if (!isOpen || !modalType) {
    return null;
  }

  let ModalComponent;

  switch (modalType) {
    case 'ChatLinkModal':
      ModalComponent = ChatLinkModal;
      break;
    case 'ChatCreateModal':
      ModalComponent = ChatCreateModal;
      break;
    // 다른 모달 타입에 대한 케이스를 추가합니다.
    default:
      return null;
  }

  return <ModalComponent show={isOpen} onClose={closeModal} {...modalProps} />;
}

export default GlobalModal;
