export interface CaseData {
  id: string
  title: string
  description: string
  category: string
}

export interface A1cTrend {
  month: string
  value: number
}

export interface BPReading {
  date: string
  systolic: number
  diastolic: number
}

export interface HFCase {
  id: string
  ef: string
  volumeStatus: string
  symptoms: string[]
  classification: string
}

export interface AsthmaCase {
  id: string
  nighttimeAwakenings: number
  daytimeSymptoms: string
  control: string
}

export interface AssessmentQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  rationale: string
  category: string
}

export interface GlossaryTerm {
  term: string
  definition: string
  category: string
}
