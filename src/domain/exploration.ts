import { pathways, type CanonPathway } from "../data/canon";

export type Language = "zh" | "en";
export type Reading = {
  reducedMotion: boolean;
};
export const initialReading: Reading = { reducedMotion: false };
// Ignore retired visibility settings while retaining the user's motion preference.
export function normalizeReading(value: unknown): Reading {
  return {
    reducedMotion:
      !!value &&
      typeof value === "object" &&
      (value as { reducedMotion?: unknown }).reducedMotion === true,
  };
}
export const legacyIds: Record<string, string | null> = {
  seer: "fool",
  thief: "error",
  apprentice: "door",
  audience: "visionary",
  sailor: "tyrant",
  arbiter: "justiciar",
  hunter: "red-priest",
  collector: "death",
  assassin: "demoness",
  pharmacist: "moon",
  warrior: "twilight-giant",
  reader: "white-tower",
  prayer: "sun",
  nightmare: "darkness",
  philosopher: null,
  archaeologist: "paragon",
  tiller: null,
  captain: null,
  waterGhost: "tyrant",
  ranger: null,
  seerHidden: "door",
  reasoner: null,
};
export function resolvePathway(id = "") {
  return pathways.find((p) => p.id === (legacyIds[id] ?? id));
}
export function pathwayLabel(p: CanonPathway, language: Language) {
  return p.name[language];
}
export function stage(level: number, language: Language) {
  const labels =
    language === "zh"
      ? [
          "低序列 · 非凡初醒",
          "中序列 · 能力深化",
          "半神 · 神性显现",
          "天使 · 权柄凝聚",
          "真神 · 序列零",
        ]
      : [
          "LOW · AWAKENING",
          "MID · TRANSFORMATION",
          "DEMIGOD · DIVINITY",
          "ANGEL · AUTHORITY",
          "DEITY · SEQUENCE ZERO",
        ];
  return labels[
    level >= 8 ? 0 : level >= 5 ? 1 : level >= 3 ? 2 : level >= 1 ? 3 : 4
  ];
}
export const text = (language: Language, zh: string, en: string) =>
  language === "zh" ? zh : en;

export type Trait =
  "insight" | "freedom" | "resolve" | "care" | "order" | "mystery";
