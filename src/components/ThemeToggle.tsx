import { useEffect, useState } from 'react'
import { Button } from './Button'

type Theme = 'system' | 'light' | 'dark'
const LABELS: Record<Theme, string> = { system: 'Thème : auto', light: 'Thème : clair', dark: 'Thème : sombre' }
const NEXT: Record<Theme, Theme> = { system: 'light', light: 'dark', dark: 'system' }

function readTheme(): Theme {
  try {
    const t = localStorage.getItem('unbound-theme')
    return t === 'light' || t === 'dark' ? t : 'system'
  } catch {
    return 'system'
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('unbound-theme', theme)
    } catch {
      // Stockage indisponible (navigation privée) : le thème reste valable pour la session.
    }
  }, [theme])

  return (
    <Button variant="ghost" onClick={() => setTheme(NEXT[theme])}>
      {LABELS[theme]}
    </Button>
  )
}
