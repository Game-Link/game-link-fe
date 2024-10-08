import React, {useState} from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {Button} from 'react-native-paper';
import {Tier} from '@src/api';
import {IMAGES} from '@src/util';
import {Image, StyleSheet, View} from 'react-native';

type ControllerProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
};
export function TierPicker<TFieldValues extends FieldValues>({
  name,
  control,
}: ControllerProps<TFieldValues>) {
  const [items] = useState<{label: Tier; value: string; icon?: any}[]>([
    {label: 'BRONZE', value: 'BRONZE', icon: IMAGES.BRONZE},
    {label: 'SILVER', value: 'SILVER', icon: IMAGES.SILVER},
    {label: 'GOLD', value: 'GOLD', icon: IMAGES.GOLD},
    {label: 'PLATINUM', value: 'PLATINUM', icon: IMAGES.PLATINUM},
    {label: 'EMERALD', value: 'EMERALD', icon: IMAGES.EMERALD},
    {label: 'DIAMOND', value: 'DIAMOND', icon: IMAGES.DIAMOND},
    {label: 'MASTER', value: 'MASTER', icon: IMAGES.MASTER},
    {label: 'GRANDMASTER', value: 'GRANDMASTER', icon: IMAGES.GRANDMASTER},
    {label: 'CHALLENGER', value: 'CHALLENGER', icon: IMAGES.CHALLENGER},
    {label: 'ANY', value: '상관 없음'},
  ]);
  return (
    <Controller
      control={control}
      name={name}
      render={({field}) => {
        const handlePress = (selectedValue: string) => {
          const currentValue: any[] = field.value || [];
          let newValue;
          if (currentValue.includes(selectedValue)) {
            newValue = currentValue.filter((v: string) => v !== selectedValue);
          } else {
            newValue = [...currentValue, selectedValue];
          }
          field.onChange(newValue);
        };

        return (
          <View style={styles.container}>
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
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row', flexWrap: 'wrap'},
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
