import { Pathway } from '../types'

// English commentary templates
export const commentaryTemplatesEn: Record<string, string[]> = {
  seer: [
    '{name}, your spirituality permeates like the fog. You can see details that ordinary people overlook, finding patterns in chaos. Your intuition is often more accurate than logic—trust it. But be careful: the price of glimpsing fate is bearing the weight of truth.',
    'Fate has chosen you, {name}. In the eyes of others, the world is certain; you can see countless branches of possible futures. This is both a gift and a curse. Learn when to peek, and when to close your eyes.',
    'Revelations above the gray fog await your call, {name}. Your soul naturally yearns to decipher mystical symbols and omens. Maintain reverence, but don\'t be bound by fear—true seers can move forward even in the fog.'
  ],
  audience: [
    '{name}, you were born an observer. The world is a transparent stage to you, and you can always see through actors\' masks. This insight is a powerful weapon, but remember: understanding human hearts too deeply can sometimes be lonely.',
    'The human heart is a script, and you are its keenest critic, {name}. You can read the subtlest expressions, hear words unspoken. This ability makes you a master in social situations, but don\'t forget: occasionally remove your mask and live authentically.',
    '{name}, you understand the frequency and rhythm of human emotions. You can guide the tides of emotion, making others laugh or cry. But be warned: the art of manipulating hearts, without moral boundaries, will eventually backfire.'
  ],
  apprentice: [
    '{name}, distance is just a concept to you. You can naturally see cracks in space and find paths ordinary people miss. This freedom is enviable, but remember: the most precious things are often within reach.',
    'The world is a foldable box to you, {name}. You always find shortcuts, bypass obstacles, reach destinations. Your learning ability is extremely strong, your observation thorough—but true apprentices know: some shortcuts lead to destinations you didn\'t want.',
    '{name}, you possess imagination and practical abilities beyond ordinary people. Your world is full of possibilities and doors to the unknown. Maintain this curiosity, but also learn: some doors, once opened, can never be closed again.'
  ],
  hunter: [
    '{name}, danger is your hunting ground. You have beast-like intuition and warrior decisiveness. Facing evil, you never retreat—this pure integrity and courage is the rarest light in the dark world.',
    'Hunting is written in your genes, {name}. You track, you ambush, you terminate. Your vitality is tenacious, your will unshakable—you are a solid rock. But remember: not all monsters need elimination; some need understanding.',
    '{name}, you are the guardian in the night. Your very existence deters evil creatures. Strong physique, keen senses, unyielding will—these are your weapons. But true hunters know: the most powerful prey lurk in the deepest shadows.'
  ],
  arbiter: [
    '{name}, you have a scale in your heart. You crave order, despise chaos, can draw clear boundaries in ambiguous situations. This decisiveness makes you a natural leader, but be wary: absolute rules sometimes create new injustices.',
    '{name}, law is not constraint to you, but a tool. You excel at finding optimal solutions within rules, can also bind others with rules. This is powerful ability—but remember: true arbiters judge hearts, not just actions.',
    'Balance is your pursuit, {name}. You can find delicate balance between order and freedom. Your curses are precise and effective, your contracts unbreakable. But be careful: those who play with rules will eventually be played by rules.'
  ]
}

// Generate commentary based on pathway and user name
export function generateCommentaryEn(
  pathway: Pathway,
  userName: string = 'Seeker'
): string {
  const templates = commentaryTemplatesEn[pathway.id]
  // Randomly select a template
  const template = templates[Math.floor(Math.random() * templates.length)]
  return template.replace(/{name}/g, userName)
}

// Generate personalized motto based on user traits
export function generateCustomMottoEn(
  pathway: Pathway,
  traits: string[]
): string {
  const defaultMottos = pathway.motto
  return defaultMottos[Math.floor(Math.random() * defaultMottos.length)]
}
