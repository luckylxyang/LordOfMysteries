/**
 * Original 22-pathway catalogue. Names are sequence-specific: entry is Sequence 9,
 * while name is Sequence 0. This is an editorial index, not an official database.
 * Evidence is tracked separately for names, abilities, advancement and acting.
 * A chapter-backed name cannot certify other fields. Missing details remain
 * explicitly unresolved; reference summaries are not original-chapter checks.
 * See docs/CANON_AUDIT.md for scope, naming decisions and source limitations.
 */
import { checkedNovelChapters } from "./chapterEvidence";
import { settingEvidence } from "./settingEvidence";
export type Localized = { zh: string; en: string };
export type FieldEvidence = {
  status: "chapter" | "reference" | "pending";
  sourceIds: string[];
  locator?: Localized;
};

export type CanonPathway = {
  id: string;
  slug: string;
  name: Localized;
  entry: Localized;
  group: string;
  color: string;
  domain: Localized;
  summary: Localized;
  sequences: Array<{
    level: number;
    name: Localized;
    ability: Localized;
    advancement: Localized;
    acting: Localized;
    evidence: Record<
      "name" | "ability" | "advancement" | "acting",
      FieldEvidence
    >;
    sourceIds: string[];
  }>;
  sourceIds: string[];
};

const l = (zh: string, en: string): Localized => ({ zh, en });

export const groups: Array<{
  id: string;
  name: Localized;
  theme: Localized;
  color: string;
}> = [
  {
    id: "lord-of-mysteries",
    name: l("诡秘之主", "Lord of Mysteries"),
    theme: l("源堡", "Sefirah Castle"),
    color: "#a78bfa",
  },
  {
    id: "god-almighty",
    name: l("上帝", "God Almighty"),
    theme: l("混沌海", "Chaos Sea"),
    color: "#d4af6a",
  },
  {
    id: "eternal-darkness",
    name: l("永恒之暗", "Eternal Darkness"),
    theme: l("永暗之河", "River of Eternal Darkness"),
    color: "#818cf8",
  },
  {
    id: "calamity-of-destruction",
    name: l("毁灭天灾", "Calamity of Destruction"),
    theme: l("灾祸之城", "City of Calamity"),
    color: "#ef6a76",
  },
  {
    id: "demon-of-knowledge",
    name: l("知识之妖", "Demon of Knowledge"),
    theme: l("知识荒野", "Knowledge Moor"),
    color: "#c084fc",
  },
  {
    id: "key-of-light",
    name: l("光之钥", "Key of Light"),
    theme: l("光之钥", "Key of Light"),
    color: "#e4c86c",
  },
  {
    id: "goddess-of-origin",
    name: l("根源之神", "Goddess of Origin"),
    theme: l("母巢", "Brood Hive"),
    color: "#6ec9a1",
  },
  {
    id: "father-of-devils",
    name: l("恶魔之父", "Father of Devils"),
    theme: l("暗影世界", "Tenebrous World"),
    color: "#bd6373",
  },
  {
    id: "the-anarchy",
    name: l("失序者", "The Anarchy"),
    theme: l("失序之国", "Nation of Disorder"),
    color: "#b8a17a",
  },
];

type SequenceSeed = [
  zh: string,
  en: string,
  abilityZh?: string,
  abilityEn?: string,
];
type PathwaySeed = {
  id: string;
  wiki: string;
  group: string;
  color: string;
  domain: Localized;
  summary: Localized;
  rows: SequenceSeed[];
};

