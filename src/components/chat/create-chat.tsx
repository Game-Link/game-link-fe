import {useModal} from '@src/hooks';
import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {matchingChatSchema, MatchingChatValues} from '@src/util';
import {zodResolver} from '@hookform/resolvers/zod';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import {ModalComponent, Input, SegmentedButtonControl} from '@src/components';
import {TierPicker} from './tier-picker';
import {Button} from 'react-native-paper';

type CreateChatComponentProp = {
  show: boolean;
  onClose: () => void;
};
function ChatCreateModal({show, onClose}: CreateChatComponentProp) {
  const {control, handleSubmit} = useForm<MatchingChatValues>({
    mode: 'onChange',
    resolver: zodResolver(matchingChatSchema),
  });

  const buttons = [
    {
      value: 'SOLO',
      label: '솔로랭크',
      labelStyle: chatCreateStyle.labelStyle,
    },
    {
      value: 'TEAM',
      label: '팀랭크',
      labelStyle: chatCreateStyle.labelStyle,
    },
    {
      value: 'CUSTOM',
      label: '설정게임',
      labelStyle: chatCreateStyle.labelStyle,
    },
    {
      value: 'NORMAL',
      label: '일반게임',
      labelStyle: chatCreateStyle.labelStyle,
    },
  ];

  const onSubmit = handleSubmit(async data => {
    console.log(data);
  });
  return (
    <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={100}>
      <ModalComponent show={show} onClose={onClose}>
        <View>
          <Text style={chatCreateStyle.title}>매칭 채팅창 생성</Text>
          <View style={chatCreateStyle.container}>
            <Text style={chatCreateStyle.label}>게임 모드</Text>
            <SegmentedButtonControl
              name="gameMode"
              control={control}
              buttons={buttons}
            />
          </View>
          <Input
            control={control}
            name="roomName"
            inputOption={{
              label: '제목',
              mode: 'outlined',
            }}
          />

          <Input
            control={control}
            name="maxUserCount"
            inputOption={{
              label: '채팅 참여 인원',
              mode: 'outlined',
              inputMode: 'numeric',
              keyboardType: 'numeric',
            }}
          />
          <View style={chatCreateStyle.container}>
            <Text style={chatCreateStyle.label}>티어 제한</Text>
            <TierPicker control={control} name="tier" />
          </View>
        </View>
        <Button onPress={onSubmit} mode="contained">
          채팅방 생성
        </Button>
      </ModalComponent>
    </KeyboardAvoidingView>
  );
}

const chatCreateStyle = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  labelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  container: {
    marginBottom: 10,
  },
});

type CreateChatButtonProp = PropsWithChildren<{}>;
export default function CreateChatButton({children}: CreateChatButtonProp) {
  const {show, onClose, onOpen} = useModal();

  return (
    <>
      <TouchableOpacity
        style={{
          top: -25,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onOpen}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#8e7cc3',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {children}
        </View>
      </TouchableOpacity>
      {show && <ChatCreateModal show={show} onClose={onClose} />}
    </>
  );
}
