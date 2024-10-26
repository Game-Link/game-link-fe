/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {Button} from 'react-native-paper';

import {Position, POSITION_IMAGES} from '@src/util';
import {Image, ScrollView, StyleSheet} from 'react-native';

type ControllerProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
};
export function PositionPicker<TFieldValues extends FieldValues>({
  name,
  control,
}: ControllerProps<TFieldValues>) {
  const [items] = useState<{label: Position; value: string; icon?: any}[]>([
    {label: 'ANY', value: 'ANY', icon: POSITION_IMAGES.ANY},
    {label: 'TOP', value: 'TOP', icon: POSITION_IMAGES.TOP},
    {label: 'JUNGLE', value: 'JUNGLE', icon: POSITION_IMAGES.JUNGLE},
    {label: 'MID', value: 'MID', icon: POSITION_IMAGES.MID},
    {label: 'ADC', value: 'ADC', icon: POSITION_IMAGES.ADC},
    {label: 'SUPPORT', value: 'SUPPORT', icon: POSITION_IMAGES.SUPPORT},
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
