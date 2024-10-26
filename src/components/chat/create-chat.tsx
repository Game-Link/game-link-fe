import {useGenericMutation} from '@src/hooks';
import React, {useRef} from 'react';
import {Alert, StyleSheet, Keyboard, TextInput, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {matchingChatSchema, MatchingChatValues} from '@src/util';
import {zodResolver} from '@hookform/resolvers/zod';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import {
  Input,
  LabelBox,
  PositionPicker,
  SegmentedButtonControl,
} from '@src/components';
import {TierPicker} from './tier-picker';
import {Button} from 'react-native-paper';
import {hookKeys, postChatRoom} from '@src/api';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from '@src/page';

type Props = BottomTabScreenProps<RootStackParamList>;

export function CreateChat({navigation}: Props) {
  const {control, handleSubmit} = useForm<MatchingChatValues>({
    mode: 'onChange',
    resolver: zodResolver(matchingChatSchema),
  });

  const {mutation, loading} = useGenericMutation(
    postChatRoom,
    [hookKeys.chat.all],
    {
      onSucess: data => {
        console.log(data, '##### MUTATION SUCCESS #####');
        if (data) {
          navigation.navigate('Chat', {
            screen: 'Chatting',
            params: {
              roomId: data?.roomId,
            },
          });
        }
      },
      onError: err => {
        Alert.alert(err.message);
      },
    },
  );

  const buttons = [
    {
      value: 'SOLO_RANK',
      label: '솔로랭크',
      labelStyle: styles.labelStyle,
    },
    {
      value: 'FLEX_RANK',
      label: '자유랭크',
      labelStyle: styles.labelStyle,
    },
    {
      value: 'NORMAL',
      label: '일반게임',
      labelStyle: styles.labelStyle,
    },
  ];

  const onSubmit = handleSubmit(async data => {
    console.log(data);
    mutation.mutate(data);
  });

  const ref = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      keyboardVerticalOffset={100}
      style={styles.container}>
      <View>
        <LabelBox label="게임모드">
          <SegmentedButtonControl
            name="gameType"
            control={control}
            buttons={buttons}
          />
        </LabelBox>
        <LabelBox label="채팅 제목">
          <Input
            control={control}
            name="roomName"
            inputOption={{
              label: '제목',
              mode: 'outlined',
              onSubmitEditing: () => {
                ref.current?.focus();
              },
            }}
          />
        </LabelBox>
        <LabelBox label="참여 인원">
          <Input
            control={control}
            name="maxUserCount"
            inputOption={{
              label: '채팅 참여 인원',
              mode: 'outlined',
              inputMode: 'numeric',
              keyboardType: 'numeric',
              onSubmitEditing: () => {
                Keyboard.dismiss();
              },
              ref,
            }}
          />
        </LabelBox>

        <LabelBox label="티어 제한">
          <TierPicker control={control} name="rankTier" />
        </LabelBox>

        <LabelBox label="포지션">
          <PositionPicker control={control} name="positions" />
        </LabelBox>
      </View>

      <Button
        onPress={onSubmit}
        mode="contained"
        loading={loading}
        disabled={loading}
        style={styles.button}>
        채팅방 생성
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 12,
    marginBottom: 10,
    display: 'flex',
  },
  button: {
    marginTop: responsiveHeight(16),
  },
});