// Rows run from Sequence 9 to Sequence 0. Omitted abilities are intentional.
const seeds: PathwaySeed[] = [
  {
    id: "fool",
    wiki: "Fool",
    group: "lord-of-mysteries",
    color: "#b29bea",
    domain: l("占卜、秘偶与愚弄", "Divination, marionettes and fooling"),
    summary: l(
      "从占卜家出发，逐步接触秘偶、历史与奇迹。",
      "Begins with divination and develops through marionettes, history and miracles.",
    ),
    rows: [
      [
        "占卜家",
        "Seer",
        "占卜、灵视与灵性直觉。",
        "Divination, spirit sight and spiritual intuition.",
      ],
      [
        "小丑",
        "Clown",
        "精确控制身体动作与表情。",
        "Precise control of bodily movement and expression.",
      ],
      [
        "魔术师",
        "Magician",
        "使用纸人替身、火焰跳跃等法术。",
        "Spells including paper substitutes and flame jumping.",
      ],
      [
        "无面人",
        "Faceless",
        "改变外貌，扮演不同身份。",
        "Changes appearance to assume different identities.",
      ],
      [
        "秘偶大师",
        "Marionettist",
        "操纵灵体之线，制作秘偶。",
        "Controls spirit body threads to create marionettes.",
      ],
      [
        "诡法师",
        "Bizarro Sorcerer",
        "分离灵之虫，将自身能力赋予秘偶。",
        "Separates worms of spirit to grant abilities to marionettes.",
      ],
      [
        "古代学者",
        "Scholar of Yore",
        "借取历史力量与召唤历史投影。",
        "Borrows historical strength and summons historical projections.",
      ],
      [
        "奇迹师",
        "Miracle Invoker",
        "通过积累愿望实现奇迹。",
        "Fulfills wishes through accumulated wish power.",
      ],
      [
        "诡秘侍者",
        "Attendant of Mysteries",
        "嫁接事物关联，展开诡秘之境。",
        "Grafts connections and establishes a realm of mysteries.",
      ],
      [
        "愚者",
        "Fool",
        "具有愚弄相关权柄。",
        "Holds authority associated with fooling.",
      ],
    ],
  },
  {
    id: "error",
    wiki: "Error",
    group: "lord-of-mysteries",
    color: "#d8ad7a",
    domain: l("窃取、欺瞒与漏洞", "Theft, deceit and loopholes"),
    summary: l(
      "窃取的对象由实物逐步扩展至能力、身份与时间。",
      "Theft develops from physical objects to powers, identities and time.",
    ),
    rows: [
      [
        "偷盗者",
        "Marauder",
        "窃取物品，提升敏捷与观察力。",
        "Steals objects with enhanced dexterity and observation.",
      ],
      [
        "诈骗师",
        "Swindler",
        "欺骗、误导与操纵判断。",
        "Deceives and misdirects judgment.",
      ],
      [
        "解密学者",
        "Cryptologist",
        "分析线索，解读隐秘信息。",
        "Analyzes clues and deciphers hidden information.",
      ],
      [
        "盗火人",
        "Prometheus",
        "窃取他人的非凡能力。",
        "Steals other Beyonders’ powers.",
      ],
      [
        "窃梦家",
        "Dream Stealer",
        "窃取念头等精神活动。",
        "Steals thoughts and other mental activity.",
      ],
      ["寄生者", "Parasite", "寄生于宿主。", "Parasitizes a host."],
      [
        "欺瞒导师",
        "Mentor of Deceit",
        "欺瞒与误导能力进一步增强。",
        "Strengthens deception and misdirection.",
      ],
      [
        "命运木马",
        "Trojan Horse of Destiny",
        "窃取与命运、身份有关的事物。",
        "Steals aspects of fate and identity.",
      ],
      ["时之虫", "Worm of Time", "窃取时间。", "Steals time."],
      [
        "错误",
        "Error",
        "利用规则漏洞制造错误。",
        "Exploits loopholes to create errors.",
      ],
    ],
  },
  {
    id: "door",
    wiki: "Door",
    group: "lord-of-mysteries",
    color: "#77b6d8",
    domain: l("记录、漫游与空间", "Recording, travel and space"),
    summary: l(
      "由穿越障碍与记录能力，走向远行和空间领域。",
      "Moves from crossing barriers and recording powers toward travel and space.",
    ),
    rows: [
      [
        "学徒",
        "Apprentice",
        "通过开门穿过部分障碍。",
        "Opens passages through certain barriers.",
      ],
      [
        "戏法大师",
        "Trickmaster",
        "施展多种小型戏法。",
        "Uses a variety of minor magical tricks.",
      ],
      [
        "占星人",
        "Astrologer",
        "通过星象进行占卜。",
        "Uses astrology for divination.",
      ],
      [
        "记录官",
        "Scribe",
        "记录见到的非凡能力以供使用。",
        "Records witnessed Beyonder powers for later use.",
      ],
      [
        "旅行家",
        "Traveler",
        "借助灵界进行传送。",
        "Teleports through the spirit world.",
      ],
      [
        "秘法师",
        "Secrets Sorcerer",
        "使用隐秘空间与封印。",
        "Uses concealed spaces and sealing.",
      ],
      [
        "漫游者",
        "Wanderer",
        "在星界中漫游。",
        "Wanders through the astral world.",
      ],
      [
        "旅法师",
        "Planeswalker",
        "依靠理解复现事物与能力。",
        "Replicates things and powers through understanding.",
      ],
      ["星之匙", "Key of Stars"],
      [
        "门",
        "Door",
        "掌握与门和空间有关的权柄。",
        "Holds authority associated with doors and space.",
      ],
    ],
  },
  {
    id: "visionary",
    wiki: "Visionary",
    group: "god-almighty",
    color: "#d0a7d8",
    domain: l("心灵、梦境与空想", "Mind, dreams and envisioning"),
    summary: l(
      "从观察人心发展至梦境、集体潜意识与空想。",
      "Develops from observing people into dreams, the collective subconscious and envisioning.",
    ),
    rows: [
      [
        "观众",
        "Spectator",
        "观察表情与动作，分析心理。",
        "Reads expression and movement to understand psychology.",
      ],
      [
        "读心者",
        "Telepathist",
        "感知与解读表层思绪。",
        "Perceives and interprets surface thoughts.",
      ],
      [
        "心理医生",
        "Psychiatrist",
        "安抚精神，治疗心理创伤。",
        "Calms the mind and treats psychological trauma.",
      ],
      [
        "催眠师",
        "Hypnotist",
        "催眠与心理学隐身。",
        "Hypnosis and psychological invisibility.",
      ],
      [
        "梦境行者",
        "Dreamwalker",
        "进入并影响梦境。",
        "Enters and influences dreams.",
      ],
      [
        "操纵师",
        "Manipulator",
        "影响心灵与集体潜意识。",
        "Influences minds and the collective subconscious.",
      ],
      [
        "织梦人",
        "Dream Weaver",
        "编织具有真实感的梦境。",
        "Weaves vivid, convincing dreams.",
      ],
      [
        "洞察者",
        "Discerner",
        "洞察心灵与事物间的联系。",
        "Discerns minds and connections.",
      ],
      [
        "作家",
        "Author",
        "安排事态发展，使事件趋向预定结果。",
        "Arranges events toward an intended outcome.",
      ],
      [
        "空想家",
        "Visionary",
        "使空想之物显现于现实。",
        "Brings envisioned things into reality.",
      ],
    ],
  },
  {
    id: "sun",
    wiki: "Sun",
    group: "god-almighty",
    color: "#e9c46a",
    domain: l("光明、净化与公证", "Light, purification and notarization"),
    summary: l(
      "以光明与净化为主，并涉及祝福、公证和契约。",
      "Centers on light and purification, with blessings, notarization and contracts.",
    ),
    rows: [
      [
        "歌颂者",
        "Bard",
        "以歌声增强自身与同伴。",
        "Uses song to strengthen oneself and allies.",
      ],
      [
        "祈光人",
        "Light Suppliant",
        "使用与光明、祝福有关的法术。",
        "Uses light and blessing spells.",
      ],
      [
        "太阳神官",
        "Solar High Priest",
        "使用圣光净化邪恶与亡灵。",
        "Uses sacred light against evil and the undead.",
      ],
      [
        "公证人",
        "Notary",
        "公证行为、能力与契约。",
        "Notarizes actions, abilities and contracts.",
      ],
      [
        "光之祭司",
        "Priest of Light",
        "施展更强的光明与净化能力。",
        "Uses stronger light and purification powers.",
      ],
      [
        "无暗者",
        "Unshadowed",
        "驱散区域内的黑暗与阴影。",
        "Dispels darkness and shadows within an area.",
      ],
      ["正义导师", "Justice Mentor"],
      ["逐光者", "Lightseeker"],
      ["纯白天使", "White Angel"],
      [
        "太阳",
        "Sun",
        "掌握太阳、光明与净化相关权柄。",
        "Holds authority associated with the sun, light and purification.",
      ],
    ],
  },
  {
    id: "tyrant",
    wiki: "Tyrant",
    group: "god-almighty",
    color: "#5ba7d6",
    domain: l("海洋、风暴与雷霆", "Ocean, storms and lightning"),
    summary: l(
      "从水手的海洋适应力，发展至风暴和雷霆的力量。",
      "Develops from a sailor’s affinity with water into storms and lightning.",
    ),
    rows: [
      [
        "水手",
        "Sailor",
        "增强水中行动、平衡与身体素质。",
        "Improves movement in water, balance and physique.",
      ],
      [
        "暴怒之民",
        "Folk of Rage",
        "借助愤怒提升战斗力量。",
        "Channels rage into greater combat strength.",
      ],
      [
        "航海家",
        "Seafarer",
        "掌握航海与海洋相关知识。",
        "Gains navigation and ocean knowledge.",
      ],
      [
        "风眷者",
        "Wind-blessed",
        "驾驭风并借风移动。",
        "Controls wind and uses it for movement.",
      ],
      [
        "海洋歌者",
        "Ocean Songster",
        "歌声结合海洋与雷电力量。",
        "Combines song with oceanic and lightning powers.",
      ],
      [
        "灾难主祭",
        "Cataclysmic Interrer",
        "引发风暴等灾难。",
        "Brings storms and related disasters.",
      ],
      [
        "海王",
        "Sea King",
        "控制海域并施展强大雷电。",
        "Commands the sea and powerful lightning.",
      ],
      [
        "天灾",
        "Calamity",
        "引发大范围自然灾难。",
        "Causes large-scale natural disasters.",
      ],
      [
        "雷神",
        "Thunder God",
        "掌握雷霆相关力量。",
        "Commands powers associated with thunder.",
      ],
      [
        "暴君",
        "Tyrant",
        "掌握风暴与雷霆等权柄。",
        "Holds authority over storms and lightning.",
      ],
    ],
  },
  {
    id: "white-tower",
    wiki: "White_Tower",
    group: "god-almighty",
    color: "#c7d7df",
    domain: l("知识、分析与预言", "Knowledge, analysis and prophecy"),
    summary: l(
      "阅读、推理与分析贯穿途径，逐步接近知识的权柄。",
      "Reading, reasoning and analysis lead toward authority over knowledge.",
    ),
    rows: [
      [
        "阅读者",
        "Reader",
        "增强学习、记忆与理解。",
        "Improves learning, memory and comprehension.",
      ],
      [
        "推理学员",
        "Student of Ratiocination",
        "增强逻辑推理。",
        "Strengthens logical reasoning.",
      ],
      [
        "侦探",
        "Detective",
        "根据线索重建事件经过。",
        "Reconstructs events from clues.",
      ],
      [
        "博学者",
        "Polymath",
        "分析并模仿部分非凡能力。",
        "Analyzes and imitates certain Beyonder powers.",
      ],
      [
        "秘术导师",
        "Mysticism Magister",
        "创造与运用神秘学法术。",
        "Develops and uses mystical spells.",
      ],
      [
        "预言家",
        "Prophet",
        "通过预言窥见未来。",
        "Glimpses the future through prophecy.",
      ],
      ["洞悉者", "Cognizer"],
      ["智天使", "Wisdom Angel"],
      ["全知之眼", "Omniscient Eye"],
      [
        "白塔",
        "White Tower",
        "掌握知识相关权柄。",
        "Holds authority associated with knowledge.",
      ],
    ],
  },
  {
    id: "hanged-man",
    wiki: "Hanged_Man",
    group: "god-almighty",
    color: "#b57690",
    domain: l("阴影、血肉与放牧", "Shadows, flesh and grazing"),
    summary: l(
      "涉及隐秘祈求、阴影与血肉，以及对灵魂的放牧。",
      "Involves secret supplication, shadows, flesh and the grazing of souls.",
    ),
    rows: [
      [
        "秘祈人",
        "Secrets Suppliant",
        "对隐秘存在与仪式产生灵性认识。",
        "Gains spiritual awareness of hidden beings and rituals.",
      ],
      [
        "倾听者",
        "Listener",
        "倾听隐秘存在的声音。",
        "Hears voices from hidden existences.",
      ],
      [
        "隐修士",
        "Shadow Ascetic",
        "使用阴影相关法术。",
        "Uses shadow-related magic.",
      ],
      [
        "蔷薇主教",
        "Rose Bishop",
        "运用与改造血肉。",
        "Uses and reshapes flesh.",
      ],
      [
        "牧羊人",
        "Shepherd",
        "放牧灵魂，运用其能力。",
        "Grazes souls and uses their abilities.",
      ],
      ["黑骑士", "Black Knight"],
      ["三首圣堂", "Trinity Templar"],
      ["秽语长老", "Profane Presbyter"],
      ["暗天使", "Dark Angel"],
      [
        "倒吊人",
        "Hanged Man",
        "涉及堕落、牺牲与承担罪孽。",
        "Associated with degeneration, sacrifice and bearing sins.",
      ],
    ],
  },
  {
    id: "darkness",
    wiki: "Darkness",
    group: "eternal-darkness",
    color: "#8f8ecf",
    domain: l("黑夜、梦境与隐秘", "Night, dreams and concealment"),
    summary: l(
      "从黑夜中的行动优势，走向梦境、安魂与隐秘。",
      "Begins with an advantage at night and develops into dreams, repose and concealment.",
    ),
    rows: [
      [
        "不眠者",
        "Sleepless",
        "减少睡眠需求，在黑夜中获得增强。",
        "Needs less sleep and becomes stronger at night.",
      ],
      [
        "午夜诗人",
        "Midnight Poet",
        "以诗歌影响精神状态。",
        "Uses poetry to influence mental states.",
      ],
      [
        "梦魇",
        "Nightmare",
        "进入与影响他人梦境。",
        "Enters and influences others’ dreams.",
      ],
      [
        "安魂师",
        "Soul Assurer",
        "安抚灵魂与精神。",
        "Soothes souls and minds.",
      ],
      [
        "灵巫",
        "Spirit Warlock",
        "容纳或驱使灵体。",
        "Hosts or commands spirits.",
      ],
      ["守夜人", "Nightwatcher"],
      ["恐惧主教", "Horror Bishop"],
      [
        "隐秘之仆",
        "Servant of Concealment",
        "隐秘相关能力。",
        "Powers associated with concealment.",
      ],
      ["厄难骑士", "Knight of Misfortune"],
      [
        "黑暗",
        "Darkness",
        "掌握黑暗、隐秘等权柄。",
        "Holds authority associated with darkness and concealment.",
      ],
    ],
  },
  {
    id: "death",
    wiki: "Death",
    group: "eternal-darkness",
    color: "#a4bba8",
    domain: l("亡灵、灵界与死亡", "Undead, the spirit world and death"),
    summary: l(
      "从认识尸体与亡灵，发展至通灵和死亡领域。",
      "Develops from understanding corpses and the undead into spirit communication and death.",
    ),
    rows: [
      [
        "收尸人",
        "Corpse Collector",
        "感知亡灵，对尸体相关侵害具有抗性。",
        "Senses the undead and resists corpse-related hazards.",
      ],
      ["掘墓人", "Gravedigger"],
      ["通灵者", "Spirit Medium", "与灵体沟通。", "Communicates with spirits."],
      [
        "死灵导师",
        "Spirit Guide",
        "驱使与操纵亡灵。",
        "Commands and manipulates the undead.",
      ],
      [
        "看门人",
        "Gatekeeper",
        "打开通向冥界的门。",
        "Opens a gate to the underworld.",
      ],
      [
        "不死者",
        "Undying",
        "具有死而复生的特性。",
        "Possesses a form of revival after death.",
      ],
      ["摆渡人", "Ferryman"],
      ["死亡执政官", "Death Consul"],
      ["苍白皇帝", "Pale Emperor"],
      [
        "死神",
        "Death",
        "掌握死亡相关权柄。",
        "Holds authority associated with death.",
      ],
    ],
  },
  {
    id: "twilight-giant",
    wiki: "Twilight_Giant",
    group: "eternal-darkness",
    color: "#d6a66f",
    domain: l("战斗、守护与黄昏", "Combat, protection and twilight"),
    summary: l(
      "以身体、武器和正面战斗起步，延伸至守护与黄昏。",
      "Begins with physique, weapons and direct combat, extending into protection and twilight.",
    ),
    rows: [
      [
        "战士",
        "Warrior",
        "增强身体与战斗能力。",
        "Enhances physique and combat ability.",
      ],
      ["格斗家", "Pugilist", "精于徒手格斗。", "Excels at unarmed combat."],
      [
        "武器大师",
        "Weapon Master",
        "熟练使用多种武器。",
        "Masters a wide range of weapons.",
      ],
      [
        "黎明骑士",
        "Dawn Paladin",
        "凝聚黎明铠甲与武器。",
        "Forms dawn armor and weapons.",
      ],
      [
        "守护者",
        "Guardian",
        "强化防御与守护能力。",
        "Strengthens defense and protection.",
      ],
      [
        "猎魔者",
        "Demon Hunter",
        "针对邪恶生物的战斗能力。",
        "Combat powers suited to hunting evil beings.",
      ],
      ["银骑士", "Silver Knight"],
      ["荣耀者", "Glory"],
      ["神明之手", "Hand of God"],
      [
        "黄昏巨人",
        "Twilight Giant",
        "涉及黄昏、衰败与战斗。",
        "Associated with twilight, decay and combat.",
      ],
    ],
  },
  {
    id: "demoness",
    wiki: "Demoness",
    group: "calamity-of-destruction",
    color: "#d48baa",
    domain: l("暗杀、诅咒与灾祸", "Assassination, curses and catastrophe"),
    summary: l(
      "由暗杀与教唆发展至诅咒、疾病与灾难。",
      "Develops from assassination and instigation into curses, disease and catastrophe.",
    ),
    rows: [
      [
        "刺客",
        "Assassin",
        "隐匿、突袭与暗杀。",
        "Stealth, ambush and assassination.",
      ],
      [
        "教唆者",
        "Instigator",
        "诱导并激发他人的恶意。",
        "Incites and amplifies harmful impulses.",
      ],
      [
        "女巫",
        "Witch",
        "使用诅咒、黑焰与冰霜。",
        "Uses curses, black flames and frost.",
      ],
      [
        "欢愉",
        "Pleasure",
        "魅惑与操纵无形丝线。",
        "Uses charm and invisible threads.",
      ],
      ["痛苦", "Affliction", "散播疾病。", "Spreads disease."],
      [
        "绝望",
        "Despair",
        "强化疾病与瘟疫能力。",
        "Strengthens disease and plague powers.",
      ],
      ["不老", "Unaging", "青春不老。", "Retains youth without aging."],
      ["灾难", "Catastrophe"],
      ["末日", "Apocalypse"],
      [
        "魔女",
        "Demoness",
        "掌握灾祸相关权柄。",
        "Holds authority associated with catastrophe.",
      ],
    ],
  },
  {
    id: "red-priest",
    wiki: "Red_Priest",
    group: "calamity-of-destruction",
    color: "#df796a",
    domain: l("狩猎、火焰与战争", "Hunting, fire and war"),
    summary: l(
      "从追踪与陷阱发展至火焰、团队协同与战争。",
      "Develops from tracking and traps into fire, team coordination and war.",
    ),
    rows: [
      [
        "猎人",
        "Hunter",
        "追踪、设置陷阱并强化身体。",
        "Tracks, lays traps and gains physical strength.",
      ],
      [
        "挑衅者",
        "Provoker",
        "激怒与挑衅目标。",
        "Provokes and enrages targets.",
      ],
      [
        "纵火家",
        "Pyromaniac",
        "制造和控制火焰。",
        "Creates and controls fire.",
      ],
      [
        "阴谋家",
        "Conspirer",
        "分析局势与制定阴谋。",
        "Analyzes situations and devises plots.",
      ],
      [
        "收割者",
        "Reaper",
        "识别弱点并施以强力攻击。",
        "Identifies weaknesses and delivers powerful attacks.",
      ],
      [
        "铁血骑士",
        "Iron-blooded Knight",
        "建立团队联系，共享部分力量。",
        "Links a team and shares aspects of its strength.",
      ],
      ["战争主教", "War Bishop"],
      ["天气术士", "Weather Warlock", "操纵天气。", "Manipulates weather."],
      ["征服者", "Conqueror"],
      [
        "红祭司",
        "Red Priest",
        "掌握战争相关权柄。",
        "Holds authority associated with war.",
      ],
    ],
  },
  {
    id: "hermit",
    wiki: "Hermit",
    group: "demon-of-knowledge",
    color: "#ba91d6",
    domain: l(
      "窥秘、法术与神秘知识",
      "Mystery prying, spells and occult knowledge",
    ),
    summary: l(
      "探索神秘知识，以法术、卷轴和神秘学再现运用力量。",
      "Explores occult knowledge through spells, scrolls and mystical re-enactment.",
    ),
    rows: [
      [
        "窥秘人",
        "Mystery Pryer",
        "窥探神秘事物，获得神秘学知识。",
        "Pries into mysteries and gains occult knowledge.",
      ],
      [
        "格斗学者",
        "Melee Scholar",
        "获得格斗知识与相应身体增强。",
        "Gains combat knowledge and physical enhancement.",
      ],
      ["巫师", "Warlock", "施展神秘学法术。", "Casts mystical spells."],
      [
        "卷轴教授",
        "Scrolls Professor",
        "制作和使用法术卷轴。",
        "Creates and uses spell scrolls.",
      ],
      [
        "星象师",
        "Constellations Master",
        "运用星象相关法术。",
        "Uses constellation-related magic.",
      ],
      [
        "神秘学家",
        "Mysticologist",
        "通过神秘学再现借取传说的力量。",
        "Draws on legends through mystical re-enactment.",
      ],
      [
        "预言大师",
        "Clairvoyant",
        "窥探命运并作出预言。",
        "Pries into fate and makes prophecies.",
      ],
      [
        "贤者",
        "Sage",
        "能够化作信息形态。",
        "Can assume a form of information.",
      ],
      [
        "知识皇帝",
        "Knowledge Emperor",
        "赋予知识实际力量。",
        "Imbues knowledge with tangible power.",
      ],
      [
        "隐者",
        "Hermit",
        "掌握神秘知识相关权柄。",
        "Holds authority associated with mystical knowledge.",
      ],
    ],
  },
  {
    id: "paragon",
    wiki: "Paragon",
    group: "demon-of-knowledge",
    color: "#99bdc2",
    domain: l("鉴定、制造与炼金", "Appraisal, crafting and alchemy"),
    summary: l(
      "从记忆与知识积累出发，走向制造、机械和炼金。",
      "Develops from memory and knowledge into crafting, machinery and alchemy.",
    ),
    rows: [
      [
        "通识者",
        "Savant",
        "增强记忆，掌握机械等领域的知识。",
        "Enhances memory and gains knowledge including mechanics.",
      ],
      [
        "考古学家",
        "Archaeologist",
        "掌握历史、遗迹与野外生存知识。",
        "Gains knowledge of history, ruins and outdoor survival.",
      ],
      [
        "鉴定师",
        "Appraiser",
        "识别非凡物品的能力与隐患。",
        "Identifies powers and problems of Beyonder items.",
      ],
      [
        "机械专家",
        "Machinery Specialist",
        "制造机械与非凡物品；亦称工匠。",
        "Crafts machinery and Beyonder items; also called Artisan.",
      ],
      ["天文学家", "Astronomer"],
      ["炼金术士", "Alchemist"],
      ["奥秘学者", "Arcane Scholar"],
      ["知识导师", "Knowledge Magister"],
      ["启蒙者", "Illuminator"],
      [
        "完美者",
        "Paragon",
        "涉及现实知识与技术。",
        "Associated with practical knowledge and technology.",
      ],
    ],
  },
  {
    id: "wheel-of-fortune",
    wiki: "Wheel_of_Fortune",
    group: "key-of-light",
    color: "#d7c47d",
    domain: l("灵感、运气与命运", "Intuition, luck and fate"),
    summary: l(
      "以敏锐灵感起步，逐步影响幸运、厄运与命运。",
      "Begins with acute intuition and develops influence over luck, misfortune and fate.",
    ),
    rows: [
      [
        "怪物",
        "Monster",
        "异常敏锐的灵性与预感。",
        "Unusually acute spirituality and premonitions.",
      ],
      [
        "机器",
        "Robot",
        "精确计算与身体控制。",
        "Precise calculation and bodily control.",
      ],
      [
        "幸运者",
        "Lucky One",
        "获得幸运眷顾。",
        "Receives exceptional good fortune.",
      ],
      ["灾祸教士", "Calamity Priest"],
      ["赢家", "Winner", "积累并释放幸运。", "Accumulates and releases luck."],
      ["厄运法师", "Misfortune Mage", "施加厄运。", "Inflicts misfortune."],
      ["混乱行者", "Chaoswalker"],
      ["先知", "Soothsayer"],
      [
        "水银之蛇",
        "Snake of Mercury",
        "通过重启与轮回影响命运。",
        "Influences fate through rebooting and reincarnation.",
      ],
      [
        "命运之轮",
        "Wheel of Fortune",
        "掌握命运相关权柄。",
        "Holds authority associated with fate.",
      ],
    ],
  },
  {
    id: "mother",
    wiki: "Mother",
    group: "goddess-of-origin",
    color: "#8abf8c",
    domain: l("植物、治疗与生命", "Plants, healing and life"),
    summary: l(
      "涉及植物生长、治疗、生物与大地生命。",
      "Concerns plant growth, healing, living organisms and life on the earth.",
    ),
    rows: [
      [
        "耕种者",
        "Planter",
        "掌握种植知识并促进作物生长。",
        "Understands cultivation and promotes crop growth.",
      ],
      [
        "医师",
        "Doctor",
        "诊断与治疗身体伤病。",
        "Diagnoses and treats physical illness and injury.",
      ],
      [
        "丰收祭司",
        "Harvest Priest",
        "促进植物生长与丰收。",
        "Promotes plant growth and abundant harvests.",
      ],
      [
        "生物学家",
        "Biologist",
        "研究并改造生物。",
        "Studies and modifies living organisms.",
      ],
      [
        "德鲁伊",
        "Druid",
        "运用自然与生物变化的力量。",
        "Uses powers of nature and biological transformation.",
      ],
      ["古代炼金师", "Ancient Alchemist"],
      ["抬棺人", "Pallbearer"],
      ["荒芜主母", "Desolate Matriarch"],
      ["自然行者", "Naturewalker"],
      [
        "母亲",
        "Mother",
        "掌握生命与丰饶相关权柄。",
        "Holds authority associated with life and abundance.",
      ],
    ],
  },
  {
    id: "moon",
    wiki: "Moon",
    group: "goddess-of-origin",
    color: "#d18794",
    domain: l("药剂、召唤与月亮", "Potions, summoning and the moon"),
    summary: l(
      "从药剂和驯兽发展至血族、召唤与生命领域。",
      "Develops from potions and animal taming into vampires, summoning and life.",
    ),
    rows: [
      [
        "药师",
        "Apothecary",
        "配制具有治疗等作用的药剂。",
        "Prepares potions for healing and other effects.",
      ],
      [
        "驯兽师",
        "Beast Tamer",
        "驯服和指挥动物。",
        "Tames and commands animals.",
      ],
      [
        "吸血鬼",
        "Vampire",
        "获得血族身体与黑暗法术。",
        "Gains a vampire’s physique and darkness spells.",
      ],
      [
        "魔药教授",
        "Potions Professor",
        "配制更复杂的非凡药剂。",
        "Prepares more complex supernatural potions.",
      ],
      [
        "深红学者",
        "Scarlet Scholar",
        "使用月亮相关法术。",
        "Uses moon-related magic.",
      ],
      ["巫王", "Shaman King"],
      ["召唤大师", "High Summoner"],
      ["创生者", "Life-Giver", "创造生命。", "Creates life."],
      ["美神", "Beauty Goddess"],
      [
        "月亮",
        "Moon",
        "掌握月亮相关权柄。",
        "Holds authority associated with the moon.",
      ],
    ],
  },
  {
    id: "abyss",
    wiki: "Abyss",
    group: "father-of-devils",
    color: "#b46f6f",
    domain: l("恶意、欲望与堕落", "Malice, desire and degeneration"),
    summary: l(
      "以恶意与欲望为线索，逐渐触及恶魔和深渊。",
      "Follows malice and desire toward devils and the Abyss.",
    ),
    rows: [
      [
        "罪犯",
        "Criminal",
        "增强身体与犯罪相关直觉。",
        "Enhances physique and instincts associated with crime.",
      ],
      ["折翼天使", "Unwinged Angel"],
      [
        "连环杀手",
        "Serial Killer",
        "掌握恶魔崇拜与相关仪式知识。",
        "Gains knowledge of devil worship and related rituals.",
      ],
      [
        "恶魔",
        "Devil",
        "恶魔化并预感针对自身的危险。",
        "Assumes a devil form and senses directed threats.",
      ],
      [
        "欲望使徒",
        "Desire Apostle",
        "感知并操纵欲望。",
        "Perceives and manipulates desires.",
      ],
      ["魔鬼", "Demon"],
      ["呓语者", "Blatherer"],
      ["鲜血大公", "Bloody Archduke"],
      ["污秽君王", "Filthy Monarch"],
      [
        "深渊",
        "Abyss",
        "涉及堕落、污秽与深渊。",
        "Associated with degeneration, filth and the Abyss.",
      ],
    ],
  },
  {
    id: "chained",
    wiki: "Chained",
    group: "father-of-devils",
    color: "#9e9aab",
    domain: l("异变、怨魂与诅咒", "Mutations, wraiths and curses"),
    summary: l(
      "不同序列带来狼人、活尸、怨魂等形态与束缚。",
      "Its sequences bring forms and constraints associated with werewolves, zombies and wraiths.",
    ),
    rows: [
      [
        "囚犯",
        "Prisoner",
        "增强身体，承受欲望的束缚。",
        "Gains physical strength while constrained by desire.",
      ],
      [
        "疯子",
        "Lunatic",
        "进入增强战斗力的狂暴状态。",
        "Enters a berserk state that increases combat power.",
      ],
      [
        "狼人",
        "Werewolf",
        "狼人变身与再生。",
        "Werewolf transformation and regeneration.",
      ],
      [
        "活尸",
        "Zombie",
        "活尸化，增强防御并运用寒冰。",
        "Gains zombie traits, defense and ice powers.",
      ],
      [
        "怨魂",
        "Wraith",
        "灵体化、附身与镜面跳跃。",
        "Phantom form, possession and mirror movement.",
      ],
      [
        "木偶",
        "Puppet",
        "化身诅咒媒介，并操控无生命物体。",
        "Becomes a curse medium and controls inanimate objects.",
      ],
      ["沉默门徒", "Disciple of Silence"],
      ["古代邪物", "Ancient Bane"],
      ["神孽", "Abomination"],
      [
        "被缚者",
        "Chained",
        "涉及束缚、异变与诅咒。",
        "Associated with restraints, mutations and curses.",
      ],
    ],
  },
  {
    id: "black-emperor",
    wiki: "Black_Emperor",
    group: "the-anarchy",
    color: "#ae91ba",
    domain: l(
      "贿赂、扭曲与秩序阴影",
      "Bribery, distortion and the shadow of order",
    ),
    summary: l(
      "寻找规则漏洞，并逐步扭曲、利用和改变秩序。",
      "Finds loopholes and develops the power to distort, exploit and alter order.",
    ),
    rows: [
      [
        "律师",
        "Lawyer",
        "利用规则漏洞，并增强说服能力。",
        "Finds loopholes and gains persuasive ability.",
      ],
      [
        "野蛮人",
        "Barbarian",
        "增强力量与精神抵抗。",
        "Gains strength and mental resistance.",
      ],
      [
        "贿赂者",
        "Briber",
        "以贿赂削弱或影响目标。",
        "Uses bribery to weaken or influence targets.",
      ],
      [
        "腐化男爵",
        "Baron of Corruption",
        "扭曲语言、行为与意图。",
        "Distorts words, actions and intentions.",
      ],
      [
        "混乱导师",
        "Mentor of Disorder",
        "制造混乱并破坏正常秩序。",
        "Creates disorder and disrupts normal order.",
      ],
      [
        "堕落伯爵",
        "Earl of the Fallen",
        "利用规则，放大效果并转赠负面状态。",
        "Exploits rules, magnifies effects and transfers adverse states.",
      ],
      ["狂乱法师", "Frenzied Mage"],
      ["熵之公爵", "Duke of Entropy"],
      ["弑序亲王", "Prince of Abolition"],
      [
        "黑皇帝",
        "Black Emperor",
        "依托尚存的自身秩序复活。",
        "Can return through the survival of one’s established order.",
      ],
    ],
  },
  {
    id: "justiciar",
    wiki: "Justiciar",
    group: "the-anarchy",
    color: "#c4b782",
    domain: l("裁决、律令与秩序", "Judgment, commands and order"),
    summary: l(
      "从仲裁与执法发展至律令、惩戒和秩序。",
      "Develops from arbitration and law enforcement into commands, punishment and order.",
    ),
    rows: [
      [
        "仲裁人",
        "Arbiter",
        "形成令人信服的权威与威严。",
        "Projects convincing authority and dignity.",
      ],
      [
        "治安官",
        "Sheriff",
        "感知异常并追踪目标。",
        "Detects anomalies and tracks targets.",
      ],
      [
        "审讯者",
        "Interrogator",
        "通过精神影响获取信息。",
        "Uses mental influence to obtain information.",
      ],
      [
        "法官",
        "Judge",
        "颁布限制行为的规则。",
        "Declares rules that restrict actions.",
      ],
      [
        "惩戒骑士",
        "Disciplinary Paladin",
        "惩戒违反规则的目标。",
        "Punishes targets that violate rules.",
      ],
      [
        "律令法师",
        "Imperative Mage",
        "以律令限制目标与环境。",
        "Uses commands to constrain targets and surroundings.",
      ],
      ["混乱猎手", "Chaos Hunter"],
      ["平衡者", "Balancer"],
      ["秩序之手", "Hand of Order"],
      [
        "审判者",
        "Justiciar",
        "掌握秩序与律法相关权柄。",
        "Holds authority associated with order and law.",
      ],
    ],
  },
];

