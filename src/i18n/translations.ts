export type Language = 'zh' | 'en'

export interface Translations {
  common: {
    startRitual: string
    loading: string
    backToHome: string
    back: string
    saveCard: string
    shareResult: string
    retest: string
    explorePathways: string
    plotSearch: string
    close: string
  }
  home: {
    title: string
    subtitle: string
    description: string
    startButton: string
    features: {
      evaluation: string
      identityCard: string
      directory: string
    }
    directoryLink: string
    diaryEntry: string
  }
  quiz: {
    question: string
    of: string
    options: {
      a: string
      b: string
      c: string
      d: string
    }
  }
  result: {
    title: string
    sequence: string
    pathwayCharacteristics: string
    commentaryTitle: string
    yourPathway: string
    generatingCard: string
  }
  responder: {
    subtitle: string
    spiritValue: string
    dailyLimit: string
    welcome: string
    examples: string
    placeholder: string
    outOfSpirit: string
    getMoreSpirit: string
    watchAd: string
    unlockFull: string
    unlimitedAccess: string
  }
  directory: {
    title: string
    subtitle: string
    intro: string
    sections: {
      advancement: {
        title: string
        content: string
      }
      choice: {
        title: string
        content: string
      }
      mvp: {
        title: string
        content: string
      }
      knowledge: {
        title: string
        content: string
      }
    }
    cta: {
      text: string
    }
    testPathway: string
  }
}

