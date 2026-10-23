import { writeFile } from "node:fs/promises";
import { chapters } from "../src/data/chapters";
import { chapterIndex, reviewedChapterNumbers } from "../src/data/chapterIndex";
const rows = chapters.map((old) => {
  const next = chapterIndex.find((c) => c.number === old.chapterNumber)!;
  return `| ${old.chapterNumber} | ${old.title.trim()} | ${next.title.en} | [官方章节](${next.url}) | ${next.review === "summary" ? "重新核对摘要" : "仅标题已核对；旧摘要、人物、事件、卷名停用"} |`;
});
await writeFile(
  new URL("../docs/CHAPTER_AUDIT.md", import.meta.url),
  `# 章节索引纠错记录\n\n核对日期：2026-10-23。版本：Webnovel《Lord of Mysteries》官方英文版，全书连续章号。\n\n原索引有 33 条、31 个唯一章号；445、856 各重复一次。旧标题、人物、卷名和摘要缺少可追溯依据，存在明显错配，例如把首次灰雾聚会放在 134 章。新版逐一对照[官方目录](https://www.webnovel.com/book/11022733006234505/catalog)和公开章节页头修复章号、英文标题与直接链接。不会从标题或付费预览推断完整情节，也没有绕过访问限制。\n\n当前收录 ${chapterIndex.length} 个唯一章号；其中第 ${reviewedChapterNumbers.join("、")} 章的简短情节摘要经过原章核对，其余仅参与章号与标题检索。中文标题是本站对英文标题的翻译，不声称等同于起点中文版章节原题。Webnovel 目录的 Volume 分段与中文版八卷名称不同，新版不推断对应卷名。\n\n| 旧章号 | 旧标题（仅审计用） | 核对后的英文标题 | 来源 | 处理 |\n| --- | --- | --- | --- | --- |\n${rows.join("\n")}\n\n旧文件保留以供审计；现行页面只导入 chapterIndex.ts。旧条目的情节关键词不会偷偷保留在搜索中。新增摘要需要逐项登记来源并经过核对。\n`,
);
