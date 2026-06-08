import { createContext, useContext } from 'react'

export interface Theme {
  dark: boolean
  bg: string
  bgAlt: string
  bgCard: string
  text: string
  textSecondary: string
  textMuted: string
  border: string
  accent: string
  accentHover: string
  accentSoft: string
  shadow: string
  toggle: () => void
}

export const DARK_THEME: Omit<Theme, 'dark' | 'toggle'> = {
  bg:            'rgba(15,23,42,0.85)',
  bgAlt:         'rgba(30,41,59,0.80)',
  bgCard:        'rgba(30,41,59,0.70)',
  text:          '#f8fafc',
  textSecondary: '#e2e8f0',
  textMuted:     '#94a3b8',
  border:        'rgba(148,163,184,0.12)',
  accent:        '#60a5fa',
  accentHover:   '#93c5fd',
  accentSoft:    'rgba(96,165,250,0.12)',
  shadow:        '0 4px 24px rgba(0,0,0,0.4)',
}

export const LIGHT_THEME: Omit<Theme, 'dark' | 'toggle'> = {
  bg:            '#ffffff',
  bgAlt:         '#f8fafc',
  bgCard:        '#ffffff',
  text:          '#0f172a',
  textSecondary: '#1e293b',
  textMuted:     '#475569',
  border:        'rgba(15,23,42,0.1)',
  accent:        '#2563eb',
  accentHover:   '#1d4ed8',
  accentSoft:    'rgba(37,99,235,0.08)',
  shadow:        '0 4px 24px rgba(0,0,0,0.08)',
}

export const ThemeContext = createContext<Theme>({
  ...DARK_THEME,
  dark: true,
  toggle: () => {},
})

export const useTheme = () => useContext(ThemeContext)
