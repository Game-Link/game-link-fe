import * as React from 'react';
import {Modal, ModalProps, Portal} from 'react-native-paper';

type Props = React.PropsWithChildren<{
  show: boolean;
  onClose: () => void;
  containerStyle?: ModalProps['contentContainerStyle'];
}>;

export function ModalComponent({
  show,
  children,
  onClose,
  containerStyle,
}: Props) {
  const baseStyle = containerStyle
    ? containerStyle
    : {backgroundColor: 'white', padding: 20, margin: 20};
  return (
    <Portal>
      <Modal
        visible={show}
        onDismiss={onClose}
        contentContainerStyle={baseStyle}>
        {children}
      </Modal>
    </Portal>
  );
}
