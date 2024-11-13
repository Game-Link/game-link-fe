import React, {useRef, useState} from 'react';
import {
  FlatList,
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
  Dimensions,
  ListRenderItemInfo,
  LayoutChangeEvent,
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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
  const [itemWidth, setItemWidth] = useState<number | null>(null);

  const effectiveItemWidth = itemWidth || windowWidth;

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / effectiveItemWidth);
    console.log(
      'Scroll EVENT in Carousel: ',
      contentOffsetX,
      effectiveItemWidth,
      index,
    );
    console.log('SCROL CHANGE DATA: ', data[index]);
    setCurrentIndex(index);
  };

  const handleClickLeft = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : data.length - 1;
    flatListRef.current?.scrollToIndex({
      index: newIndex,
      animated: true,
    });
    console.log(data[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleClickRight = () => {
    const newIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
    flatListRef.current?.scrollToIndex({
      index: newIndex,
      animated: true,
    });
    console.log(data[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleItemWidthMeasured = (width: number) => {
    if (itemWidth !== width) {
      setItemWidth(width);
    }
  };

  const renderItemWrapper = (info: ListRenderItemInfo<T>) => {
    return (
      <CarouselItemWrapper
        info={info}
        renderItem={renderItem}
        onItemWidthMeasured={handleItemWidthMeasured}
        itemWidth={itemWidth}
      />
    );
  };

  return (
    <View style={styles.container}>
      {isIconButton && (
        <View style={styles.iconContainer}>
          <IconButton
            icon="chevron-left"
            size={60}
            iconColor={iconColor}
            onPress={handleClickLeft}
          />
        </View>
      )}
      <View style={styles.flatListContainer}>
        <FlatList
          ref={flatListRef}
          horizontal
          data={data}
          renderItem={renderItemWrapper}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          snapToInterval={effectiveItemWidth}
          decelerationRate="fast"
          onMomentumScrollEnd={handleScrollEnd}
          getItemLayout={(_, index) => ({
            length: effectiveItemWidth,
            offset: effectiveItemWidth * index,
            index,
          })}
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
        <View style={styles.iconContainer}>
          <IconButton
            icon="chevron-right"
            size={60}
            iconColor={iconColor}
            onPress={handleClickRight}
          />
        </View>
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

// CarouselItemWrapper 컴포넌트를 동일한 파일 내에 정의
function CarouselItemWrapper<T>({
  info,
  renderItem,
  onItemWidthMeasured,
  itemWidth,
}: {
  info: ListRenderItemInfo<T>;
  renderItem: FlatListProps<T>['renderItem'];
  onItemWidthMeasured: (width: number) => void;
  itemWidth: number | null;
}) {
  const onItemLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    if (itemWidth !== width) {
      onItemWidthMeasured(width);
    }
  };

  return (
    <View style={itemStyles.itemContainer} onLayout={onItemLayout}>
      {renderItem && renderItem(info)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatListContainer: {
    flex: 1,
  },
  iconContainer: {
    width: 60,
    alignItems: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#8e7cc3',
  },
  dotInactive: {
    backgroundColor: 'white',
  },
});

// CarouselItemWrapper 전용 스타일
const itemStyles = StyleSheet.create({
  itemContainer: {
    width: windowWidth,
    height: windowHeight * 0.7, // 필요한 경우 높이를 조정하세요
    justifyContent: 'center',
    alignItems: 'center',
  },
});