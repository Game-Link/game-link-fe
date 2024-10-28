import {useCallback, useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
export default function UseBottomSheet() {
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return {bottomSheetRef, handleSheetChanges, handlePresentModalPress};
}
