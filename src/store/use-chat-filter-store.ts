import {createStore} from 'zustand/vanilla';
import {useStore} from 'zustand';
import {Position} from '@src/util';
import {GameMode, Tier} from '@src/api';
import {getLocalStorage, saveLocalStorage} from './local-storage';

export interface ChatFilterStore {
  position: Position[];
  gameType: GameMode;
  rankTiers: Tier[];
  loading: boolean;
  changePosition: (positions: Position[]) => void;
  changeGameType: (gameType: GameMode) => void;
  changeRankTiers: (rankTiers: Tier[]) => void;
}

export const chatFilterStore = createStore<ChatFilterStore>(set => {
  const initializeStore = async () => {
    const position = ((await getLocalStorage('position')) as Position[]) || [
      'ANY',
    ];
    const gameType = ((await getLocalStorage('gameType')) as GameMode) || 'ALL';
    const rankTiers = ((await getLocalStorage('rankTiers')) as Tier[]) || [
      'ANY',
    ];

    set({
      position,
      gameType,
      rankTiers,
      loading: false,
    });
  };

  // 초기화 중임을 표시하기 위해 `loading`을 true로 설정
  set({loading: true});
  initializeStore();

  return {
    position: ['ANY'],
    gameType: 'SOLO_RANK',
    rankTiers: ['ANY'],
    loading: true, // 로딩 중 상태
    changeGameType: async (gameType: GameMode) => {
      await saveLocalStorage('gameType', gameType);
      set({gameType});
    },
    changePosition: async (position: Position[]) => {
      await saveLocalStorage('position', position);
      set({position});
    },
    changeRankTiers: async (rankTiers: Tier[]) => {
      await saveLocalStorage('rankTiers', rankTiers);
      set({rankTiers});
    },
  };
});

export const useChatFilterStore = () => useStore(chatFilterStore);
