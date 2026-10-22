/**
 * Sequence names checked against the published 《诡秘之主》 setting collection.
 * Do not fill unknown entries with AI-generated names or speculative lore.
 * The status applies only to sequence names, not ability/ritual details.
 */
export type SequenceNumber = 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0

export interface VerifiedSequence {
  number: SequenceNumber
  name: string
}

export interface SequenceRecord {
  pathwayId: string
  status: 'names-reviewed'
  source: {
    title: string
    url: string
  }
  sequences: readonly VerifiedSequence[]
}

const settingCollection = {
  title: '《诡秘之主》设定集 · 神之途径',
  url: 'https://h5.if.qidian.com/h5/workSet/main?albumId=131&bookId=1010868264&catelogId=69153',
}

const names = (items: readonly string[]): VerifiedSequence[] =>
  items.map((name, index) => ({ number: (9 - index) as SequenceNumber, name }))

export const pathwaySequences: Record<string, SequenceRecord> = {
  seer: {
    pathwayId: 'seer',
    status: 'names-reviewed',
    source: settingCollection,
    sequences: names(['占卜家', '小丑', '魔术师', '无面人', '秘偶大师', '诡法师', '古代学者', '奇迹师', '诡秘侍者', '愚者']),
  },
  apprentice: {
    pathwayId: 'apprentice',
    status: 'names-reviewed',
    source: settingCollection,
    sequences: names(['学徒', '戏法大师', '占星人', '记录官', '旅行家', '秘法师', '漫游者', '旅法师', '星之匙', '门']),
  },
  marauder: {
    pathwayId: 'marauder',
    status: 'names-reviewed',
    source: settingCollection,
    sequences: names(['偷盗者', '诈骗师', '解密学者', '盗火人', '窃梦家', '寄生者', '欺瞒导师', '命运木马', '时之虫', '错误']),
  },
}

for (const [id, record] of Object.entries(pathwaySequences)) {
  if (record.pathwayId !== id || record.sequences.length !== 10 ||
      record.sequences.some((sequence, index) => sequence.number !== 9 - index)) {
    throw new Error(`Invalid sequence data for ${id}`)
  }
}
