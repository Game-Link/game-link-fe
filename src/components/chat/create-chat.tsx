import {useGenericMutation} from '@src/hooks';
import React, {useEffect, useRef} from 'react';
import {Alert, StyleSheet, Keyboard, TextInput, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {
  matchingChatSchema,
  MatchingChatValues,
  POSITION_BUTTON_VALUE_ICON,
  RANK_BUTTON_VALUE_ICON,
} from '@src/util';
import {zodResolver} from '@hookform/resolvers/zod';

import {
  Input,
  LabelBox,
  ButtonsPicker,
  SegmentedButtonControl,
  DismissKeyboardView,
} from '@src/components';

import {Button} from 'react-native-paper';
import {hookKeys, postChatRoom} from '@src/api';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootBottomTapParamList} from '@src/page';

type Props = BottomTabScreenProps<RootBottomTapParamList>;

export function CreateChat({navigation}: Props) {
  const {control, handleSubmit, setValue, watch, getValues} =
    useForm<MatchingChatValues>({
      mode: 'onChange',
      resolver: zodResolver(matchingChatSchema),
    });

  // Watch for changes in gameType
  const selectedGameType = watch('gameType');

  useEffect(() => {
    if (selectedGameType === 'SOLO_RANK') {
      setValue('maxUserCount', '2');
    } else if (selectedGameType === 'FLEX_RANK') {
      setValue('maxUserCount', '3');
    } else {
      setValue('maxUserCount', '');
    }
  }, [selectedGameType, setValue]);

  const {mutation, loading} = useGenericMutation(
    postChatRoom,
    [hookKeys.chat.all],
    {
      onSucess: data => {
        if (data) {
          navigation.navigate('Chat', {
            screen: 'Chatting',
            params: {
              roomId: data?.roomId,
              roomName: data?.roomName,
            },
          });
        }
      },
      onError: err => {
        Alert.alert(err.message);
      },
    },
  );

  const rankButtons = [
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
    mutation.mutate(data);
  });

  const ref = useRef<TextInput>(null);

  return (
    <DismissKeyboardView style={styles.container}>
      <View>
        <LabelBox label="나의 포지션">
          <ButtonsPicker
            control={control}
            name="myPosition"
            buttons={POSITION_BUTTON_VALUE_ICON}
            isMultiple={false}
          />
        </LabelBox>
        <LabelBox label="게임모드">
          <SegmentedButtonControl
            name="gameType"
            control={control}
            buttons={rankButtons}
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
                if (!getValues('maxUserCount')) {
                  ref.current?.focus();
                } else {
                  Keyboard.dismiss();
                }
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
          <ButtonsPicker
            control={control}
            name="rankTiers"
            buttons={RANK_BUTTON_VALUE_ICON}
          />
        </LabelBox>

        <LabelBox label="포지션">
          <ButtonsPicker
            control={control}
            name="positions"
            buttons={POSITION_BUTTON_VALUE_ICON}
          />
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
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: responsiveFontSize(1.2),
    fontWeight: 'bold',
  },
  container: {
    paddingHorizontal: 12,
    marginBottom: 10,
    display: 'flex',
  },
  button: {
    marginTop: responsiveHeight(8),
    marginBottom: 8,
  },
});
