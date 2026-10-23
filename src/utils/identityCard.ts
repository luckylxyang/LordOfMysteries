import type { CanonPathway } from "../data/canon";
import type { Language } from "../domain/exploration";
import { identityArt, identityArtUrl } from "../data/identityArt";

export const CARD_WIDTH = 1200;
export const CARD_HEIGHT = 2000;
const SERIF = '"Noto Serif SC", "Songti SC", SimSun, Georgia, serif';
const imageCache = new Map<string, Promise<HTMLImageElement>>();

function loadArtwork(id: string) {
  const url = identityArtUrl(id, import.meta.env.BASE_URL);
  const cached = imageCache.get(url);
  if (cached) return cached;
  const pending = new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => {
      imageCache.delete(url);
      reject(new Error("Identity artwork unavailable"));
    };
    image.src = url;
  });
  if (imageCache.size >= 4) imageCache.delete(imageCache.keys().next().value!);
  imageCache.set(url, pending);
  return pending;
}

function fittedText(
  ctx: CanvasRenderingContext2D,
  value: string,
  y: number,
  fontSize: number,
  maxWidth = 900,
) {
  let size = fontSize;
  do {
    ctx.font = `${size}px ${SERIF}`;
    if (ctx.measureText(value).width <= maxWidth) break;
    size -= 1;
  } while (size > 16);
  ctx.fillText(value, CARD_WIDTH / 2, y, maxWidth);
}

/** Bound prose to two caption lines; the complete assessment remains on the page. */
function captionLines(
  ctx: CanvasRenderingContext2D,
  value: string,
  width: number,
) {
  const lines: string[] = [];
  let line = "";
  const tokens =
    value.trim().match(/[\u2e80-\uffef]|[^\s\u2e80-\uffef]+\s*|\s+/gu) || [];
  for (const token of tokens) {
    if (ctx.measureText(line + token).width > width && line) {
      lines.push(line.trim());
      line = "";
    }
    for (const character of token) {
      if (ctx.measureText(line + character).width > width && line) {
        lines.push(line.trim());
        line = "";
      }
      line += character;
    }
  }
  if (line.trim()) lines.push(line.trim());
  if (lines.length > 2) {
    let last = lines[1];
    while (ctx.measureText(last + "…").width > width) last = last.slice(0, -1);
    return [lines[0], last.trim() + "…"];
  }
  return lines;
}

/** Shared compositor: preview and downloaded PNG use exactly these pixels. */
export async function createIdentityCardCanvas(
  path: CanonPathway,
  nickname: string,
  commentary: string,
  language: Language,
  assessed = false,
) {
  const [image] = await Promise.all([
    loadArtwork(path.id),
    document.fonts.ready,
  ]);
  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  const paper = identityArt[path.id].surface === "paper";
  ctx.fillStyle = paper ? "#d5c29a" : "#11151b";
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
  ctx.drawImage(image, 0, 0, CARD_WIDTH, CARD_HEIGHT);
  // Translucent wash preserves the print texture beneath the variable text.
  const wash = ctx.createLinearGradient(0, 1530, 0, 1960);
  wash.addColorStop(0, paper ? "#ddcba600" : "#10131800");
  wash.addColorStop(0.2, paper ? "#ddcba670" : "#10131870");
  wash.addColorStop(0.85, paper ? "#ddcba670" : "#10131870");
  wash.addColorStop(1, paper ? "#ddcba600" : "#10131800");
  ctx.fillStyle = wash;
  ctx.fillRect(110, 1530, 980, 430);
  ctx.textAlign = "center";
  ctx.fillStyle = paper ? "#28241f" : "#e4dfd3";
  fittedText(ctx, path.name[language], 1660, language === "zh" ? 86 : 68);
  ctx.fillStyle = paper ? "#5b4e3d" : "#bdb8b1";
  fittedText(
    ctx,
    language === "zh" ? path.name.en.toUpperCase() : path.name.zh,
    1710,
    25,
  );
  fittedText(
    ctx,
    `${language === "zh" ? "序列 9" : "SEQUENCE 9"}  ·  ${path.entry[language]}`,
    1760,
    32,
  );
  ctx.strokeStyle = paper ? "#6c583c80" : "#c3bb9c70";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(300, 1795);
  ctx.lineTo(555, 1795);
  ctx.moveTo(645, 1795);
  ctx.lineTo(900, 1795);
  ctx.moveTo(600, 1784);
  ctx.lineTo(612, 1795);
  ctx.lineTo(600, 1806);
  ctx.lineTo(588, 1795);
  ctx.closePath();
  ctx.stroke();
  ctx.fillStyle = paper ? "#30271f" : "#e4dfd3";
  const name = nickname.trim() || (language === "zh" ? "寻途者" : "Seeker");
  fittedText(ctx, name, 1847, 40, 860);
  ctx.fillStyle = paper ? "#5b4e3d" : "#bdb8b1";
  ctx.font = `25px ${SERIF}`;
  captionLines(ctx, commentary, 850).forEach((line, index) =>
    ctx.fillText(line, CARD_WIDTH / 2, 1893 + index * 31),
  );
  const kind =
    language === "zh"
      ? assessed
        ? "测评倾向"
        : "自选身份"
      : assessed
        ? "ASSESSMENT AFFINITY"
        : "CHOSEN IDENTITY";
  fittedText(
    ctx,
    `${kind}  ·  ${language === "zh" ? "非官方同人作品" : "UNOFFICIAL FAN WORK"}  /  LOTM.SPACE`,
    1950,
    22,
    900,
  );
  return canvas;
}

export async function exportIdentityCard(
  path: CanonPathway,
  nickname: string,
  commentary: string,
  language: Language,
  assessed = false,
) {
  const canvas = await createIdentityCardCanvas(
    path,
    nickname,
    commentary,
    language,
    assessed,
  );
  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Export failed"))),
      "image/png",
    ),
  );
}
