import {hookKeys, instance, path, getHeaders} from '@api';
import {loginStore} from '@src/store';
import {useQuery} from '@tanstack/react-query';

export type Tier =
  | 'IRON'
  | 'BRONZE'
  | 'SILVER'
  | 'GOLD'
  | 'EMERALD'
  | 'PLATINUM'
  | 'DIAMOND'
  | 'MASTER'
  | 'GRANDMASTER'
  | 'CHALLENGER'
  | 'ANY';

export type LoLRankInfo = {
  rank: string;
  tier: Tier;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
};

export type RiotInfo = {
  userId: string;
  puuid: string;
  summonerId: string;
  summonerName: string;
  summonerTag: string;
  profileIconId: number;
  revisionDate: string;
  summonerLevel: number;
  soloRank: LoLRankInfo | null;
  teamRank: LoLRankInfo | null;
};

async function getRiotInfo() {
  const accessToken = loginStore.getState().token;
  console.log(accessToken, 'CHECK');
  if (!accessToken) {
    return undefined;
  }
  const response = await instance.get<RiotInfo>(path.riot.account, {
    headers: getHeaders(),
  });
  console.log(response.data);
  return response.data;
}

export function useRiotInfo() {
  const query = useQuery({
    queryKey: [hookKeys.myInfo.riot],
    queryFn: getRiotInfo,
    retry: false,
  });

  return query;
}