export const translations: Record<Language, Translations> = {
  zh: {
    common: {
      startRitual: '开始仪式',
      loading: '加载中...',
      backToHome: '返回首页',
      back: '返回',
      saveCard: '保存卡片',
      shareResult: '分享结果',
      retest: '重新测试',
      explorePathways: '探索二十二条神之途径',
      plotSearch: '剧情搜索',
      close: '关闭'
    },
    home: {
      title: '灰雾之上',
      subtitle: '非凡者准入评估',
      description: '命运的迷雾正在召唤...\n完成神秘学仪式，发现你的非凡途径',
      startButton: '开始仪式',
      features: {
        evaluation: '性格评估',
        identityCard: '身份卡片',
        directory: '途径图鉴'
      },
      directoryLink: '探索二十二条神之途径 →',
      diaryEntry: '罗塞尔日记'
    },
    quiz: {
      question: '',
      of: ' / ',
      options: {
        a: '',
        b: '',
        c: '',
        d: ''
      }
    },
    result: {
      title: '仪式完成',
      sequence: '序列',
      pathwayCharacteristics: '途径特性',
      commentaryTitle: '授职评语',
      yourPathway: '我的非凡途径是：',
      generatingCard: '正在生成身份卡片...'
    },
    responder: {
      subtitle: '罗塞尔日记 AI 问答',
      spiritValue: '灵性值',
      dailyLimit: '每日免费',
      welcome: '欢迎来到灰雾之上。我是罗塞尔日记的守护者。\n你可以向我询问关于诡秘世界的任何问题...',
      examples: '示例问题',
      placeholder: '写下你的问题，提交给命运...',
      outOfSpirit: '灵性值不足',
      getMoreSpirit: '选择方式获取更多灵性值',
      watchAd: '观看广告',
      unlockFull: '解锁完整版',
      unlimitedAccess: '无限问答 + 完整日记'
    },
    directory: {
      title: '二十二条神之途径',
      subtitle: '通往非凡的序列之路',
      intro: '在诡秘的世界中，共有二十二条通向神性的途径。每条途径包含十个序列，从序列9到序列0，代表着从凡人到真神的升格之路。',
      sections: {
        advancement: {
          title: '序列的晋升',
          content: '非凡者通过消化魔药晋升到更高序列。每一条途径从序列9开始，逐步掌握更强的能力。序列9与序列8属于低序列，序列7至序列5属于中序列，序列4至序列1属于高序列，序列0为真神。'
        },
        choice: {
          title: '途径的选择',
          content: '选择哪条途径取决于个人的天赋、性格和机遇。有些人天生就与某条途径契合，而有些人则会在探索中找到属于自己的道路。本站的性格测试仅供娱乐，不属于原著设定。'
        },
        mvp: {
          title: 'MVP 提供的途径',
          content: '图鉴展示原著二十二条途径的序列9和序列0名称；性格评估属于非官方娱乐互动，不代表原著中的途径选择机制。'
        },
        knowledge: {
          title: '神秘学知识',
          content: '二十二条途径由造物主遗留的权能演化而来。每条途径都有其独特的特性、能力体系和文化背景。了解这些知识有助于非凡者更好地掌握自己的力量，理解不同序列的界限。'
        }
      },
      cta: {
        text: '开始你的非凡之旅'
      },
      testPathway: '测试此途径 →'
    }
  },
  en: {
    common: {
      startRitual: 'Start Ritual',
      loading: 'Loading...',
      backToHome: 'Back to Home',
      back: 'Back',
      saveCard: 'Save Card',
      shareResult: 'Share Result',
      retest: 'Retest',
      explorePathways: 'Explore the 22 Divine Pathways',
      plotSearch: 'Plot Search',
      close: 'Close'
    },
    home: {
      title: 'Above the Gray Fog',
      subtitle: 'Beyonder Assessment',
      description: 'The fog of fate is calling...\nComplete the mystical ritual to discover your pathway',
      startButton: 'Start Ritual',
      features: {
        evaluation: 'Personality Quiz',
        identityCard: 'Identity Card',
        directory: 'Pathway Directory'
      },
      directoryLink: 'Explore the 22 Divine Pathways →',
      diaryEntry: 'Roselle\'s Diary'
    },
    quiz: {
      question: '',
      of: ' / ',
      options: {
        a: '',
        b: '',
        c: '',
        d: ''
      }
    },
    result: {
      title: 'Ritual Complete',
      sequence: 'Sequence',
      pathwayCharacteristics: 'Pathway Characteristics',
      commentaryTitle: 'Appointment Commentary',
      yourPathway: 'My pathway is:',
      generatingCard: 'Generating identity card...'
    },
    responder: {
      subtitle: 'Roselle\'s Diary AI Q&A',
      spiritValue: 'Spirituality',
      dailyLimit: 'Daily Free',
      welcome: 'Welcome above the gray fog. I am the guardian of Roselle\'s Diary.\nYou may ask me anything about the mysterious world...',
      examples: 'Example Questions',
      placeholder: 'Write your question, submit to fate...',
      outOfSpirit: 'Insufficient Spirituality',
      getMoreSpirit: 'Choose a way to get more spirituality',
      watchAd: 'Watch Ad',
      unlockFull: 'Unlock Full Version',
      unlimitedAccess: 'Unlimited Q&A + Complete Diary'
    },
    directory: {
      title: 'The 22 Divine Pathways',
      subtitle: 'The Sequence Path to Divinity',
      intro: 'In the world of mysteries, there are twenty-two pathways leading to divinity. Each pathway contains ten sequences, from Sequence 9 to Sequence 0, representing the ascension from mortal to true god.',
      sections: {
        advancement: {
          title: 'Sequence Advancement',
          content: 'Beyonders advance to higher sequences by digesting potions. Each pathway starts at Sequence 9, gradually mastering stronger abilities. Sequences 9–8 are Low Sequences, 7–5 are Mid Sequences, 4–1 are High Sequences, and Sequence 0 is a True God.'
        },
        choice: {
          title: 'Choosing a Pathway',
          content: 'The choice of pathway depends on individual talent, personality, and opportunity. Some are naturally aligned with certain pathways, while others find their path through exploration. This personality assessment is for entertainment only and is not part of the original lore.'
        },
        mvp: {
          title: 'Available Pathways in MVP',
          content: 'The directory lists the Sequence 9 and Sequence 0 names of the 22 original pathways. The personality assessment is an unofficial entertainment feature, not an in-universe method of choosing a pathway.'
        },
        knowledge: {
          title: 'Mystical Knowledge',
          content: 'The twenty-two pathways evolved from the powers left by the Creator. Each pathway has its unique characteristics, ability system, and cultural background. Understanding this knowledge helps Beyonders better master their powers and understand the boundaries between sequences.'
        }
      },
      cta: {
        text: 'Begin Your Extraordinary Journey'
      },
      testPathway: 'Test this pathway →'
    }
  }
}

// Helper function to get nested property
export function t(translations: Translations, path: string): string {
  const keys = path.split('.')
  let result: any = translations
  for (const key of keys) {
    result = result[key]
    if (result === undefined) return path
  }
  return result
}
