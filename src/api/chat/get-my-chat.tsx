import {
  ChatroomUser,
  getHeaders,
  hookKeys,
  instance,
  PageNation,
  path,
} from '@api';

import {useSuspenseInfiniteQuery} from '@tanstack/react-query';
import Config from 'react-native-config';

export type MyChatResponse = {
  roomId: string;
  roomName: string;
  lastMessageTime: string | null;
  lastMessageContent: string | null;
  users: ChatroomUser[];
  newMessageCount: number;
};

type Param = {
  page: number;
  size?: number;
};

async function getMyChat(param: Param) {
  const {page, size} = param;

  const params = {
    page,
    size: size ? size : 20,
  };
  console.log('MYCHAT API PARAM:', params);
  console.log('MYCHAT URL:', Config.PRODUCTION_API, path.chatRoom.myChat);
  const response = await instance.get<PageNation<MyChatResponse>>(
    path.chatRoom.myChat,
    {
      headers: getHeaders(),
      params,
    },
  );

  // const response = await instance.get<MyChatResponse[]>(path.chatRoom.myChat, {
  //   headers: getHeaders(),
  //   params,
  // });
  return response.data;
}

export function useMyChatInfinityQuery(param: Param) {
  const queryKey = [hookKeys.chat.my];

  const query = useSuspenseInfiniteQuery({
    queryKey,
    queryFn: ({pageParam = 0}) => getMyChat({...param, page: pageParam}),
    retry: false,
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
  });
  return query;
}

// export function useMyChat(param: Param) {
//   const accessToken = useLoginStore().token;
//   const queryKey = [hookKeys.chat.my, 'TEST'];

//   const query = useQuery({
//     queryKey,
//     queryFn: () => getMyChat({...param}),
//     retry: false,
//     enabled: !!accessToken,
//   });
//   return query;
// }
