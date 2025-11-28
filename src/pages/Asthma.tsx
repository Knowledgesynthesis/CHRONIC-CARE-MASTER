import { useState } from 'react'
import { Wind, Moon, Sun, Activity, AlertTriangle } from 'lucide-react'

interface AsthmaCase {
  id: number
  name: string
  daytimeSymptoms: string
  nighttimeAwakenings: number
  saba: string
  lungFunction: string
  severity: string
  step: number
}

const asthmaCases: AsthmaCase[] = [
  {
    id: 1,
    name: 'Well-Controlled Mild',
    daytimeSymptoms: '≤2 days/week',
    nighttimeAwakenings: 0,
    saba: '≤2 days/week',
    lungFunction: 'FEV1 >80%',
    severity: 'Intermittent',
    step: 1,
  },
  {
    id: 2,
    name: 'Mild Persistent',
    daytimeSymptoms: '>2 days/week',
    nighttimeAwakenings: 2,
    saba: '>2 days/week',
    lungFunction: 'FEV1 >80%',
    severity: 'Mild Persistent',
    step: 2,
  },
  {
    id: 3,
    name: 'Moderate Persistent',
    daytimeSymptoms: 'Daily',
    nighttimeAwakenings: 4,
    saba: 'Daily',
    lungFunction: 'FEV1 60-80%',
    severity: 'Moderate Persistent',
    step: 3,
  },
  {
    id: 4,
    name: 'Severe Persistent',
    daytimeSymptoms: 'Throughout day',
    nighttimeAwakenings: 7,
    saba: 'Several times daily',
    lungFunction: 'FEV1 <60%',
    severity: 'Severe Persistent',
    step: 4,
  },
  {
    id: 5,
    name: 'Exercise-Induced',
    daytimeSymptoms: 'Only with exercise',
    nighttimeAwakenings: 0,
    saba: 'Only pre-exercise',
    lungFunction: 'FEV1 >80%',
    severity: 'Intermittent',
    step: 1,
  },
]

const stepTherapy = [
  {
    step: 1,
    name: 'Step 1',
    description: 'SABA as needed',
    color: 'bg-green-500',
    textColor: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    step: 2,
    name: 'Step 2',
    description: 'Low-dose ICS or LTRA',
    color: 'bg-blue-500',
    textColor: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    step: 3,
    name: 'Step 3',
    description: 'Low-dose ICS/LABA or Medium-dose ICS',
    color: 'bg-orange-500',
    textColor: 'text-orange-700 dark:text-orange-300',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
  },
  {
    step: 4,
    name: 'Step 4',
    description: 'Medium/High-dose ICS/LABA',
    color: 'bg-red-500',
    textColor: 'text-red-700 dark:text-red-300',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    step: 5,
    name: 'Step 5',
    description: 'High-dose ICS/LABA + add-on therapy',
    color: 'bg-purple-500',
    textColor: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
]

export default function Asthma() {
  const [selectedCase, setSelectedCase] = useState(asthmaCases[0])

  const currentStep = stepTherapy.find(s => s.step === selectedCase.step) || stepTherapy[0]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Asthma
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Severity classification and stepwise management approach
          </p>
        </div>

        {/* Case Selector */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
            Clinical Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {asthmaCases.map((caseData) => (
              <button
                key={caseData.id}
                onClick={() => setSelectedCase(caseData)}
                className={`p-4 rounded-lg text-left transition-all ${
                  selectedCase.id === caseData.id
                    ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500'
                    : 'bg-slate-50 dark:bg-slate-800 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                  {caseData.name}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {caseData.severity}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Severity Assessment */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
            Severity Assessment
          </h2>

          {/* Patient Details */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
              {selectedCase.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Sun className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Daytime Symptoms
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {selectedCase.daytimeSymptoms}
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Moon className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Nighttime Awakenings
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {selectedCase.nighttimeAwakenings} per month
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Wind className="w-5 h-5 text-cyan-500 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    SABA Use
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {selectedCase.saba}
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Activity className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Lung Function
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {selectedCase.lungFunction}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Severity Classification */}
          <div className={`${currentStep.bgColor} border-2 border-${currentStep.color.replace('bg-', '')} rounded-xl p-6`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`text-lg font-semibold ${currentStep.textColor} mb-1`}>
                  Classification: {selectedCase.severity}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Recommended treatment: {currentStep.name}
                </p>
              </div>
              <div className={`${currentStep.color} text-white px-4 py-2 rounded-lg font-bold`}>
                Step {selectedCase.step}
              </div>
            </div>
          </div>
        </div>

        {/* Stepwise Approach */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
            Stepwise Treatment Approach
          </h2>
          <div className="space-y-3">
            {stepTherapy.map((step) => (
              <div
                key={step.step}
                className={`p-4 rounded-lg border-2 transition-all ${
                  step.step === selectedCase.step
                    ? `${step.bgColor} border-${step.color.replace('bg-', '')}`
                    : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`${step.color} text-white px-3 py-1 rounded-lg font-bold text-sm`}>
                      {step.name}
                    </div>
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {step.description}
                    </div>
                  </div>
                  {step.step === selectedCase.step && (
                    <div className={`${step.textColor} font-semibold text-sm`}>
                      Current
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Step Up / Step Down
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Step up if not controlled at current level for ≥3 months. Step down if
                  well-controlled for ≥3 months to find minimum effective therapy.
                </p>
              </div>
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
                Controller vs Reliever
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Controllers (ICS, LABA, LTRA) prevent symptoms. Relievers (SABA) treat
                acute symptoms. Overuse of SABA indicates poor control.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Trigger Identification
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Common triggers: allergens, exercise, cold air, infections, irritants.
                Avoidance strategies are key to long-term control.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Asthma Control Test
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Assess daytime symptoms, nighttime awakenings, activity limitation,
                and SABA use. Well-controlled asthma has minimal impact on daily life.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Exacerbation Management
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                SABA + oral corticosteroids for moderate-severe exacerbations.
                Action plans help patients recognize and respond to worsening symptoms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
