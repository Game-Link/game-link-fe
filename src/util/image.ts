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
import {Tier} from '@src/api';

export const IMAGES: {[key in Tier]: any} = {
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
  ANY: undefined,
};
