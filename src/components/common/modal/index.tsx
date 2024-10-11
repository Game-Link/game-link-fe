import * as React from 'react';
import {Modal, Portal} from 'react-native-paper';

type Props = React.PropsWithChildren<{
  show: boolean;
  onClose: () => void;
}>;

export function ModalComponent({show, children, onClose}: Props) {
  const containerStyle = {backgroundColor: 'white', padding: 20, margin: 20};
  return (
    <>
      <Portal>
        <Modal
          visible={show}
          onDismiss={onClose}
          contentContainerStyle={containerStyle}>
          {children}
        </Modal>
      </Portal>
    </>
  );
}
