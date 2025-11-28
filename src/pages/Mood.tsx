import { useState } from 'react'
import { Brain, Heart, AlertTriangle } from 'lucide-react'

interface MoodCase {
  id: number
  name: string
  type: 'depression' | 'anxiety' | 'both'
  symptoms: string[]
  severity: string
  phqScore?: number
  gadScore?: number
  duration: string
}

const moodCases: MoodCase[] = [
  {
    id: 1,
    name: 'Mild Depression',
    type: 'depression',
    symptoms: ['Low mood most days', 'Reduced interest', 'Fatigue'],
    severity: 'Mild',
    phqScore: 8,
    duration: '3 months',
  },
  {
    id: 2,
    name: 'Moderate Depression',
    type: 'depression',
    symptoms: ['Depressed mood daily', 'Anhedonia', 'Sleep disturbance', 'Poor concentration'],
    severity: 'Moderate',
    phqScore: 14,
    duration: '5 months',
  },
  {
    id: 3,
    name: 'Severe Depression',
    type: 'depression',
    symptoms: ['Persistent hopelessness', 'Suicidal ideation', 'Psychomotor retardation', 'Weight loss'],
    severity: 'Severe',
    phqScore: 22,
    duration: '8 months',
  },
  {
    id: 4,
    name: 'Generalized Anxiety',
    type: 'anxiety',
    symptoms: ['Excessive worry', 'Restlessness', 'Muscle tension', 'Sleep disturbance'],
    severity: 'Moderate',
    gadScore: 12,
    duration: '7 months',
  },
  {
    id: 5,
    name: 'Panic Disorder',
    type: 'anxiety',
    symptoms: ['Recurrent panic attacks', 'Palpitations', 'Fear of dying', 'Avoidance behavior'],
    severity: 'Moderate-Severe',
    gadScore: 15,
    duration: '4 months',
  },
  {
    id: 6,
    name: 'Mixed Anxiety-Depression',
    type: 'both',
    symptoms: ['Depressed mood', 'Worry', 'Anhedonia', 'Restlessness', 'Fatigue'],
    severity: 'Moderate',
    phqScore: 12,
    gadScore: 10,
    duration: '6 months',
  },
]

const phqSeverity = [
  { range: '0-4', severity: 'Minimal', color: 'bg-green-500', textColor: 'text-green-700 dark:text-green-300' },
  { range: '5-9', severity: 'Mild', color: 'bg-yellow-500', textColor: 'text-yellow-700 dark:text-yellow-300' },
  { range: '10-14', severity: 'Moderate', color: 'bg-orange-500', textColor: 'text-orange-700 dark:text-orange-300' },
  { range: '15-19', severity: 'Moderately Severe', color: 'bg-red-500', textColor: 'text-red-700 dark:text-red-300' },
  { range: '20-27', severity: 'Severe', color: 'bg-purple-500', textColor: 'text-purple-700 dark:text-purple-300' },
]

const gadSeverity = [
  { range: '0-4', severity: 'Minimal', color: 'bg-green-500', textColor: 'text-green-700 dark:text-green-300' },
  { range: '5-9', severity: 'Mild', color: 'bg-yellow-500', textColor: 'text-yellow-700 dark:text-yellow-300' },
  { range: '10-14', severity: 'Moderate', color: 'bg-orange-500', textColor: 'text-orange-700 dark:text-orange-300' },
  { range: '15-21', severity: 'Severe', color: 'bg-red-500', textColor: 'text-red-700 dark:text-red-300' },
]

