import {getHeaders, hookKeys, instance, path} from '@api';
import {Position} from '@src/util';
import {useSuspenseInfiniteQuery} from '@tanstack/react-query';

export type RiotMatchData = {
  matchId: string;
  matchType: string;
  championName: string;
  championImageUrl: string;
  doubleKills: number;
  firstBloodKill: boolean;
  teamPosition: Omit<Position, 'ANY'>;
  pentaKills: number;
  assists: number;
  deaths: number;
  kills: number;
  kda: number;
  firstBloodAssist: boolean;
  firstTowerAssist: boolean;
  firstTowerKill: boolean;
  goldPerMinute: number;
  gameEndedInEarlySurrender: boolean;
  gameEndedInSurrender: boolean;
  timePlayed: number;
  totalMinionsKilled: number;
  win: boolean;
  soloKills: number;
  legendaryCount: number;
  damagePerMinute: number;
  dragonTakedowns: number;
  epicMonsterSteals: number;
  baronTakedowns: number;
  voidMonsterKill: number;
  perfectDragonSoulsTaken: number;
  elderDragonMultikills: number;
  killParticipation: number;
  item1ImageUrl: string;
  item2ImageUrl: string;
  item3ImageUrl: string;
  item4ImageUrl: string;
  item5ImageUrl: string;
  item6ImageUrl: string;
  trinketImageUrl: string;
  spell1ImageUrl: string;
  spell2ImageUrl: string;
  startTime: string;
};

async function getRiotMatch(userId: string, start = 0) {
  const response = await instance.get<RiotMatchData[]>(
    path.riot.match(userId),
    {
      headers: getHeaders(),
      params: {start},
    },
  );
  return response.data;
}

export function useRiotMatchInfiniteQuery(userId: string) {
  const query = useSuspenseInfiniteQuery({
    queryKey: [hookKeys.riot.match, userId],
    queryFn: ({pageParam = 0}) => getRiotMatch(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const allItems = allPages.flat();

      // 마지막 페이지를 받기 전까지의 아이템 개수
      const previousCount = allItems.length - lastPage.length;
      // 현재까지 총 아이템 개수
      const currentCount = allItems.length;

      // 만약 아이템 수가 늘어나지 않았다면 더 이상 가져올 데이터가 없음
      if (currentCount === previousCount) {
        return undefined;
      }

      // 만약 이번에 받은 데이터가 5개 미만이면 끝
      if (lastPage.length < 5) {
        return undefined;
      }

      // 위 두 조건에 해당하지 않으면 현재 총 개수를 다음 start로 사용
      return currentCount;
    },
  });

  return query;
}
