import {useDrawerStore} from '@src/store/use-drawer-store';
import * as React from 'react';
import {Dimensions, Text} from 'react-native';
import {Drawer} from 'react-native-drawer-layout';
import {ChatUserDrawerContent} from './drawer-content';

const windowWidth = Dimensions.get('window').width;

export type ChatUserDrawer = {
  roomId: string;
  roomName: string;
};

export function DrawerProvider({children}: React.PropsWithChildren) {
  const {isOpen, closeDrawer, drawerProps, drawerType, openDrawer} =
    useDrawerStore();

  const handleDrawerOpen = React.useCallback(() => {
    openDrawer(drawerType, drawerProps);
  }, [drawerType]);
  return (
    <Drawer
      open={isOpen}
      onOpen={handleDrawerOpen}
      onClose={closeDrawer}
      drawerType="front"
      drawerPosition="right"
      drawerStyle={{width: windowWidth * 0.75}}
      renderDrawerContent={() => {
        if (drawerType === 'ChatUserDrawer' && drawerProps) {
          return <ChatUserDrawerContent {...drawerProps} />;
        }
        return <Text>Drawer content</Text>;
      }}>
      {children}
    </Drawer>
  );
}