export const traitNames: Record<Trait, { zh: string; en: string }> = {
  insight: { zh: "观察与理解", en: "Observation" },
  freedom: { zh: "探索与变通", en: "Exploration" },
  resolve: { zh: "行动与意志", en: "Resolve" },
  care: { zh: "守护与生命", en: "Care" },
  order: { zh: "秩序与组织", en: "Order" },
  mystery: { zh: "直觉与未知", en: "Mystery" },
};
// Editorial entertainment profiles, not canonical personality diagnoses or probabilities.
export const affinities: Record<string, number[]> = {
  fool: [5, 3, 1, 1, 1, 5],
  error: [3, 5, 2, 0, 3, 3],
  door: [3, 5, 1, 1, 0, 4],
  visionary: [5, 1, 1, 3, 2, 3],
  sun: [1, 1, 4, 4, 4, 1],
  tyrant: [1, 3, 5, 1, 3, 2],
  "white-tower": [5, 2, 1, 1, 4, 2],
  "hanged-man": [2, 1, 4, 1, 1, 5],
  darkness: [3, 1, 2, 4, 2, 5],
  death: [3, 1, 3, 2, 2, 5],
  "twilight-giant": [1, 1, 5, 4, 3, 1],
  demoness: [3, 3, 3, 1, 1, 4],
  "red-priest": [2, 2, 5, 1, 5, 1],
  hermit: [5, 2, 1, 1, 2, 5],
  paragon: [5, 3, 2, 2, 4, 0],
  "wheel-of-fortune": [2, 5, 1, 2, 0, 5],
  mother: [2, 1, 2, 5, 3, 2],
  moon: [3, 2, 2, 5, 1, 3],
  abyss: [1, 4, 5, 0, 0, 3],
  chained: [2, 1, 5, 1, 2, 4],
  "black-emperor": [3, 4, 3, 0, 5, 1],
  justiciar: [3, 0, 4, 2, 5, 0],
};
const scenarios = [
  [
    "一封没有署名的信出现在门外。你最先做什么？",
    "An unsigned letter appears at your door. What comes first?",
    [
      ["观察纸张与笔迹", "Study the paper and handwriting", "insight"],
      ["寻找送信人的足迹", "Follow the messenger’s trail", "freedom"],
      ["检查同伴是否安全", "Check on your companions", "care"],
    ],
  ],
  [
    "调查陷入僵局，你决定……",
    "The investigation stalls. You decide to…",
    [
      ["重新排列所有证据", "Reconstruct the evidence", "order"],
      ["留意重复出现的象征", "Notice recurring symbols", "mystery"],
      ["亲自验证最危险的假设", "Test the riskiest hypothesis", "resolve"],
    ],
  ],
  [
    "陌生城市里，你会先去哪里？",
    "Where do you go first in an unfamiliar city?",
    [
      [
        "图书馆，理解这里的历史",
        "A library, to understand its history",
        "insight",
      ],
      ["码头，寻找新的航线", "The docks, for a new route", "freedom"],
      ["诊所，看看能帮上什么忙", "A clinic, to offer help", "care"],
    ],
  ],
  [
    "面对失序的现场，什么最重要？",
    "What matters most in a chaotic scene?",
    [
      ["分工并建立清晰的规则", "Assign roles and clear rules", "order"],
      ["感知表象之外的异常", "Sense what lies beyond appearances", "mystery"],
      ["抓住时机立即行动", "Act while there is an opening", "resolve"],
    ],
  ],
  [
    "你愿意长期磨炼哪种本领？",
    "Which skill would you practice for years?",
    [
      ["耐心倾听，理解人心", "Listening and understanding people", "insight"],
      ["在变化中寻找新方法", "Finding new ways through change", "freedom"],
      ["让脆弱的事物重新生长", "Helping fragile things grow again", "care"],
    ],
  ],
  [
    "同伴们发生争执，你会……",
    "Your companions disagree. You…",
    [
      ["找到大家都认可的约定", "Find an agreement everyone accepts", "order"],
      ["留意未被说出口的预感", "Attend to an unspoken intuition", "mystery"],
      ["承担责任，带头作出决定", "Take responsibility and decide", "resolve"],
    ],
  ],
  [
    "旅途中最值得保存的是什么？",
    "What is worth preserving from a journey?",
    [
      ["一份能解释真相的记录", "A record that explains the truth", "insight"],
      ["一张还有空白的地图", "A map with blank spaces", "freedom"],
      ["曾经彼此扶持的关系", "The bonds that sustained you", "care"],
    ],
  ],
  [
    "当所有线索指向未知，你选择……",
    "When every clue leads into the unknown, you choose…",
    [
      ["建立边界，谨慎推进", "Set boundaries and proceed carefully", "order"],
      ["容纳疑问，继续感知", "Sit with uncertainty and listen", "mystery"],
      ["接受代价，跨出第一步", "Accept the cost and take a step", "resolve"],
    ],
  ],
] as const;
export const questions = scenarios.map((q, i) => ({
  id: i + 1,
  title: { zh: q[0], en: q[1] },
  options: q[2].map((o) => ({
    label: { zh: o[0], en: o[1] },
    trait: o[2] as Trait,
  })),
}));
export const RULE_VERSION = "2026.10.22-v3";
export type Snapshot = {
  id: string;
  createdAt: string;
  version: string;
  answers: number[];
  scores: Array<{ id: string; score: number }>;
  traits: Record<Trait, number>;
  commentary: { zh: string; en: string };
};
export const traitGroups: Trait[][] = [
  ["insight", "freedom", "care"],
  ["resolve", "order", "mystery"],
];
export function pathwayProfile(id: string): Record<Trait, number> {
  const keys = Object.keys(traitNames) as Trait[];
  const weights = affinities[id];
  if (!weights) throw new Error("Unknown pathway");
  return Object.fromEntries(
    traitGroups.flatMap((group) => {
      const sum = group.reduce(
        (total, trait) => total + weights[keys.indexOf(trait)],
        0,
      );
      return group.map((trait) => [trait, weights[keys.indexOf(trait)] / sum]);
    }),
  ) as Record<Trait, number>;
}
function scoreTraits(traits: Record<Trait, number>) {
  const keys = Object.keys(traitNames) as Trait[];
  // Each of the two choice groups occurs four times. Compare proportions rather
  // than rewarding profiles that give many traits a high raw weight. Two
  // probability vectors have squared distance at most 2; both groups at most 4.
  return pathways
    .map((p) => {
      const profile = pathwayProfile(p.id);
      const squaredDistance = keys.reduce(
        (sum, key) => sum + (traits[key] / 4 - profile[key]) ** 2,
        0,
      );
      return {
        id: p.id,
        score: Math.round((1 - Math.sqrt(squaredDistance / 4)) * 1000) / 10,
      };
    })
    .sort(
      (a, b) => b.score - a.score || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0),
    );
}
export function evaluate(
  answers: number[],
  id: string = crypto.randomUUID(),
  createdAt = new Date().toISOString(),
): Snapshot {
  if (
    answers.length !== questions.length ||
    answers.some((v, i) => !Number.isInteger(v) || !questions[i].options[v])
  )
    throw new Error("Incomplete assessment");
  const traits = Object.fromEntries(
    Object.keys(traitNames).map((t) => [t, 0]),
  ) as Record<Trait, number>;
  answers.forEach((answer, i) => traits[questions[i].options[answer].trait]++);
  const keys = Object.keys(traitNames) as Trait[];
  const scores = scoreTraits(traits);
  const dominant = keys
    .slice()
    .sort((a, b) => traits[b] - traits[a] || keys.indexOf(a) - keys.indexOf(b))
    .slice(0, 2);
  const commentary = {
    zh: `你的选择更常体现「${traitNames[dominant[0]].zh}」与「${traitNames[dominant[1]].zh}」。这是一份探索诡秘世界的起点；你仍可以自由选择自己的途径。`,
    en: `Your choices emphasize ${traitNames[dominant[0]].en.toLowerCase()} and ${traitNames[dominant[1]].en.toLowerCase()}. This is a starting point for exploration; your chosen identity remains yours.`,
  };
  return {
    id,
    createdAt,
    version: RULE_VERSION,
    answers: [...answers],
    scores,
    traits,
    commentary,
  };
}

