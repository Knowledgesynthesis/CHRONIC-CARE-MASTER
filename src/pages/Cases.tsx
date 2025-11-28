import { useState } from 'react'
import { FileText, ChevronRight, Calendar, Activity, AlertCircle } from 'lucide-react'

interface Visit {
  date: string
  findings: string[]
  vitals?: {
    bp?: string
    hr?: number
    weight?: string
  }
  labs?: {
    a1c?: number
    creatinine?: number
    ldl?: number
    [key: string]: number | undefined
  }
  assessment: string
  plan: string
}

interface ClinicalCase {
  id: number
  title: string
  category: string
  patientInfo: string
  chiefConcern: string
  visits: Visit[]
  learningPoints: string[]
}

const clinicalCases: ClinicalCase[] = [
  {
    id: 1,
    title: 'Type 2 Diabetes - Escalating Therapy',
    category: 'Diabetes',
    patientInfo: '58-year-old male with obesity, sedentary lifestyle',
    chiefConcern: 'Poor glycemic control despite lifestyle modifications',
    visits: [
      {
        date: 'January 2024',
        findings: ['A1c 8.4%', 'Patient trying diet/exercise for 3 months', 'No microvascular complications'],
        vitals: { bp: '138/84', weight: '105 kg' },
        labs: { a1c: 8.4, creatinine: 0.9 },
        assessment: 'Type 2 DM, inadequate control with lifestyle alone',
        plan: 'Initiate first-line therapy. Continue lifestyle modifications. Follow-up in 3 months.',
      },
      {
        date: 'April 2024',
        findings: ['A1c 7.8%', 'Good medication adherence', 'Lost 3 kg'],
        vitals: { bp: '132/80', weight: '102 kg' },
        labs: { a1c: 7.8, creatinine: 0.9 },
        assessment: 'Improved but not at goal',
        plan: 'Continue current therapy. Reinforce lifestyle. Recheck in 3 months.',
      },
      {
        date: 'July 2024',
        findings: ['A1c 7.1%', 'Weight stable', 'No hypoglycemia'],
        vitals: { bp: '128/78', weight: '101 kg' },
        labs: { a1c: 7.1, creatinine: 0.9 },
        assessment: 'At glycemic goal',
        plan: 'Continue current regimen. Annual screening for complications. Follow-up in 6 months.',
      },
    ],
    learningPoints: [
      'A1c should be rechecked every 3 months when not at goal',
      'Sequential A1c values guide therapy intensification',
      'Lifestyle modifications remain important even with pharmacotherapy',
      'Monitoring interval extends to 6 months once at stable goal',
    ],
  },
  {
    id: 2,
    title: 'Heart Failure - Recognizing Decompensation',
    category: 'Heart Failure',
    patientInfo: '72-year-old female with HFrEF (EF 30%), ischemic cardiomyopathy',
    chiefConcern: 'Progressive dyspnea and lower extremity edema',
    visits: [
      {
        date: 'Baseline (1 month ago)',
        findings: ['NYHA Class II', 'Weight 68 kg', 'No edema', 'Dry lung exam'],
        vitals: { bp: '118/72', weight: '68 kg' },
        assessment: 'HFrEF, compensated (Profile A: warm & dry)',
        plan: 'Continue guideline-directed medical therapy. Daily weights. Sodium restriction.',
      },
      {
        date: 'Today',
        findings: ['Weight gain 4 kg over 1 week', '2+ pitting edema bilateral', 'Bibasilar rales', 'Orthopnea (3 pillows)'],
        vitals: { bp: '124/76', weight: '72 kg' },
        assessment: 'Acute decompensated HF (Profile B: warm & wet)',
        plan: 'Increase diuretic dose. Restrict fluids <2L/day. Close follow-up in 2-3 days.',
      },
      {
        date: '3 Days Later',
        findings: ['Weight down to 69 kg', 'Trace edema only', 'Clear lungs', 'Improved dyspnea'],
        vitals: { bp: '116/70', weight: '69 kg' },
        assessment: 'Responding to diuresis',
        plan: 'Continue adjusted diuretic dose. Daily weights. Return to baseline regimen when euvolemic.',
      },
    ],
    learningPoints: [
      'Weight gain often precedes symptoms of volume overload',
      'Hemodynamic profiling guides acute management',
      'Profile B (warm & wet) most common decompensation pattern',
      'Early intervention can prevent hospitalization',
    ],
  },
  {
    id: 3,
    title: 'Hypertension - Step-Up Therapy',
    category: 'Hypertension',
    patientInfo: '55-year-old male with no other comorbidities',
    chiefConcern: 'Persistently elevated blood pressure',
    visits: [
      {
        date: 'Initial Visit',
        findings: ['Office BP 142/88', 'Home BP average 138/86', 'No end-organ damage'],
        vitals: { bp: '142/88' },
        assessment: 'Stage 2 hypertension, low cardiovascular risk',
        plan: 'Lifestyle modifications + single-agent therapy. Home BP monitoring.',
      },
      {
        date: '1 Month Follow-up',
        findings: ['Office BP 136/84', 'Home BP 132/82', 'Good medication adherence'],
        vitals: { bp: '136/84' },
        assessment: 'Improved but not at goal (<130/80)',
        plan: 'Add second agent (combination therapy). Continue lifestyle modifications.',
      },
      {
        date: '1 Month Later',
        findings: ['Office BP 126/78', 'Home BP 124/76', 'No adverse effects'],
        vitals: { bp: '126/78' },
        assessment: 'At goal BP',
        plan: 'Continue dual therapy. Follow-up in 3-6 months.',
      },
    ],
    learningPoints: [
      'Home BP monitoring helps confirm diagnosis and assess control',
      'Most patients require combination therapy for BP goal',
      'Reassess within 1 month when adjusting therapy',
      'Goal BP <130/80 for most patients',
    ],
  },
  {
    id: 4,
    title: 'COPD - Exacerbation Management',
    category: 'COPD',
    patientInfo: '68-year-old male, 40 pack-year smoking history (quit 2 years ago)',
    chiefConcern: 'Increased dyspnea and productive cough',
    visits: [
      {
        date: 'Baseline',
        findings: ['GOLD Group B', 'Stable on LABA/LAMA', 'No exacerbations in past year'],
        assessment: 'COPD, well-controlled',
        plan: 'Continue current therapy. Influenza and pneumococcal vaccines up to date.',
      },
      {
        date: 'Acute Visit',
        findings: ['Worsening dyspnea × 3 days', 'Increased sputum production (yellow)', 'Low-grade fever'],
        assessment: 'COPD exacerbation, moderate severity',
        plan: 'Oral corticosteroid burst. Antibiotics. Increase bronchodilator frequency.',
      },
      {
        date: '2 Weeks Later',
        findings: ['Symptoms resolved', 'Back to baseline', 'Completed therapy course'],
        assessment: 'GOLD Group E (due to exacerbation history)',
        plan: 'Continue LABA/LAMA. Reassess in 3 months. Consider ICS if further exacerbations.',
      },
    ],
    learningPoints: [
      'COPD classification changes based on exacerbation history',
      '≥2 exacerbations or ≥1 hospitalization → Group E',
      'Group E requires more intensive therapy to prevent future exacerbations',
      'Prompt treatment of exacerbations can prevent deterioration',
    ],
  },
  {
    id: 5,
    title: 'Depression - Treatment Phases',
    category: 'Mood',
    patientInfo: '42-year-old female, first episode of major depression',
    chiefConcern: 'Persistent low mood and anhedonia',
    visits: [
      {
        date: 'Initial Presentation',
        findings: ['PHQ-9: 16 (moderately severe)', 'Symptoms for 2 months', 'No suicidal ideation', 'Functional impairment at work'],
        assessment: 'Major Depressive Disorder, moderate-severe',
        plan: 'Initiate therapy. Psychotherapy referral. Close follow-up in 2 weeks.',
      },
      {
        date: '2 Weeks Later',
        findings: ['PHQ-9: 14', 'Slight improvement', 'Good medication tolerance', 'Started therapy'],
        assessment: 'Early response, acute treatment phase',
        plan: 'Continue current dose. Follow-up in 2 weeks.',
      },
      {
        date: '8 Weeks',
        findings: ['PHQ-9: 6 (mild)', 'Significant improvement', 'Back to work full-time', 'Continuing therapy sessions'],
        assessment: 'Good response, entering continuation phase',
        plan: 'Continue treatment for 4-9 months to prevent relapse. Monthly follow-ups.',
      },
      {
        date: '6 Months',
        findings: ['PHQ-9: 4 (minimal)', 'In remission', 'No side effects'],
        assessment: 'Sustained remission, maintenance phase',
        plan: 'Continue therapy for total 12+ months. Gradually taper therapy after discussion.',
      },
    ],
    learningPoints: [
      'Acute phase (6-12 weeks): achieve symptom reduction',
      'Continuation phase (4-9 months): prevent relapse',
      'Maintenance phase (12+ months): prevent recurrence',
      'Premature discontinuation increases relapse risk',
    ],
  },
]

