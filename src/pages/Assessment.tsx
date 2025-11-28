import { useState } from 'react'
import { ClipboardList, CheckCircle, XCircle, RotateCcw } from 'lucide-react'

interface Question {
  id: number
  category: string
  question: string
  options: string[]
  correctAnswer: number
  rationale: string
}

const questions: Question[] = [
  {
    id: 1,
    category: 'Diabetes',
    question: 'A 55-year-old patient with type 2 diabetes has an A1c of 8.2% despite lifestyle modifications for 3 months. What is the most appropriate next step?',
    options: [
      'Continue lifestyle modifications for another 3 months',
      'Initiate pharmacotherapy',
      'Refer to endocrinology',
      'Order continuous glucose monitoring',
    ],
    correctAnswer: 1,
    rationale: 'A1c >7% after 3 months of lifestyle modifications indicates need for pharmacologic therapy initiation. Guidelines recommend starting medication promptly rather than prolonged observation.',
  },
  {
    id: 2,
    category: 'Diabetes',
    question: 'How often should A1c be monitored in a patient who is not at glycemic goal?',
    options: [
      'Every month',
      'Every 3 months',
      'Every 6 months',
      'Annually',
    ],
    correctAnswer: 1,
    rationale: 'A1c should be checked every 3 months when not at goal or when therapy is changed. Once stable and at goal, monitoring can extend to every 6 months.',
  },
  {
    id: 3,
    category: 'Hypertension',
    question: 'A 52-year-old with no comorbidities has office BP of 138/86 mmHg. Home BP averages 136/84 mmHg. What is the classification?',
    options: [
      'Normal BP',
      'Elevated BP',
      'Stage 1 hypertension',
      'Stage 2 hypertension',
    ],
    correctAnswer: 2,
    rationale: 'Stage 1 hypertension is defined as systolic 130-139 or diastolic 80-89 mmHg. Home BP monitoring is preferred for confirming the diagnosis.',
  },
  {
    id: 4,
    category: 'Hypertension',
    question: 'What is the blood pressure goal for most adults with hypertension?',
    options: [
      '<140/90 mmHg',
      '<130/80 mmHg',
      '<120/80 mmHg',
      '<150/90 mmHg',
    ],
    correctAnswer: 1,
    rationale: 'Current guidelines recommend a BP goal of <130/80 mmHg for most adults. Higher goals may be appropriate for elderly or those with limited life expectancy.',
  },
  {
    id: 5,
    category: 'Heart Failure',
    question: 'A patient with HFrEF (EF 25%) presents with orthopnea, bibasilar rales, and 2+ pitting edema. Extremities are warm. What hemodynamic profile does this represent?',
    options: [
      'Profile A (Warm & Dry)',
      'Profile B (Warm & Wet)',
      'Profile C (Cold & Wet)',
      'Profile L (Cold & Dry)',
    ],
    correctAnswer: 1,
    rationale: 'Profile B (Warm & Wet) indicates adequate perfusion (warm) with volume overload (wet). This is the most common decompensation pattern and typically responds to diuresis.',
  },
  {
    id: 6,
    category: 'Heart Failure',
    question: 'What is the primary difference between HFrEF and HFpEF?',
    options: [
      'Symptom severity',
      'Ejection fraction',
      'Response to diuretics',
      'Mortality rate',
    ],
    correctAnswer: 1,
    rationale: 'HFrEF is defined by reduced ejection fraction (≤40%), representing systolic dysfunction. HFpEF has preserved EF (≥50%), representing diastolic dysfunction. Treatment strategies differ significantly.',
  },
  {
    id: 7,
    category: 'Asthma',
    question: 'A patient has asthma symptoms >2 days/week but not daily, and nighttime awakenings 3-4 times/month. What is the severity classification?',
    options: [
      'Intermittent',
      'Mild Persistent',
      'Moderate Persistent',
      'Severe Persistent',
    ],
    correctAnswer: 1,
    rationale: 'Mild Persistent asthma: symptoms >2 days/week but not daily, nighttime awakenings 3-4 times/month. This corresponds to Step 2 therapy.',
  },
  {
    id: 8,
    category: 'Asthma',
    question: 'What does frequent use of short-acting beta-agonists (SABA) indicate?',
    options: [
      'Appropriate asthma management',
      'Poor asthma control',
      'Severe asthma',
      'Exercise-induced bronchoconstriction',
    ],
    correctAnswer: 1,
    rationale: 'SABA use >2 days/week (excluding pre-exercise use) indicates poor asthma control and need for controller therapy initiation or intensification.',
  },
  {
    id: 9,
    category: 'COPD',
    question: 'A patient with COPD has had 3 exacerbations in the past year, one requiring hospitalization. Which GOLD group is this?',
    options: [
      'Group A',
      'Group B',
      'Group C',
      'Group E',
    ],
    correctAnswer: 3,
    rationale: 'Group E: ≥2 moderate exacerbations or ≥1 leading to hospitalization in the past year. This classification drives more intensive therapy to prevent future exacerbations.',
  },
  {
    id: 10,
    category: 'COPD',
    question: 'What is the single most effective intervention to slow COPD progression?',
    options: [
      'Long-acting bronchodilators',
      'Inhaled corticosteroids',
      'Smoking cessation',
      'Pulmonary rehabilitation',
    ],
    correctAnswer: 2,
    rationale: 'Smoking cessation is the only intervention proven to slow the rate of lung function decline in COPD. All patients should receive cessation counseling and support.',
  },
  {
    id: 11,
    category: 'Mood',
    question: 'A patient has a PHQ-9 score of 16. What is the severity of depression?',
    options: [
      'Mild',
      'Moderate',
      'Moderately Severe',
      'Severe',
    ],
    correctAnswer: 2,
    rationale: 'PHQ-9 scores: 5-9 (mild), 10-14 (moderate), 15-19 (moderately severe), 20-27 (severe). A score of 16 falls in the moderately severe range.',
  },
  {
    id: 12,
    category: 'Mood',
    question: 'How long should antidepressant therapy continue after achieving remission in a first episode of depression?',
    options: [
      '1-2 months',
      '3-6 months',
      '4-9 months (continuation) then consider maintenance',
      '1-2 weeks after symptom resolution',
    ],
    correctAnswer: 2,
    rationale: 'After achieving remission, continue therapy for 4-9 months (continuation phase) to prevent relapse. For recurrent depression, consider longer maintenance therapy (12+ months).',
  },
]

