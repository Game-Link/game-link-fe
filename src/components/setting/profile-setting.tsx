import {Keyboard, StyleSheet, TextInput, View} from 'react-native';
import React, {useRef} from 'react';
import {DismissKeyboardView, Input} from '@src/components';
import {ChangeNicknameSchema, changeNicknameSchema} from '@util';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {StackScreenProps} from '@react-navigation/stack';
import {Button} from 'react-native-paper';
import {useGenericMutation, useTabBarHide} from '@hooks';
import {hookKeys, patchUserNickname} from '@api';
import {SettingStackParamList} from '@src/page';
import {useQueryClient} from '@tanstack/react-query';

type ProfileSettingStackProps = StackScreenProps<
  SettingStackParamList,
  'profileSetting'
>;

export default function LoLAccount({
  navigation,
  route,
}: ProfileSettingStackProps) {
  const {nickname} = route.params;
  const {control, handleSubmit} = useForm<ChangeNicknameSchema>({
    mode: 'onChange',
    resolver: zodResolver(changeNicknameSchema),
  });
  useTabBarHide();
  const queryClient = useQueryClient();
  const {mutation, loading} = useGenericMutation(
    patchUserNickname,
    [hookKeys.user.info],
    {
      onSucess: () => {
        queryClient.invalidateQueries({queryKey: [hookKeys.riot.my]});
      },
    },
  );

  const onSubmit = handleSubmit(async data => {
    mutation.mutate(data.newNickname);
    navigation.navigate('defaultSetting');
  });

  const ref = useRef<TextInput>(null);

  return (
    <DismissKeyboardView style={styles.content} keyboardVerticalOffset={100}>
      <View style={styles.inner}>
        {
          <View>
            <Input
              control={control}
              name="newNickname"
              inputOption={{
                ref: ref,
                placeholder: '닉네임',
                mode: 'outlined',
                label: '닉네임',
                autoFocus: true,
                defaultValue: nickname,
                onSubmitEditing: () => {
                  Keyboard.dismiss();
                  onSubmit();
                },
                blurOnSubmit: false,
              }}
            />
          </View>
        }
        <Button
          mode="contained"
          icon="account"
          onPress={onSubmit}
          loading={loading}
          disabled={loading}>
          닉네임 변경
        </Button>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  heading: {
    fontSize: 36,
    marginBottom: 48,
    fontWeight: '600',
  },
  inner: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 120,
    flex: 1,
    justifyContent: 'space-between',
  },
});

// 초 록
