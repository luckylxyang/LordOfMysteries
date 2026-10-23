/** Original AI-assisted artwork for this fan project, not canonical emblems. */
export type IdentityArt = {
  surface: "paper" | "ink";
  motif: { zh: string; en: string };
};
export const identityArt: Record<string, IdentityArt> = {
  fool: {
    surface: "paper",
    motif: {
      zh: "灰雾 · 秘偶 · 青铜长桌",
      en: "Gray fog · Marionettes · Bronze table",
    },
  },
  error: {
    surface: "paper",
    motif: {
      zh: "单片眼镜 · 窃取 · 错位时钟",
      en: "Monocle · Theft · Dislocated clocks",
    },
  },
  door: {
    surface: "paper",
    motif: { zh: "星空 · 门扉 · 漫游", en: "Stars · Doorways · Wandering" },
  },
  visionary: {
    surface: "paper",
    motif: {
      zh: "观众 · 潜意识 · 空想",
      en: "Observer · Subconscious · Imagination",
    },
  },
  sun: {
    surface: "paper",
    motif: { zh: "日光 · 圣歌 · 净化", en: "Sunlight · Hymns · Purification" },
  },
  tyrant: {
    surface: "paper",
    motif: { zh: "海潮 · 雷霆 · 风暴", en: "Tides · Thunder · Storms" },
  },
  "white-tower": {
    surface: "paper",
    motif: { zh: "高塔 · 藏书 · 预言", en: "Tower · Library · Prophecy" },
  },
  "hanged-man": {
    surface: "paper",
    motif: { zh: "倒悬 · 阴影 · 放牧", en: "Suspension · Shadows · Grazing" },
  },
  darkness: {
    surface: "ink",
    motif: { zh: "夜幕 · 梦境 · 隐秘", en: "Night · Dreams · Concealment" },
  },
  death: {
    surface: "paper",
    motif: { zh: "羽翼 · 冥河 · 灵界", en: "Feathers · River · Spirit world" },
  },
  "twilight-giant": {
    surface: "paper",
    motif: {
      zh: "巨剑 · 守护 · 黄昏",
      en: "Greatsword · Protection · Twilight",
    },
  },
  demoness: {
    surface: "paper",
    motif: { zh: "镜面 · 诅咒 · 灾祸", en: "Mirrors · Curses · Catastrophe" },
  },
  "red-priest": {
    surface: "paper",
    motif: { zh: "猎手 · 火焰 · 战争", en: "Hunter · Fire · War" },
  },
  hermit: {
    surface: "paper",
    motif: {
      zh: "书卷 · 星辰 · 隐秘知识",
      en: "Scrolls · Stars · Hidden knowledge",
    },
  },
  paragon: {
    surface: "paper",
    motif: { zh: "工坊 · 制造 · 炼金", en: "Workshop · Craft · Alchemy" },
  },
  "wheel-of-fortune": {
    surface: "paper",
    motif: { zh: "轮盘 · 岔路 · 命运", en: "Wheel · Crossroads · Fate" },
  },
  mother: {
    surface: "paper",
    motif: { zh: "根系 · 疗愈 · 生命", en: "Roots · Healing · Life" },
  },
  moon: {
    surface: "paper",
    motif: {
      zh: "绯月 · 药剂 · 召唤",
      en: "Crimson moon · Potions · Summoning",
    },
  },
  abyss: {
    surface: "paper",
    motif: { zh: "深渊 · 恶意 · 欲望", en: "Abyss · Malice · Desire" },
  },
  chained: {
    surface: "paper",
    motif: { zh: "锁链 · 怨魂 · 异变", en: "Chains · Wraiths · Mutation" },
  },
  "black-emperor": {
    surface: "paper",
    motif: {
      zh: "王座 · 扭曲 · 秩序阴影",
      en: "Throne · Distortion · Shadow of order",
    },
  },
  justiciar: {
    surface: "paper",
    motif: { zh: "天平 · 律令 · 裁决", en: "Scales · Law · Judgment" },
  },
};
export function identityArtUrl(id: string, base = "/") {
  if (!Object.prototype.hasOwnProperty.call(identityArt, id))
    throw new Error("Unknown identity artwork");
  return `${base.replace(/\/$/, "")}/art/identity/${id}.webp`;
}
