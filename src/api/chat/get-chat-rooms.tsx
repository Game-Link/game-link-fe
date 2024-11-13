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
  positions: Position[];
};

type Param = {
  page: number;
  size?: number;
  gameType?: GameMode;
  position?: Position[];
  rankTiers?: Tier[];
};

async function getChatRooms(param: Param) {
  const {page, size, position, rankTiers} = param;
  const gameType =
    !param.gameType || param.gameType === 'ALL' ? '' : param.gameType;
  const positions = position ? position.join(',') : undefined;
  const rankTier = rankTiers ? rankTiers.join(',') : undefined;

  const params = {
    page,
    size: size ? size : 7,
    gameType: gameType ? gameType : undefined,
    position: !positions || positions === 'ANY' ? undefined : positions,
    rankTiers: !rankTier || rankTier === 'ANY' ? undefined : rankTier,
  };
  console.log(params);
  const response = await instance.get<PageNation<ChatRoom>>(
    path.chatRoom.list,
    {
      headers: getHeaders(),
      params,
    },
  );
  return response.data;
}

export function useChatRoomInfinityQuery(param: Param, loading: boolean) {
  const accessToken = useLoginStore().token;
  const queryKey = [
    hookKeys.chat.all,
    param.gameType,
    param.position?.join(',') || '',
    param.rankTiers?.join(',') || '',
  ];

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({pageParam = 0}) => getChatRooms({...param, page: pageParam}),
    retry: false,
    enabled: !!accessToken && !loading,
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.page + 1 : undefined;
    },
  });
  return query;
}
