import { Logo } from '../brand/Logo'
import { ThemeToggle } from './ThemeToggle'
import './AppHeader.css'

type AppHeaderProps = { current: 'home' | 'identity' }

export function AppHeader({ current }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <a href="#" className="app-header-logo" aria-label="UNBOUND, accueil">
          <Logo height={15} />
        </a>
        <nav className="app-nav" aria-label="Navigation principale">
          <a href="#" aria-current={current === 'home' ? 'page' : undefined}>
            Voyages
          </a>
          <a href="#identite" aria-current={current === 'identity' ? 'page' : undefined}>
            Identité
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