export default function Cases() {
  const [selectedCase, setSelectedCase] = useState(clinicalCases[0])
  const [selectedVisitIndex, setSelectedVisitIndex] = useState(0)

  const selectedVisit = selectedCase.visits[selectedVisitIndex]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Clinical Cases
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Longitudinal patient scenarios demonstrating chronic disease management
          </p>
        </div>

        {/* Case Selector */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
            Select a Case
          </h2>
          <div className="space-y-3">
            {clinicalCases.map((caseData) => (
              <button
                key={caseData.id}
                onClick={() => {
                  setSelectedCase(caseData)
                  setSelectedVisitIndex(0)
                }}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  selectedCase.id === caseData.id
                    ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500'
                    : 'bg-slate-50 dark:bg-slate-800 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <FileText className="w-4 h-4 text-primary-500" />
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {caseData.title}
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      {caseData.patientInfo}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-500">
                      {caseData.visits.length} visits
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${
                    selectedCase.id === caseData.id ? 'rotate-90' : ''
                  }`} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Case Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">
                Visit Timeline
              </h3>
              <div className="space-y-3">
                {selectedCase.visits.map((visit, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVisitIndex(index)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedVisitIndex === index
                        ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500'
                        : 'bg-slate-50 dark:bg-slate-800 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-primary-500" />
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {visit.date}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Visit Details */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-primary-500" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {selectedVisit.date}
                </h3>
              </div>

              {/* Vitals */}
              {selectedVisit.vitals && (
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="w-4 h-4 text-red-500" />
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      Vitals
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedVisit.vitals.bp && (
                      <div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">BP</div>
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {selectedVisit.vitals.bp}
                        </div>
                      </div>
                    )}
                    {selectedVisit.vitals.hr && (
                      <div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">HR</div>
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {selectedVisit.vitals.hr} bpm
                        </div>
                      </div>
                    )}
                    {selectedVisit.vitals.weight && (
                      <div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Weight</div>
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {selectedVisit.vitals.weight}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Findings */}
              <div className="mb-4">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  Clinical Findings
                </h4>
                <ul className="space-y-1">
                  {selectedVisit.findings.map((finding, index) => (
                    <li key={index} className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                      <span className="text-primary-500 mr-2">•</span>
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Assessment */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Assessment
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  {selectedVisit.assessment}
                </p>
              </div>

              {/* Plan */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                  Plan
                </h4>
                <p className="text-sm text-green-800 dark:text-green-200">
                  {selectedVisit.plan}
                </p>
              </div>
            </div>

            {/* Learning Points */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Key Learning Points
                </h3>
              </div>
              <ul className="space-y-2">
                {selectedCase.learningPoints.map((point, index) => (
                  <li key={index} className="text-sm text-slate-600 dark:text-slate-400 flex items-start">
                    <span className="text-amber-500 mr-2 font-bold">→</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
