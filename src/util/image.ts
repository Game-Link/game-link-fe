import IRON from '@src/assets/iron.png';
import BRONZE from '@src/assets/bronze.png';
import SILVER from '@src/assets/silver.png';
import GOLD from '@src/assets/gold.png';
import EMERALD from '@src/assets/emerald.png';
import PLATINUM from '@src/assets/platinum.png';
import DIAMOND from '@src/assets/diamond.png';
import MASTER from '@src/assets/master.png';
import GRANDMASTER from '@src/assets/grandmaster.png';
import CHALLENGER from '@src/assets/challenger.png';
import UNRANKED from '@src/assets/unrank.png';
import {Tier} from '@src/api';

import ANY from '@src/assets/all.png';
import TOP from '@src/assets/top.png';
import JUNGLE from '@src/assets/jungle.png';
import MID from '@src/assets/mid.png';
import SUPPORT from '@src/assets/support.png';
import ADC from '@src/assets/bottom.png';
import {ImageSourcePropType} from 'react-native';

export const IMAGES: {[key in Tier]: ImageSourcePropType | null} = {
  UNRANKED,
  IRON,
  BRONZE,
  SILVER,
  GOLD,
  EMERALD,
  PLATINUM,
  DIAMOND,
  MASTER,
  GRANDMASTER,
  CHALLENGER,
  ANY: null,
};

export type Position = 'ANY' | 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT';

export const POSITION_IMAGES: {[key in Position]: ImageSourcePropType} = {
  ANY,
  TOP,
  JUNGLE,
  MID,
  ADC,
  SUPPORT,
};
