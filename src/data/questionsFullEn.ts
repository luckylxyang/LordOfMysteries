import { Question } from '../types'

// Extended quiz questions - covering all 22 pathways
export const questionsFullEn: Question[] = [
  {
    id: 1,
    text: 'At midnight, you discover an unexplainable shadow in your room. What is your first reaction?',
    options: [
      { text: 'Step back immediately, keep a safe distance and observe', weights: { seer: 2, hunter: 3, audience: 1, ranger: 1 } },
      { text: 'Analyze calmly, try to understand its source', weights: { seer: 3, apprentice: 2, arbiter: 1, philosopher: 2 } },
      { text: 'Approach it, try to communicate or touch it', weights: { apprentice: 3, seer: 1, audience: 2, reasoner: 1 } },
      { text: 'Look for a weapon, prepare to fight', weights: { hunter: 3, arbiter: 2, warrior: 2 } }
    ]
  },
  {
    id: 2,
    text: 'If you could choose one superpower, what would you desire most?',
    options: [
      { text: 'Predict the future, glimpse fate', weights: { seer: 3, audience: 1, arbiter: 1, philosopher: 2 } },
      { text: 'Read minds, manipulate emotions', weights: { audience: 3, seer: 1, arbiter: 2, nightmare: 1 } },
      { text: 'Teleport, ignore distance', weights: { apprentice: 3, hunter: 1, thief: 2, seer: 0 } },
      { text: 'Super physique, immortality', weights: { hunter: 3, arbiter: 1, apprentice: 1, warrior: 2 } }
    ]
  },
  {
    id: 3,
    text: 'In a dangerous mystical event, what role do you prefer to play?',
    options: [
      { text: 'Behind-the-scenes planner, controlling the overall situation', weights: { audience: 3, arbiter: 2, seer: 1, captain: 2 } },
      { text: 'Frontline warrior, facing danger head-on', weights: { hunter: 3, arbiter: 1, apprentice: 1, warrior: 2 } },
      { text: 'Intelligence gatherer, providing clues', weights: { seer: 3, audience: 2, apprentice: 2, archaeologist: 2 } },
      { text: 'Mobile support, flexible response', weights: { apprentice: 3, hunter: 2, seer: 1, thief: 2 } }
    ]
  },
  {
    id: 4,
    text: 'You find yourself caught in a complex conspiracy. What do you do?',
    options: [
      { text: 'Use divination to find the truth and breaking point', weights: { seer: 3, apprentice: 1, arbiter: 2, philosopher: 2 } },
      { text: 'Disguise identity, infiltrate the core', weights: { audience: 3, seer: 1, apprentice: 2, assassin: 2 } },
      { text: 'Find key figures directly, solve with force', weights: { hunter: 3, arbiter: 2, warrior: 2 } },
      { text: 'Set traps, make conspirators taste their own medicine', weights: { arbiter: 3, apprentice: 1, audience: 2, reasoner: 1 } }
    ]
  },
  {
    id: 5,
    text: 'Facing a powerful enemy, what is your combat style?',
    options: [
      { text: 'Remote curses, gradually weaken the opponent', weights: { seer: 3, arbiter: 2, audience: 1, pharmacist: 1 } },
      { text: 'Psychological warfare, make the opponent break down', weights: { audience: 3, seer: 1, arbiter: 2, nightmare: 2 } },
      { text: 'Guerrilla tactics, fast mobile attacks', weights: { apprentice: 3, hunter: 2, seer: 0, thief: 2 } },
      { text: 'Head-on confrontation, overpower with strength', weights: { hunter: 3, arbiter: 1, apprentice: 1, warrior: 2 } }
    ]
  },
  {
    id: 6,
    text: 'What do you consider the most important attribute of power?',
    options: [
      { text: 'Mystery and wisdom', weights: { seer: 3, audience: 1, apprentice: 2, archaeologist: 2 } },
      { text: 'Control and influence', weights: { audience: 3, arbiter: 2, seer: 0, captain: 1 } },
      { text: 'Freedom and transcendence', weights: { apprentice: 3, hunter: 1, seer: 1, thief: 2 } },
      { text: 'Order and balance', weights: { arbiter: 3, seer: 1, audience: 1, philosopher: 1 } }
    ]
  },
  {
    id: 7,
    text: 'If someone betrays you, what do you do?',
    options: [
      { text: 'First understand the reason, then decide action', weights: { seer: 2, audience: 2, arbiter: 1, reasoner: 2 } },
      { text: 'Make them pay, but keep a backup plan', weights: { arbiter: 3, audience: 2, seer: 0 } },
      { text: 'Hunt them down directly, as a warning to others', weights: { hunter: 3, arbiter: 2, apprentice: 1, warrior: 1 } },
      { text: 'Disappear into shadow, let them never find me', weights: { apprentice: 3, seer: 2, audience: 1, thief: 2 } }
    ]
  },
  {
    id: 8,
    text: 'In what environment do you prefer to operate?',
    options: [
      { text: 'Bustling city, among the crowds', weights: { audience: 3, seer: 1, thief: 1, captain: 1 } },
      { text: 'Quiet forest, in nature', weights: { ranger: 3, hunter: 2, tiller: 2, sailor: 1 } },
      { text: 'Deep ocean, among the waves', weights: { sailor: 3, waterGhost: 2, captain: 1 } },
      { text: 'Ancient ruins, in history', weights: { archaeologist: 3, seer: 2, collector: 1 } }
    ]
  },
  {
    id: 9,
    text: 'If you were to explore an unknown ruin, what would be your advantage?',
    options: [
      { text: 'Rich knowledge reserves', weights: { archaeologist: 3, reader: 2, seer: 1 } },
      { text: 'Keen intuitive perception', weights: { seer: 3, audience: 1, philosopher: 1, ranger: 1 } },
      { text: 'Flexible agility', weights: { apprentice: 2, hunter: 1, assassin: 2, thief: 2 } },
      { text: 'Powerful combat ability', weights: { hunter: 2, warrior: 2, waterGhost: 1 } }
    ]
  },
  {
    id: 10,
    text: 'Facing a dying person, what is your first reaction?',
    options: [
      { text: 'Try your best to heal, extend life', weights: { tiller: 3, pharmacist: 2, prayer: 1 } },
      { text: 'Ask for last words, fulfill final wishes', weights: { collector: 2, seer: 1, reasoner: 1 } },
      { text: 'Respect fate, don\'t force it', weights: { arbiter: 2, philosopher: 2, seer: 1 } },
      { text: 'Search for intelligence, find clues', weights: { reader: 2, archaeologist: 1, reasoner: 1 } }
    ]
  },
  {
    id: 11,
    text: 'What learning method do you prefer?',
    options: [
      { text: 'Read books, acquire knowledge', weights: { reader: 3, archaeologist: 2, seer: 1 } },
      { text: 'Practice, grow in combat', weights: { hunter: 2, warrior: 2, apprentice: 1 } },
      { text: 'Observe and imitate, learn quickly', weights: { apprentice: 3, audience: 2, seer: 0 } },
      { text: 'Meditate and think, comprehend truth', weights: { philosopher: 3, prayer: 1, seer: 1 } }
    ]
  },
  {
    id: 12,
    text: 'Facing an impossible battle, what do you do?',
    options: [
      { text: 'Find opponent\'s weakness, defeat one by one', weights: { reasoner: 2, hunter: 1, assassin: 1 } },
      { text: 'Unite companions, fight side by side', weights: { captain: 3, arbiter: 1, hunter: 1 } },
      { text: 'Use strategy, outsmart opponent', weights: { audience: 2, seer: 1, philosopher: 2 } },
      { text: 'Face head-on, fear no death', weights: { warrior: 3, hunter: 1, prayer: 1 } }
    ]
  },
  {
    id: 13,
    text: 'What do you consider the most important quality?',
    options: [
      { text: 'Wisdom', weights: { philosopher: 3, seer: 1, archaeologist: 1 } },
      { text: 'Courage', weights: { hunter: 2, warrior: 2, prayer: 1 } },
      { text: 'Freedom', weights: { apprentice: 2, thief: 2, sailor: 1 } },
      { text: 'Responsibility', weights: { captain: 2, arbiter: 1, ranger: 1 } }
    ]
  },
  {
    id: 14,
    text: 'If you could choose a partner, what would you hope for?',
    options: [
      { text: 'Powerful and reliable, can trust your back to them', weights: { hunter: 2, warrior: 2, captain: 1 } },
      { text: 'Intelligent, can strategize', weights: { philosopher: 2, seer: 1, audience: 1 } },
      { text: 'Flexible, adapts to various situations', weights: { apprentice: 2, thief: 1, assassin: 1 } },
      { text: 'Strong healing ability, can ensure safety', weights: { tiller: 3, pharmacist: 2, prayer: 1 } }
    ]
  },
  {
    id: 15,
    text: 'Facing a complex puzzle, what do you do?',
    options: [
      { text: 'Use divination to find clues', weights: { seer: 3, philosopher: 1, reasoner: 1 } },
      { text: 'Find answers in books', weights: { reader: 2, archaeologist: 2, reasoner: 1 } },
      { text: 'Investigate on site, collect evidence', weights: { reasoner: 2, ranger: 1, archaeologist: 1 } },
      { text: 'Solve directly by intuition', weights: { audience: 1, seer: 1, philosopher: 1 } }
    ]
  }
]
