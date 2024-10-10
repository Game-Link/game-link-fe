import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {ChatStackParamList} from '@src/page/my-chat';
import {Client} from '@stomp/stompjs';

type ChattingProps = StackScreenProps<ChatStackParamList, 'Chatting'>;
export default function Chatting({navigation, route}: ChattingProps) {
  const roomId = route.params.roomId;
  const [client, setClient] = useState<Client | null>(null);
  const [users, setUsers] = useState<string[]>([]);
  const [username] = useState<string>('YourUsername'); // Replace with actual username
  const [userId] = useState<string>('YourUserId'); // Replace with actual user ID

  useEffect(() => {
    // Set up the STOMP client
    const client = new Client({
      // Replace 'yourserver.com' with your server's address
      webSocketFactory: () =>
        new WebSocket('ws://yourserver.com/ws-stomp/websocket'),
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log('Connected to WebSocket server');

      // Subscribe to the topic for user entry and exit
      client.subscribe('/sub/chatRoom/enter' + roomId, onMessageReceived);

      // Notify the server that the user has entered the chat room
      client.publish({
        destination: '/pub/chat/enterUser',
        body: JSON.stringify({
          roomId: roomId,
          userId: userId,
          sender: username,
          type: 'ENTER',
          fileType: 'NONE',
        }),
      });

      // Fetch the initial list of users
      getUserList();
    };

    client.onStompError = frame => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    client.activate();
    setClient(client);

    // Clean up the connection when the component unmounts
    return () => {
      client.deactivate();
    };
  }, [roomId, userId, username]);

  const onMessageReceived = message => {
    const chat = JSON.parse(message.body);
    if (chat.type === 'ENTER' || chat.type === 'LEAVE') {
      // Update user list when someone enters or leaves
      getUserList();
    }
    // Handle other message types if necessary
  };

  const getUserList = async () => {
    try {
      // Replace 'yourserver.com' with your server's address
      const response = await fetch(
        `http://yourserver.com/chat/userlist?roomId=${roomId}`,
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  return (
    <View>
      <Text>Chatting Room: {roomId}</Text>
      <Text>Users in this room:</Text>
      {users.map(user => (
        <Text key={user}>{user}</Text>
      ))}
      {/* Add your chat UI components here */}
    </View>
  );
}