export const sources: Array<{
  id: string;
  title: string;
  url: string;
  note: Localized;
  chapter?: number;
  edition?: Localized;
  checkedAt?: string;
}> = [
  ...checkedNovelChapters.map((c) => ({
    id: c.sourceId,
    title: `Webnovel: Lord of Mysteries · Chapter ${c.number}: ${c.title.en}`,
    url: c.url,
    chapter: c.number,
    edition: c.edition,
    checkedAt: c.checkedAt,
    note: c.scope,
  })),
  {
    id: "qidian-settings",
    title: "起点：《诡秘之主》设定集 · 力量体系",
    url: "https://h5.if.qidian.com/h5/workSet/main?albumId=131&bookId=1010868264&catelogId=69153",
    edition: l(
      "起点《诡秘之主》官方设定集 · 力量体系",
      "Qidian official Lord of Mysteries setting collection · power system",
    ),
    checkedAt: "2026-10-23",
    note: l(
      "官方设定资料。此次通过搜索索引读取；直连访问受限。用于途径分组、中文命名及部分能力和仪式概述，不代表逐章原文校验。",
      "Official setting reference, read through its search index because direct access was restricted. Supports grouping, Chinese names and selected powers and rituals; not a chapter-by-chapter audit.",
    ),
  },
  ...seeds.flatMap((seed) => [
    {
      id: `wiki-${seed.id}`,
      title: `Lord of the Mysteries Wiki: ${seed.wiki.replace(/_/g, " ")} Pathway`,
      url: `https://lordofthemysteries.fandom.com/wiki/${seed.wiki}_Pathway`,
      note: l(
        "二手索引，用于中英文序列名称与途径概览。页面可能混合续作及作者补充，不能整体当作首部原著证据。",
        "Secondary index for sequence names and pathway overview. May mix sequel material and author supplements; the entire page is not evidence for the first novel.",
      ),
    },
    {
      id: `abilities-${seed.id}`,
      title: `Lord of the Mysteries Wiki: ${seed.wiki.replace(/_/g, " ")} abilities`,
      url: `https://lordofthemysteries.fandom.com/wiki/${seed.wiki}_Pathway/Abilities`,
      note: l(
        "能力资料索引，需沿页内脚注回到原著章节。本站仅提供简短概述，待核对项目不补造能力。",
        "Ability reference index; follow its footnotes to original chapters. This site gives short summaries and leaves unresolved abilities unfilled.",
      ),
    },
    {
      id: `advancement-${seed.id}`,
      title: `Lord of the Mysteries Wiki: ${seed.wiki.replace(/_/g, " ")} advancement`,
      url: `https://lordofthemysteries.fandom.com/wiki/${seed.wiki}_Pathway/Advancement`,
      note: l(
        "配方与晋升资料的后续核验入口。列出链接不表示所有配方、仪式或续作补充已获本站核实。",
        "Reference for further formula and advancement checks. Linking it does not certify every formula, ritual or sequel supplement.",
      ),
    },
  ]),
];