/** Reject corrupt or cross-version data without inventing personal answers. */
export function validateSnapshot(value: unknown): Snapshot | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Partial<Snapshot>;
  if (
    typeof v.id !== "string" ||
    !/^[-\w]{1,100}$/.test(v.id) ||
    typeof v.createdAt !== "string" ||
    v.createdAt.length > 40 ||
    !Number.isFinite(Date.parse(v.createdAt))
  )
    return null;
  if (v.version !== RULE_VERSION && v.version !== "2026.10.22-v2") return null;
  if (
    !Array.isArray(v.answers) ||
    v.answers.length !== questions.length ||
    v.answers.some(
      (answer, i) => !Number.isInteger(answer) || !questions[i].options[answer],
    )
  )
    return null;
  if (!v.traits || typeof v.traits !== "object") return null;
  const derived = evaluate(v.answers, v.id, v.createdAt);
  if (
    (Object.keys(traitNames) as Trait[]).some(
      (trait) => v.traits![trait] !== derived.traits[trait],
    )
  )
    return null;
  if (
    !Array.isArray(v.scores) ||
    v.scores.length !== pathways.length ||
    new Set(v.scores.map((score) => score?.id)).size !== pathways.length
  )
    return null;
  if (
    v.scores.some(
      (score, index) =>
        !score ||
        !pathways.some((p) => p.id === score.id) ||
        !Number.isFinite(score.score) ||
        score.score < 0 ||
        score.score > 100 ||
        (index > 0 && v.scores![index - 1].score < score.score),
    )
  )
    return null;
  if (
    !v.commentary ||
    typeof v.commentary.zh !== "string" ||
    typeof v.commentary.en !== "string" ||
    !v.commentary.zh.trim() ||
    !v.commentary.en.trim() ||
    v.commentary.zh.length > 1000 ||
    v.commentary.en.length > 1000
  )
    return null;
  if (
    v.version === RULE_VERSION &&
    v.scores.some(
      (score, index) =>
        score.id !== derived.scores[index].id ||
        score.score !== derived.scores[index].score,
    )
  )
    return null;
  return {
    id: v.id,
    createdAt: v.createdAt,
    version: v.version,
    answers: [...v.answers],
    scores: v.scores.map(({ id, score }) => ({ id, score })),
    traits: { ...derived.traits },
    commentary: { zh: v.commentary.zh, en: v.commentary.en },
  };
}
