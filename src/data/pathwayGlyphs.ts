/** Original site artwork, not canonical emblems. Shared by the UI and PNG cards.
 * The motifs interpret each pathway's editorial theme without adding lore. */
export type PathwayGlyph = { lines: string[]; accents: string[] };
export const glyphFrame = [
  "M40 8a32 32 0 1 1 0 64a32 32 0 1 1 0-64",
  "M40 3v8M40 69v8M3 40h8M69 40h8",
];
export const pathwayGlyphs: Record<string, PathwayGlyph> = {
  fool: {
    lines: [
      "M16 39Q40 17 64 39Q40 61 16 39Z",
      "M40 31a8 8 0 1 1 0 16a8 8 0 1 1 0-16M40 36v6",
      "M24 17v14M40 13v14M56 17v14M26 48v13M54 48v13",
    ],
    accents: ["M23 64l3-3 3 3-3 3ZM51 64l3-3 3 3-3 3Z"],
  },
  error: {
    lines: [
      "M59 22a26 26 0 1 0 6 26M62 26l-3-4 5-2",
      "M40 20v20l13 8M40 40l-8 9",
      "M51 55h8v-8h8v13H54v7",
    ],
    accents: ["M20 40h4M27 23l3 3M40 60v4M40 14v4"],
  },
  door: {
    lines: [
      "M22 64V31a18 18 0 0 1 36 0v33ZM29 63V32a11 11 0 0 1 22 0v31",
      "M29 33l17-8v36l-17 2M41 43v6",
    ],
    accents: ["M17 65h46M60 27l3-3 3 3-3 3ZM12 42h5M64 45h4"],
  },
  visionary: {
    lines: [
      "M12 40Q40 12 68 40Q40 68 12 40Z",
      "M40 28a12 12 0 1 1 0 24a12 12 0 1 1 0-24M40 35a5 5 0 1 1 0 10a5 5 0 1 1 0-10",
    ],
    accents: ["M23 17l-4 7M40 12v8M57 17l4 7M23 63l-4-7M40 68v-8M57 63l4-7"],
  },
  sun: {
    lines: [
      "M40 24a16 16 0 1 1 0 32a16 16 0 1 1 0-32",
      "M40 30l9 16H31ZM40 12v7M40 61v7M12 40h7M61 40h7",
      "M20 20l5 5M55 55l5 5M20 60l5-5M55 25l5-5",
    ],
    accents: [
      "M29 14l3 7M48 59l3 7M14 51l7-3M59 32l7-3M51 14l-3 7M32 59l-3 7M14 29l7 3M59 48l7 3",
    ],
  },
  tyrant: {
    lines: [
      "M45 12L27 39h13l-6 24 20-32H42Z",
      "M14 52q7-7 14 0M50 52q7-7 14 0M17 62q8-6 15 0q8 6 15 0q8-6 16 0",
    ],
    accents: ["M14 31q4-9 11-10M56 21q7 1 10 10M21 38h-7M59 38h7"],
  },
  "white-tower": {
    lines: [
      "M27 61V25h26v36M25 25v-9h7v5h5v-5h6v5h5v-5h7v9M23 62h34",
      "M35 61V49a5 5 0 0 1 10 0v12M35 32h10M35 39h10",
    ],
    accents: ["M17 53l-6-3V33l10 5M59 38l10-5v17l-6 3M17 63l-6-4M63 63l6-4"],
  },
  "hanged-man": {
    lines: [
      "M20 18h40M40 18v12l-11 9M40 30l9 9v13M49 52L34 42M40 40v16",
      "M40 56a7 7 0 1 1 0 14a7 7 0 1 1 0-14",
    ],
    accents: ["M18 15v8M62 15v8M29 39l-5 4M49 52l5 2M28 61h-8M60 61h-8"],
  },
  darkness: {
    lines: [
      "M49 17a25 25 0 1 0 15 34A23 23 0 0 1 49 17Z",
      "M47 39l3-6 3 6 6 3-6 3-3 6-3-6-6-3Z",
    ],
    accents: ["M58 16v8M54 20h8M64 32v5M61 35h6M28 63l-4 3"],
  },
  death: {
    lines: [
      "M22 64V37a18 18 0 0 1 36 0v27M19 64h42M40 23v40",
      "M40 23q17-11 27 6q-15-6-27 3M29 46h22M33 53h14",
    ],
    accents: ["M29 33v7M51 33v7M15 51l-3 5M65 51l3 5"],
  },
  "twilight-giant": {
    lines: [
      "M40 12l6 12-2 29h-8l-2-29ZM28 51h24M40 54v11M34 66h12",
      "M14 42a26 26 0 0 1 52 0M12 43h19M49 43h19",
    ],
    accents: ["M21 29l6 4M59 29l-6 4M27 17l3 6M53 17l-3 6"],
  },
  demoness: {
    lines: [
      "M40 14C33 26 21 36 21 47a19 19 0 0 0 38 0C59 36 47 26 40 14Z",
      "M40 23v41M27 35q13 10 26 0M22 47q18 12 36 0M27 58q13-25 26 0",
    ],
    accents: ["M14 28l5 5M61 33l5-5M12 49h5M63 49h5M40 68v4"],
  },
  "red-priest": {
    lines: [
      "M40 12C45 26 57 29 57 44a17 17 0 0 1-34 0c0-10 8-16 11-22q-2 13 5 17q8-10 1-27Z",
      "M40 40c5 7 10 11 8 17a9 9 0 0 1-16-1c-1-6 5-11 8-16ZM24 66h32",
    ],
    accents: ["M17 34l-4-5M63 34l4-5M18 52l-5 3M62 52l5 3"],
  },
  hermit: {
    lines: [
      "M40 29q-12-9-26-6v31q15-3 26 6q11-9 26-6V23q-14-3-26 6v31",
      "M21 32l12 3M21 39l12 3M21 46l12 3M47 35l12-3M47 42l12-3M47 49l12-3",
    ],
    accents: ["M40 10l3 6-3 6-3-6ZM28 15h-5M52 15h5M32 65h16"],
  },
  paragon: {
    lines: [
      "M34 14h12l2 9 8-4 8 8-4 8 8 2v12l-9 2 4 8-8 8-8-4-2 8H33l-2-9-8 4-8-8 4-8-8-2V37l9-2-4-8 8-8 8 4Z",
      "M40 29a14 14 0 1 1 0 28a14 14 0 1 1 0-28M40 33v10l8 5",
    ],
    accents: ["M40 39a4 4 0 1 1 0 8a4 4 0 1 1 0-8"],
  },
  "wheel-of-fortune": {
    lines: [
      "M40 16a24 24 0 1 1 0 48a24 24 0 1 1 0-48M40 29l11 11-11 11-11-11Z",
      "M40 16v13M40 51v13M16 40h13M51 40h13M23 23l10 10M47 47l10 10M23 57l10-10M47 33l10-10",
    ],
    accents: ["M21 12l-4 9 10-2M59 68l4-9-10 2"],
  },
  mother: {
    lines: [
      "M40 66V29M40 44C20 45 16 33 18 23c15 0 25 7 22 21ZM40 34C38 18 47 13 60 14c1 13-6 21-20 20Z",
      "M40 51c8-12 18-12 23-8c-3 12-13 17-23 13M40 65l-11 4M40 65l11 4",
    ],
    accents: ["M24 29l11 10M54 20L44 30M45 53l11-7M19 61h6M58 61h5"],
  },
  moon: {
    lines: [
      "M40 18a22 22 0 1 1 0 44a22 22 0 1 1 0-44M44 19C28 29 28 51 44 61",
      "M12 40h7M61 40h7M40 12v6M40 62v6",
    ],
    accents: [
      "M24 18l-4-4M60 66l-4-4M60 14l-4 4M24 62l-4 4M51 29l3 5-3 5-3-5Z",
    ],
  },
  abyss: {
    lines: [
      "M17 19l7 43 16 8 16-8 7-43-11 10-12-17-12 17ZM27 39l13 13 13-13M31 54l9 9 9-9",
      "M28 28l-5-14M52 28l5-14",
    ],
    accents: ["M12 44h7M61 44h7M32 37l3 2M48 37l-3 2"],
  },
  chained: {
    lines: [
      "M26 22l-8 8a12 12 0 0 0 17 17l9-9a12 12 0 0 0-17-17ZM45 35l-9 9a12 12 0 0 0 17 17l9-9a12 12 0 0 0-17-17Z",
      "M30 50l20-20M12 17l7 7M61 56l7 7",
    ],
    accents: ["M16 13l6 6M58 61l6 6M37 13v6M43 61v6"],
  },
  "black-emperor": {
    lines: [
      "M19 29l8 25h26l8-25-14 9-7-17-7 17ZM27 60h26M30 54v6M50 54v6",
      "M15 21v-6h14M65 21v-6H51M15 59v6h14M65 59v6H51",
    ],
    accents: ["M40 12v5M12 42h5M63 42h5M36 46h8"],
  },
  justiciar: {
    lines: [
      "M40 13v50M34 66h12M18 30h44M40 20l-5 7h10ZM23 30l-10 19h20ZM57 30L47 49h20Z",
      "M13 49q10 14 20 0M47 49q10 14 20 0",
    ],
    accents: ["M20 23h7M53 23h7M30 62h20"],
  },
};

export function pathwayGlyph(id: string): PathwayGlyph {
  return pathwayGlyphs[id] ?? pathwayGlyphs.fool;
}