export default function Mood() {
  const [selectedCase, setSelectedCase] = useState(moodCases[0])

  const getPHQCategory = (score: number) => {
    if (score >= 20) return phqSeverity[4]
    if (score >= 15) return phqSeverity[3]
    if (score >= 10) return phqSeverity[2]
    if (score >= 5) return phqSeverity[1]
    return phqSeverity[0]
  }

  const getGADCategory = (score: number) => {
    if (score >= 15) return gadSeverity[3]
    if (score >= 10) return gadSeverity[2]
    if (score >= 5) return gadSeverity[1]
    return gadSeverity[0]
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Mood Disorders
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Depression and anxiety assessment and management
          </p>
        </div>

        {/* Case Selector */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
            Clinical Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {moodCases.map((caseData) => (
              <button
                key={caseData.id}
                onClick={() => setSelectedCase(caseData)}
                className={`p-4 rounded-lg text-left transition-all ${
                  selectedCase.id === caseData.id
                    ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500'
                    : 'bg-slate-50 dark:bg-slate-800 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className={`w-4 h-4 ${
                    caseData.type === 'depression' ? 'text-blue-500' :
                    caseData.type === 'anxiety' ? 'text-orange-500' :
                    'text-purple-500'
                  }`} />
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {caseData.name}
                  </span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {caseData.severity} • {caseData.duration}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Assessment */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
            Clinical Assessment
          </h2>

          {/* Patient Details */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {selectedCase.name}
                </h3>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedCase.type === 'depression'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : selectedCase.type === 'anxiety'
                      ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  }`}>
                    {selectedCase.type === 'depression' ? 'Depression' :
                     selectedCase.type === 'anxiety' ? 'Anxiety' : 'Mixed'}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Duration: {selectedCase.duration}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Clinical Features:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedCase.symptoms.map((symptom, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-primary-500 mt-1">•</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {symptom}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Screening Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PHQ-9 Score */}
            {selectedCase.phqScore !== undefined && (
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5">
                <div className="flex items-center space-x-2 mb-4">
                  <Heart className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    PHQ-9 Score
                  </h3>
                </div>
                <div className="flex items-end space-x-3 mb-4">
                  <div className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                    {selectedCase.phqScore}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 pb-1">
                    / 27
                  </div>
                </div>
                <div className={`px-3 py-2 rounded-lg ${
                  getPHQCategory(selectedCase.phqScore).color
                } bg-opacity-20 dark:bg-opacity-20`}>
                  <div className={`text-sm font-semibold ${
                    getPHQCategory(selectedCase.phqScore).textColor
                  }`}>
                    {getPHQCategory(selectedCase.phqScore).severity} Depression
                  </div>
                </div>
              </div>
            )}

            {/* GAD-7 Score */}
            {selectedCase.gadScore !== undefined && (
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5">
                <div className="flex items-center space-x-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    GAD-7 Score
                  </h3>
                </div>
                <div className="flex items-end space-x-3 mb-4">
                  <div className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                    {selectedCase.gadScore}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 pb-1">
                    / 21
                  </div>
                </div>
                <div className={`px-3 py-2 rounded-lg ${
                  getGADCategory(selectedCase.gadScore).color
                } bg-opacity-20 dark:bg-opacity-20`}>
                  <div className={`text-sm font-semibold ${
                    getGADCategory(selectedCase.gadScore).textColor
                  }`}>
                    {getGADCategory(selectedCase.gadScore).severity} Anxiety
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Screening Tools Reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* PHQ-9 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
              PHQ-9 Severity Scale
            </h2>
            <div className="space-y-2">
              {phqSeverity.map((level, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    selectedCase.phqScore !== undefined &&
                    level.severity === getPHQCategory(selectedCase.phqScore).severity
                      ? `${level.color} bg-opacity-20 dark:bg-opacity-20 border-2 border-${level.color.replace('bg-', '')}`
                      : 'bg-slate-50 dark:bg-slate-800/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-semibold ${level.textColor}`}>
                      {level.severity}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {level.range}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GAD-7 */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
              GAD-7 Severity Scale
            </h2>
            <div className="space-y-2">
              {gadSeverity.map((level, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    selectedCase.gadScore !== undefined &&
                    level.severity === getGADCategory(selectedCase.gadScore).severity
                      ? `${level.color} bg-opacity-20 dark:bg-opacity-20 border-2 border-${level.color.replace('bg-', '')}`
                      : 'bg-slate-50 dark:bg-slate-800/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-semibold ${level.textColor}`}>
                      {level.severity}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {level.range}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Concepts */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
            Key Management Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Screening & Diagnosis
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                PHQ-9 for depression, GAD-7 for anxiety. Symptoms must be present for
                ≥2 weeks (depression) or ≥6 months (GAD) and cause functional impairment.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Follow-up Intervals
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Initial: 1-2 weeks after starting therapy. Ongoing: every 2-4 weeks
                until stable, then every 3-6 months during maintenance phase.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Treatment Phases
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Acute (6-12 weeks): symptom reduction. Continuation (4-9 months):
                prevent relapse. Maintenance (12+ months): prevent recurrence.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Safety Assessment
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Always assess suicidal ideation. PHQ-9 item 9 screens for this.
                Active suicidal ideation requires urgent psychiatric evaluation.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                  Crisis Resources
                </h4>
                <p className="text-sm text-red-800 dark:text-red-200">
                  If you or someone you know is in crisis, contact the National Suicide
                  Prevention Lifeline at 988 or seek emergency care immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
