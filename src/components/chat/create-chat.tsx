import {useGenericMutation} from '@src/hooks';
import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {matchingChatSchema, MatchingChatValues} from '@src/util';
import {zodResolver} from '@hookform/resolvers/zod';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import {Input, SegmentedButtonControl} from '@src/components';
import {TierPicker} from './tier-picker';
import {Button} from 'react-native-paper';
import {postChatRoom} from '@src/api';

export function CreateChat() {
  const {control, handleSubmit} = useForm<MatchingChatValues>({
    mode: 'onChange',
    resolver: zodResolver(matchingChatSchema),
  });

  const {mutation, loading} = useGenericMutation(
    postChatRoom,
    ['chat-create'],
    {
      onSucess: data => {
        console.log(data, '##### MUTATION SUCCESS #####');
      },
      onError: err => {
        Alert.alert(err.message);
      },
    },
  );

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
    mutation.mutate(data);
  });
  return (
    <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={100}>
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
      <Button
        onPress={onSubmit}
        mode="contained"
        loading={loading}
        disabled={loading}>
        채팅방 생성
      </Button>
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
