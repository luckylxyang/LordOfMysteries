import type { CanonPathway } from "../data/canon";
import type { Language } from "../domain/exploration";
import { glyphFrame, pathwayGlyph } from "../data/pathwayGlyphs";
export async function exportIdentityCard(
  path: CanonPathway,
  nickname: string,
  commentary: string,
  language: Language,
  assessed = false,
) {
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1600;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.fillStyle = "#101a1b";
  ctx.fillRect(0, 0, 1200, 1600);
  const glow = ctx.createRadialGradient(600, 530, 10, 600, 530, 520);
  glow.addColorStop(0, `${path.color}24`);
  glow.addColorStop(1, "#101a1b00");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1200, 1600);
  ctx.strokeStyle = "#b5a178";
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, 1120, 1520);
  ctx.strokeStyle = "#b5a17844";
  ctx.strokeRect(56, 56, 1088, 1488);
  ctx.textAlign = "center";
  ctx.fillStyle = "#c6b68b";
  ctx.font = "22px Georgia";
  ctx.fillText("L O T M . S P A C E", 600, 130);
  ctx.fillText("BEYONDER IDENTITY / SEQUENCE 09", 600, 185);
  ctx.strokeStyle = path.color;
  [220, 235].forEach((r) => {
    ctx.beginPath();
    ctx.arc(600, 490, r, 0, Math.PI * 2);
    ctx.stroke();
  });
  const art = pathwayGlyph(path.id);
  ctx.save();
  ctx.translate(600, 490);
  ctx.scale(5.4, 5.4);
  ctx.translate(-40, -40);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 0.7;
  ctx.globalAlpha = 0.4;
  for (const d of glyphFrame) ctx.stroke(new Path2D(d));
  ctx.globalAlpha = 1;
  ctx.lineWidth = 1.15;
  for (const d of art.lines) ctx.stroke(new Path2D(d));
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 0.8;
  for (const d of art.accents) ctx.stroke(new Path2D(d));
  ctx.restore();
  ctx.fillStyle = "#f0e9da";
  ctx.font = '64px Georgia, "Microsoft YaHei", serif';
  ctx.fillText(path.entry[language], 600, 835);
  let size = 44;
  const name = nickname.trim() || (language === "zh" ? "寻途者" : "Seeker");
  do {
    ctx.font = `${size}px Georgia, "Microsoft YaHei", serif`;
    if (ctx.measureText(name).width <= 950) break;
    size -= 2;
  } while (size > 20);
  ctx.fillText(name, 600, 930);
  ctx.font = '27px Georgia, "Microsoft YaHei", serif';
  ctx.fillStyle = "#b5bcb4";
  const words =
    language === "zh"
      ? Array.from(commentary)
      : commentary.split(" ").map((x) => x + " ");
  let line = "",
    y = 1060;
  for (const word of words) {
    if (ctx.measureText(line + word).width > 900) {
      ctx.fillText(line.trim(), 600, y);
      y += 48;
      line = word;
    } else line += word;
  }
  if (line) ctx.fillText(line.trim(), 600, y);
  ctx.font = '22px Georgia, "Microsoft YaHei", serif';
  ctx.fillStyle = "#c6b68b";
  ctx.fillText(
    language === "zh"
      ? assessed
        ? "测评倾向 · 非官方同人作品"
        : "自选身份 · 非官方同人作品"
      : assessed
        ? "ASSESSMENT AFFINITY · UNOFFICIAL FAN WORK"
        : "CHOSEN IDENTITY · UNOFFICIAL FAN WORK",
    600,
    1410,
  );
  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Export failed"))),
      "image/png",
    ),
  );
}
