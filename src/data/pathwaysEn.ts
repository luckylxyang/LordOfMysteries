import { Pathway } from '../types'

// English pathway data
export const pathwaysEn: Record<string, Pathway> = {
  seer: {
    id: 'seer',
    name: 'Seer',
    sequence: 9,
    symbol: '🔮',
    description: 'Skilled in divination, curses, and manipulating spirituality. You can glimpse fragments of fate and seek truth within the fog.',
    characteristics: [
      'Keen spiritual intuition',
      'Divination and prophecy talents',
      'Skilled at analyzing mystical symbols',
      'Able to use curses and counter-curses'
    ],
    motto: [
      'Fate reveals itself in the fog.',
      'I see fragments of the future.',
      'The gears of fate have begun to turn.',
      'Above the gray fog, all is visible.'
    ]
  },
  audience: {
    id: 'audience',
    name: 'Audience',
    sequence: 9,
    symbol: '🎭',
    description: 'Insight into hearts, manipulating emotions and psychology. You are both an observer on stage and a manipulator behind the scenes.',
    characteristics: [
      'Extremely strong psychological insight',
      'Emotion perception and manipulation',
      'Excellent performance and disguise abilities',
      'Able to read micro-expressions and body language'
    ],
    motto: [
      'The world is a stage, all people are actors.',
      'I see the truth within your heart.',
      'In laughter and tears, I control all.',
      'The seat in the audience is the safest.'
    ]
  },
  apprentice: {
    id: 'apprentice',
    name: 'Apprentice',
    sequence: 9,
    symbol: '🚪',
    description: 'Master of space and traversal. You can cross distances and traverse realms that ordinary people cannot reach.',
    characteristics: [
      'Space jumping and traversal abilities',
      'Able to create and perceive spatial rifts',
      'Excellent observation and learning abilities',
      'Skilled at creating wondrous items'
    ],
    motto: [
      'Distance means nothing to an Apprentice.',
      'One door connects two worlds.',
      'I am already by your side, unnoticed.',
      'Space is but paper that can be folded.'
    ]
  },
  hunter: {
    id: 'hunter',
    name: 'Hunter',
    sequence: 9,
    symbol: '🏹',
    description: 'Strong, keen, deadly. You are a hunter in the dark, hunting those monsters lurking in shadows.',
    characteristics: [
      'Extraordinary physical strength and explosive power',
      'Excellent tracking and hunting skills',
      'Additional damage to evil creatures',
      'Powerful vitality and recovery abilities'
    ],
    motto: [
      'Prey can never escape the hunter\'s pursuit.',
      'In darkness, I am death.',
      'Every arrow strikes the vital point.',
      'Hunting is life itself.'
    ]
  },
  arbiter: {
    id: 'arbiter',
    name: 'Arbiter',
    sequence: 9,
    symbol: '⚖️',
    description: 'Balancing order and chaos, wielding powerful curses. You are the enforcer of law and the manipulator of twisted rules.',
    characteristics: [
      'Can force others to follow rules',
      'Skilled at using various curses',
      'Powerful reality-warping abilities',
      'Able to create bindings and contracts'
    ],
    motto: [
      'Rules are defined by me.',
      'Order must be maintained.',
      'My judgment is the final arbitration.',
      'At the edge of balance, I dominate all.'
    ]
  }
}

export const allPathwaysEn = Object.values(pathwaysEn)
