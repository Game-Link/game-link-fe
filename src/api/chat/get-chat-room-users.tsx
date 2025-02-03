import {getHeaders, hookKeys, instance, path} from '@api';

import {useSuspenseQuery} from '@tanstack/react-query';

export type ChatroomUser = {
  userId: string;
  nickname: string;
  summonerIconUrl: string;
  summonerName: string;
  summonerTag: string;
};

type Props = {
  roomId: string;
};

async function getChatroomUsers(props: Props) {
  const response = await instance.get<ChatroomUser[]>(path.chatRoom.users, {
    headers: getHeaders(),
    params: props,
  });
  return response.data;
}

export function useChatRoomUsersQuery(roomId: string) {
  const query = useSuspenseQuery({
    queryKey: [hookKeys.chat.room(roomId), hookKeys.chat.user(roomId)],
    queryFn: () => getChatroomUsers({roomId}),
    retry: false,
  });
  return query;
}
