import {useCallback, useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
export default function UseBottomSheet() {
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleClosePress = () => bottomSheetRef?.current?.close();

  return {
    bottomSheetRef,
    handleSheetChanges,
    handlePresentModalPress,
    handleClosePress,
  };
}
