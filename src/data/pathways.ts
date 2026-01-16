import { Pathway } from '../types'

// 5 条核心途径数据
export const pathways: Record<string, Pathway> = {
  seer: {
    id: 'seer',
    name: '占卜家',
    sequence: 9,
    symbol: '🔮',
    description: '擅长占卜、诅咒与操控灵性。你能窥探命运的碎片，在迷雾中寻找真相。',
    characteristics: [
      '敏锐的灵性直觉',
      '占卜与预言天赋',
      '擅长解析神秘学符号',
      '能够使用诅咒与反诅咒'
    ],
    motto: [
      '命运在迷雾中显现。',
      '我看见未来的碎片。',
      '命运的齿轮已经开始转动。',
      '在灰雾之上，一切皆可见。'
    ]
  },
  audience: {
    id: 'audience',
    name: '观众',
    sequence: 9,
    symbol: '🎭',
    description: '洞察人心，操纵情绪与心理。你是舞台上的观察者，也是幕后的操控者。',
    characteristics: [
      '极强的心理洞察力',
      '情绪感知与操控',
      '优秀的表演与伪装能力',
      '能够读取微表情与肢体语言'
    ],
    motto: [
      '世界即舞台，众生皆演员。',
      '我看见你内心的真实。',
      '在欢笑与泪水中，我掌控一切。',
      '观众席上的位置，才是最安全的。'
    ]
  },
  apprentice: {
    id: 'apprentice',
    name: '学徒',
    sequence: 9,
    symbol: '🚪',
    description: '掌握空间与虚行的奥秘。你能跨越距离，穿梭于常人无法触及的领域。',
    characteristics: [
      '空间跳跃与虚行能力',
      '能够制造并感知空间裂缝',
      '卓越的观察与学习能力',
      '擅长制造神奇物品'
    ],
    motto: [
      '距离对学徒而言毫无意义。',
      '一扇门，连接两个世界。',
      '我已在不知不觉中来到你身边。',
      '空间不过是可以折叠的纸张。'
    ]
  },
  hunter: {
    id: 'hunter',
    name: '猎人',
    sequence: 9,
    symbol: '🏹',
    description: '强壮、敏锐、致命。你是黑暗中的猎手，追猎那些潜藏在阴影中的怪物。',
    characteristics: [
      '超凡的体能与爆发力',
      '优秀的追踪与狩猎技巧',
      '对邪恶生物有额外伤害',
      '强大的生命力与恢复能力'
    ],
    motto: [
      '猎物永远无法逃脱猎手的追捕。',
      '在黑暗中，我即是死亡。',
      '每一箭都直击要害。',
      '狩猎，即是生命本身。'
    ]
  },
  arbiter: {
    id: 'arbiter',
    name: '仲裁人',
    sequence: 9,
    symbol: '⚖️',
    description: '平衡秩序与混乱，施展强力诅咒。你是律法的执行者，也是扭曲规则的操纵者。',
    characteristics: [
      '能够强迫他人遵守规则',
      '擅长使用多种诅咒',
      '强大的扭曲现实能力',
      '能够制造束缚与契约'
    ],
    motto: [
      '规则由我定义。',
      '秩序必须被维护。',
      '我的审判即是终极裁决。',
      '在平衡的边缘，我主宰一切。'
    ]
  }
}

export const allPathways = Object.values(pathways)
