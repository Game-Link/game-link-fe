import {useDrawerStore} from '@src/store/use-drawer-store';
import * as React from 'react';
import {Dimensions, Text} from 'react-native';
import {Drawer} from 'react-native-drawer-layout';
import {IconButton} from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;

export function DrawerComponent({children}: React.PropsWithChildren) {
  const {isOpen, openDrawer, closeDrawer} = useDrawerStore();
  return (
    <Drawer
      open={isOpen}
      onOpen={openDrawer}
      onClose={closeDrawer}
      drawerType="front"
      drawerPosition="right"
      drawerStyle={{width: windowWidth * 0.6}}
      renderDrawerContent={() => {
        return <Text>Drawer content</Text>;
      }}>
      {children}
    </Drawer>
  );
}

export function DrawerButton() {
  const {openDrawer} = useDrawerStore();
  return <IconButton icon="menu" size={30} onPress={openDrawer} />;
}
