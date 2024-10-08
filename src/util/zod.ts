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
    .regex(/^(?:\S+)(?:\s\S+)*$/, {
      message:
        '단어 사이에 하나의 공백만 사용할 수 있으며, 앞뒤로 공백이 없어야 합니다.',
    }),
});

export type RiotFormValues = z.infer<typeof riotSchema>;

//채팅창 생성
export const matchingChatSchema = z.object({
  roomName: z
    .string()
    .min(2, {message: '채팅방 이름은 최소 2자 이상이어야 합니다.'})
    .regex(/^(?:\S+)(?:\s\S+)*$/, {
      message:
        '단어 사이에 하나의 공백만 사용할 수 있으며, 앞뒤로 공백이 없어야 합니다.',
    }),
  maxUserCount: z
    .string()
    .refine(value => !isNaN(Number(value)), {
      message: '숫자 값만 가능합니다',
    })
    .refine(
      value => {
        const numberValue = Number(value);
        return numberValue >= 2 && numberValue <= 10;
      },
      {
        message: '참여인원은 2 ~ 10입니다',
      },
    ),
  gameMode: z.enum(['SOLO', 'TEAM', 'CUSTOM', 'NORMAL']),
  tier: z
    .enum([
      'BRONZE',
      'SILVER',
      'GOLD',
      'EMERALD',
      'PLATINUM',
      'DIAMOND',
      'MASTER',
      'GRANDMASTER',
      'CHALLENGER',
      'ANY',
    ])
    .array(),
});

export type MatchingChatValues = z.infer<typeof matchingChatSchema>;
