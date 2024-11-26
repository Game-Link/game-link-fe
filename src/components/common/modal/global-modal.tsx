import React from 'react';

import {ModalPropsMap, useModalStore} from '@src/store';
import {ChatImagesModal, PositionChoiceModal} from '@src/components';

function GlobalModal() {
  const {isOpen, modalType, modalProps} = useModalStore();

  if (!isOpen || !modalType) {
    return null;
  }

  switch (modalType) {
    case 'ChatImageModal':
      return (
        <ChatImagesModal {...(modalProps as ModalPropsMap['ChatImageModal'])} />
      );
    // 다른 모달 타입에 대한 케이스를 추가합니다.
    case 'PositionModal':
      return (
        <PositionChoiceModal
          {...(modalProps as ModalPropsMap['PositionModal'])}
        />
      );
    default:
      return null;
  }
}

export default GlobalModal;
