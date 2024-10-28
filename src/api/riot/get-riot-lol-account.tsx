import {hookKeys, instance, path, getHeaders} from '@api';
import {loginStore} from '@src/store';
import {useQuery} from '@tanstack/react-query';

export type Tier =
  | 'UNRANKED'
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
  championImageUrl: string;
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
  backgroundImageUrl: string;
  total: LoLRankInfo | null;
  soloRank: LoLRankInfo | null;
  teamRank: LoLRankInfo | null;
};

async function getMyRiotInfo() {
  const accessToken = loginStore.getState().token;

  if (!accessToken) {
    return undefined;
  }
  const response = await instance.get<RiotInfo>(path.riot.account, {
    headers: getHeaders(),
  });

  return response.data;
}

async function getUserRiotInfo({queryKey}: {queryKey: string[]}) {
  const userId = queryKey[1]; // Extract the userId from queryKey
  const accessToken = loginStore.getState().token;

  if (!accessToken) {
    return undefined;
  }
  const response = await instance.get<RiotInfo>(path.riot.user, {
    headers: getHeaders(),
    params: {userId},
  });

  return response.data;
}

type Props = {
  userId: string | null;
};

export function useRiotInfo({userId}: Props) {
  const keys = userId ? [hookKeys.riot.user, userId] : [hookKeys.riot.my];
  const queryFn = userId ? getUserRiotInfo : getMyRiotInfo;

  const query = useQuery({
    queryKey: keys,
    queryFn: queryFn,
    retry: false,
  });

  return query;
}
