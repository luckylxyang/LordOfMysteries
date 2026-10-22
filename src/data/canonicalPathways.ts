/**
 * Canonical first-novel pathway identities.
 *
 * This registry is deliberately limited to Sequence 9 and Sequence 0 names.
 * Detailed sequence abilities, rituals, adjacency and source passages MUST be
 * checked against the original text before publishing.
 *
 * Source for verification: 《诡秘之主》 / 起点作品设定集
 * https://h5.if.qidian.com/h5/workSet/main?albumId=131&bookId=1010868264&catelogId=69153
 */
export interface CanonicalPathway {
  id: string
  sequence9: string
  sequence0: string
  sequence9En: string
  sequence0En: string
  symbol: string
}

export const canonicalPathways: readonly CanonicalPathway[] = [
  { id: 'seer', sequence9: '占卜家', sequence0: '愚者', sequence9En: 'Seer', sequence0En: 'The Fool', symbol: '🔮' },
  { id: 'apprentice', sequence9: '学徒', sequence0: '门', sequence9En: 'Apprentice', sequence0En: 'Door', symbol: '🚪' },
  { id: 'marauder', sequence9: '偷盗者', sequence0: '错误', sequence9En: 'Marauder', sequence0En: 'Error', symbol: '🗝️' },
  { id: 'bard', sequence9: '歌颂者', sequence0: '太阳', sequence9En: 'Bard', sequence0En: 'Sun', symbol: '☀️' },
  { id: 'sailor', sequence9: '水手', sequence0: '暴君', sequence9En: 'Sailor', sequence0En: 'Tyrant', symbol: '⚓' },
  { id: 'spectator', sequence9: '观众', sequence0: '空想家', sequence9En: 'Spectator', sequence0En: 'Visionary', symbol: '🎭' },
  { id: 'secrets_supplicant', sequence9: '秘祈人', sequence0: '倒吊人', sequence9En: 'Secrets Supplicant', sequence0En: 'The Hanged Man', symbol: '🕯️' },
  { id: 'reader', sequence9: '阅读者', sequence0: '白塔', sequence9En: 'Reader', sequence0En: 'White Tower', symbol: '📖' },
  { id: 'sleepless', sequence9: '不眠者', sequence0: '黑暗', sequence9En: 'Sleepless', sequence0En: 'Darkness', symbol: '🌑' },
  { id: 'corpse_collector', sequence9: '收尸人', sequence0: '死神', sequence9En: 'Corpse Collector', sequence0En: 'Death', symbol: '💀' },
  { id: 'savant', sequence9: '通识者', sequence0: '完美者', sequence9En: 'Savant', sequence0En: 'Paragon', symbol: '⚙️' },
  { id: 'mystery_pryer', sequence9: '窥秘人', sequence0: '隐者', sequence9En: 'Mystery Pryer', sequence0En: 'Hermit', symbol: '👁️' },
  { id: 'planter', sequence9: '耕种者', sequence0: '母亲', sequence9En: 'Planter', sequence0En: 'Mother', symbol: '🌾' },
  { id: 'apothecary', sequence9: '药师', sequence0: '月亮', sequence9En: 'Apothecary', sequence0En: 'Moon', symbol: '🧪' },
  { id: 'criminal', sequence9: '罪犯', sequence0: '深渊', sequence9En: 'Criminal', sequence0En: 'Abyss', symbol: '🔥' },
  { id: 'prisoner', sequence9: '囚犯', sequence0: '被缚者', sequence9En: 'Prisoner', sequence0En: 'Chained', symbol: '⛓️' },
  { id: 'warrior', sequence9: '战士', sequence0: '黄昏巨人', sequence9En: 'Warrior', sequence0En: 'Twilight Giant', symbol: '⚔️' },
  { id: 'monster', sequence9: '怪物', sequence0: '命运之轮', sequence9En: 'Monster', sequence0En: 'Wheel of Fortune', symbol: '🎲' },
  { id: 'assassin', sequence9: '刺客', sequence0: '魔女', sequence9En: 'Assassin', sequence0En: 'Demoness', symbol: '🗡️' },
  { id: 'hunter', sequence9: '猎人', sequence0: '红祭司', sequence9En: 'Hunter', sequence0En: 'Red Priest', symbol: '🏹' },
  { id: 'lawyer', sequence9: '律师', sequence0: '黑皇帝', sequence9En: 'Lawyer', sequence0En: 'Black Emperor', symbol: '⚖️' },
  { id: 'arbiter', sequence9: '仲裁人', sequence0: '审判者', sequence9En: 'Arbiter', sequence0En: 'Justiciar', symbol: '📜' },
]

if (new Set(canonicalPathways.map(p => p.id)).size !== 22 ||
    new Set(canonicalPathways.map(p => p.sequence9)).size !== 22 ||
    new Set(canonicalPathways.map(p => p.sequence0)).size !== 22) {
  throw new Error('Canonical pathway registry must contain 22 unique pathways')
}
