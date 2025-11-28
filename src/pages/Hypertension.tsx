import { useState } from 'react'
import { Activity, AlertTriangle, CheckCircle, Info } from 'lucide-react'

interface BPClassification {
  category: string
  systolic: string
  diastolic: string
  color: string
  bgColor: string
  borderColor: string
  recommendation: string
}

const bpClassifications: BPClassification[] = [
  {
    category: 'Normal',
    systolic: '<120',
    diastolic: 'and <80',
    color: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    recommendation: 'Encourage healthy lifestyle. Recheck in 1 year.',
  },
  {
    category: 'Elevated',
    systolic: '120-129',
    diastolic: 'and <80',
    color: 'text-yellow-700 dark:text-yellow-300',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    recommendation: 'Lifestyle modifications. Reassess in 3-6 months.',
  },
  {
    category: 'Stage 1 HTN',
    systolic: '130-139',
    diastolic: 'or 80-89',
    color: 'text-orange-700 dark:text-orange-300',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    recommendation: 'Assess cardiovascular risk. Consider therapy if high risk or symptomatic.',
  },
  {
    category: 'Stage 2 HTN',
    systolic: '≥140',
    diastolic: 'or ≥90',
    color: 'text-red-700 dark:text-red-300',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    recommendation: 'Initiate pharmacotherapy along with lifestyle modifications.',
  },
  {
    category: 'Hypertensive Crisis',
    systolic: '>180',
    diastolic: 'or >120',
    color: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800',
    recommendation: 'Urgent evaluation. Assess for end-organ damage.',
  },
]

const bpCases = [
  { id: 1, name: '45yo Male, No Symptoms', systolic: 128, diastolic: 78, cvdRisk: 'Low' },
  { id: 2, name: '62yo Female, DM', systolic: 142, diastolic: 88, cvdRisk: 'High' },
  { id: 3, name: '55yo Male, Smoker', systolic: 135, diastolic: 86, cvdRisk: 'Moderate' },
  { id: 4, name: '38yo Female, Athletic', systolic: 118, diastolic: 76, cvdRisk: 'Low' },
  { id: 5, name: '70yo Male, CKD', systolic: 156, diastolic: 94, cvdRisk: 'Very High' },
  { id: 6, name: '52yo Female, Obesity', systolic: 132, diastolic: 84, cvdRisk: 'Moderate' },
]

export default function Hypertension() {
  const [selectedCase, setSelectedCase] = useState(bpCases[0])

  const classifyBP = (systolic: number, diastolic: number): BPClassification => {
    if (systolic > 180 || diastolic > 120) return bpClassifications[4]
    if (systolic >= 140 || diastolic >= 90) return bpClassifications[3]
    if (systolic >= 130 || diastolic >= 80) return bpClassifications[2]
    if (systolic >= 120 && diastolic < 80) return bpClassifications[1]
    return bpClassifications[0]
  }

  const currentClassification = classifyBP(selectedCase.systolic, selectedCase.diastolic)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Hypertension
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Blood pressure classification and management strategies
          </p>
        </div>

        {/* BP Classification Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
            Blood Pressure Classification
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300 font-semibold">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300 font-semibold">
                    Systolic (mmHg)
                  </th>
                  <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300 font-semibold">
                    Diastolic (mmHg)
                  </th>
                  <th className="text-left py-3 px-4 text-slate-700 dark:text-slate-300 font-semibold">
                    Recommendation
                  </th>
                </tr>
              </thead>
              <tbody>
                {bpClassifications.map((classification, index) => (
                  <tr
                    key={index}
                    className={`border-b border-slate-100 dark:border-slate-800 ${classification.bgColor}`}
                  >
                    <td className={`py-3 px-4 font-semibold ${classification.color}`}>
                      {classification.category}
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                      {classification.systolic}
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                      {classification.diastolic}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                      {classification.recommendation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive BP Classifier */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
            BP Classification Tool
          </h2>

          {/* Case Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {bpCases.map((caseData) => (
              <button
                key={caseData.id}
                onClick={() => setSelectedCase(caseData)}
                className={`p-4 rounded-lg text-left transition-all ${
                  selectedCase.id === caseData.id
                    ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500'
                    : 'bg-slate-50 dark:bg-slate-800 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                  {caseData.name}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {caseData.systolic}/{caseData.diastolic} mmHg
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  CVD Risk: {caseData.cvdRisk}
                </div>
              </button>
            ))}
          </div>

          {/* BP Display */}
          <div className={`${currentClassification.bgColor} ${currentClassification.borderColor} border-2 rounded-xl p-6 mb-6`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm text-slate-600 dark:text-slate-400 mb-1">Patient</h3>
                <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {selectedCase.name}
                </p>
              </div>
              <Activity className={`w-12 h-12 ${currentClassification.color}`} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Systolic</div>
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {selectedCase.systolic}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Diastolic</div>
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {selectedCase.diastolic}
                </div>
              </div>
            </div>
            <div className={`${currentClassification.bgColor} rounded-lg p-4 border ${currentClassification.borderColor}`}>
              <div className="flex items-center space-x-2 mb-2">
                {currentClassification.category === 'Normal' ? (
                  <CheckCircle className={`w-5 h-5 ${currentClassification.color}`} />
                ) : currentClassification.category === 'Hypertensive Crisis' ? (
                  <AlertTriangle className={`w-5 h-5 ${currentClassification.color}`} />
                ) : (
                  <Info className={`w-5 h-5 ${currentClassification.color}`} />
                )}
                <span className={`font-semibold ${currentClassification.color}`}>
                  {currentClassification.category}
                </span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {currentClassification.recommendation}
              </p>
            </div>
          </div>

          {/* CVD Risk Context */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Cardiovascular Risk: {selectedCase.cvdRisk}
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Treatment decisions should consider overall cardiovascular risk, not just BP values.
                  Higher risk patients may benefit from earlier pharmacologic intervention.
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
                Lifestyle Modifications
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                DASH diet, sodium restriction, weight loss, exercise, and alcohol moderation
                can reduce BP by 4-11 mmHg.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Home BP Monitoring
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Home readings often more accurate than office. Helps identify white-coat
                and masked hypertension.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Resistant Hypertension
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                BP above goal despite 3 medications (including a diuretic). Consider secondary
                causes and medication adherence.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Follow-up Timing
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Stage 1: reassess in 1 month. Stage 2: reassess within 1 week to 1 month
                based on clinical context.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
