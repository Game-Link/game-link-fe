import {getHeaders, hookKeys, instance, path} from '@api';
import {useLoginStore} from '@src/store';
import {useQuery} from '@tanstack/react-query';

export type ChatroomUser = {
  userId: string;
  nickname: string;
  summonerIconUrl: string;
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

export function useChatRoomUsersQuery(roomId: string, loading: boolean) {
  const accessToken = useLoginStore().token;
  const query = useQuery({
    queryKey: [hookKeys.chat.room(roomId), hookKeys.chat.user(roomId)],
    queryFn: () => getChatroomUsers({roomId}),
    retry: false,
    enabled: !!accessToken && !loading,
  });
  return query;
}
