# 剧情搜索功能 - 数据准备指南

## 📋 功能概述

智能剧情搜索功能允许用户用自然语言提问，AI会自动分析问题并找到相关章节。

**示例问题：**
- "克莱恩第一次遇见阿蒙是在哪章？"
- "塔罗会第一次聚会"
- "克莱恩成为诡秘之主"

## 🎯 实现原理

```
用户提问 → AI提取关键信息 → 搜索章节 → 返回结果
```

AI会自动提取：
- 👤 **人物**：涉及的角色
- 📍 **地点**：发生地点
- ⚡ **事件**：关键情节
- ⏰ **时间**：时间线索
- 🏷️ **关键词**：搜索关键词

## 📊 数据准备步骤

### 步骤1: 创建章节数据文件

```bash
# 复制模板文件
cp src/data/chaptersTemplate.ts src/data/chapters.ts
```

### 步骤2: 填写章节信息

每个章节需要填写以下字段：

```typescript
{
  chapterNumber: 1,          // 章节编号
  title: "绯红",              // 章节标题
  volume: "第一卷 小丑",      // 卷名
  summary: "剧情摘要...",     // 重要！AI理解用
  characters: ["克莱恩"],     // 出现人物
  locations: ["廷根市"],      // 场景地点
  items: ["灰雾"],           // 重要物品
  keywords: ["穿越", "开局"], // 搜索关键词
  events: ["主角穿越"],      // 关键事件
  timeline: "第一卷 开局"     // 时间标记（可选）
}
```

### 步骤3: 数据生成方法

#### 方法A: 手动录入（适合少量章节）
适合核心章节，可以精确控制信息质量。

#### 方法B: AI辅助生成（推荐）
使用Claude、GPT-4等AI批量生成：

**Prompt模板：**
```
你是《诡秘之主》的剧情分析专家。请分析第X章的内容，提取以下信息：

1. 剧情摘要（2-3句话概括本章主要情节）
2. 关键人物（出现的主要角色）
3. 关键地点（本章发生的重要场景）
4. 重要物品/概念
5. 关键词标签（用于搜索，5-8个）
6. 关键事件（本章的重要情节，2-3条）

章节标题：【填入标题】
章节内容：【填入正文或简介】

请以JSON格式返回结果。
```

**使用脚本批量处理：**
```python
# batch_generate_chapters.py
import json
import requests

def generate_chapter_data(title, content):
    prompt = f"""分析章节《{title}》的剧情，提取：
    1. 剧情摘要
    2. 关键人物
    3. 关键地点
    4. 关键词
    5. 关键事件

    内容：{content[:1000]}  # 限制长度

    返回JSON格式。"""

    # 调用AI API
    response = your_ai_api_call(prompt)
    return json.loads(response)

# 批量处理
chapters = load_chapters_from_file()
for ch in chapters:
    data = generate_chapter_data(ch['title'], ch['content'])
    save_to_file(data)
```

#### 方法C: 半自动化（快速版）
1. 准备章节列表（CSV/Excel）
2. 用AI批量生成基本信息
3. 手动审核和修正重要章节

### 步骤4: 数据格式验证

```typescript
// 验证数据完整性
import { chapters } from './data/chapters'

chapters.forEach(ch => {
  console.assert(ch.chapterNumber, `Missing number in ${ch.title}`)
  console.assert(ch.summary.length > 10, `Summary too short: ${ch.title}`)
  console.assert(ch.characters.length > 0, `No characters: ${ch.title}`)
})
```

### 步骤5: 集成到页面

更新 `src/pages/PlotSearch.tsx`：

```typescript
// 替换这行：
const mockChapters: ChapterPlot[] = useMemo(() => [], [])

// 为：
import { chapters } from '../data/chapters'
const mockChapters: ChapterPlot[] = useMemo(() => chapters, [])
```

## 🎨 数据质量建议

### ✅ 好的数据示例

