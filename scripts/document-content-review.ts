import { writeFile } from "node:fs/promises";
import { pathways, sources, type FieldEvidence } from "../src/data/canon";

function evidenceLabel(field: FieldEvidence) {
  if (field.status === "pending") return "待核对";
  const label =
    field.status === "chapter"
      ? "原章"
      : field.sourceIds.length === 1 && field.sourceIds[0] === "qidian-settings"
        ? "官方设定摘要"
        : "参考摘要";
  const links = field.sourceIds
    .map((id) => {
      const s = sources.find((s) => s.id === id);
      if (!s) throw new Error(`Unresolved source ${id}`);
      return `[${s.chapter ? `第 ${s.chapter} 章` : s.id}](${s.url})`;
    })
    .join("、");
  return `${label}：${links}${field.locator ? `<br>${field.locator.zh}` : ""}`;
}
const sequences = pathways.flatMap((p) => p.sequences.map((s) => ({ p, s })));
const totals = ["ability", "acting", "advancement"].map((key) => {
  const field = key as "ability" | "acting" | "advancement";
  return `| ${{ ability: "能力", acting: "扮演", advancement: "晋升" }[field]} | ${sequences.filter(({ s }) => s.evidence[field].status === "chapter").length} | ${sequences.filter(({ s }) => s.evidence[field].status === "reference").length} | ${sequences.filter(({ s }) => s.evidence[field].status === "pending").length} |`;
});
const rows = sequences.map(
  ({ p, s }) =>
    `| ${p.id} | ${s.level} | ${s.name.zh} / ${s.name.en} | ${evidenceLabel(s.evidence.ability)} | ${evidenceLabel(s.evidence.acting)} | ${evidenceLabel(s.evidence.advancement)} |`,
);
await writeFile(
  new URL("../docs/CONTENT_REVIEW.md", import.meta.url),
  `# 逐序列资料核验工作表\n\n更新日期：2026-10-23。由当前数据生成，覆盖 22 条途径、220 个序列位置。此表用于逐项核验，不能把有链接等同于原章已经核实。官方设定摘要与二手索引仍需另行回查原章；待核对不等于“原著从未说明”。\n\n## 覆盖统计\n\n| 字段 | 已对照原章 | 参考摘要（含官方设定） | 待核对 |\n| --- | --- | --- | --- |\n${totals.join("\n")}\n\n## 核验表\n\n名称的独立来源保存在每个序列的 evidence.name，以下列出内容字段。引用只支持该项说明，不支持整条序列的全部能力或完整晋升条件。页面与本表使用同一份数据。\n\n| 途径 ID | 序列 | 名称 | 能力依据 | 扮演依据 | 晋升依据 |\n| --- | --- | --- | --- | --- | --- |\n${rows.join("\n")}\n\n复核每项时应记录：原作品、版本、章号、直接链接、所支持的具体主张、核对日期；若只有设定集或二手资料，应保留相应标识。禁止根据序列名称推导能力，禁止把续作补充直接归入首部小说。\n`,
);
