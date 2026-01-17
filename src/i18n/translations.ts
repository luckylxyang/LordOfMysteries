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
          content: '非凡者通过消化魔药晋升到更高序列。每一条途径从序列9开始，逐步掌握更强的能力。序列8是中序列，序列4是高序列，而序列0即是真神（神灵）。'
        },
        choice: {
          title: '途径的选择',
          content: '选择哪条途径取决于个人的天赋、性格和机遇。有些人天生就与某条途径契合，而有些人则会在探索中找到属于自己的道路。通过上方的评估测试，你可以发现自己最契合的非凡途径。'
        },
        mvp: {
          title: 'MVP 提供的途径',
          content: '本版本提供五条核心途径的评估：占卜家、观众、学徒、猎人和仲裁人。这五条途径涵盖了神秘学、心理操控、空间能力、战斗能力和规则操控等不同方向。后续版本将逐步开放全部二十二条途径。'
        },
        knowledge: {
          title: '神秘学知识',
          content: '二十二条途径由造物主遗留的权能演化而来。每条途径都有其独特的特性、能力体系和文化背景。了解这些知识有助于非凡者更好地掌握自己的力量，避免在失控的边缘徘徊。'
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
          content: 'Beyonders advance to higher sequences by digesting potions. Each pathway starts at Sequence 9, gradually mastering stronger abilities. Sequence 8 is the Middle Sequence, Sequence 4 is the High Sequence, while Sequence 0 is the True God (Deity).'
        },
        choice: {
          title: 'Choosing a Pathway',
          content: 'The choice of pathway depends on individual talent, personality, and opportunity. Some are naturally aligned with certain pathways, while others find their path through exploration. Through the assessment test above, you can discover your most compatible pathway.'
        },
        mvp: {
          title: 'Available Pathways in MVP',
          content: 'This version provides assessment for five core pathways: Seer, Audience, Apprentice, Hunter, and Arbiter. These five pathways cover mysticism, mental manipulation, spatial abilities, combat prowess, and rule manipulation. Future versions will gradually unlock all twenty-two pathways.'
        },
        knowledge: {
          title: 'Mystical Knowledge',
          content: 'The twenty-two pathways evolved from the powers left by the Creator. Each pathway has its unique characteristics, ability system, and cultural background. Understanding this knowledge helps Beyonders better master their powers and avoid straying into失控.'
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