const unresolvedAbility = l(
  "能力细节尚待原著逐项核对。",
  "Ability details await individual checks against the original novel.",
);
const unresolvedAdvancement = l(
  "具体配方与晋升仪式尚待原著核对。",
  "The exact formula and advancement ritual await checks against the original novel.",
);

// Only a small set of rituals read in the official setting reference is summarized.
// They are descriptive notes, not complete potion recipes or sufficient conditions.
const advancementNotes: Record<string, Record<number, Localized>> = {
  fool: {
    5: l(
      "仪式要点：在美人鱼的歌声中服用魔药；配方另行核验。",
      "Ritual outline: drink the potion amid mermaid singing; the formula requires a separate check.",
    ),
    4: l(
      "仪式要点：在众人见证的盛大表演中，以自身力量与谋划击杀半神。",
      "Ritual outline: defeat and kill a demigod through one’s own strength and planning in a grand witnessed performance.",
    ),
    2: l(
      "仪式要点：让遗失的历史重回当前时代。",
      "Ritual outline: bring lost history back into the current era.",
    ),
    1: l(
      "仪式要点：建立足够真实的秘偶城镇，并使其在灵界形成对应区域。",
      "Ritual outline: build a sufficiently lifelike marionette town with a corresponding region in the spirit world.",
    ),
    0: l(
      "仪式要点：愚弄一次时间、历史或命运；仍需对应特性与唯一性。",
      "Ritual outline: fool time, history or fate once; the corresponding characteristics and Uniqueness are also required.",
    ),
  },
  tyrant: {
    4: l(
      "仪式要点：在自身引发的地震或海啸等灾难中服用魔药并存活。",
      "Ritual outline: survive taking the potion within a disaster one has caused, such as an earthquake or tsunami.",
    ),
  },
  "black-emperor": {
    0: l(
      "仪式涉及国家、特殊规则、九座陵寝与国民参与的仪式；完整条件待逐章核对。",
      "The ritual involves a nation, distinctive rules, nine mausoleums and national participation; complete conditions await chapter checks.",
    ),
  },
};

