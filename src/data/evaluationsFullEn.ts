import { Pathway } from '../types'

// English commentary templates for all 22 pathways
export const commentaryTemplatesFullEn: Record<string, string[]> = {
  seer: [
    '{name}, your spirituality permeates like the fog. You can see details that ordinary people overlook, finding patterns in chaos. Your intuition is often more accurate than logic—trust it. But be careful: the price of glimpsing fate is bearing the weight of truth.',
    'Fate has chosen you, {name}. In the eyes of others, the world is certain; you can see countless branches of possible futures. This is both a gift and a curse. Learn when to peek, and when to close your eyes.',
    'Revelations above the gray fog await your call, {name}. Your soul naturally yearns to decipher mystical symbols and omens. Maintain reverence, but don\'t be bound by fear—true seers can move forward even in the fog.'
  ],
  thief: [
    '{name}, you were born a thief. Not stealing gold and silver, but stealing possibilities. You can obtain what you need from impossible places—this talent is your greatest weapon. But remember: some things, once stolen, can never be returned.',
    'The rules of the world are just a reference to you, {name}. You always find ways to bypass obstacles—stealing distance, stealing power, even stealing fate. This freedom is enviable, but be warned: the highest realm of theft is knowing when not to reach out.',
    '{name}, you have a unique perspective—seeing shortcuts others overlook. Your flexibility and wit let you navigate any environment with ease. But true thieves know: the most precious things are never stolen.'
  ],
  prayer: [
    '{name}, a desire for light burns within you. No matter how dark the surroundings, you can always find the spark of hope. This belief is your most powerful force—it can dispel darkness and warm others.',
    'Believer of light, {name}. You trust in the power of prayer, that light will eventually dispel darkness. This pure faith keeps you hopeful even in desperate times. But remember: true light comes not just from prayer, but from action.',
    '{name}, you have the talent of purification. No matter how dark the environment, you can ignite the flame of light. This ability makes you a beacon for others, but be careful: the stronger the light, the darker the shadow. Balance is the true way.'
  ],
  audience: [
    '{name}, you were born an observer. The world is a transparent stage to you, and you can always see through actors\' masks. This insight is a powerful weapon, but remember: understanding human hearts too deeply can sometimes be lonely.',
    'The human heart is a script, and you are its keenest critic, {name}. You can read the subtlest expressions, hear words unspoken. This ability makes you a master in social situations, but don\'t forget: occasionally remove your mask and live authentically.',
    '{name}, you understand the frequency and rhythm of human emotions. You can guide the tides of emotion, making others laugh or cry. But be warned: the art of manipulating hearts, without moral boundaries, will eventually backfire.'
  ],
  nightmare: [
    '{name}, you have a natural connection with dreams. The boundary between reality and illusion is blurred for you, giving you power others cannot imagine—in dreams, you are god.',
    'Ruler of the dark night, {name}. You can walk in others\' dreams, manifesting their deepest fears. This power is formidable, but remember: nightmares aren\'t just for torment—they\'re for warning: some truths only reveal themselves in dreams.',
    '{name}, you understand the essence of fear. You know how to plant seeds of fear in darkness, and how to draw strength from others\' nightmares. This ability makes you a dangerous opponent, but be careful not to lose yourself in your own woven nightmares.'
  ],
  sailor: [
    '{name}, the ocean is your second home. No matter how rough the waves, you can always find your way forward. This connection with water lets you navigate as if in your element in unknown seas.',
    'Born navigator, {name}. Your blood flows with longing for freedom and love for the sea. You can sail through storms where others dare not venture—this courage is admirable. But remember: the strongest captains know when to reef sails.',
    '{name}, you have the talent to control water and storms. To you, the ocean is not an obstacle but a path to infinite possibilities. This ability makes you a born explorer, but always respect the power of nature—the ocean never tolerates arrogance.'
  ],
  apprentice: [
    '{name}, distance is just a concept to you. You can naturally see cracks in space and find paths ordinary people miss. This freedom is enviable, but remember: the most precious things are often within reach.',
    'The world is a foldable box to you, {name}. You always find shortcuts, bypass obstacles, reach destinations. Your learning ability is extremely strong, your observation thorough—but true apprentices know: some shortcuts lead to destinations you didn\'t want.',
    '{name}, you possess imagination and practical abilities beyond ordinary people. Your world is full of possibilities and doors to the unknown. Maintain this curiosity, but also learn: some doors, once opened, can never be closed again.'
  ],
  philosopher: [
    '{name}, you were born a thinker. You can always see the causality behind things, discovering patterns ordinary people overlook. This insight lets you anticipate the future and find the key to breaking situations.',
    'Interpreter of causality, {name}. You believe everything has a cause, everything can be calculated. Your thinking is like a precision instrument, finding order in chaos. This ability makes you a representative of the wise, but remember: not everything can be explained by logic—chance is also part of fate.',
    '{name}, you have the ability to see through appearances to the essence. In your eyes, the world is a network of countless causal chains. This perspective lets you anticipate opponents\' actions and find key breaking points. But true philosophers know: understanding causality doesn\'t mean changing it.'
  ],
  arbiter: [
    '{name}, you have a scale in your heart. You crave order, despise chaos, can draw clear boundaries in ambiguous situations. This decisiveness makes you a natural leader, but be wary: absolute rules sometimes create new injustices.',
    '{name}, law is not constraint to you, but a tool. You excel at finding optimal solutions within rules, can also bind others with rules. This is powerful ability—but remember, true arbiters judge hearts, not just actions.',
    'Balance is your pursuit, {name}. You can find delicate balance between order and freedom. Your curses are precise and effective, your contracts unbreakable. But be careful: those who play with rules will eventually be played by rules.'
  ],
  hunter: [
    '{name}, danger is your hunting ground. You have beast-like intuition and warrior decisiveness. Facing evil, you never retreat—this pure integrity and courage is the rarest light in the dark world.',
    'Hunting is written in your genes, {name}. You track, you ambush, you terminate. Your vitality is tenacious, your will unshakable—you are a solid rock. But remember: not all monsters need elimination; some need understanding.',
    '{name}, you are the guardian in the night. Your very presence deters evil creatures. Strong physique, keen senses, unyielding will—these are your weapons. But true hunters know: the most powerful prey lurk in the deepest shadows.'
  ],
  collector: [
    '{name}, you walk the boundary between life and death. To you, the dead are not truly gone, but exist in another form. You can communicate with spirits, obtaining secrets from them that the living don\'t know.',
    'Medium of life and death, {name}. You have a special understanding of death—it\'s not an end, but a transition. This ability lets you serve the living and comfort the dead, becoming a bridge between two worlds. But remember: don\'t linger too long on the other side—the living have their own responsibilities.',
    '{name}, you have perception beyond life and death. You can see the trajectories of souls, hear the whispers of the deceased. This ability makes you more composed than ordinary people facing death, but be careful: dealing with the dead requires powerful spirituality as the price.'
  ],
  archaeologist: [
    '{name}, history has never truly died for you. You can decipher secrets of lost civilizations from ancient texts, hear echoes of the past from silent ruins.',
    'Interpreter of history, {name}. You believe every stone, every scroll tells a story. Your patience and attention to detail let you discover clues others overlook. This ability makes you a guardian of knowledge, but remember: some secrets should perhaps remain buried forever.',
    '{name}, you have the ability to travel through time—by understanding the past, you can predict the future. Your reverence for ancient civilizations keeps you cautious in exploration. True archaeologists know: some knowledge needs to be guarded, not revealed.'
  ],
  assassin: [
    '{name}, you excel at acting in shadows. Your footsteps are silent, your presence untraceable—this ability makes you a perfect executor.',
    'Blade in the dark night, {name}. You understand what "one-hit kill" means—precise, efficient, leaving no trace. Your skill makes you a dangerous opponent, but remember: the assassin\'s blade should be drawn for justice, not private gain.',
    '{name}, you have the talent to vanish. In crowds, you always find the best hiding spot; in darkness, you are one with the environment. This ability makes you an expert in intelligence and assassination, but true assassins know: the deadliest weapon is often patience.'
  ],
  tiller: [
    '{name}, you have a natural connection with the earth. The vitality of plants, the rhythm of nature—these are under your control. You can heal wounds and extend life.',
    'Guardian of life, {name}. You understand the fragility and resilience of life, knowing how to cultivate hope in the most barren soil. Your healing ability has given countless people new life, but remember: life has its natural rhythms—forced extension isn\'t necessarily mercy.',
    '{name}, you have a green thumb. You can communicate with plants, make flowers bloom in deserts, make dead trees blossom. This ability makes you a bridge between nature and humanity, but remember: nature\'s gifts should be used to protect, not plunder.'
  ],
  captain: [
    '{name}, you were born a leader. You can unite people, making team members unleash their strongest power. Your presence is the soul of the team.',
    'Core of the fleet, {name}. You have the talent for command—knowing how to assign tasks, boost morale, find ways out in desperate situations. Your leadership lets ordinary people achieve extraordinary things, but true captains know: the leader\'s glory comes from the team\'s victory.',
    '{name}, you can see everyone\'s potential and bring it to its fullest. Your strategic vision lets you seize opportunities on the battlefield, but you also understand: the victory of war lies not in killing enemies, but in winning peace.'
  ],
  waterGhost: [
    '{name}, the deep sea is your territory. In water, you have overwhelming advantage—strength, speed, endurance, all far beyond ordinary people.',
    'Ruler of the deep sea, {name}. You can withstand deep-sea pressure, move freely in dark waters. Your presence strikes fear into sailors, but remember: powerful strength should be used to protect the balance of the ocean, not destroy it.',
    '{name}, you have the ability to control water and ice. You can summon tsunamis, freeze ocean currents. This power makes you an embodiment of natural elements, but remember: the ocean never yields to anyone—you can only coexist with it, not dominate it.'
  ],
  pharmacist: [
    '{name}, you understand the chemical reactions of life. You can prepare healing potions and deadly poisons—life and death are often just a thought apart.',
    'Controller of life and death, {name}. You are proficient in pharmacology and toxins, knowing how to affect life\'s direction with the most subtle doses. Your knowledge can save from water and fire, or kill invisibly. True pharmacists know: healers have kind hearts, medical arts are just means, compassion is the root.',
    '{name}, you have the vision to see through the essence of life. Complex pathology that seems inscrutable to others appears as simple chemical equations to you. This ability makes you a medical genius, but remember: the mysteries of life can never be fully decoded—maintain reverence, that is the true way.'
  ],
  ranger: [
    '{name}, nature is your home. In forests, you are in your element; in wilderness, you never lose your way. You can communicate with animals, draw strength from the earth.',
    'Guardian of nature, {name}. You understand ecological balance, know the interdependence of all things. Your survival skills let you find vitality in any environment, but remember: protecting nature doesn\'t mean rejecting civilization—true balance lies in coexistence.',
    '{name}, you have the talent to communicate with nature. Animals trust you, plants are friendly to you—this ability makes you the voice of the forest. But true rangers know: nature\'s gifts need reciprocation—guardianship is a two-way responsibility.'
  ],
  warrior: [
    '{name}, combat is your breathing. On the battlefield, you are the brightest star—your martial arts are superb, your will like iron.',
    'Master of the battlefield, {name}. You are proficient in various weapons, mastering countless combat techniques. Every attack is precise and lethal, every defense impenetrable. But your true strength lies not in technique, but belief—fighting to protect makes you invincible.',
    '{name}, you have combat instincts beyond ordinary people. When danger comes, you always react fastest; in desperate situations, you always unleash strongest power. This ability makes you a legend of the battlefield, but true warriors know: the greatest victory is winning without fighting.'
  ],
  reader: [
    '{name}, books are your source of power. You can absorb knowledge from reading, gain strength from words. Your learning ability surpasses ordinary people, opening countless fields to you.',
    'Pursuer of knowledge, {name}. You believe there are houses of gold in books, words can change destiny. Your reading speed is fast, memory strong, comprehension outstanding. This talent lets you swim freely in the ocean of knowledge, but remember: true knowledge needs practice to verify.',
    '{name}, you have the ability to see through the truth behind words. In your eyes, books aren\'t just ink marks, but projections of authors\' souls, crystallizations of wisdom. This ability lets you dialogue with ancient sages, gaze into the future. True readers know: the highest realm of reading is resonating with books.'
  ],
  seerHidden: [
    '{name}, you have eyes that see through everything. No matter how perfect the disguise, the truth is revealed before you.',
    'Revealer of secrets, {name}. You can perceive secrets in others\' hearts, see the reality hidden beneath appearances. This insight makes you an expert in intelligence and puzzle-solving, but remember: some secrets, once revealed, bring disaster—knowing when to pretend ignorance is also wisdom.',
    '{name}, your gaze can penetrate illusions and disguises. In your eyes, the world has no secrets. This ability makes you the most dangerous detective, but be careful: truth isn\'t always beautiful—sometimes, ignorance is bliss.'
  ],
  reasoner: [
    '{name}, your logical thinking is impeccable. You can deduce truth from the subtlest clues, find the way out in the most complex mazes.',
    'Pursuer of truth, {name}. You believe every puzzle has an answer, every chaos has logic. Your reasoning ability lets you restore the original face of facts, make lies collapse on themselves. This ability makes you a weapon of justice, but remember: logic is just a tool, true reasoning needs understanding of human nature.',
    '{name}, you have the talent of a detective. You can notice details others overlook, discover connections from seemingly unrelated information. Under your reasoning, complex cases gradually become clear. But true reasoners know: the endpoint of reasoning isn\'t solving cases, but upholding justice.'
  ]
}

// Generate commentary based on pathway and user name
export function generateCommentaryFullEn(
  pathway: Pathway,
  userName: string = 'Seeker'
): string {
  const templates = commentaryTemplatesFullEn[pathway.id]
  if (!templates || templates.length === 0) {
    // Return generic commentary if no template found
    return `${userName}, you are a Beyonder of the ${pathway.name} pathway. ${pathway.description}`
  }
  // Randomly select a template
  const template = templates[Math.floor(Math.random() * templates.length)]
  return template.replace(/{name}/g, userName)
}

// Generate personalized motto based on user traits
export function generateCustomMottoFullEn(
  pathway: Pathway,
  traits: string[]
): string {
  const defaultMottos = pathway.motto
  return defaultMottos[Math.floor(Math.random() * defaultMottos.length)]
}
