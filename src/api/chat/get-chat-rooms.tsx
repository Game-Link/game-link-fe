import {getHeaders, instance, path} from '@api';
import {useLoginStore} from '@src/store';
import {useQuery} from '@tanstack/react-query';

export type ChatRoom = {
  roomId: string;
  roomName: string;
  userCount: number;
  maxUserCount: number;
};
async function getChatRooms() {
  const response = await instance.get<ChatRoom[]>(path.chatRoom.list, {
    headers: getHeaders(),
  });
  return response.data;
}

export function useChatRoomQuery() {
  const accessToken = useLoginStore().token;
  const query = useQuery({
    queryFn: getChatRooms,
    queryKey: ['chatRooms'],
    retry: false,
    enabled: !!accessToken,
  });

  return query;
}
