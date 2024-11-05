import {View, Text, Platform, TextInput, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import {Client, Frame} from '@stomp/stompjs';
import Config from 'react-native-config';
import SockJS from 'sockjs-client';

import {ChatStackParamList} from '@src/page';
import {
  ChatImageResponse,
  Chatting,
  useChatRoomUsersQuery,
  usePreviousChatRoomInfinityQuery,
} from '@src/api';
import {IconButton} from 'react-native-paper';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import SpeechBubble from './speech-bubble';
import PlusButton from './plus-button';
import {useUserId} from '@src/hooks';

type ChattingProps = StackScreenProps<ChatStackParamList, 'Chatting'>;

export default function ChattingPage({navigation, route}: ChattingProps) {
  const parentNavigation = navigation.getParent();
  const url = !__DEV__
    ? Config.PRODUCTION_API
    : Platform.OS === 'android'
    ? Config.DEV_API_ANDROID
    : Config.DEV_API_IOS;

  const production = Config.PRODUCTION_STOMP_URL;
  console.log(production);
  const roomId = route.params.roomId;
  const client = useRef<Client | null>(null);
  const [isLoading, setisLoading] = useState(true);
  const [value, setValue] = useState('');
  const userId = useUserId();
  const [messages, setMessages] = useState<Chatting[]>([]);

  const query = usePreviousChatRoomInfinityQuery(roomId, isLoading);
  console.log(query.data?.pages.flatMap(p => p));

  const userQuery = useChatRoomUsersQuery(roomId, isLoading);
  console.log(userQuery.data);

  const handleSendText = () => {
    if (value.trim() === '') {
      return;
    }
    console.log('Test');
    console.log('USERID ==== > ', userId);
    console.log(value);
    client.current?.publish({
      destination: '/pub/chat/sendMessage',
      body: JSON.stringify({
        roomId,
        userId: userId,
        type: 'TALK',
        content: value,
        fileType: 'NONE',
      }),
    });

    setValue('');
  };

  const handleSendImage = useCallback(
    ({
      roomId: responseRoomId,
      fileName,
      fileType,
      fileUrl,
    }: ChatImageResponse) => {
      console.log(
        'PUBLISH 전달 데이터 : ',
        responseRoomId,
        fileName,
        fileType,
        fileUrl,
      );
      client.current?.publish({
        destination: '/pub/chat/sendMessage',
        body: JSON.stringify({
          roomId: responseRoomId,
          userId,
          type: 'TALK',
          content: null,
          fileType,
          fileUrl,
          fileName,
        }),
      });
    },
    [],
  );

  useEffect(() => {
    // Set up the STOMP client
    console.log(production);
    if (!client.current && userId) {
      client.current = new Client({
        webSocketFactory: () => new SockJS(`${production}/ws-stomp`),
        reconnectDelay: 5000, // 자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        debug: function (str) {
          console.log('DEBUG: ', str);
        },
        onConnect: async () => {
          console.log('Connected to STOMP server');

          // 구독해서 메시지를 뿌려주는 역할
          client.current?.subscribe('/sub/chatRoom/enter' + roomId, payload => {
            console.log('PAYLOAD');
            const data = JSON.parse(payload.body) as Chatting;

            console.log('DATA', data);
            if (data.type === 'ENTER') {
              setisLoading(false);
            }
            if (data.content !== '') {
              setMessages(prev => [...prev, data]);
            }
          });

          // 등록해서 해당 유저가 메시지를 보내는 역할
          client.current?.publish({
            destination: '/pub/chat/enterUser',
            body: JSON.stringify({
              roomId,
              userId,
              type: 'ENTER',
              fileType: 'NONE',
            }),
          });
          //setisLoading(true); // Update the connection status here
        },
        onDisconnect: () => {
          console.log('DisLoading from STOMP server');
          setisLoading(true); // Update the connection status here
        },
        onStompError: (frame: Frame) => {
          console.error('Additional details: ' + frame.body);
          setisLoading(true); // Update the connection status here
        },
        onWebSocketClose: () => {
          console.log('WebSocket connection closed');
          setisLoading(true); // Update the connection status here
        },
      });
      client.current.activate();
    }

    return () => {
      if (client.current) {
        console.log(
          '========================DisLoading========================',
        );
        client.current.deactivate();
        client.current = null;
      }
    };
  }, [roomId, userId]);

  useEffect(() => {
    // 화면이 포커스될 때 탭 바 숨기기
    parentNavigation?.setOptions({
      tabBarStyle: {display: 'none'},
    });

    return () => {
      // 화면에서 벗어날 때 탭 바 다시 보이기
      parentNavigation?.setOptions({
        tabBarStyle: undefined,
      });
    };
  }, [parentNavigation]);

  if (userQuery.isError || query.isError || !userId) {
    return <Text>Error</Text>;
  }

  if (query.isLoading || userQuery.isLoading) {
    return <Text>Loading</Text>;
  }

  const users = userQuery.data;

  const findUser = (userId: string) =>
    users?.filter(user => user.id === userId)[0];

  return (
    <KeyboardAvoidingView
      behavior="padding"
      contentContainerStyle={{flex: 1}}
      keyboardVerticalOffset={100}
      style={styles.container}>
      <View style={styles.chatting}>
        {messages.map((message, index) => (
          <SpeechBubble
            key={index}
            chatting={message}
            user={findUser(message.userId)}
            myId={userId}
          />
        ))}
      </View>

      <View style={styles.inputContainer}>
        <PlusButton roomId={roomId} handleSendImage={handleSendImage} />
        <TextInput
          editable
          multiline
          onChangeText={text => setValue(text)}
          value={value}
          style={styles.input}
        />
        <IconButton
          icon="send"
          onPress={handleSendText}
          mode="contained"
          style={styles.summitButton}
        />
      </View>

      {/* Add your chat UI components here */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    position: 'relative',
  },
  chatting: {
    flex: 1,
    backgroundColor: '#82BFE0',
    padding: 10,
  },
  inputContainer: {
    backgroundColor: 'white',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 30,
    borderColor: 'black',
  },
  message: {
    borderColor: 'black',
    fontSize: 16,
    padding: 10,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 4,
  },
  fileButton: {
    flex: 0.15,
  },
  summitButton: {
    flex: 0.15,
    marginLeft: 5,
  },
});