// Each evidence record supports only its field, never the entire Sequence.
const chapterAbilities: Record<string, string[]> = {
  "fool:9": ["novel-29", "novel-32", "novel-37"],
  "visionary:9": ["novel-6", "novel-35"],
  "tyrant:9": ["novel-6"],
  "darkness:9": ["novel-22"],
  "death:9": ["novel-28"],
  "hermit:9": ["novel-28"],
};
const chapterNames: Record<string, string[]> = {
  "fool:9": ["novel-28"],
  "visionary:9": ["novel-6"],
  "tyrant:9": ["novel-6"],
  "darkness:9": ["novel-22"],
  "darkness:8": ["novel-22"],
  "darkness:7": ["novel-22"],
  "death:9": ["novel-28"],
  "death:7": ["novel-22", "novel-28"],
  "hermit:9": ["novel-22", "novel-28"],
};
const actingNotes: Record<string, { content: Localized; sourceIds: string[] }> =
  {
    "visionary:9": {
      content: l(
        "保持客观旁观，观察表情、动作与话语；过度代入情绪会影响观察。",
        "Remain an objective observer of expression, conduct and speech; emotional involvement distorts observation.",
      ),
      sourceIds: ["novel-6", "novel-35"],
    },
    "fool:9": {
      content: l(
        "克莱恩从观众的旁观立场联想到扮演占卜家，并为此寻找占卜俱乐部。这是早期实践方向，非完整守则。",
        "Klein connects the Spectator’s stance with acting as a Seer, then seeks a divination club. This is early practice, not a complete rule set.",
      ),
      sourceIds: ["novel-35", "novel-37"],
    },
  };
