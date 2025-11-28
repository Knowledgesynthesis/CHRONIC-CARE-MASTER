import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  Droplet,
  Heart,
  HeartPulse,
  Wind,
  Waves,
  Brain,
  FileText,
  ClipboardList,
  BookOpen,
  Settings,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/utils/cn'

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/diabetes', label: 'Diabetes', icon: Droplet },
  { path: '/hypertension', label: 'Hypertension', icon: Heart },
  { path: '/heart-failure', label: 'Heart Failure', icon: HeartPulse },
  { path: '/asthma', label: 'Asthma', icon: Wind },
  { path: '/copd', label: 'COPD', icon: Waves },
  { path: '/mood', label: 'Mood', icon: Brain },
  { path: '/cases', label: 'Cases', icon: FileText },
  { path: '/assessment', label: 'Assessment', icon: ClipboardList },
  { path: '/glossary', label: 'Glossary', icon: BookOpen },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export default function Navigation() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <HeartPulse className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              <span className="text-xl font-semibold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Chronic Care Master
              </span>
            </Link>
            <div className="flex items-center space-x-1">
              {navItems.slice(1).map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center space-x-2">
            <HeartPulse className="w-7 h-7 text-primary-600 dark:text-primary-400" />
            <span className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Chronic Care
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-2 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors',
                      isActive
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {[navItems[0], navItems[7], navItems[8], navItems[9], navItems[10]].map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex flex-col items-center justify-center py-2 rounded-lg transition-colors',
                  isActive
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-slate-500 dark:text-slate-400'
                )}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
