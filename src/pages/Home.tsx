import { Link } from 'react-router-dom'
import {
  Droplet,
  Heart,
  HeartPulse,
  Wind,
  Waves,
  Brain,
  FileText,
  ClipboardList,
  BookOpen,
  ArrowRight
} from 'lucide-react'

const modules = [
  {
    title: 'Diabetes',
    description: 'Type 1 & Type 2 management, A1c tracking, and complication screening',
    icon: Droplet,
    path: '/diabetes',
    color: 'bg-blue-500',
  },
  {
    title: 'Hypertension',
    description: 'BP staging, treatment algorithms, and resistant HTN strategies',
    icon: Heart,
    path: '/hypertension',
    color: 'bg-red-500',
  },
  {
    title: 'Heart Failure',
    description: 'HFrEF vs HFpEF, volume status, and decompensation recognition',
    icon: HeartPulse,
    path: '/heart-failure',
    color: 'bg-rose-500',
  },
  {
    title: 'Asthma',
    description: 'Severity classification, step-up/down logic, and trigger management',
    icon: Wind,
    path: '/asthma',
    color: 'bg-cyan-500',
  },
  {
    title: 'COPD',
    description: 'GOLD classification, exacerbation management, and long-term strategies',
    icon: Waves,
    path: '/copd',
    color: 'bg-teal-500',
  },
  {
    title: 'Mood Disorders',
    description: 'Depression & anxiety screening, follow-up intervals, and treatment logic',
    icon: Brain,
    path: '/mood',
    color: 'bg-purple-500',
  },
  {
    title: 'Clinical Cases',
    description: 'Longitudinal patient scenarios across multiple chronic conditions',
    icon: FileText,
    path: '/cases',
    color: 'bg-amber-500',
  },
  {
    title: 'Assessment',
    description: 'Test your knowledge with MCQs and clinical reasoning exercises',
    icon: ClipboardList,
    path: '/assessment',
    color: 'bg-emerald-500',
  },
  {
    title: 'Glossary',
    description: 'Key terms and concepts in chronic disease management',
    icon: BookOpen,
    path: '/glossary',
    color: 'bg-indigo-500',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            Chronic Care Master
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Master the art of chronic disease management through interactive learning,
            clinical case studies, and evidence-based guidelines.
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon
            return (
              <Link
                key={module.path}
                to={module.path}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${module.color} p-3 rounded-xl text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">
                  {module.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {module.description}
                </p>
              </Link>
            )
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-full text-sm text-primary-700 dark:text-primary-300">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
            <span>Educational purposes only • Not for clinical decision-making</span>
          </div>
        </div>
      </div>
    </div>
  )
}
