import {useState} from 'react';

export default function useModal() {
  const [show, setShow] = useState(false);
  const onOpen = () => {
    setShow(true);
  };
  const onClose = () => {
    setShow(false);
  };

  return {show, onOpen, onClose};
}