export const actingMethod = {
  content: l(
    "魔药名称不仅是称呼，也指向扮演与消化的方向。这一提示解释了为何途径的成长不只体现为能力增强；它不能替代各序列的具体守则、配方和晋升条件。",
    "A potion’s name points toward acting and digestion. Growth along a pathway involves more than stronger abilities; this clue does not replace specific principles, formulas or advancement conditions.",
  ),
  sourceIds: ["novel-21"],
};

export const pathways: CanonPathway[] = seeds.map((seed) => {
  if (seed.rows.length !== 10)
    throw new Error(`Expected ten sequences for ${seed.id}`);
  const entry = seed.rows[0];
  const deity = seed.rows[9];
  return {
    id: seed.id,
    slug: seed.id,
    name: l(deity[0], deity[1]),
    entry: l(entry[0], entry[1]),
    group: seed.group,
    color: seed.color,
    domain: seed.domain,
    summary: seed.summary,
    sourceIds: ["qidian-settings", `wiki-${seed.id}`],
    sequences: seed.rows.map((row, index) => {
      const level = 9 - index;
      const key = `${seed.id}:${level}`;
      const setting = settingEvidence[key];
      const advancement =
        setting?.advancement?.content ?? advancementNotes[seed.id]?.[level];
      const hasAbility = Boolean(setting?.ability || (row[2] && row[3]));
      const abilityChapters = chapterAbilities[key];
      const acting = actingNotes[key];
      const nameChapters = chapterNames[key];
      const evidence: CanonPathway["sequences"][number]["evidence"] = {
        name: {
          status: nameChapters ? "chapter" : "reference",
          sourceIds: nameChapters ?? ["qidian-settings", `wiki-${seed.id}`],
        },
        ability: {
          status: abilityChapters
            ? "chapter"
            : hasAbility
              ? "reference"
              : "pending",
          sourceIds:
            abilityChapters ??
            (setting?.ability
              ? ["qidian-settings"]
              : hasAbility
                ? [`abilities-${seed.id}`]
                : []),
          locator: setting?.ability?.locator,
        },
        advancement: {
          status: advancement ? "reference" : "pending",
          sourceIds: advancement ? ["qidian-settings"] : [],
          locator: setting?.advancement?.locator,
        },
        acting: {
          status: acting
            ? "chapter"
            : setting?.acting
              ? "reference"
              : "pending",
          sourceIds:
            acting?.sourceIds ?? (setting?.acting ? ["qidian-settings"] : []),
          locator: setting?.acting?.locator,
        },
      };
      return {
        level,
        name: l(row[0], row[1]),
        ability:
          setting?.ability?.content ??
          (seed.id === "fool" && level === 9
            ? l(
                "具备学习占卜的资质，并可学习灵视；灵性感知敏锐，也容易受异常环境影响。",
                "Has an aptitude for learning divination and Spirit Vision; heightened perception is also sensitive to abnormal surroundings.",
              )
            : seed.id === "hermit" && level === 9
              ? l(
                  "掌握基础神秘学和一些仪式知识，也容易感知到隐秘存在，需谨慎运用能力。",
                  "Has basic mysticism and ritual knowledge, with sensitivity to hidden existences that calls for care.",
                )
              : hasAbility
                ? l(row[2]!, row[3]!)
                : unresolvedAbility),
        advancement: advancement ?? unresolvedAdvancement,
        acting:
          acting?.content ??
          setting?.acting?.content ??
          l(
            "本序列的具体扮演守则尚待原文章节核对。",
            "Specific acting principles for this Sequence await an original-chapter check.",
          ),
        evidence,
        sourceIds: [
          ...new Set([
            ...Object.values(evidence).flatMap((field) => field.sourceIds),
            `wiki-${seed.id}`,
            ...(row[2] && row[3] ? [`abilities-${seed.id}`] : []),
            ...(advancement ||
            (seed.id === "death" && level === 1) ||
            (seed.id === "paragon" && level === 6)
              ? ["qidian-settings"]
              : []),
            `advancement-${seed.id}`,
          ]),
        ],
      };
    }),
  };
});
