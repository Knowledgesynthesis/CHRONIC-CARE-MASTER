import { Sun, Moon, Info, AlertTriangle, Heart } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'

export default function Settings() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Settings
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Customize your experience
          </p>
        </div>

        {/* Theme Toggle */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Appearance
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                Theme
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Choose between light and dark mode
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="relative inline-flex items-center h-12 w-24 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <span
                className={`inline-flex items-center justify-center h-10 w-10 transform rounded-full bg-white dark:bg-slate-800 shadow-lg transition-transform ${
                  theme === 'dark' ? 'translate-x-13' : 'translate-x-1'
                }`}
              >
                {theme === 'light' ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-400" />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* About the App */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Info className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              About Chronic Care Master
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <p>
              <strong className="text-slate-900 dark:text-slate-100">Chronic Care Master</strong> is an educational
              platform designed to help healthcare professionals and students master the principles of chronic disease
              management through interactive learning modules, clinical case studies, and evidence-based guidelines.
            </p>
            <p>
              The app covers high-yield chronic conditions including diabetes mellitus, hypertension, heart failure,
              asthma, COPD, depression, and anxiety. Each module emphasizes guideline-based conceptual logic, when to
              initiate or adjust therapy, monitoring intervals, disease classification frameworks, and recognition of
              decompensation.
            </p>
            <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
              <p className="text-sm">
                <strong className="text-primary-900 dark:text-primary-100">Key Features:</strong>
              </p>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>Interactive disease modules with visual tools</li>
                <li>Longitudinal patient case scenarios</li>
                <li>Self-assessment questions with detailed rationales</li>
                <li>Comprehensive medical glossary</li>
                <li>Mobile-first, offline-capable design</li>
              </ul>
            </div>
            <p className="text-sm">
              <strong className="text-slate-900 dark:text-slate-100">Version:</strong> 1.0.0<br />
              <strong className="text-slate-900 dark:text-slate-100">Last Updated:</strong> November 2024
            </p>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Important Disclaimers
            </h2>
          </div>
          <div className="space-y-4">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                Educational Purposes Only
              </h3>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                This application is designed solely for educational purposes. It is NOT intended to replace professional
                medical advice, diagnosis, or treatment. The information provided should not be used for clinical
                decision-making or patient care.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                Not for Clinical Use
              </h3>
              <p className="text-sm text-red-800 dark:text-red-200">
                All clinical scenarios, patient cases, and laboratory values presented in this app are synthetic and for
                educational demonstration only. Do not use this application to make decisions about actual patient care.
                Always consult with qualified healthcare professionals and refer to current clinical guidelines.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                No Medication Dosing Information
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                This app intentionally does not provide specific medication names, dosages, or prescribing information.
                All treatment discussions are conceptual and educational in nature. Consult current prescribing
                information and clinical guidelines for actual medication management.
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                Guidelines May Change
              </h3>
              <p className="text-sm text-purple-800 dark:text-purple-200">
                Medical knowledge and clinical guidelines are constantly evolving. While this app is based on current
                evidence-based practices, users should always verify information with the most current guidelines from
                professional organizations (ADA, ACC/AHA, GOLD, GINA, etc.).
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Accessibility & Technical Support
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                This app strives to meet WCAG 2.2 AA accessibility standards. If you encounter any technical issues or
                accessibility concerns, please report them through appropriate channels. The app works best on modern
                browsers and devices.
              </p>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
              <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
                By using this application, you acknowledge that you have read and understood these disclaimers and agree
                to use this app solely for educational purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-lg p-6 text-center text-white">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Heart className="w-5 h-5" />
            <span className="font-semibold">Chronic Care Master</span>
          </div>
          <p className="text-sm text-primary-100">
            Empowering healthcare education through interactive learning
          </p>
        </div>
      </div>
    </div>
  )
}
