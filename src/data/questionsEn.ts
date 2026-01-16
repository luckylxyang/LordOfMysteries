import { Question } from '../types'

// 7 core quiz questions in English
export const questionsEn: Question[] = [
  {
    id: 1,
    text: 'At midnight, you discover an unexplainable shadow in your room. What is your first reaction?',
    options: [
      { text: 'Step back immediately, keep a safe distance and observe', weights: { seer: 2, hunter: 3, audience: 1 } },
      { text: 'Analyze calmly, try to understand its source', weights: { seer: 3, apprentice: 2, arbiter: 1 } },
      { text: 'Approach it, try to communicate or touch it', weights: { apprentice: 3, seer: 1, audience: 2 } },
      { text: 'Look for a weapon, prepare to fight', weights: { hunter: 3, arbiter: 2, audience: 0 } }
    ]
  },
  {
    id: 2,
    text: 'If you could choose one superpower, what would you desire most?',
    options: [
      { text: 'Predict the future, glimpse fate', weights: { seer: 3, audience: 1, arbiter: 1 } },
      { text: 'Read minds, manipulate emotions', weights: { audience: 3, seer: 1, arbiter: 2 } },
      { text: 'Teleport, ignore distance', weights: { apprentice: 3, hunter: 1, seer: 0 } },
      { text: 'Super physique, immortality', weights: { hunter: 3, arbiter: 1, apprentice: 1 } }
    ]
  },
  {
    id: 3,
    text: 'In a dangerous mystical event, what role do you prefer to play?',
    options: [
      { text: 'Behind-the-scenes planner, controlling the overall situation', weights: { audience: 3, arbiter: 2, seer: 1 } },
      { text: 'Frontline warrior, facing danger head-on', weights: { hunter: 3, arbiter: 1, apprentice: 1 } },
      { text: 'Intelligence gatherer, providing clues', weights: { seer: 3, audience: 2, apprentice: 2 } },
      { text: 'Mobile support, flexible response', weights: { apprentice: 3, hunter: 2, seer: 1 } }
    ]
  },
  {
    id: 4,
    text: 'You find yourself caught in a complex conspiracy. What do you do?',
    options: [
      { text: 'Use divination to find the truth and breaking point', weights: { seer: 3, apprentice: 1, arbiter: 2 } },
      { text: 'Disguise identity, infiltrate the core', weights: { audience: 3, seer: 1, apprentice: 2 } },
      { text: 'Find key figures directly, solve with force', weights: { hunter: 3, arbiter: 2, audience: 0 } },
      { text: 'Set traps, make conspirators taste their own medicine', weights: { arbiter: 3, apprentice: 1, audience: 2 } }
    ]
  },
  {
    id: 5,
    text: 'Facing a powerful enemy, what is your combat style?',
    options: [
      { text: 'Remote curses, gradually weaken the opponent', weights: { seer: 3, arbiter: 2, audience: 1 } },
      { text: 'Psychological warfare, make the opponent break down', weights: { audience: 3, seer: 1, arbiter: 2 } },
      { text: 'Guerrilla tactics, fast mobile attacks', weights: { apprentice: 3, hunter: 2, seer: 0 } },
      { text: 'Head-on confrontation, overpower with strength', weights: { hunter: 3, arbiter: 1, apprentice: 1 } }
    ]
  },
  {
    id: 6,
    text: 'What do you consider the most important attribute of power?',
    options: [
      { text: 'Mystery and wisdom', weights: { seer: 3, audience: 1, apprentice: 2 } },
      { text: 'Control and influence', weights: { audience: 3, arbiter: 2, seer: 0 } },
      { text: 'Freedom and transcendence', weights: { apprentice: 3, hunter: 1, seer: 1 } },
      { text: 'Order and balance', weights: { arbiter: 3, seer: 1, audience: 1 } }
    ]
  },
  {
    id: 7,
    text: 'If someone betrays you, what do you do?',
    options: [
      { text: 'First understand the reason, then decide action', weights: { seer: 2, audience: 2, arbiter: 1 } },
      { text: 'Make them pay, but keep a backup plan', weights: { arbiter: 3, audience: 2, seer: 0 } },
      { text: 'Hunt them down directly, as a warning to others', weights: { hunter: 3, arbiter: 2, apprentice: 1 } },
      { text: 'Disappear into shadow, let them never find me', weights: { apprentice: 3, seer: 2, audience: 1 } }
    ]
  }
]
