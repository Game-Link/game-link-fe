/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {Button} from 'react-native-paper';
import {Tier} from '@src/api';
import {IMAGES} from '@src/util';
import {Image, ScrollView, StyleSheet} from 'react-native';

type ControllerProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
};
export function TierPicker<TFieldValues extends FieldValues>({
  name,
  control,
}: ControllerProps<TFieldValues>) {
  const [items] = useState<{label: string; value: Tier; icon?: any}[]>([
    {label: '상관없음', value: 'ANY'},
    {label: 'IRON', value: 'IRON', icon: IMAGES.IRON},
    {label: 'BRONZE', value: 'BRONZE', icon: IMAGES.BRONZE},
    {label: 'SILVER', value: 'SILVER', icon: IMAGES.SILVER},
    {label: 'GOLD', value: 'GOLD', icon: IMAGES.GOLD},
    {label: 'PLATINUM', value: 'PLATINUM', icon: IMAGES.PLATINUM},
    {label: 'EMERALD', value: 'EMERALD', icon: IMAGES.EMERALD},
    {label: 'DIAMOND', value: 'DIAMOND', icon: IMAGES.DIAMOND},
    {label: 'MASTER', value: 'MASTER', icon: IMAGES.MASTER},
    {label: 'GRANDMASTER', value: 'GRANDMASTER', icon: IMAGES.GRANDMASTER},
    {label: 'CHALLENGER', value: 'CHALLENGER', icon: IMAGES.CHALLENGER},
  ]);

  return (
    <Controller
      control={control}
      name={name}
      render={({field}) => {
        const handlePress = (selectedValue: string) => {
          let newValue;

          if (selectedValue === 'ANY') {
            // 'ANY'가 선택되면 다른 모든 선택을 지우고 'ANY'만 남김
            newValue = ['ANY'];
          } else {
            const currentValue: any[] = field.value || [];
            if (currentValue.includes(selectedValue)) {
              // 현재 선택된 값이 다시 눌리면 선택 해제
              newValue = currentValue.filter(
                (v: string) => v !== selectedValue,
              );
            } else {
              // 다른 옵션이 선택되면 'ANY' 제거하고 추가
              newValue = [
                ...currentValue.filter((v: string) => v !== 'ANY'),
                selectedValue,
              ];
            }
          }

          field.onChange(newValue);
        };

        return (
          <ScrollView
            style={styles.container}
            horizontal={true}
            showsHorizontalScrollIndicator={true}>
            {items.map(({label, value, icon}) => {
              const isSelected = field.value && field.value.includes(value);
              return (
                <Button
                  key={label}
                  mode="outlined"
                  icon={
                    icon
                      ? props => (
                          <Image
                            style={styles.image}
                            source={icon}
                            {...props}
                          />
                        )
                      : 'cards'
                  }
                  style={[styles.button]}
                  buttonColor={isSelected ? '#8e7cc3' : 'white'} // 원하는 색상으로 변경
                  textColor={isSelected ? 'white' : 'black'}
                  onPress={() => handlePress(value)}>
                  {label}
                </Button>
              );
            })}
          </ScrollView>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  image: {
    width: 30,
    height: 30,
    color: 'transparent',
  },
  button: {
    fontSize: 12,
    marginRight: 5,
    marginBottom: 10,
  },
});
