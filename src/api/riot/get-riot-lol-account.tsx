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
  rankImageUrl: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  winRate: number;
  kda: number;
  avgKills: number;
  avgDeaths: number;
  avgAssists: number;
  avgCs: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
  best3champions: BestChampion[];
};

export type Profile = {
  id: string;
  url: string;
  originalName: string;
  mimeType: string;
};

export type BestChampion = {
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  winRate: number;
  wins: number;
  losses: number;
};

export type RiotInfo = {
  userId: string;
  nickname: string;
  profileImage: Profile[];
  email: string;
  puuid: string;
  summonerId: string;
  summonerName: string;
  summonerTag: string;
  summonerIconUrl: string;
  profileIconId: number;
  revisionDate: string;
  summonerLevel: number;
  wins: number;
  losses: number;
  winRate: number;
  kda: number;
  avgKills: number;
  avgDeaths: number;
  avgAssists: number;
  avgCs: number;
  soloRank: LoLRankInfo | null;
  teamRank: LoLRankInfo | null;
  best3champions: BestChampion[];
};

async function getRiotInfo() {
  const accessToken = loginStore.getState().token;

  if (!accessToken) {
    return undefined;
  }
  const response = await instance.get<RiotInfo>(path.riot.account, {
    headers: getHeaders(),
  });

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