export default function Assessment() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showRationale, setShowRationale] = useState(false)

  const categories = ['All', 'Diabetes', 'Hypertension', 'Heart Failure', 'Asthma', 'COPD', 'Mood']

  const filteredQuestions = selectedCategory === 'All'
    ? questions
    : questions.filter(q => q.category === selectedCategory)

  const currentQuestion = filteredQuestions[currentQuestionIndex]

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index)
    setShowRationale(true)
  }

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowRationale(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswer(null)
      setShowRationale(false)
    }
  }

  const handleReset = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowRationale(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Assessment
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Test your knowledge with clinical reasoning questions
          </p>
        </div>

        {/* Category Filter */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-6">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
            Filter by Category
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentQuestionIndex(0)
                  setSelectedAnswer(null)
                  setShowRationale(false)
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 md:p-8 mb-6">
          {/* Question Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <ClipboardList className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Question {currentQuestionIndex + 1} of {filteredQuestions.length}
              </span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
              {currentQuestion.category}
            </span>
          </div>

          {/* Question */}
          <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === currentQuestion.correctAnswer
              const showResult = showRationale

              return (
                <button
                  key={index}
                  onClick={() => !showRationale && handleAnswerSelect(index)}
                  disabled={showRationale}
                  className={`w-full p-4 rounded-lg text-left transition-all border-2 ${
                    showResult
                      ? isCorrect
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                        : isSelected
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                      : isSelected
                      ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700'
                  } ${showRationale ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-sm md:text-base text-slate-900 dark:text-slate-100 flex-1">
                      {option}
                    </span>
                    {showResult && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 ml-2 flex-shrink-0" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 ml-2 flex-shrink-0" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Rationale */}
          {showRationale && (
            <div className={`rounded-lg p-4 border-2 ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? 'text-green-900 dark:text-green-100'
                  : 'text-blue-900 dark:text-blue-100'
              }`}>
                {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Explanation'}
              </h4>
              <p className={`text-sm ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? 'text-green-800 dark:text-green-200'
                  : 'text-blue-800 dark:text-blue-200'
              }`}>
                {currentQuestion.rationale}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              currentQuestionIndex === 0
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            Previous
          </button>

          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === filteredQuestions.length - 1}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              currentQuestionIndex === filteredQuestions.length - 1
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
