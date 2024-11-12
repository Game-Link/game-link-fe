import React from 'react';

import {ModalPropsMap, useModalStore} from '@src/store';
import {ChatImagesModal, ChatLinkModal} from '@src/components/chat';

function GlobalModal() {
  const {isOpen, modalType, modalProps} = useModalStore();

  if (!isOpen || !modalType) {
    return null;
  }

  switch (modalType) {
    case 'ChatLinkModal':
      return (
        <ChatLinkModal {...(modalProps as ModalPropsMap['ChatLinkModal'])} />
      );
    case 'ChatImageModal':
      return (
        <ChatImagesModal {...(modalProps as ModalPropsMap['ChatImageModal'])} />
      );
    // 다른 모달 타입에 대한 케이스를 추가합니다.
    default:
      return null;
  }
}

export default GlobalModal;
