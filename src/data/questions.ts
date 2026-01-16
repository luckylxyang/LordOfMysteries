import { Question } from '../types'

// 7 道核心测试题
export const questions: Question[] = [
  {
    id: 1,
    text: '午夜时分，你发现房间内出现了一道无法解释的阴影。你的第一反应是？',
    options: [
      { text: '立即后退，保持安全距离观察', weights: { seer: 2, hunter: 3, audience: 1 } },
      { text: '冷静分析，尝试理解其来源', weights: { seer: 3, apprentice: 2, arbiter: 1 } },
      { text: '靠近它，试图沟通或触碰', weights: { apprentice: 3, seer: 1, audience: 2 } },
      { text: '寻找武器，准备战斗', weights: { hunter: 3, arbiter: 2, audience: 0 } }
    ]
  },
  {
    id: 2,
    text: '如果让你选择一项超能力，你最渴望的是？',
    options: [
      { text: '预知未来，窥探命运', weights: { seer: 3, audience: 1, arbiter: 1 } },
      { text: '读取人心，操控情绪', weights: { audience: 3, seer: 1, arbiter: 2 } },
      { text: '瞬移穿梭，无视距离', weights: { apprentice: 3, hunter: 1, seer: 0 } },
      { text: '超强体质，不死之身', weights: { hunter: 3, arbiter: 1, apprentice: 1 } }
    ]
  },
  {
    id: 3,
    text: '在一场危险的神秘事件中，你更倾向于扮演什么角色？',
    options: [
      { text: '幕后策划者，掌控全局', weights: { audience: 3, arbiter: 2, seer: 1 } },
      { text: '前线战士，直面危险', weights: { hunter: 3, arbiter: 1, apprentice: 1 } },
      { text: '情报收集者，提供线索', weights: { seer: 3, audience: 2, apprentice: 2 } },
      { text: '机动支援，灵活应变', weights: { apprentice: 3, hunter: 2, seer: 1 } }
    ]
  },
  {
    id: 4,
    text: '你发现自己卷入了一个复杂的阴谋，你会？',
    options: [
      { text: '用占卜寻找真相与破局点', weights: { seer: 3, apprentice: 1, arbiter: 2 } },
      { text: '伪装身份，渗透进入核心', weights: { audience: 3, seer: 1, apprentice: 2 } },
      { text: '直接找到关键人物，用武力解决', weights: { hunter: 3, arbiter: 2, audience: 0 } },
      { text: '设下陷阱，让阴谋者自食其果', weights: { arbiter: 3, apprentice: 1, audience: 2 } }
    ]
  },
  {
    id: 5,
    text: '面对一个强大的敌人，你的战斗风格是？',
    options: [
      { text: '远程诅咒，慢慢削弱对方', weights: { seer: 3, arbiter: 2, audience: 1 } },
      { text: '心理战，让对方崩溃', weights: { audience: 3, seer: 1, arbiter: 2 } },
      { text: '游击战术，快速移动攻击', weights: { apprentice: 3, hunter: 2, seer: 0 } },
      { text: '正面硬刚，以力破巧', weights: { hunter: 3, arbiter: 1, apprentice: 1 } }
    ]
  },
  {
    id: 6,
    text: '你认为力量最重要的属性是？',
    options: [
      { text: '神秘与智慧', weights: { seer: 3, audience: 1, apprentice: 2 } },
      { text: '控制与影响', weights: { audience: 3, arbiter: 2, seer: 0 } },
      { text: '自由与超越', weights: { apprentice: 3, hunter: 1, seer: 1 } },
      { text: '秩序与平衡', weights: { arbiter: 3, seer: 1, audience: 1 } }
    ]
  },
  {
    id: 7,
    text: '如果有人背叛了你，你会？',
    options: [
      { text: '先弄清楚原因，再决定行动', weights: { seer: 2, audience: 2, arbiter: 1 } },
      { text: '让他付出代价，但保留后手', weights: { arbiter: 3, audience: 2, seer: 0 } },
      { text: '直接追杀，以儆效尤', weights: { hunter: 3, arbiter: 2, apprentice: 1 } },
      { text: '消失在阴影中，让他永远找不到我', weights: { apprentice: 3, seer: 2, audience: 1 } }
    ]
  }
]
