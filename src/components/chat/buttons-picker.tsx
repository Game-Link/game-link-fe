/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {Button} from 'react-native-paper';

import {Image, ScrollView, StyleSheet, View} from 'react-native';

type ButtonState = {label: string; value: string; icon?: any};

type ControllerProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  buttons: ButtonState[];
  all?: string;
  isScroll?: boolean;
  isIcon?: boolean;
};
export function ButtonsPicker<TFieldValues extends FieldValues>({
  name,
  control,
  all = 'ANY',
  buttons,
  isScroll = true,
  isIcon = true,
}: ControllerProps<TFieldValues>) {
  const [items] = useState<ButtonState[]>(buttons);

  return (
    <Controller
      control={control}
      name={name}
      render={({field}) => {
        const handlePress = (selectedValue: string) => {
          let newValue;

          if (selectedValue === all) {
            // 'ANY'가 선택되면 다른 모든 선택을 지우고 'ANY'만 남김
            newValue = [all];
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
                ...currentValue.filter((v: string) => v !== all),
                selectedValue,
              ];
            }
          }

          field.onChange(newValue);
        };

        if (isScroll) {
          return (
            <ScrollView
              style={styles.scrollContainer}
              horizontal={true}
              showsHorizontalScrollIndicator={true}>
              {items.map(({label, value, icon}) => {
                const isSelected = field.value && field.value.includes(value);
                return (
                  <Button
                    key={label}
                    mode="contained"
                    icon={
                      isIcon
                        ? icon
                          ? props => (
                              <Image
                                style={styles.image}
                                source={icon}
                                {...props}
                              />
                            )
                          : 'cards'
                        : undefined
                    }
                    style={[styles.button]}
                    buttonColor={isSelected ? '#8e7cc3' : 'white'} // 원하는 ��상으로 변경
                    textColor={isSelected ? 'white' : 'black'}
                    onPress={() => handlePress(value)}>
                    {label}
                  </Button>
                );
              })}
            </ScrollView>
          );
        }

        return (
          <View style={styles.container}>
            {items.map(({label, value, icon}) => {
              const isSelected = field.value && field.value.includes(value);
              return (
                <Button
                  key={label}
                  mode="outlined"
                  icon={
                    isIcon
                      ? icon
                        ? props => (
                            <Image
                              style={styles.image}
                              source={icon}
                              {...props}
                            />
                          )
                        : 'cards'
                      : undefined
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
  scrollContainer: {flexDirection: 'row'},
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 30,
    height: 30,
    color: 'transparent',
  },
  button: {
    fontSize: 12,
    marginRight: 2,
    marginBottom: 10,
  },
});
