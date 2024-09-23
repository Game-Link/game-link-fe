import {StyleSheet, View} from 'react-native';
import React from 'react';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import {Input} from '@src/components';
import {RiotFormValues, riotSchema} from '@util';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {StackScreenProps} from '@react-navigation/stack';
import {MyPageStackParamList} from '@src/page/mypage';
import {Button, TextInput} from 'react-native-paper';
import {useGenericMutation} from '@hooks';
import {postRiotAccount, patchRiotAccount} from '@api';

type LoLAccountProps = StackScreenProps<
  MyPageStackParamList,
  'LoLAccountStack'
>;

export default function LoLAccount({navigation, route}: LoLAccountProps) {
  const {method} = route.params;
  console.log(method);
  const postMutation = useGenericMutation(postRiotAccount, ['riot-info']);
  const patchMutation = useGenericMutation(patchRiotAccount, ['riot-info']);

  const {control, handleSubmit} = useForm<RiotFormValues>({
    mode: 'onChange',
    resolver: zodResolver(riotSchema),
  });
  const loading =
    method === 'patch' ? patchMutation.loading : postMutation.loading;
  const onSubmit = handleSubmit(async data => {
    if (method === 'patch') {
      await patchMutation.mutation.mutateAsync(data);
    }
    if (method === 'post') {
      await postMutation.mutation.mutateAsync(data);
    }
    navigation.goBack();
  });

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      contentContainerStyle={styles.container}
      keyboardVerticalOffset={100}
      style={styles.content}>
      <View style={styles.inner}>
        <View>
          <Input
            control={control}
            name="gameName"
            inputOption={{
              placeholder: 'LOL 아이디',
              mode: 'outlined',
              label: 'LOL ID',
            }}
          />
          <Input
            control={control}
            name="tagLine"
            inputOption={{
              placeholder: 'LOL 태그',
              mode: 'outlined',
              label: 'LOL TAG',
              left: <TextInput.Affix text="#" />,
            }}
          />
        </View>
        <Button
          mode="contained"
          icon="account"
          onPress={onSubmit}
          loading={loading}>
          등록
        </Button>
      </View>
    </KeyboardAvoidingView>
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
    padding: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
});
