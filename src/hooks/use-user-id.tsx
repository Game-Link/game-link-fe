import {getLocalStorage} from '@src/store';
import {useEffect, useState} from 'react';

export default function UseUserId() {
  const [userId, setUserId] = useState<null | string>(null);

  useEffect(() => {
    const getUserId = async () => {
      const myId = await getLocalStorage('userId');

      if (myId && typeof myId === 'string') {
        setUserId(myId);
      }
    };
    getUserId();
  }, []);
  return userId;
}
