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

export const matchingChatSchema = z
  .object({
    myPosition: z.enum(['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT', 'ANY']),
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
          const number = Number(value);
          return number >= 2 && number <= 10;
        },
        {
          message: '2~10 입력할 수 있습니다',
        },
      ),
    gameType: z.enum(['SOLO_RANK', 'FLEX_RANK', 'NORMAL']),
    rankTiers: z
      .enum([
        'IRON',
        'UNRANKED',
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
    positions: z
      .enum(['ANY', 'TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'])
      .array(),
  })
  .superRefine((data, ctx) => {
    const numberValue = Number(data.maxUserCount);
    const gameType = data.gameType;

    // 조건에 맞지 않을 때 maxUserCount 필드에 오류 추가
    if (gameType === 'SOLO_RANK' && numberValue !== 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '솔로랭크에서는 참여 인원이 2명이어야 합니다.',
        path: ['maxUserCount'],
      });
    } else if (
      gameType === 'FLEX_RANK' &&
      numberValue !== 3 &&
      numberValue !== 2 &&
      numberValue !== 5
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '자유랭크에서는 참여 인원이 2명, 3명, 5명 이어야 합니다.',
        path: ['maxUserCount'],
      });
    } else if (gameType === 'NORMAL' && (numberValue < 2 || numberValue > 5)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '일반게임에서는 참여 인원이 2 ~ 5명이어야 합니다.',
        path: ['maxUserCount'],
      });
    }
  });

export type MatchingChatValues = z.infer<typeof matchingChatSchema>;

export const filterScema = z.object({
  gameType: z.enum(['ALL', 'SOLO_RANK', 'FLEX_RANK', 'NORMAL']),
  rankTiers: z
    .enum([
      'UNRANKED',
      'IRON',
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
  position: z.enum(['ANY', 'TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT']).array(),
});
export type FilterSchema = z.infer<typeof filterScema>;

// 채팅방 포지션 선택

export const positionSchema = z.object({
  myPosition: z.enum(['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT', 'ANY']),
});
export type PositionSchema = z.infer<typeof positionSchema>;

// 닉네임 변경 form

export const changeNicknameSchema = z.object({
  newNickname: z
    .string()
    .min(2, {
      message: '아이디는 최소 2자 이상이어야 합니다.',
    })
    .regex(/^(?:\S+)(?:\s\S+)*$/, {
      message:
        '단어 사이에 하나의 공백만 사용할 수 있으며, 앞뒤로 공백이 없어야 합니다.',
    }),
});

export type ChangeNicknameSchema = z.infer<typeof changeNicknameSchema>;
