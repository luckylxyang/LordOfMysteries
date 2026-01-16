// 途径定义
export interface Pathway {
  id: string
  name: string
  sequence: number
  symbol: string
  description: string
  characteristics: string[]
  motto: string[]
}

// 测试问题
export interface Question {
  id: number
  text: string
  options: Option[]
}

export interface Option {
  text: string
  weights: Record<string, number> // 途径ID -> 权重
}

// 测试结果
export interface QuizResult {
  pathwayId: string
  scores: Record<string, number>
  answers: number[]
}

// 评估结果
export interface Evaluation {
  pathway: Pathway
  commentary: string
  customMotto?: string
}
