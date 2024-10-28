import {
  GameMode,
  getHeaders,
  hookKeys,
  instance,
  PageNation,
  path,
  Tier,
} from '@api';
import {useLoginStore} from '@src/store';
import {Position} from '@src/util';
import {useInfiniteQuery} from '@tanstack/react-query';

export type ChatRoom = {
  roomId: string;
  roomName: string;
  userCount: number;
  maxUserCount: number;
  leaderTier: string;
  positions: Tier[];
};

type Param = {
  page: number;
  size?: number;
  gameType?: GameMode;
  position?: Position[];
  rankTiers?: Tier[];
};

async function getChatRooms(param: Param) {
  const {page, size, gameType, position, rankTiers} = param;
  const response = await instance.get<PageNation<ChatRoom>>(
    path.chatRoom.list,
    {
      headers: getHeaders(),
      params: {
        page,
        size: size ? size : 20,
        gameType: gameType ? gameType : undefined,
        position: position ? position.join(',') : undefined,
        rankTiers: rankTiers ? rankTiers.join(',') : undefined,
      },
    },
  );
  return response.data;
}

export function useChatRoomInfinityQuery(param: Param, loading: boolean) {
  const accessToken = useLoginStore().token;
  const query = useInfiniteQuery({
    queryKey: [hookKeys.chat.all],
    queryFn: ({pageParam = 0}) => getChatRooms({...param, page: pageParam}),
    retry: false,
    enabled: !!accessToken && !loading,
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      // lastPage의 hasNext 속성을 확인하여 다음 페이지를 리턴
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
  });
  return query;
}
