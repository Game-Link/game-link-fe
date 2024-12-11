import {SegmentedButtons} from 'react-native-paper';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import React from 'react';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

type Buttons = {
  value: string;
  icon?: IconSource;
  disabled?: boolean;
  accessibilityLabel?: string;
  checkedColor?: string;
  uncheckedColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
  label?: string;
  showSelectedCheck?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  testID?: string;
}[];

type ButtonProps = {
  value: string;
  onValueChange: (newValue: any) => void;
  buttons: Buttons;
  style?: StyleProp<ViewStyle>;
};
export function SegmentedButton({
  value,
  onValueChange,
  buttons,
  style,
}: ButtonProps) {
  return (
    <SegmentedButtons
      value={value}
      onValueChange={onValueChange}
      buttons={buttons}
      theme={{roundness: 2}}
      style={style}
    />
  );
}

type Props<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  buttons: Buttons;
};

export function SegmentedButtonControl<TFieldValues extends FieldValues>({
  name,
  control,
  buttons,
}: Props<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}}) => (
        <SegmentedButton
          onValueChange={onChange}
          value={value}
          buttons={buttons}
        />
      )}
    />
  );
}
