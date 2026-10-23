/** Editorial notes from the indexed official Qidian setting collection.
 * Not original-chapter checks, complete recipes or exhaustive ability lists. */
type Bilingual = { zh: string; en: string };
type SettingNote = { content: Bilingual; locator: Bilingual };
export const settingEvidence: Record<
  string,
  Partial<Record<"ability" | "advancement" | "acting", SettingNote>>
> = {
  "death:8": {
    ability: {
      content: {
        zh: "强化灵视，初步沟通附近少量灵体。",
        en: "Stronger Spirit Vision; limited communication with nearby spirits.",
      },
      locator: {
        zh: "力量体系 → 死神途径 → 序列 8 掘墓人 → 能力",
        en: "Power system → Death pathway → Sequence 8 Gravedigger → Abilities",
      },
    },
  },
  "hanged-man:4": {
    ability: {
      content: {
        zh: "化身黑甲巨人，使用灵肉之刃。",
        en: "An armored giant form and a blade targeting flesh and spirit.",
      },
      locator: {
        zh: "力量体系 → 倒吊人途径 → 序列 4 黑骑士 → 能力",
        en: "Power system → Hanged Man pathway → Sequence 4 Black Knight → Abilities",
      },
    },
  },
  "wheel-of-fortune:6": {
    ability: {
      content: {
        zh: "预感并引来灾祸，借幸运减少自身风险。",
        en: "Foresees and attracts calamities, using luck to mitigate personal risk.",
      },
      locator: {
        zh: "力量体系 → 命运之轮途径 → 序列 6 灾祸教士 → 能力",
        en: "Power system → Wheel of Fortune pathway → Sequence 6 Calamity Priest → Abilities",
      },
    },
  },
  "justiciar:3": {
    ability: {
      content: {
        zh: "可剥夺的非凡能力数量显著增加。",
        en: "Can deprive targets of substantially more Beyonder abilities.",
      },
      locator: {
        zh: "力量体系 → 审判者途径 → 序列 3 混乱猎手 → 能力",
        en: "Power system → Justiciar pathway → Sequence 3 Chaos Hunter → Abilities",
      },
    },
  },
  "justiciar:2": {
    ability: {
      content: {
        zh: "感应区域内的失衡，发现隐藏目标。",
        en: "Detects concealed targets through imbalances in the surrounding area.",
      },
      locator: {
        zh: "力量体系 → 审判者途径 → 序列 2 平衡者 → 能力",
        en: "Power system → Justiciar pathway → Sequence 2 Balancer → Abilities",
      },
    },
  },
  "justiciar:1": {
    ability: {
      content: {
        zh: "感应秩序变化，分隔战场并控制影响。",
        en: "Senses changes in order, separates battlefields and controls influence.",
      },
      locator: {
        zh: "力量体系 → 审判者途径 → 序列 1 秩序之手 → 能力",
        en: "Power system → Justiciar pathway → Sequence 1 Hand of Order → Abilities",
      },
    },
  },
  "fool:8": {
    acting: {
      content: {
        zh: "以笑容掩藏悲伤、痛苦与迷茫。",
        en: "Conceal sorrow, pain and uncertainty behind a smile.",
      },
      locator: {
        zh: "力量体系 → 愚者途径 → 序列 8 小丑 → 扮演守则",
        en: "Power system → Fool pathway → Sequence 8 Clown → Acting principles",
      },
    },
  },
  "fool:3": {
    advancement: {
      content: {
        zh: "仪式要点：脱离现实至少三百年，成为历史后服用魔药。",
        en: "Ritual outline: remain outside reality for at least three centuries, becoming history before taking the potion.",
      },
      locator: {
        zh: "力量体系 → 愚者途径 → 序列 3 古代学者 → 仪式",
        en: "Power system → Fool pathway → Sequence 3 Scholar of Yore → Ritual",
      },
    },
  },
};
