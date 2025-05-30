import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {
  changeFilterButtonText,
  filterScema,
  FilterSchema,
  GAME_TYPE_BUTTON_VALUE,
  POSITION_BUTTON_VALUE_ICON,
  RANK_BUTTON_VALUE_ICON,
} from '@src/util';
import {zodResolver} from '@hookform/resolvers/zod';
import {useChatFilterStore} from '@src/store';
import {useBottomSheet} from '@src/hooks';
import {Button, ButtonProps, IconButton} from 'react-native-paper';
import {BottomSheetComponent, ButtonsPicker, LabelBox} from '@src/components';
import {useQueryClient} from '@tanstack/react-query';
import {hookKeys} from '@src/api';

type FilterButtonProps = {
  value: string | string[];
  onPress: () => void;
} & Omit<ButtonProps, 'ref' | 'onPress' | 'children'>;

const FilterButton = ({value, onPress, ...props}: FilterButtonProps) => {
  return (
    <Button
      icon={'chevron-down'}
      mode="outlined"
      onPress={onPress}
      contentStyle={buttonStyles.buttonContent}
      labelStyle={buttonStyles.buttonText}
      {...props}>
      {changeFilterButtonText(value)}
    </Button>
  );
};

const buttonStyles = StyleSheet.create({
  buttonContent: {
    flexDirection: 'row-reverse',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default function ChatFilterBottomSheet() {
  const queryClient = useQueryClient();

  const {
    gameType,
    rankTiers,
    position,
    changeGameType,
    changePosition,
    changeRankTiers,
  } = useChatFilterStore();

  const {bottomSheetRef, handlePresentModalPress, handleClosePress} =
    useBottomSheet();

  const {control, handleSubmit, reset} = useForm<FilterSchema>({
    mode: 'onChange',
    resolver: zodResolver(filterScema),
    defaultValues: {
      gameType,
      rankTiers,
      position,
    },
  });

  const onRefresh = () => {
    reset({
      gameType,
      rankTiers,
      position,
    });
  };

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      reset();
    }
  };

  const handleFilterChange = handleSubmit(async data => {
    changeGameType(data.gameType);
    changePosition(data.position);
    changeRankTiers(data.rankTiers);
    queryClient.invalidateQueries({
      queryKey: [
        hookKeys.chat.all,
        gameType,
        position?.join(',') || '',
        rankTiers?.join(',') || '',
      ],
    });

    handleClosePress();
  });

  useEffect(() => {
    reset({
      gameType,
      rankTiers,
      position,
    });
  }, [gameType, rankTiers, position]);

  return (
    <View>
      <View style={styles.filterButtonContainer}>
        {[gameType, position, rankTiers].map((value, index) => (
          <FilterButton
            key={index}
            value={value}
            onPress={handlePresentModalPress}
            style={index !== 2 ? styles.button : {}}
          />
        ))}
      </View>
      <BottomSheetComponent
        ref={bottomSheetRef}
        handleSheetChanges={handleSheetChanges}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.titie}>채팅 필터</Text>
            <IconButton icon="close" onPress={handleClosePress} />
          </View>
          <LabelBox label="게임 타입">
            <ButtonsPicker
              buttons={GAME_TYPE_BUTTON_VALUE}
              name="gameType"
              control={control}
              isMultiple={false}
              isIcon={false}
              isScroll={false}
            />
          </LabelBox>
          <LabelBox label="게임 포지션">
            <ButtonsPicker
              buttons={POSITION_BUTTON_VALUE_ICON}
              name="position"
              control={control}
              isScroll={false}
            />
          </LabelBox>
          <LabelBox label="게임 랭크">
            <ButtonsPicker
              buttons={RANK_BUTTON_VALUE_ICON}
              name="rankTiers"
              control={control}
              isScroll={false}
            />
          </LabelBox>
          <View style={styles.buttonContainer}>
            <Button
              icon="refresh"
              mode="outlined"
              labelStyle={styles.filterButtonContent}
              style={[styles.filterButton, styles.button]}
              onPress={onRefresh}>
              필터 되돌리기
            </Button>
            <Button
              mode="contained"
              style={styles.filterButton}
              labelStyle={styles.filterButtonContent}
              onPress={handleFilterChange}>
              적용하기
            </Button>
          </View>
        </View>
      </BottomSheetComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titie: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  filterButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  button: {
    marginRight: 4,
  },
  labelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filterButton: {
    flex: 1,
    borderRadius: 8,
  },
  filterButtonContent: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
