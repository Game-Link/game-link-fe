import React, {
  PropsWithChildren,
  forwardRef,
  useCallback,
  useMemo,
} from 'react';
import {StyleSheet} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

type Props = PropsWithChildren<{
  handleSheetChanges: (index: number) => void;
  points?: number;
}>;

const BottomSheetComponent = forwardRef<BottomSheetModal, Props>(
  ({children, handleSheetChanges, points = 90}, ref) => {
    const snapPoints = useMemo(() => [`${points}%`], []);

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="close"
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      ),
      [],
    );

    return (
      <BottomSheetModal
        ref={ref}
        onChange={handleSheetChanges}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}>
        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});

export default BottomSheetComponent;
