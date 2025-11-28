import { useState } from 'react'
import { Waves, AlertCircle, TrendingUp, Activity } from 'lucide-react'

interface COPDCase {
  id: number
  name: string
  symptoms: string
  exacerbations: number
  hospitalizations: number
  mMRC: number
  CAT: number
  goldGroup: string
  spirometry: string
}

const copdCases: COPDCase[] = [
  {
    id: 1,
    name: '58yo Male, Ex-smoker',
    symptoms: 'Minimal dyspnea',
    exacerbations: 0,
    hospitalizations: 0,
    mMRC: 1,
    CAT: 8,
    goldGroup: 'A',
    spirometry: 'FEV1 65% predicted',
  },
  {
    id: 2,
    name: '62yo Female, Current smoker',
    symptoms: 'Moderate dyspnea',
    exacerbations: 1,
    hospitalizations: 0,
    mMRC: 2,
    CAT: 15,
    goldGroup: 'B',
    spirometry: 'FEV1 58% predicted',
  },
  {
    id: 3,
    name: '70yo Male, Frequent exacerbations',
    symptoms: 'Mild dyspnea',
    exacerbations: 3,
    hospitalizations: 1,
    mMRC: 1,
    CAT: 12,
    goldGroup: 'E',
    spirometry: 'FEV1 42% predicted',
  },
  {
    id: 4,
    name: '65yo Female, Severe symptoms',
    symptoms: 'Severe dyspnea',
    exacerbations: 2,
    hospitalizations: 2,
    mMRC: 3,
    CAT: 28,
    goldGroup: 'E',
    spirometry: 'FEV1 35% predicted',
  },
  {
    id: 5,
    name: '55yo Male, Well-managed',
    symptoms: 'Minimal symptoms',
    exacerbations: 0,
    hospitalizations: 0,
    mMRC: 0,
    CAT: 6,
    goldGroup: 'A',
    spirometry: 'FEV1 72% predicted',
  },
]

const goldGroups = {
  A: {
    name: 'Group A',
    description: 'Low symptoms, low exacerbation risk',
    color: 'bg-green-500',
    textColor: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-500',
    treatment: 'Bronchodilator (SABA or LABA) as needed or regularly',
  },
  B: {
    name: 'Group B',
    description: 'High symptoms, low exacerbation risk',
    color: 'bg-blue-500',
    textColor: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-500',
    treatment: 'LABA or LAMA; LABA + LAMA if persistent symptoms',
  },
  E: {
    name: 'Group E',
    description: 'Exacerbation history (≥2 or ≥1 hospitalization)',
    color: 'bg-red-500',
    textColor: 'text-red-700 dark:text-red-300',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-500',
    treatment: 'LABA + LAMA; consider ICS if eosinophilic or frequent exacerbations',
  },
}

export default function COPD() {
  const [selectedCase, setSelectedCase] = useState(copdCases[0])

  const currentGroup = goldGroups[selectedCase.goldGroup as keyof typeof goldGroups]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            COPD
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            GOLD classification and exacerbation-based management
          </p>
        </div>

        {/* Case Selector */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
            Clinical Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {copdCases.map((caseData) => (
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
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    goldGroups[caseData.goldGroup as keyof typeof goldGroups].bgColor
                  } ${goldGroups[caseData.goldGroup as keyof typeof goldGroups].textColor}`}>
                    GOLD {caseData.goldGroup}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Assessment */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
            GOLD Assessment
          </h2>

          {/* Patient Details */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
              {selectedCase.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Symptom Assessment
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">mMRC Score</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {selectedCase.mMRC}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">CAT Score</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {selectedCase.CAT}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Symptoms: </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {selectedCase.symptoms}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Exacerbation History
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Exacerbations (past year)
                      </div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {selectedCase.exacerbations}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Hospitalizations
                      </div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {selectedCase.hospitalizations}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Activity className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Spirometry
                      </div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {selectedCase.spirometry}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GOLD Classification */}
          <div className={`${currentGroup.bgColor} border-2 ${currentGroup.borderColor} rounded-xl p-6`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className={`text-xl font-semibold ${currentGroup.textColor} mb-1`}>
                  {currentGroup.name}
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {currentGroup.description}
                </p>
              </div>
              <div className={`${currentGroup.color} text-white px-4 py-2 rounded-lg font-bold`}>
                {selectedCase.goldGroup}
              </div>
            </div>
            <div className="bg-white/50 dark:bg-slate-900/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Recommended Treatment Approach
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {currentGroup.treatment}
              </p>
            </div>
          </div>
        </div>

        {/* GOLD Groups Grid */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
            GOLD Classification System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(goldGroups).map(([key, group]) => (
              <div
                key={key}
                className={`p-5 rounded-xl border-2 ${
                  selectedCase.goldGroup === key
                    ? `${group.bgColor} ${group.borderColor}`
                    : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className={`${group.color} text-white px-3 py-1 rounded-lg font-bold text-sm inline-block mb-3`}>
                  {group.name}
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                  {group.description}
                </p>
                <div className="text-xs text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-700">
                  {group.treatment}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Waves className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Classification Criteria
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                  Group assignment based on symptoms (mMRC ≥2 or CAT ≥10) and exacerbation history
                  (≥2 moderate or ≥1 leading to hospitalization = Group E).
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
                Smoking Cessation
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Single most effective intervention to slow disease progression. All patients
                should be counseled and offered cessation support.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Bronchodilator Therapy
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                LABAs and LAMAs are cornerstones of treatment. Dual bronchodilation
                more effective than monotherapy for symptom relief.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Exacerbation Prevention
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                ICS may reduce exacerbations in patients with eosinophilia or frequent
                exacerbations. Vaccinations (flu, pneumococcal) are essential.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Pulmonary Rehabilitation
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Improves exercise capacity, reduces dyspnea, and enhances quality of life.
                Recommended for all symptomatic patients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
