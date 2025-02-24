import React, {useEffect, useState} from 'react';
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';

const DismissKeyboardView: React.FC<{
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  keyboardVerticalOffset?: number;
  isScrollable?: boolean;
}> = ({children, isScrollable, keyboardVerticalOffset = 0, ...props}) => {
  const [offset, setOffset] = useState(keyboardVerticalOffset);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setOffset(keyboardVerticalOffset);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setOffset(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [keyboardVerticalOffset]);

  const content = () => {
    return (
      <KeyboardAvoidingView
        {...props}
        style={props.style}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={offset}>
        {children}
      </KeyboardAvoidingView>
    );
  };
  if (!isScrollable) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {content()}
      </TouchableWithoutFeedback>
    );
  }

  return content();
};

export default DismissKeyboardView;
