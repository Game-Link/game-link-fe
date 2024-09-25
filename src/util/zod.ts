import z from 'zod';

export const riotSchema = z.object({
  gameName: z
    .string()
    .min(2, {
      message: '아이디는 최소 2자 이상이어야 합니다.',
    })
    .regex(/^(?:\S+)(?:\s\S+)*$/, {
      message:
        '단어 사이에 하나의 공백만 사용할 수 있으며, 앞뒤로 공백이 없어야 합니다.',
    }),
  tagLine: z
    .string()
    .min(2, {
      message: '태그라인은 최소 2글자 이상이어야 합니다.',
    })
    .regex(/^\S+$/, {
      message: '띄어쓰기를 사용할 수 없으며, 앞뒤로 공백이 없어야 합니다.',
    }),
});

export type RiotFormValues = z.infer<typeof riotSchema>;
