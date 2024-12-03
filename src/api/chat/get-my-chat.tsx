import {
  ChatroomUser,
  getHeaders,
  hookKeys,
  instance,
  PageNation,
  path,
} from '@api';
import {getSuspenseTime} from '@src/util';

import {useSuspenseInfiniteQuery} from '@tanstack/react-query';

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
  await getSuspenseTime(1000);
  const {page, size} = param;

  const params = {
    page,
    size: size ? size : 20,
  };
  console.log(params);
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
