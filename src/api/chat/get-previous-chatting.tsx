import {getHeaders, hookKeys, instance, PageNation, path} from '@api';

import {useSuspenseInfiniteQuery} from '@tanstack/react-query';

export type TalkChatting = {
  userId: string;
  nickname: string;
  content: string;
  type: 'TALK' | 'ENTER' | 'LEAVE';
  createdAt: string;
  fileName: null;
  fileUrl: null;
  fileType: 'NONE';
  continuous: boolean;
  timeNotation: boolean;
  dateChanged: boolean;
  summonerIconUrl: string;
  chatMessageId: string;
};

export type FileChatting = {
  userId: string;
  nickname: string;
  content: null;
  type: 'TALK';
  createdAt: string;
  fileName: string;
  fileUrl: string;
  fileType: 'FILE' | 'IMAGE';
  continuous: boolean;
  timeNotation: boolean;
  dateChanged: boolean;
  summonerIconUrl: string;
  chatMessageId: string;
};

export type Chatting = FileChatting | TalkChatting;

export const isFileChatting = (chat: Chatting): chat is FileChatting => {
  if (chat.fileType !== null) {
    return true;
  }
  return false;
};

export const isTalkChatting = (chat: Chatting): chat is TalkChatting => {
  if (chat.fileType === null) {
    return true;
  }
  return false;
};

type Props = {
  roomId: string;
  page: number;
};

async function getPrivousChatting(props: Props) {
  const response = await instance.get<PageNation<Chatting>>(
    path.chatRoom.previousChatting,
    {
      headers: getHeaders(),
      params: {...props, size: 20},
    },
  );

  return response.data;
}

export function usePreviousChatRoomInfinityQuery(roomId: string) {
  const query = useSuspenseInfiniteQuery({
    queryKey: [hookKeys.chat.room(roomId)],
    queryFn: ({pageParam = 0}) => getPrivousChatting({page: pageParam, roomId}),
    retry: false,
    //enabled: !!accessToken && !loading,
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      // lastPage의 hasNext 속성을 확인하여 다음 페이지를 리턴
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
  });
  return query;
}
