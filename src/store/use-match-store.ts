import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';

export type Match = 'ALL' | 'SOLO' | 'TEAM';
export interface MatchStore {
  match: Match;
  changeMatch: (value: Match) => void;
}

export const matchStore = createStore<MatchStore>(set => ({
  match: 'ALL',
  changeMatch: (value: Match) => set({match: value}),
}));

export const useMatchStore = () => useStore(matchStore);
