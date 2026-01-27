/**
 * 《诡秘之主》章节剧情搜索数据模板
 *
 * 使用说明：
 * 1. 复制此文件为 chapters.ts
 * 2. 填写实际的章节信息
 * 3. 可通过脚本或AI辅助生成摘要和关键词
 */

// ============================================================================
// 数据类型定义
// ============================================================================

export interface ChapterPlot {
  /** 章节编号 */
  chapterNumber: number;

  /** 章节标题 */
  title: string;

  /** 卷名 */
  volume: string;

  /** 剧情摘要（AI理解用，描述本章主要情节） */
  summary: string;

  /** 关键人物 */
  characters: string[];

  /** 关键地点 */
  locations: string[];

  /** 重要物品/概念 */
  items: string[];

  /** 关键词标签 */
  keywords: string[];

  /** 重要事件描述 */
  events: string[];

  /** 相关途径（可选） */
  relatedPathways?: string[];

  /** 情感标签（可选，用于更精准的搜索） */
  moodTags?: string[];

  /** 时间标记（可选，如"第一卷第3周"） */
  timeline?: string;
}

// ============================================================================
// 示例数据（请替换为实际数据）
// ============================================================================

export const exampleChapters: ChapterPlot[] = [
  {
    chapterNumber: 1,
    title: "绯红",
    volume: "第一卷 小丑",
    summary: "克莱恩在廷根市因报复行动而意外身亡，醒来后发现自己穿越到了一个充满蒸汽机械与克苏鲁神话元素的神秘世界。他在这具身体中醒来，慢慢意识到自己获得了一个能够连接神秘空间的灰雾之上的能力。",
    characters: ["克莱恩·莫雷蒂", "廷根市的警察"],
    locations: ["廷根市", "自己的房间"],
    items: ["灰雾之上", "神秘空间"],
    keywords: ["穿越", "重生", "灰雾", "开局", "第一人称"],
    events: ["主角穿越", "获得神秘能力", "发现灰雾空间"],
    moodTags: ["悬疑", "神秘"],
    timeline: "第一卷 开局"
  },
  {
    chapterNumber: 134,
    title: "记录",
    volume: "第二卷 无面人",
    summary: "克莱恩在密修会组织中获得了更多的线索，并开始深入了解关于塔罗会的秘密。他在记录中发现了关于历史真相的蛛丝马迹。",
    characters: ["克莱恩", "戴里克·伯格", "埃姆林"],
    locations: ["密修会", "灰雾之上"],
    items: ["塔罗牌", "神秘记录"],
    keywords: ["塔罗会", "记录", "历史真相", "密修会"],
    events: ["塔罗会聚会", "了解历史"],
    relatedPathways: ["占卜家", "学徒"],
    moodTags: ["探索", "解谜"],
    timeline: "第二卷 中期"
  },
  {
    chapterNumber: 800,
    title: "问答（二）",
    volume: "第四卷 灾祸之王",
    summary: "克莱恩与阿蒙的第一次正面交锋。阿蒙展示了他的寄生能力和诡计，克莱恩陷入了前所未有的危机。",
    characters: ["克莱恩", "阿蒙", "伦纳德"],
    locations: ["贝克兰德", "梦境"],
    items: ["阿蒙的影子", "寄生触须"],
    keywords: ["阿蒙", "第一次相遇", "战斗", "寄生", "危机"],
    events: ["克莱恩vs阿蒙", "首次交锋", "智斗"],
    relatedPathways: ["占卜家", "偷盗者"],
    moodTags: ["紧张", "战斗", "危机"],
    timeline: "第四卷 高潮"
  },
  {
    chapterNumber: 1010,
    title: "唯一的逆行者",
    volume: "第五卷 红祭司",
    summary: "克莱恩在对抗外神入侵的战斗中，选择成为唯一的逆行者，承担起保护世界的重任。这是他成神之路的关键转折点。",
    characters: ["克莱恩", "阿兹克", "奥黛丽"],
    locations: ["历史虚空", "现实世界"],
    items: ["源堡", "诡秘之主牌"],
    keywords: ["成神", "牺牲", "逆行者", "转折点", "高潮"],
    events: ["对抗外神", "成神仪式", "牺牲"],
    moodTags: ["悲壮", "高潮", "史诗"],
    timeline: "第五卷 结局"
  }
];

// ============================================================================
// 数据生成辅助工具
// ============================================================================

/**
 * 获取章节搜索索引
 * 用于构建快速搜索的数据结构
 */
export function buildChapterIndex(chapters: ChapterPlot[]) {
  return chapters.map(chapter => ({
    ...chapter,
    // 组合所有可搜索文本
    searchableText: [
      chapter.title,
      chapter.summary,
      ...chapter.characters,
      ...chapter.locations,
      ...chapter.items,
      ...chapter.keywords,
      ...chapter.events,
      chapter.volume,
      chapter.timeline || ''
    ].join(' ').toLowerCase(),

    // 生成搜索别名（同义词）
    aliases: generateAliases(chapter)
  }));
}

/**
 * 生成搜索别名
 * 帮助匹配不同的表达方式
 */
function generateAliases(chapter: ChapterPlot): string[] {
  const aliases: string[] = [];

  // 人物别名（如"夏洛克·莫里亚蒂" = "克莱恩"）
  if (chapter.characters.includes("克莱恩")) {
    aliases.push("夏洛克", "莫里亚蒂", "道恩", "唐泰斯", "梅丽莎");
  }

  // 添加更多别名规则...
  return aliases;
}

/**
 * 关键词提取辅助
 * 从章节描述中自动提取关键词
 */
export function extractKeywords(text: string): string[] {
  // 这里可以集成NLP工具或使用简单规则
  const keywords: string[] = [];

  // 人名模式（中文）
  const namePattern = /[\u4e00-\u9fa5]{2,4}/g;
  const names = text.match(namePattern) || [];
  keywords.push(...names);

  return [...new Set(keywords)]; // 去重
}

// ============================================================================
// 使用示例
// ============================================================================

/**
 * 搜索示例
 */
export function searchChapters(
  chapters: ChapterPlot[],
  query: string
): ChapterPlot[] {
  const indexedChapters = buildChapterIndex(chapters);
  const queryLower = query.toLowerCase();

  return indexedChapters
    .filter(chapter =>
      chapter.searchableText.includes(queryLower) ||
      chapter.aliases.some(alias => queryLower.includes(alias.toLowerCase()))
    )
    .sort((a, b) => {
      // 按相关度排序
      const aScore = calculateRelevance(a, queryLower);
      const bScore = calculateRelevance(b, queryLower);
      return bScore - aScore;
    });
}

/**
 * 计算搜索相关度分数
 */
function calculateRelevance(chapter: any, query: string): number {
  let score = 0;

  // 标题完全匹配权重最高
  if (chapter.title.toLowerCase().includes(query)) score += 10;

  // 摘要匹配
  if (chapter.summary.toLowerCase().includes(query)) score += 5;

  // 关键词匹配
  chapter.keywords.forEach((keyword: string) => {
    if (keyword.toLowerCase().includes(query)) score += 3;
  });

  // 人物匹配
  chapter.characters.forEach((char: string) => {
    if (char.toLowerCase().includes(query)) score += 2;
  });

  return score;
}
