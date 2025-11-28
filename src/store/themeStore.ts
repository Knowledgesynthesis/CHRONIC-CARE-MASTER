import { create } from 'zustand'

interface ThemeStore {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

// Initialize theme from localStorage
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme-storage')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        return parsed.state?.theme || 'dark'
      } catch {
        return 'dark'
      }
    }
  }
  return 'dark'
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: getInitialTheme(),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme-storage', JSON.stringify({ state: { theme: newTheme } }))
      }
      return { theme: newTheme }
    }),
  setTheme: (theme) => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme-storage', JSON.stringify({ state: { theme } }))
    }
    set({ theme })
  },
}))
