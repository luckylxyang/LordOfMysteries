import { readFile, writeFile } from "node:fs/promises";
import { pathways, sources } from "../src/data/canon";
const file = new URL("../docs/CANON_AUDIT.md", import.meta.url);
const base = (await readFile(file, "utf8")).split("\n## 逐途径核验表")[0];
const rows = pathways.map(
  (p) =>
    `| ${p.id} | ${p.entry.zh} → ${p.name.zh} | 10 | ${p.sequences.filter((s) => s.evidence.ability.status !== "pending").length} / ${p.sequences.filter((s) => s.evidence.ability.status === "pending").length} | ${
      p.sequences.some((s) =>
        Object.values(s.evidence).some((e) => e.status === "chapter"),
      )
        ? p.sequences
            .flatMap((s) =>
              Object.entries(s.evidence)
                .filter(([, e]) => e.status === "chapter")
                .map(
                  ([field, e]) =>
                    `序列 ${s.level} ${({ name: "名称", ability: "能力", advancement: "晋升", acting: "扮演" } as Record<string, string>)[field]}：第 ${e.sourceIds.map((id) => sources.find((x) => x.id === id)?.chapter).join("、")} 章`,
                ),
            )
            .join("；")
        : "官方设定及资料索引，原文章节待补"
    } |`,
);
await writeFile(
  file,
  `${base}\n## 逐途径核验表\n\n本表逐项登记覆盖与待确认范围，不把索引对照等同于原著认证。当前 ${sources.length} 条来源；能力栏为“资料摘要 / 待核对”数量。每个序列的实际来源 ID 随数据保存，详情页可查看。\n\n| 稳定 ID | 入门名称 → 序列零名称 | 序列位置 | 能力覆盖 | 原章范围与待确认项 |\n| --- | --- | --- | --- | --- |\n${rows.join("\n")}\n`,
);
