import {getHeaders, instance, path} from '@api';
import {MatchingChatValues} from '@src/util';

export type ChatStatus = 'ACTIVE' | 'CLOSED' | 'DELETED' | 'DELETED_BY_ADMIN';
export type GameMode = 'SOLO_RANK' | 'FLEX_RANK' | 'NORMAL' | 'ALL';
export type Line = 'SUP' | 'AD' | 'TOP' | 'JG' | 'MID';
export type ChatResponse = {
  roomId: string;
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
    },
  );
  return response.data;
}
