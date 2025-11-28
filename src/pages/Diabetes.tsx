import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react'

const a1cCases = [
  {
    id: 'case1',
    title: 'Newly Diagnosed Type 2 DM',
    data: [
      { month: 'Jan', value: 8.4 },
      { month: 'Apr', value: 7.8 },
      { month: 'Jul', value: 7.1 },
      { month: 'Oct', value: 6.8 },
    ],
    interpretation: 'Improving glycemic control with lifestyle modifications and first-line therapy.',
  },
  {
    id: 'case2',
    title: 'Poor Medication Adherence',
    data: [
      { month: 'Jan', value: 7.2 },
      { month: 'Apr', value: 7.8 },
      { month: 'Jul', value: 8.5 },
      { month: 'Oct', value: 9.1 },
    ],
    interpretation: 'Worsening glycemic control suggests need for adherence assessment and therapy intensification.',
  },
  {
    id: 'case3',
    title: 'Well-Controlled Type 1 DM',
    data: [
      { month: 'Jan', value: 7.0 },
      { month: 'Apr', value: 6.9 },
      { month: 'Jul', value: 7.1 },
      { month: 'Oct', value: 7.0 },
    ],
    interpretation: 'Stable glycemic control at target. Continue current regimen and monitoring.',
  },
  {
    id: 'case4',
    title: 'Therapy Adjustment Needed',
    data: [
      { month: 'Jan', value: 8.2 },
      { month: 'Apr', value: 8.4 },
      { month: 'Jul', value: 8.3 },
      { month: 'Oct', value: 8.5 },
    ],
    interpretation: 'Persistently elevated A1c despite therapy suggests need for treatment escalation.',
  },
]

const learningPoints = [
  {
    title: 'Target A1c',
    content: 'Most patients: <7.0%. Individualize based on age, comorbidities, and hypoglycemia risk.',
  },
  {
    title: 'Monitoring Frequency',
    content: 'Every 3 months if not at goal or therapy changed. Every 6 months if stable and at goal.',
  },
  {
    title: 'Interpretation',
    content: 'A1c reflects average glucose over 2-3 months. Trends more important than single values.',
  },
  {
    title: 'Hypoglycemia Risk',
    content: 'Consider less stringent targets (7.5-8.0%) in elderly, limited life expectancy, or high hypoglycemia risk.',
  },
]

export default function Diabetes() {
  const [selectedCase, setSelectedCase] = useState(a1cCases[0])

  const getTrend = () => {
    const data = selectedCase.data
    const firstValue = data[0].value
    const lastValue = data[data.length - 1].value
    const change = lastValue - firstValue

    if (Math.abs(change) < 0.3) return { icon: Minus, text: 'Stable', color: 'text-blue-500' }
    if (change > 0) return { icon: TrendingUp, text: 'Worsening', color: 'text-red-500' }
    return { icon: TrendingDown, text: 'Improving', color: 'text-green-500' }
  }

  const trend = getTrend()
  const TrendIcon = trend.icon

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Diabetes Mellitus
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Explore A1c trends and long-term glycemic control strategies
          </p>
        </div>

        {/* A1c Trajectory Tool */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
            A1c Trajectory Analysis
          </h2>

          {/* Case Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {a1cCases.map((caseData) => (
              <button
                key={caseData.id}
                onClick={() => setSelectedCase(caseData)}
                className={`p-4 rounded-lg text-left transition-all ${
                  selectedCase.id === caseData.id
                    ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500'
                    : 'bg-slate-50 dark:bg-slate-800 border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {caseData.title}
                </span>
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {selectedCase.title}
              </h3>
              <div className={`flex items-center space-x-2 ${trend.color} font-semibold`}>
                <TrendIcon className="w-5 h-5" />
                <span>{trend.text}</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={selectedCase.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                  style={{ fontSize: '0.875rem' }}
                />
                <YAxis
                  domain={[5, 10]}
                  stroke="#64748b"
                  style={{ fontSize: '0.875rem' }}
                  label={{ value: 'A1c (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#f1f5f9',
                  }}
                />
                <ReferenceLine y={7.0} stroke="#10b981" strokeDasharray="3 3" label="Target" />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Interpretation */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Clinical Interpretation
                </h4>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  {selectedCase.interpretation}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Points */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">
            Key Learning Points
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningPoints.map((point, index) => (
              <div
                key={index}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4"
              >
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {point.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {point.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
