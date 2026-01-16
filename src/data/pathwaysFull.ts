import { Pathway } from '../types'

// 22条神之途径完整数据
export const pathwaysFull: Record<string, Pathway> = {
  // 1. 愚者途径
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

  // 2. 错误途径
  thief: {
    id: 'thief',
    name: '偷盗者',
    sequence: 9,
    symbol: '🗝️',
    description: '盗窃一切，包括命运、概念和距离。你能窃取他人的能力与运气。',
    characteristics: [
      '盗窃概念与能力',
      '灵活的空间移动',
      '善于窃取他人气运',
      '能从不可能处取物'
    ],
    motto: [
      '万物皆可被窃取。',
      '包括命运本身。',
      '我偷走了你的胜利。',
      '没有我到不了的地方。'
    ]
  },

  // 3. 秘祈人途径（祈光人）
  prayer: {
    id: 'prayer',
    name: '祈光人',
    sequence: 9,
    symbol: '✨',
    description: '祈祷光明的降临，拥有净化与驱散黑暗的能力。你是光明与火焰的信徒。',
    characteristics: [
      '祈祷获取神术',
      '净化与驱散能力',
      '对黑暗生物克制',
      '光与火的亲和'
    ],
    motto: [
      '光明终将驱散黑暗。',
      '祈祷是最强的力量。',
      '我在火焰中获得新生。',
      '光之所在，暗之消亡。'
    ]
  },

  // 4. 怪物途径
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

  // 5. 黑暗途径
  nightmare: {
    id: 'nightmare',
    name: '梦魇',
    sequence: 9,
    symbol: '🌑',
    description: '操控梦境与黑暗，将敌人拖入永恒的噩梦。你是暗夜的主宰。',
    characteristics: [
      '操控梦境与现实',
      '潜入他人梦境',
      '黑暗中的力量强化',
      '制造精神恐惧'
    ],
    motto: [
      '欢迎来到噩梦。',
      '黑暗是我的领土。',
      '你的恐惧，我的力量。',
      '在梦中，我是神。'
    ]
  },

  // 6. 太阳途径
  sailor: {
    id: 'sailor',
    name: '水手',
    sequence: 9,
    symbol: '⚓',
    description: '驾驭海洋与风暴，拥有强健的体魄。你是天生的海上征服者。',
    characteristics: [
      '控制水与风暴',
      '超凡的体质与力量',
      '航海与方向感知',
      '水中呼吸能力'
    ],
    motto: [
      '海洋是我的后花园。',
      '风暴为我让路。',
      '没有我去不了的海域。',
      '大海上，我就是主宰。'
    ]
  },

  // 7. 魔术师途径
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

  // 8. 倒吊人途径
  philosopher: {
    id: 'philosopher',
    name: '哲人',
    sequence: 9,
    symbol: '🔮',
    description: '思考命运与因果，拥有解析万物本质的能力。你是智慧的追求者。',
    characteristics: [
      '解析因果与命运',
      '预判对手行动',
      '寻找破局关键',
      '强大的思维能力'
    ],
    motto: [
      '万物皆有因果。',
      '命运可以被计算。',
      '我看透了你的未来。',
      '思考是最强的武器。'
    ]
  },

  // 9. 审判途径
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
  },

  // 10. 红祭司途径
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

  // 11. 死神途径
  collector: {
    id: 'collector',
    name: '收尸人',
    sequence: 9,
    symbol: '💀',
    description: '与死者沟通，操控死灵与腐朽。你行走于生死边界。',
    characteristics: [
      '与死者沟通',
      '操控尸骸与死灵',
      '腐朽与瘟疫抗性',
      '灵魂感知能力'
    ],
    motto: [
      '死亡不是终点。',
      '死者会说话。',
      '我听见了亡者的低语。',
      '在生死之间，我找到了真相。'
    ]
  },

  // 12. 白塔途径
  archaeologist: {
    id: 'archaeologist',
    name: '考古学家',
    sequence: 9,
    symbol: '📜',
    description: '探寻古代知识与遗迹，拥有解析历史的能力。你是失落文明的解读者。',
    characteristics: [
      '解读古代文字',
      '感知历史与遗迹',
      '解析神秘学知识',
      '古物鉴定能力'
    ],
    motto: [
      '历史从不真正消亡。',
      '我能读懂过去。',
      '在遗迹中，我发现了未来。',
      '知识，是最强大的力量。'
    ]
  },

  // 13. 魔女途径
  assassin: {
    id: 'assassin',
    name: '刺客',
    sequence: 9,
    symbol: '🗡️',
    description: '隐秘、致命、一击必杀。你是暗夜中的利刃，收割目标的生命。',
    characteristics: [
      '极强的潜行能力',
      '致命的暗杀技巧',
      '毒药与陷阱精通',
      '快速移动与闪避'
    ],
    motto: [
      '死亡悄然而至。',
      '你从未看见我。',
      '一击，足以致命。',
      '暗影是我最好的朋友。'
    ]
  },

  // 14. 黑骑士途径
  tiller: {
    id: 'tiller',
    name: '稼穑',
    sequence: 9,
    symbol: '🌾',
    description: '掌控植物与生命力，拥有强大的治愈与恢复能力。你是大地的守护者。',
    characteristics: [
      '操控植物生长',
      '强大的治愈能力',
      '生命力感知',
      '毒素与疾病净化'
    ],
    motto: [
      '大地会回应我的呼唤。',
      '生命在我手中延续。',
      '万物生长，皆因我愿。',
      '治愈，是我的使命。'
    ]
  },

  // 15. 呼唤者途径
  captain: {
    id: 'captain',
    name: '舰长',
    sequence: 9,
    symbol: '🚢',
    description: '统领军队与舰队，拥有强大的号召力。你是天生的领导者。',
    characteristics: [
      '强大的统帅能力',
      '士气提升光环',
      '战略与战术天赋',
      '团队协作强化'
    ],
    motto: [
      '跟随我，走向胜利。',
      '我是舰队的灵魂。',
      '战争，是一门艺术。',
      '团结，是最强的武器。'
    ]
  },

  // 16. 深渊途径
  waterGhost: {
    id: 'waterGhost',
    name: '水鬼',
    sequence: 9,
    symbol: '🌊',
    description: '潜入深渊，操控水流与冰霜。你是深海的恐怖存在。',
    characteristics: [
      '水下作战能力',
      '操控水流与冰霜',
      '深海抗压能力',
      '恐怖的物理力量'
    ],
    motto: [
      '深海是我的领地。',
      '在水中，我无敌。',
      '冰冷，是我的温度。',
      '你永远逃不掉。'
    ]
  },

  // 17. 母亲途径
  pharmacist: {
    id: 'pharmacist',
    name: '药师',
    sequence: 9,
    symbol: '🧪',
    description: '调配药剂与毒素，掌握生命的奥秘。你是生死的操控者。',
    characteristics: [
      '药剂调配精通',
      '毒素知识与抗性',
      '治疗与疾病操控',
      '生物化学理解'
    ],
    motto: [
      '一剂药，生死两隔。',
      '我能治愈，也能毁灭。',
      '生命，就是化学反应。',
      '药是我的语言。'
    ]
  },

  // 18. 守护者途径
  ranger: {
    id: 'ranger',
    name: '巡林客',
    sequence: 9,
    symbol: '🏹',
    description: '守护自然与森林，拥有卓越的野外生存能力。你是自然的守护神。',
    characteristics: [
      '野外生存专家',
      '动物沟通与驯化',
      '追踪与反追踪',
      '自然环境感知'
    ],
    motto: [
      '森林是我的家。',
      '动物是我的朋友。',
      '自然，会保护我。',
      '守护，是我的誓言。'
    ]
  },

  // 19. 擅长者途径（这里用通用的战士）
  warrior: {
    id: 'warrior',
    name: '战士',
    sequence: 9,
    symbol: '⚔️',
    description: '近战无敌，力量与技巧的完美结合。你是战场上的不灭战神。',
    characteristics: [
      '超凡的战斗技巧',
      '强大的物理力量',
      '武器精通',
      '战斗直觉敏锐'
    ],
    motto: [
      '没有我砍不倒的敌人。',
      '战斗，是我的呼吸。',
      '在战场上，我即是神。',
      '力量，即是真理。'
    ]
  },

  // 20. 空想家途径
  reader: {
    id: 'reader',
    name: '读者',
    sequence: 9,
    symbol: '📖',
    description: '通过阅读获取知识，拥有强大的学习能力。你是知识的追求者。',
    characteristics: [
      '超强的学习能力',
      '快速理解与记忆',
      '知识解析能力',
      '从书中获得力量'
    ],
    motto: [
      '书中自有黄金屋。',
      '我阅读，所以我强大。',
      '知识改变命运。',
      '每一本书，都是新世界。'
    ]
  },

  // 21. 隐秘途径（这里用秘法师）
  seerHidden: {
    id: 'seerHidden',
    name: '秘法师',
    sequence: 9,
    symbol: '👁️',
    description: '洞察隐秘与真相，拥有看穿一切伪装的能力。你是秘密的揭示者。',
    characteristics: [
      '看穿伪装与幻象',
      '感知隐秘与秘密',
      '占卜与预言强化',
      '真实之眼'
    ],
    motto: [
      '真相无处藏身。',
      '我看见一切。',
      '秘密，在我面前无所遁形。',
      '真相，是最强大的武器。'
    ]
  },

  // 22. 律师途径（这里用推理者）
  reasoner: {
    id: 'reasoner',
    name: '推理者',
    sequence: 9,
    symbol: '🔍',
    description: '逻辑推理与洞察真相，拥有破解谜题的天赋。你是真相的追寻者。',
    characteristics: [
      '超强的逻辑推理',
      '细节观察敏锐',
      '破解谜题能力',
      '还原真相能力'
    ],
    motto: [
      '真相只有一个。',
      '逻辑，不会撒谎。',
      '我看见了你忽略的细节。',
      '推理，是最强的力量。'
    ]
  }
}

export const allPathwaysFull = Object.values(pathwaysFull)
