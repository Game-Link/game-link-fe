import React, {useRef, useState} from 'react';
import {
  FlatList,
  FlatListProps,
  LayoutChangeEvent,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {IconButton, IconButtonProps} from 'react-native-paper';

type Props<T> = {
  data: T[];
  renderItem: FlatListProps<T>['renderItem'];
  keyExtractor: FlatListProps<T>['keyExtractor'];
  isDot?: boolean;
  isIconButton?: boolean;
  iconColor?: IconButtonProps['iconColor'];
};

export default function Carousel<T>({
  data,
  renderItem,
  keyExtractor,
  isDot = true,
  isIconButton = true,
  iconColor = 'black',
}: Props<T>) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<T>>(null);
  const [itemOffsets, setItemOffsets] = useState<number[]>([]);
  const itemLayouts = useRef<{index: number; offset: number}[]>([]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    if (itemOffsets.length > 0) {
      const distances = itemOffsets.map(offset =>
        Math.abs(offset - contentOffsetX),
      );
      const minDistance = Math.min(...distances);
      const index = distances.indexOf(minDistance);
      setCurrentIndex(index);
    }
  };

  const handleClickLeft = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
      setCurrentIndex(currentIndex - 1);
    } else {
      flatListRef.current?.scrollToEnd();
      setCurrentIndex(data.length - 1);
    }
  };

  const handleClickRight = () => {
    if (currentIndex < data.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      flatListRef.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
      setCurrentIndex(0);
    }
  };

  const renderItemWrapper = (info: ListRenderItemInfo<T>) => {
    const {index} = info;

    const onItemLayout = (event: LayoutChangeEvent) => {
      const {x} = event.nativeEvent.layout;
      itemLayouts.current[index] = {index, offset: x};
      if (
        itemLayouts.current.filter(layout => layout !== undefined).length ===
        data.length
      ) {
        const sortedLayouts = itemLayouts.current
          .slice()
          .sort((a, b) => a.index - b.index);
        const offsets = sortedLayouts.map(layout => layout.offset);
        setItemOffsets(offsets);
      }
    };

    return (
      <View onLayout={onItemLayout}>{renderItem && renderItem(info)}</View>
    );
  };

  return (
    <View style={styles.container}>
      {isIconButton && (
        <IconButton
          icon="chevron-left"
          size={60}
          iconColor={iconColor}
          style={styles.icon}
          onPress={handleClickLeft}
        />
      )}
      <View style={styles.flatList}>
        <FlatList
          ref={flatListRef}
          horizontal
          data={data}
          renderItem={renderItemWrapper}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          snapToOffsets={itemOffsets}
          decelerationRate="fast"
          snapToAlignment="start"
          onMomentumScrollEnd={handleScroll}
          onScrollToIndexFailed={() => {}}
        />
        {isDot && (
          <View style={styles.dotContainer}>
            {data.map((_, index) => (
              <Dot key={`${index}`} isCurrent={index === currentIndex} />
            ))}
          </View>
        )}
      </View>
      {isIconButton && (
        <IconButton
          icon="chevron-right"
          size={60}
          iconColor={iconColor}
          style={styles.icon}
          onPress={handleClickRight}
        />
      )}
    </View>
  );
}

function Dot({isCurrent}: {isCurrent: boolean}) {
  return (
    <Pressable
      style={[styles.dot, isCurrent ? styles.dotActive : styles.dotInactive]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatList: {
    flex: 0.8,
  },
  icon: {
    flex: 0.1,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: 'black',
  },
  dotInactive: {
    backgroundColor: 'gray',
  },
});
