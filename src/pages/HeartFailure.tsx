import { useState } from 'react'
import { Heart, Droplets, Thermometer, Wind, AlertCircle } from 'lucide-react'

interface HFCase {
  id: number
  name: string
  ef: string
  symptoms: string[]
  perfusion: 'warm' | 'cold'
  congestion: 'wet' | 'dry'
  classification: string
}

const hfCases: HFCase[] = [
  {
    id: 1,
    name: '65yo Male, Ischemic CM',
    ef: '25%',
    symptoms: ['dyspnea on exertion', 'fatigue', 'no edema'],
    perfusion: 'warm',
    congestion: 'dry',
    classification: 'HFrEF - Compensated',
  },
  {
    id: 2,
    name: '58yo Female, Acute Decompensation',
    ef: '30%',
    symptoms: ['orthopnea', 'lower extremity edema', 'rales'],
    perfusion: 'warm',
    congestion: 'wet',
    classification: 'HFrEF - Congested',
  },
  {
    id: 3,
    name: '72yo Male, Cardiogenic Shock',
    ef: '20%',
    symptoms: ['confusion', 'cool extremities', 'low BP', 'pulmonary edema'],
    perfusion: 'cold',
    congestion: 'wet',
    classification: 'HFrEF - Cardiogenic Shock',
  },
  {
    id: 4,
    name: '55yo Female, Low Output',
    ef: '28%',
    symptoms: ['fatigue', 'cool extremities', 'narrow pulse pressure'],
    perfusion: 'cold',
    congestion: 'dry',
    classification: 'HFrEF - Low Perfusion',
  },
  {
    id: 5,
    name: '68yo Male, HTN-related',
    ef: '55%',
    symptoms: ['dyspnea', 'hypertension', 'LVH on echo'],
    perfusion: 'warm',
    congestion: 'wet',
    classification: 'HFpEF - Diastolic Dysfunction',
  },
]

export default function HeartFailure() {
  const [selectedCase, setSelectedCase] = useState(hfCases[0])

  const getQuadrantInfo = (perfusion: string, congestion: string) => {
    const quadrants: Record<string, {
      name: string
      description: string
      color: string
      textColor: string
      bgColor: string
    }> = {
      'warm-dry': {
        name: 'Profile A (Warm & Dry)',
        description: 'Compensated, euvolemic state. Optimal outpatient status.',
        color: 'bg-green-500',
        textColor: 'text-green-700 dark:text-green-300',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
      },
      'warm-wet': {
        name: 'Profile B (Warm & Wet)',
        description: 'Congested but adequate perfusion. Most common decompensation pattern.',
        color: 'bg-blue-500',
        textColor: 'text-blue-700 dark:text-blue-300',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      },
      'cold-wet': {
        name: 'Profile C (Cold & Wet)',
        description: 'Congested with poor perfusion. Cardiogenic shock. Requires urgent intervention.',
        color: 'bg-red-500',
        textColor: 'text-red-700 dark:text-red-300',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
      },
      'cold-dry': {
        name: 'Profile L (Cold & Dry)',
        description: 'Low perfusion without congestion. Often iatrogenic from overdiuresis.',
        color: 'bg-orange-500',
        textColor: 'text-orange-700 dark:text-orange-300',
        bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      },
    }
    return quadrants[`${perfusion}-${congestion}`]
  }

  const quadrantInfo = getQuadrantInfo(selectedCase.perfusion, selectedCase.congestion)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Heart Failure
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Hemodynamic profiling and classification strategies
          </p>
        </div>

        {/* Case Selector */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
            Clinical Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hfCases.map((caseData) => (
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
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  EF: {caseData.ef}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500">
                  {caseData.classification}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Hemodynamic Quadrant */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
            Hemodynamic Profile
          </h2>

          {/* Patient Info */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {selectedCase.name}
                </h3>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      EF: {selectedCase.ef}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedCase.ef.includes('5') || selectedCase.ef.includes('6')
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  }`}>
                    {selectedCase.ef.includes('5') || selectedCase.ef.includes('6') ? 'HFpEF' : 'HFrEF'}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Clinical Features:
              </h4>
              <ul className="space-y-1">
                {selectedCase.symptoms.map((symptom, index) => (
                  <li key={index} className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    {symptom}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quadrant Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Warm & Dry */}
            <div
              className={`p-6 rounded-xl border-4 transition-all ${
                selectedCase.perfusion === 'warm' && selectedCase.congestion === 'dry'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="w-5 h-5 text-green-600 dark:text-green-400" />
                <Wind className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-1">
                Warm & Dry (A)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Compensated, euvolemic
              </p>
            </div>

            {/* Warm & Wet */}
            <div
              className={`p-6 rounded-xl border-4 transition-all ${
                selectedCase.perfusion === 'warm' && selectedCase.congestion === 'wet'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                Warm & Wet (B)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Congested, adequate perfusion
              </p>
            </div>

            {/* Cold & Dry */}
            <div
              className={`p-6 rounded-xl border-4 transition-all ${
                selectedCase.perfusion === 'cold' && selectedCase.congestion === 'dry'
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="w-5 h-5 text-orange-600 dark:text-orange-400 rotate-180" />
                <Wind className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-1">
                Cold & Dry (L)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Poor perfusion, no congestion
              </p>
            </div>

            {/* Cold & Wet */}
            <div
              className={`p-6 rounded-xl border-4 transition-all ${
                selectedCase.perfusion === 'cold' && selectedCase.congestion === 'wet'
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="w-5 h-5 text-red-600 dark:text-red-400 rotate-180" />
                <Droplets className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-semibold text-red-700 dark:text-red-300 mb-1">
                Cold & Wet (C)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Cardiogenic shock
              </p>
            </div>
          </div>

          {/* Current Profile */}
          <div className={`${quadrantInfo.bgColor} border-2 border-${quadrantInfo.color.replace('bg-', '')} rounded-xl p-4`}>
            <div className="flex items-start space-x-3">
              <AlertCircle className={`w-5 h-5 ${quadrantInfo.textColor} mt-0.5 flex-shrink-0`} />
              <div>
                <h4 className={`font-semibold ${quadrantInfo.textColor} mb-1`}>
                  {quadrantInfo.name}
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {quadrantInfo.description}
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
                HFrEF vs HFpEF
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                HFrEF (EF ≤40%): systolic dysfunction. HFpEF (EF ≥50%): diastolic dysfunction.
                Treatment strategies differ significantly.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Volume Status Assessment
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Evaluate JVP, edema, orthopnea, rales. Congestion often precedes symptoms
                by days to weeks.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Perfusion Assessment
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Cool extremities, narrow pulse pressure, altered mental status suggest
                inadequate perfusion.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Red Flags for Decompensation
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Weight gain, worsening dyspnea, orthopnea, reduced exercise tolerance,
                or new edema warrant evaluation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
