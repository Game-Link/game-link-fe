import {Position} from '@src/util';
import {getHeaders, instance, path} from '../instance';

export async function postChatRoomUserPosition({
  roomId,
  myPosition,
}: {
  roomId: string;
  myPosition: Position;
}) {
  await instance.post(
    path.chatRoom.choicePostion(roomId),
    {
      myPosition,
    },
    {
      headers: getHeaders(),
    },
  );
}
