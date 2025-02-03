import {getHeaders, hookKeys, instance, path} from '@api';
import {MatchInfoTeamPosition} from '@src/util';
import {useSuspenseInfiniteQuery} from '@tanstack/react-query';

export type RiotMatchData = {
  matchId: string;
  matchType: string;
  championName: string;
  championImageUrl: string;
  doubleKills: number;
  firstBloodKill: boolean;
  teamPosition: MatchInfoTeamPosition;
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
  return useSuspenseInfiniteQuery({
    queryKey: [hookKeys.riot.match, userId],
    queryFn: async ({pageParam = 0}) => {
      try {
        return await getRiotMatch(userId, pageParam);
      } catch (error: any) {
        if (error.response?.data?.code === 'ArrayIndexOutOfBoundsException') {
          // 더 이상 데이터가 없음을 알리기 위해 빈 배열 반환
          return [];
        }
        throw error;
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) {
        return undefined;
      }
      if (lastPage.length < 5) {
        return undefined;
      }
      return allPages.flat().length;
    },
    retry: false, // 자동 재시도 비활성화
  });
}
