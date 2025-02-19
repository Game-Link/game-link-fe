import React, {useEffect, useState} from 'react';
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  View,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';

const DismissKeyboardView: React.FC<{
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  keyboardVerticalOffset?: number;
}> = ({children, keyboardVerticalOffset = 0, ...props}) => {
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        {...props}
        style={props.style}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={offset}>
        {/* 자식 컴포넌트를 감싸는 뷰에 pointerEvents="box-none"을 추가하여 터치 이벤트가 자식으로 전달되게 함 */}
        <View style={{flex: 1}} pointerEvents="box-none">
          {children}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboardView;
