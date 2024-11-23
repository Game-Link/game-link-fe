import {useQuery, useSuspenseQuery} from '@tanstack/react-query';
import {getHeaders, hookKeys, instance, path} from '../instance';

type ChatRoomCountInfo = {
  result: boolean;
};

async function getChatRoomCountIfon(roomId: string) {
  const response = await instance.get<ChatRoomCountInfo>(
    path.chatRoom.userCount(roomId),
    {
      headers: getHeaders(),
    },
  );
  return response.data;
}
export function useCheckUserCountQuery(roomId: string) {
  const query = useQuery({
    queryKey: [hookKeys.chat.roomCount, hookKeys.chat.room(roomId)],
    queryFn: () => getChatRoomCountIfon(roomId),
  });
  return query;
}
