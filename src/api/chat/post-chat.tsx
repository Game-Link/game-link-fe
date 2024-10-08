import {getHeaders, instance, path} from '@api';
import {MatchingChatValues} from '@src/util';

export type ChatStatus = 'ACTIVE' | 'CLOSED' | 'DELETED' | 'DELETED_BY_ADMIN';
export type ChatResponse = {
  roomName: string;
  maxUserCount: number;
  userCount: number;
  status: ChatStatus;
};
export async function postChatRoom(body: MatchingChatValues) {
  const response = await instance.post<ChatResponse>(
    path.chatRoom.create,
    body,
    {
      headers: getHeaders(),
      params: {
        roomName: body.roomName,
        maxUserCount: body.maxUserCount,
      },
    },
  );
  return response.data;
}
