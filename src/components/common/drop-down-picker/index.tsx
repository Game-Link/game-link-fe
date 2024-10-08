import React, {useState} from 'react';
import DropDownPicker, {
  DropDownPickerProps,
  ValueType,
  ItemType,
} from 'react-native-dropdown-picker';

type SingleProps<T extends ValueType> = Omit<
  DropDownPickerProps<T>,
  'open' | 'setOpen' | 'multiple' | 'onChangeValue' | 'onSelectItem'
> & {
  multiple?: false | undefined;
  onChangeValue?: (value: T | null) => void;
  onSelectItem?: (item: ItemType<T>) => void;
};

type MultipleProps<T extends ValueType> = Omit<
  DropDownPickerProps<T>,
  'open' | 'setOpen' | 'multiple' | 'onChangeValue' | 'onSelectItem'
> & {
  multiple: true;
  onChangeValue?: (value: T[] | null) => void;
  onSelectItem?: (items: ItemType<T>[]) => void;
};

type Props<T extends ValueType> = SingleProps<T> | MultipleProps<T>;

export function DropDownSelect<T extends ValueType>(props: Props<T>) {
  const [open, setOpen] = useState(false);
  const {mode = 'BADGE', multiple, ...rest} = props;

  return (
    <>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        mode={mode}
        multiple={multiple}
        {...rest}
      />
    </>
  );
}
