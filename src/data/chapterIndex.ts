import { chapterMetadata } from "./chapterMetadata";
import { checkedNovelChapters } from "./chapterEvidence";
export type ChapterEntry = {
  number: number;
  title: { zh: string; en: string };
  summary: { zh: string; en: string };
  keywords: string[];
  url: string;
  review: "summary" | "metadata";
};
// A curated index, not a full-text corpus. Titles refer to the official English edition.
const reviewedChapters = [
  {
    number: 1,
    title: { zh: "绯红", en: "Crimson" },
    summary: {
      zh: "周明瑞在陌生房间醒来，逐渐面对克莱恩的身份，以及桌上的笔记和左轮手枪。",
      en: "Zhou Mingrui wakes in an unfamiliar room and encounters Klein’s identity, a notebook and a revolver.",
    },
    keywords: [
      "周明瑞",
      "克莱恩",
      "穿越",
      "绯红",
      "笔记",
      "Klein",
      "Zhou Mingrui",
      "awakening",
      "revolver",
    ],
    url: "https://www.webnovel.com/book/lord-of-mysteries_11022733006234505/crimson_31208015751346911",
  },
  {
    number: 4,
    title: { zh: "占卜", en: "Divination" },
    summary: {
      zh: "克莱恩出门采购，接触街头的占卜邀请，并听到与罗塞尔有关的信息。",
      en: "Klein goes shopping, encounters an invitation to divination and hears about Roselle.",
    },
    keywords: [
      "克莱恩",
      "采购",
      "占卜",
      "罗塞尔",
      "Klein",
      "Roselle",
      "shopping",
      "divination",
    ],
    url: "https://www.webnovel.com/book/lord-of-mysteries_11022733006234505/divination_31208061670588089",
  },
  {
    number: 5,
    title: { zh: "仪式", en: "Ritual" },
    summary: {
      zh: "一次塔罗占卜之后，周明瑞尝试转运仪式，进入灰雾，并意外将奥黛丽与阿尔杰拉入其中。",
      en: "After a tarot reading, Zhou Mingrui attempts a luck ritual, enters the gray fog and inadvertently draws Audrey and Alger into it.",
    },
    keywords: [
      "克莱恩",
      "周明瑞",
      "塔罗",
      "首次聚会",
      "第一次聚会",
      "灰雾",
      "转运",
      "奥黛丽",
      "阿尔杰",
      "Klein",
      "Audrey",
      "Alger",
      "tarot",
      "first meeting",
      "gray fog",
      "ritual",
    ],
    url: "https://www.webnovel.com/book/lord-of-mysteries_11022733006234505/ritual_31208282056097486",
  },
  ...checkedNovelChapters.map(({ number, title, summary, keywords, url }) => ({
    number,
    title,
    summary,
    keywords,
    url,
  })),
];
export const chapterIndex: ChapterEntry[] = [
  ...reviewedChapters.map((c) => ({ ...c, review: "summary" as const })),
  ...chapterMetadata
    .filter((c) => !reviewedChapters.some((known) => known.number === c.number))
    .map((c) => ({
      ...c,
      review: "metadata" as const,
      summary: {
        zh: "本条仅核对章号与英文标题；剧情摘要尚未核实。",
        en: "Only the chapter number and English title are checked; a plot summary is pending.",
      },
      keywords: [],
    })),
].sort((a, b) => a.number - b.number);
export const reviewedChapterNumbers = chapterIndex
  .filter((c) => c.review === "summary")
  .map((c) => c.number);
export function searchChapters(query: string, extra: string[] = []) {
  const terms = [
    query.trim().toLowerCase(),
    ...query.toLowerCase().split(/[\s，,？?。]+/),
    ...extra.map((x) => x.toLowerCase()),
  ].filter((x) => x.length > 1);
  const number = Number(
    query.replace(/^(第|chapter\s*)/i, "").replace(/章$/, ""),
  );
  return chapterIndex
    .map((chapter) => {
      const content = [
        chapter.title.zh,
        chapter.title.en,
        ...(chapter.review === "summary"
          ? [chapter.summary.zh, chapter.summary.en]
          : []),
        ...chapter.keywords,
      ]
        .join(" ")
        .toLowerCase();
      const matches = [...new Set(terms.filter((t) => content.includes(t)))];
      const aliases = chapter.keywords.filter((k) =>
        query.toLowerCase().includes(k.toLowerCase()),
      );
      return {
        chapter,
        matches: [...new Set([...matches, ...aliases])],
        score:
          (number === chapter.number ? 20 : 0) +
          matches.length +
          aliases.length,
      };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.chapter.number - b.chapter.number);
}
