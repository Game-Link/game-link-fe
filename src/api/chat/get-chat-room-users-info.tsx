import {
  getHeaders,
  hookKeys,
  instance,
  LoLRankInfo,
  path,
  RiotInfo,
} from '@src/api';
import {useSuspenseQuery} from '@tanstack/react-query';

export type ChatRoomUsers = Omit<
  RiotInfo,
  'teamRank' | 'total' | 'soloRank'
> & {
  gameInfo: LoLRankInfo;
};

async function getChatRoomUsersInfo(roomId: string) {
  const response = await instance.get<ChatRoomUsers[]>(
    path.chatRoom.usersInfo,
    {
      params: {roomId},
      headers: getHeaders(),
    },
  );
  return response.data;
}

export function useChatroomUsersInfoQuery(roomId: string) {
  const query = useSuspenseQuery({
    queryKey: [hookKeys.chat.chatUser, hookKeys.chat.room(roomId)],
    queryFn: () => getChatRoomUsersInfo(roomId),
  });

  return query;
}
