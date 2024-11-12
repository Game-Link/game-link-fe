import React from 'react';
import {useDrawerStore} from '@src/store/use-drawer-store';
import {IconButton} from 'react-native-paper';

import {ChatUserDrawer} from './drawer-provider';

export function DrawerButtonChatUser(props: ChatUserDrawer) {
  const {openDrawer} = useDrawerStore();
  return (
    <IconButton
      icon="menu"
      size={24}
      onPress={() => openDrawer('ChatUserDrawer', {...props})}
    />
  );
}
