import {View, Text, Alert, StyleSheet, Image} from 'react-native';
import React, {Suspense} from 'react';
import {ButtonsPicker, LabelBox, ModalComponent} from '@src/components';
import {useModalStore} from '@src/store';
import {useGenericMutation} from '@src/hooks';

import {
  hookKeys,
  postChatRoomUserPosition,
  useCheckUserCountQuery,
} from '@src/api';
import {
  Position,
  POSITION_BUTTON_VALUE_ICON,
  POSITION_IMAGES,
  PositionSchema,
  positionSchema,
} from '@src/util';
import {useNavigation} from '@react-navigation/native';
import {HomeStackProps} from '@src/page';
import {Button, IconButton} from 'react-native-paper';
import {
  responsiveScreenFontSize,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useQueryClient} from '@tanstack/react-query';

export type PositionChoiceModalProps = {
  roomId: string;
  roomName: string;
  positions: Position[];
};

export function PositionChoiceModal(props: PositionChoiceModalProps) {
  return (
    <Suspense>
      <PositionChoiceModalComponent {...props} />
    </Suspense>
  );
}

function PositionChoiceModalComponent({
  roomId,
  roomName,
  positions,
}: PositionChoiceModalProps) {
  const {isOpen, closeModal} = useModalStore();
  const queryClient = useQueryClient();

  const navigation = useNavigation<HomeStackProps>();
  const {mutation, loading} = useGenericMutation(postChatRoomUserPosition, [], {
    onSucess: () => {
      queryClient.invalidateQueries({
        queryKey: [hookKeys.chat.all],
        exact: false,
        refetchType: 'all',
      });
      closeModal();
      navigation.navigate('Chat', {
        screen: 'Chatting',
        params: {
          roomId,
          roomName,
        },
      });
    },
  });
  const {data} = useCheckUserCountQuery(roomId);

  const {control, handleSubmit} = useForm<PositionSchema>({
    mode: 'onChange',
    resolver: zodResolver(positionSchema),
  });

  if (data.result === false) {
    Alert.alert('참여자수가 너무 많아요', '', [
      {
        text: '확인',
        onPress: () => {
          closeModal();
        },
        style: 'default',
      },
    ]);
    return null;
  }

  const onSubmit = handleSubmit(async ({myPosition}) => {
    mutation.mutate({roomId, myPosition});
  });

  return (
    <ModalComponent
      show={isOpen}
      onClose={closeModal}
      containerStyle={styles.outContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>"{roomName}" 참여하기</Text>
          <IconButton icon="close" size={24} onPress={closeModal} />
        </View>
        <View style={styles.wantedPositionOuterContainer}>
          <Text style={styles.middleTite}>원하는 포지션</Text>
          <View style={styles.rowContainer}>
            {positions.map(position => (
              <View key={position} style={styles.wantedPositionContainer}>
                <Image
                  source={POSITION_IMAGES[position]}
                  style={styles.wantedPositionImage}
                />
                <Text style={styles.positonText}>{position}</Text>
              </View>
            ))}
          </View>
        </View>
        <LabelBox label="포지션 선택">
          <ButtonsPicker
            control={control}
            name="myPosition"
            buttons={POSITION_BUTTON_VALUE_ICON}
            isMultiple={false}
            isScroll={false}
          />
        </LabelBox>
        <Button
          onPress={onSubmit}
          mode="contained"
          loading={loading}
          disabled={loading}>
          "{roomName}" 참가
        </Button>
      </View>
    </ModalComponent>
  );
}

const styles = StyleSheet.create({
  outContainer: {
    padding: 20,
  },
  container: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: responsiveScreenFontSize(2),
    color: 'black',
    fontWeight: 'bold',
  },
  wantedPositionOuterContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginVertical: 12,
  },
  wantedPositionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  wantedPositionImage: {
    width: responsiveScreenWidth(10),
    height: responsiveScreenWidth(10),
    resizeMode: 'contain',
  },
  middleTite: {
    fontSize: responsiveScreenFontSize(1.6),
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  positonText: {
    fontWeight: 'bold',
  },
});
