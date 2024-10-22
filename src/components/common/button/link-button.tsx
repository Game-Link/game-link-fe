import React from 'react';
import {useLinkProps} from '@react-navigation/native';
import {Button, ButtonProps} from 'react-native-paper';

interface LinkButtonProps extends ButtonProps {
  to: any; // RootParamList와 연결
  action?: Readonly<{
    type: string;
    payload?: object;
    source?: string;
    target?: string;
  }>;
  children: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  action,
  children,
  ...rest
}) => {
  const {onPress, ...props} = useLinkProps({to, action});

  return (
    <Button onPress={onPress} {...props} {...rest}>
      {children}
    </Button>
  );
};

export default LinkButton;
