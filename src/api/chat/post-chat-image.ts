import {getHeaders, instance, path} from '@api';
import {Asset} from 'react-native-image-picker';

export type ChatFileResponse = {
  roomId: string;
  fileName: string;
  fileUrl: string;
  fileType: 'IMAGE' | 'FILE';
};

export type PostChatImageBody = {
  roomId: string;
  images: Asset[];
};

export async function postChatImage(body: PostChatImageBody) {
  const images = body.images.map((image, index) => ({
    uri: image.uri,
    type: image.type,
    name: image.fileName || `image_${index}.jpg`,
  }));

  const formData = new FormData();
  formData.append('roomId', body.roomId);
  images.forEach(image => {
    formData.append('images', image);
  });

  const response = await instance.post<ChatFileResponse>(
    path.chatRoom.images,
    formData,
    {
      headers: {
        ...getHeaders(),
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
}
