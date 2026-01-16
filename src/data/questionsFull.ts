import { Question } from '../types'

// 扩展测试题 - 覆盖22条途径
export const questionsFull: Question[] = [
  {
    id: 1,
    text: '午夜时分，你发现房间内出现了一道无法解释的阴影。你的第一反应是？',
    options: [
      { text: '立即后退，保持安全距离观察', weights: { seer: 2, hunter: 3, audience: 1, ranger: 1 } },
      { text: '冷静分析，尝试理解其来源', weights: { seer: 3, apprentice: 2, arbiter: 1, philosopher: 2 } },
      { text: '靠近它，试图沟通或触碰', weights: { apprentice: 3, seer: 1, audience: 2, reasoner: 1 } },
      { text: '寻找武器，准备战斗', weights: { hunter: 3, arbiter: 2, warrior: 2 } }
    ]
  },
  {
    id: 2,
    text: '如果让你选择一项超能力，你最渴望的是？',
    options: [
      { text: '预知未来，窥探命运', weights: { seer: 3, audience: 1, arbiter: 1, philosopher: 2 } },
      { text: '读取人心，操控情绪', weights: { audience: 3, seer: 1, arbiter: 2, nightmare: 1 } },
      { text: '瞬移穿梭，无视距离', weights: { apprentice: 3, hunter: 1, thief: 2, seer: 0 } },
      { text: '超强体质，不死之身', weights: { hunter: 3, arbiter: 1, apprentice: 1, warrior: 2 } }
    ]
  },
  {
    id: 3,
    text: '在一场危险的神秘事件中，你更倾向于扮演什么角色？',
    options: [
      { text: '幕后策划者，掌控全局', weights: { audience: 3, arbiter: 2, seer: 1, captain: 2 } },
      { text: '前线战士，直面危险', weights: { hunter: 3, arbiter: 1, apprentice: 1, warrior: 2 } },
      { text: '情报收集者，提供线索', weights: { seer: 3, audience: 2, apprentice: 2, archaeologist: 2 } },
      { text: '机动支援，灵活应变', weights: { apprentice: 3, hunter: 2, seer: 1, thief: 2 } }
    ]
  },
  {
    id: 4,
    text: '你发现自己卷入了一个复杂的阴谋，你会？',
    options: [
      { text: '用占卜寻找真相与破局点', weights: { seer: 3, apprentice: 1, arbiter: 2, philosopher: 2 } },
      { text: '伪装身份，渗透进入核心', weights: { audience: 3, seer: 1, apprentice: 2, assassin: 2 } },
      { text: '直接找到关键人物，用武力解决', weights: { hunter: 3, arbiter: 2, warrior: 2 } },
      { text: '设下陷阱，让阴谋者自食其果', weights: { arbiter: 3, apprentice: 1, audience: 2, reasoner: 1 } }
    ]
  },
  {
    id: 5,
    text: '面对一个强大的敌人，你的战斗风格是？',
    options: [
      { text: '远程诅咒，慢慢削弱对方', weights: { seer: 3, arbiter: 2, audience: 1, pharmacist: 1 } },
      { text: '心理战，让对方崩溃', weights: { audience: 3, seer: 1, arbiter: 2, nightmare: 2 } },
      { text: '游击战术，快速移动攻击', weights: { apprentice: 3, hunter: 2, seer: 0, thief: 2 } },
      { text: '正面硬刚，以力破巧', weights: { hunter: 3, arbiter: 1, apprentice: 1, warrior: 2 } }
    ]
  },
  {
    id: 6,
    text: '你认为力量最重要的属性是？',
    options: [
      { text: '神秘与智慧', weights: { seer: 3, audience: 1, apprentice: 2, archaeologist: 2 } },
      { text: '控制与影响', weights: { audience: 3, arbiter: 2, seer: 0, captain: 1 } },
      { text: '自由与超越', weights: { apprentice: 3, hunter: 1, seer: 1, thief: 2 } },
      { text: '秩序与平衡', weights: { arbiter: 3, seer: 1, audience: 1, philosopher: 1 } }
    ]
  },
  {
    id: 7,
    text: '如果有人背叛了你，你会？',
    options: [
      { text: '先弄清楚原因，再决定行动', weights: { seer: 2, audience: 2, arbiter: 1, reasoner: 2 } },
      { text: '让他付出代价，但保留后手', weights: { arbiter: 3, audience: 2, seer: 0 } },
      { text: '直接追杀，以儆效尤', weights: { hunter: 3, arbiter: 2, apprentice: 1, warrior: 1 } },
      { text: '消失在阴影中，让他永远找不到我', weights: { apprentice: 3, seer: 2, audience: 1, thief: 2 } }
    ]
  },
  {
    id: 8,
    text: '你更喜欢在什么环境中行动？',
    options: [
      { text: '繁华的城市，人群之中', weights: { audience: 3, seer: 1, thief: 1, captain: 1 } },
      { text: '寂静的森林，自然之中', weights: { ranger: 3, hunter: 2, tiller: 2, sailor: 1 } },
      { text: '深邃的海洋，波涛之间', weights: { sailor: 3, waterGhost: 2, captain: 1 } },
      { text: '古老的遗迹，历史之中', weights: { archaeologist: 3, seer: 2, collector: 1 } }
    ]
  },
  {
    id: 9,
    text: '如果让你探索一个未知的遗迹，你的优势是？',
    options: [
      { text: '丰富的知识储备', weights: { archaeologist: 3, reader: 2, seer: 1 } },
      { text: '敏锐的直觉感知', weights: { seer: 3, audience: 1, philosopher: 1, ranger: 1 } },
      { text: '灵活的身手', weights: { apprentice: 2, hunter: 1, assassin: 2, thief: 2 } },
      { text: '强大的战斗力', weights: { hunter: 2, warrior: 2, waterGhost: 1 } }
    ]
  },
  {
    id: 10,
    text: '面对一个垂死的人，你的第一反应是？',
    options: [
      { text: '尽力救治，延续生命', weights: { tiller: 3, pharmacist: 2, prayer: 1 } },
      { text: '询问遗言，完成最后的心愿', weights: { collector: 2, seer: 1, reasoner: 1 } },
      { text: '尊重命运，不强求', weights: { arbiter: 2, philosopher: 2, seer: 1 } },
      { text: '搜查情报，寻找线索', weights: { reader: 2, archaeologist: 1, reasoner: 1 } }
    ]
  },
  {
    id: 11,
    text: '你更喜欢什么样的学习方式？',
    options: [
      { text: '阅读典籍，获取知识', weights: { reader: 3, archaeologist: 2, seer: 1 } },
      { text: '实践操作，在战斗中成长', weights: { hunter: 2, warrior: 2, apprentice: 1 } },
      { text: '观察模仿，快速学习', weights: { apprentice: 3, audience: 2, seer: 0 } },
      { text: '冥想思考，领悟真理', weights: { philosopher: 3, prayer: 1, seer: 1 } }
    ]
  },
  {
    id: 12,
    text: '面对一场不可能的战斗，你会？',
    options: [
      { text: '寻找对手的弱点，逐个击破', weights: { reasoner: 2, hunter: 1, assassin: 1 } },
      { text: '团结同伴，并肩作战', weights: { captain: 3, arbiter: 1, hunter: 1 } },
      { text: '使用计谋，智取对手', weights: { audience: 2, seer: 1, philosopher: 2 } },
      { text: '正面迎战，无惧生死', weights: { warrior: 3, hunter: 1, prayer: 1 } }
    ]
  },
  {
    id: 13,
    text: '你认为最重要的品质是？',
    options: [
      { text: '智慧', weights: { philosopher: 3, seer: 1, archaeologist: 1 } },
      { text: '勇气', weights: { hunter: 2, warrior: 2, prayer: 1 } },
      { text: '自由', weights: { apprentice: 2, thief: 2, sailor: 1 } },
      { text: '责任', weights: { captain: 2, arbiter: 1, ranger: 1 } }
    ]
  },
  {
    id: 14,
    text: '如果让你选择一个伙伴，你希望他？',
    options: [
      { text: '强大可靠，可以托付后背', weights: { hunter: 2, warrior: 2, captain: 1 } },
      { text: '智慧过人，能出谋划策', weights: { philosopher: 2, seer: 1, audience: 1 } },
      { text: '灵活多变，适应各种情况', weights: { apprentice: 2, thief: 1, assassin: 1 } },
      { text: '治愈能力强，可以保障安全', weights: { tiller: 3, pharmacist: 2, prayer: 1 } }
    ]
  },
  {
    id: 15,
    text: '面对一个复杂的谜题，你会？',
    options: [
      { text: '用占卜寻找线索', weights: { seer: 3, philosopher: 1, reasoner: 1 } },
      { text: '从书本中寻找答案', weights: { reader: 2, archaeologist: 2, reasoner: 1 } },
      { text: '实地调查，收集证据', weights: { reasoner: 2, ranger: 1, archaeologist: 1 } },
      { text: '凭直觉直接破解', weights: { audience: 1, seer: 1, philosopher: 1 } }
    ]
  }
]
