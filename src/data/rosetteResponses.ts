// 罗塞尔日记 AI 响应生成器
// 这是一个模拟的 AI 响应系统。实际应用中应该连接到真实的 AI API (如 OpenAI GPT)

interface RoselleKnowledgeBase {
  keywords: string[]
  responses: {
    zh: string[]
    en: string[]
  }
}

const knowledgeBase: RoselleKnowledgeBase[] = [
  {
    keywords: ['罗塞尔', 'roselle', '大帝', 'emperor', '身份', 'identity'],
    responses: {
      zh: [
        '罗塞尔·古斯塔夫，鲁恩王国开国大帝，代号"白塔"。他从灰雾之上神秘降临，带来了蒸汽与机械的革新，推动了工业革命。',
        '罗塞尔拥有特殊的穿越者身份，来自另一个世界。他创造了简单易用的魔文，并将22条神之途径的知识封存在日记中。',
        '祂后来成为"愚者"途径的高序列强者，最终晋升为序列0"诡秘之主"，但在对抗阿蒙的分身时陷入永恒沉眠。'
      ],
      en: [
        'Roselle Gustav, the founding emperor of the Loen Kingdom, codename "White Tower". He descended from above the gray fog, bringing innovations of steam and machinery, launching the Industrial Revolution.',
        'Roselle possessed a special transmigrator identity, from another world. He created simple and easy-to-use runes and sealed knowledge of the 22 Divine Pathways in his diary.',
        'He later became a high-sequence Beyonder of the "Fool" pathway and eventually advanced to Sequence 0 "Lord of the Mysteries", but fell into eternal slumber while fighting against Amon\'s avatar.'
      ]
    }
  },
  {
    keywords: ['非凡', 'beyonder', '途径', 'pathway', '序列', 'sequence', '晋升', 'advancement'],
    responses: {
      zh: [
        '非凡者是通过服用魔药获得超凡力量的人类。魔药蕴含对应途径的特性，能够引导人向高位格进化。',
        '共有22条通向真神的途径，每条途径包含序列9到序列0共10个序列。序列9是最低序列，序列0是真神（神灵）。',
        '晋升需要扮演法：消化魔药需要扮演相应角色，理解并体现对应的"神性"。这是为了抗拒非凡特性中包含的原始意念，避免失控。',
        '失控是所有非凡者的噩梦。当无法平衡人性与神性时，非凡者会变成怪物，需要被清除。'
      ],
      en: [
        'Beyonders are humans who gain supernatural powers by consuming potions. Potions contain characteristics of corresponding pathways, guiding humans to evolve toward higher status.',
        'There are 22 pathways leading to true deities, each containing Sequence 9 to Sequence 0, totaling 10 sequences. Sequence 9 is the lowest, while Sequence 0 is the True God (Deity).',
        'Advancement requires the Acting Method: digesting potions requires acting corresponding roles, understanding and embodying corresponding "divinity". This is to resist the original will contained in Beyonder characteristics and avoid losing control.',
        'Losing control is every Beyonder\'s nightmare. When unable to balance humanity and divinity, Beyonders turn into monsters and must be eliminated.'
      ]
    }
  },
  {
    keywords: ['源堡', 'castle', '灰雾', 'fog', 'sefirah', '空间'],
    responses: {
      zh: [
        '源堡（Sefirah Castle）是超越现实维度的神秘空间，位于灰雾之上。那里是所有历史长河汇聚的地方，象征着绝对的神秘与权柄。',
        '克莱恩·莫雷蒂在源堡中建立了"塔罗会"，每周一聚会一次。成员们通过源堡进行交易、情报交换和神秘学知识分享。',
        '只有拥有"诡秘侍者"序列2或以上能力的人，才能进入源堡。这代表着对空间法则的深刻理解。'
      ],
      en: [
        'Sefirah Castle is a mysterious space beyond reality dimensions, located above the gray fog. It is where all rivers of history converge, symbolizing absolute mystery and authority.',
        'Klein Moretti established the "Tarot Club" in Sefirah Castle, gathering every Monday. Members conduct transactions, intelligence exchanges, and share mystical knowledge through the Castle.',
        'Only those with "Sefirah Castle" Sequence 2 or higher abilities can enter Sefirah Castle. This represents profound understanding of spatial laws.'
      ]
    }
  },
  {
    keywords: ['日记', 'diary', '密码', 'code', '魔文', 'rune'],
    responses: {
      zh: [
        '罗塞尔留下的日记记录了祂对世界本质的探索、22条途径的知识以及对抗"原始造物主"的方法。',
        '日记使用赫密斯语魔文加密，只有懂得对应神秘学知识的人才能解读。这是为了防止知识被滥用。',
        '完整版日记共有4本，分散在不同人手中。克莱恩通过多次聚会才逐渐收集齐所有篇章。'
      ],
      en: [
        'The diary left by Roselle records His exploration of the world\'s essence, knowledge of the 22 pathways, and methods to fight against the "Primordial Creator".',
        'The diary is encrypted using Hermes language runes. Only those with corresponding mystical knowledge can decipher it. This is to prevent misuse of knowledge.',
        'The complete diary consists of 4 volumes, scattered among different people. Klein gradually collected all chapters through multiple gatherings.'
      ]
    }
  },
  {
    keywords: ['塔罗会', 'tarot', '成员', 'member', '代号', 'codename'],
    responses: {
      zh: [
        '塔罗会是由克莱恩在源堡创建的秘密组织，成员以塔罗牌的大阿卡那牌为代号。',
        '核心成员包括：愚者（克莱恩）、倒吊人（阿尔杰）、正义（奥黛丽）、太阳（戴里克）、魔术师（佛尔思）等。',
        '成员通过每周一的聚会进行资源交易、信息交换和互相帮助，共同探索神秘世界的真相。'
      ],
      en: [
        'The Tarot Club is a secret organization created by Klein in Sefirah Castle, with members using Tarot Major Arcana cards as codenames.',
        'Core members include: The Fool (Klein), The Hanged Man (Alger), Justice (Audrey), The Sun (Derrick), The Magician (Fors), etc.',
        'Members conduct resource transactions, information exchanges, and help each other through weekly gatherings, exploring the truth of the mysterious world together.'
      ]
    }
  },
  {
    keywords: ['阿蒙', 'amon', '分身', 'avatar', '命运', 'fate'],
    responses: {
      zh: [
        '阿蒙是"偷盗者"途径序列0"命运之蛇"，拥有制造分身和偷盗的能力。祂是极其危险的存在，能通过目光、影子等媒介进行寄生。',
        '阿蒙的分身无处不在，甚至连时间线上的自己都是分身。在与罗塞尔的战斗中，祂利用时间诡计封印了这位开国大帝。',
        '对抗阿蒙需要极高的灵性、完善的准备和对"偷盗者"途径弱点的理解。克莱恩在最终决战中使用了极其复杂的布局才战胜祂。'
      ],
      en: [
        'Amon is Sequence 0 "Snake of Fate" of the "Apprentice" pathway, possessing abilities to create avatars and steal. He is an extremely dangerous existence, capable of parasitism through gaze, shadow, and other media.',
        'Amon\'s avatars are everywhere, even himself on the timeline is an avatar. In the battle with Roselle, He used time tricks to seal this founding emperor.',
        'Fighting Amon requires high spirituality, thorough preparation, and understanding of the "Apprentice" pathway\'s weaknesses. Klein used extremely complex layouts to defeat Him in the final battle.'
      ]
    }
  }
]

