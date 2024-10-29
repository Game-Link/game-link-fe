import {GameMode, Tier} from '@src/api';
import {Position} from './image';
import {
  GAEM_TYPE,
  POSITION,
  POSITION_KEYS,
  RANK_KEYS,
  RANK_TIERS,
} from './constants';

const isTier = (value: unknown): value is Tier[] => {
  return Array.isArray(value) && value.every(item => RANK_KEYS.includes(item));
};

const isPosition = (value: unknown): value is Position[] => {
  return (
    Array.isArray(value) && value.every(item => POSITION_KEYS.includes(item))
  );
};

const isGameMode = (value: unknown): value is GameMode =>
  value === 'SOLO_RANK' ||
  value === 'FLEX_RANK' ||
  value === 'NORMAL' ||
  value === 'ALL';

export const changeFilterButtonText = (value: string[] | string) => {
  if (isGameMode(value)) {
    return GAEM_TYPE[value];
  } else {
    const len = value.length;
    if (isTier(value)) {
      const title = RANK_TIERS[value[0]];
      return len > 1 ? `${title} 외 ${len - 1}` : title;
    }
    if (isPosition(value)) {
      const title = POSITION[value[0]];
      return len > 1 ? `${title} 외 ${len - 1}` : title;
    }
    return value[0];
  }
};
