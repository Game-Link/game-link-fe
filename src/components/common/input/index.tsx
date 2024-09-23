import {StyleSheet, TextInput, View, Text} from 'react-native';
import React, {ElementRef, forwardRef} from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';
import {TextInputProps, TextInput as CustomInput} from 'react-native-paper';

type InputProps = Omit<TextInputProps, 'error'> & {
  errorMessage?: FieldError;
};

const Input = forwardRef<ElementRef<typeof TextInput>, InputProps>(
  ({errorMessage, ...props}, ref) => {
    return (
      <View style={styles.container}>
        <CustomInput ref={ref} error={errorMessage ? true : false} {...props} />
        {errorMessage?.message && (
          <Text style={styles.errorText}>{errorMessage.message}</Text>
        )}
      </View>
    );
  },
);

type Props<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  inputOption: Omit<InputProps, 'value' | 'onChangeText' | 'onBlur'>;
};

export default function HookFormInput<TFieldValues extends FieldValues>({
  name,
  control,
  inputOption,
}: Props<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <Input
          blurOnSubmit={false}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          errorMessage={error}
          {...inputOption}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 10,
    color: 'rgba(179, 38, 30, 1)',
  },
});