const defaultResponses = {
  zh: [
    '这是一个很有趣的问题。罗塞尔的日记中或许藏着答案...只是还需要更多灵性才能解读。',
    '灰雾之上的知识深邃而神秘。也许你应该在塔罗会的聚会上提出这个问题。',
    '关于这个，日记中似乎有模糊的记载："...最初的造物主在混沌中苏醒..."',
    '灵性告诉我，这涉及到非凡特性的聚合定律...要小心探索。',
    '罗塞尔曾言："知识就是力量，但未经消化的知识是危险的毒药。"'
  ],
  en: [
    'This is an interesting question. Roselle\'s diary may hold the answer... it just requires more spirituality to decipher.',
    'The knowledge above the gray fog is profound and mysterious. Perhaps you should raise this question at a Tarot Club gathering.',
    'Regarding this, the diary seems to have vague records: "...the Primordial Creator awakened in chaos..."',
    'My spirituality tells me this involves the Beyonder Characteristic Aggregation Law... explore with caution.',
    'Roselle once said: "Knowledge is power, but undigested knowledge is a dangerous poison."'
  ]
}

export function generateRosetteResponse(question: string, language: 'zh' | 'en'): string {
  const lowerQuestion = question.toLowerCase()

  // 查找匹配的知识库条目
  for (const entry of knowledgeBase) {
    const hasMatch = entry.keywords.some(keyword =>
      lowerQuestion.includes(keyword.toLowerCase())
    )

    if (hasMatch) {
      const responses = entry.responses[language]
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }

  // 如果没有匹配，返回默认回复
  const defaults = defaultResponses[language]
  return defaults[Math.floor(Math.random() * defaults.length)]
}

// 预设的示例问题（用于首页展示）
export const exampleQuestions = {
  zh: [
    '罗塞尔大帝的真实身份是什么？',
    '如何晋升为非凡者？',
    '什么是源堡？',
    '22条途径是什么？'
  ],
  en: [
    'What is Roselle Gustav\'s true identity?',
    'How to become a Beyonder?',
    'What is Sefirah Castle?',
    'What are the 22 Divine Pathways?'
  ]
}