```typescript
{
  chapterNumber: 134,
  title: "记录",
  volume: "第二卷 无面人",
  summary: "克莱恩在密修会组织中获得了更多的线索，并开始深入了解关于塔罗会的秘密。他在记录中发现了关于历史真相的蛛丝马迹，同时也在思考如何平衡好作为夏洛克·莫里亚蒂的日常生活和作为代号'愚者'的神秘身份。",
  characters: ["克莱恩", "戴里克·伯格", "埃姆林", "伦纳德"],
  locations: ["密修会", "灰雾之上", "贝克兰德"],
  items: ["塔罗牌", "神秘记录"],
  keywords: ["塔罗会", "记录", "历史真相", "密修会", "双重身份"],
  events: ["塔罗会聚会", "了解历史", "身份平衡"],
  relatedPathways: ["占卜家", "学徒"],
  moodTags: ["探索", "解谜"],
  timeline: "第二卷 中期"
}
```

### ❌ 避免的问题

1. **摘要太短**：`summary: "克莱恩遇到了阿蒙"` → 太简单，无法帮助AI理解
2. **关键词缺失**：没有人物、地点等关键信息
3. **事件描述模糊**：`events: ["发生了某事"]` → 不具体

## 🔧 高级功能

### 同义词配置

在 `chaptersTemplate.ts` 中的 `generateAliases` 函数添加：

```typescript
function generateAliases(chapter: ChapterPlot): string[] {
  const aliases: string[] = []

  // 人物别名映射
  const characterAliases = {
    "克莱恩": ["夏洛克", "道恩", "唐泰斯", "梅丽莎", "愚者"],
    "阿蒙": ["偷盗者", "寄生"],
    // 添加更多...
  }

  chapter.characters.forEach(char => {
    if (characterAliases[char]) {
      aliases.push(...characterAliases[char])
    }
  })

  return aliases
}
```

### 相关途径关联

标记章节与哪条途径相关：

```typescript
{
  chapterNumber: 56,
  title: "占卜家",
  relatedPathways: ["占卜家"]  // 关联到占卜家途径
}
```

这样用户搜索"占卜家途径相关章节"时能找到。

## 📈 数据量建议

| 范围 | 章节数量 | 适用场景 |
|------|---------|---------|
| 最小版本 | 50-100章 | 核心情节，快速上线 |
| 标准版本 | 300-500章 | 主要情节，用户体验好 |
| 完整版本 | 1000+章 | 全量覆盖，最佳体验 |

**建议：先从50个核心章节开始，逐步扩充**

## 🎯 核心章节推荐

优先录入这些高频搜索章节：

1. **开篇**：第1-10章（穿越、灰雾）
2. **塔罗会成立**：第130-140章
3. **关键战斗**：与阿蒙、与魔女家族等
4. **重要转折**：各卷高潮章节
5. **结局**：成神、最终决战

## ⚠️ 注意事项

### 版权问题
- ✅ 可以：章节标题、摘要、关键词、章节号
- ⚠️ 谨慎：短片段引用（100字以内）
- ❌ 避免：完整章节正文

### 性能优化
- 章节数量超过500时，建议实现分页加载
- 使用 `useMemo` 缓存搜索结果
- 考虑使用Web Worker处理大量数据

### AI分析提示
如果AI分析不准确，调整 `chatApi.ts` 中的systemPrompt：

```typescript
const systemPrompt = `
你是《诡秘之主》剧情分析专家...

特别提示：
- "克莱恩"的所有别名都要识别：夏洛克、道恩、唐泰斯等
- "阿蒙"相关：寄生、偷盗者、万门之门
- 塔罗会成员：倒吊人、太阳、隐者等
...
`
```

## 🚀 测试清单

- [ ] 搜索人物名能找到相关章节
- [ ] 搜索地点能找到相关章节
- [ ] 自然语言提问能理解
- [ ] 同义词能匹配
- [ ] 搜索结果按相关度排序
- [ ] 中英文都能搜索
- [ ] 空结果有友好提示

## 📚 相关文件

- `src/data/chaptersTemplate.ts` - 数据模板和搜索函数
- `src/data/chapters.ts` - **你创建的章节数据文件**
- `src/pages/PlotSearch.tsx` - 搜索页面
- `src/utils/chatApi.ts` - AI分析功能

## 🎉 完成后

当你完成数据准备后：

1. 删除PlotSearch页面中的"数据填充提示"部分
2. 测试几个搜索查询
3. 部署到生产环境

---

**需要帮助？**
- 如果在准备数据过程中遇到问题，可以询问AI辅助生成
- 建议先用50个核心章节测试功能，再逐步扩充
- 数据质量 > 数据数量，优先保证核心章节的准确性
