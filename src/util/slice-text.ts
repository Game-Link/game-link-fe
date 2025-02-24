import {ROOM_NAME_LENGTH} from './constants';

export function sliceText(text: string, length = ROOM_NAME_LENGTH) {
  return text.length > length ? text.slice(0, length) + '...' : text;
}
