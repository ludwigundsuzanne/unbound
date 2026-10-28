import { useEffect, useState } from 'react'
import { AppHeader } from './components/AppHeader'
import { HomePage } from './pages/HomePage'
import { IdentityPage } from './pages/IdentityPage'

type View = 'home' | 'identity'

function viewFromHash(): View {
  return window.location.hash === '#identite' ? 'identity' : 'home'
}

function App() {
  const [view, setView] = useState<View>(viewFromHash)

  useEffect(() => {
    const onHash = () => {
      setView(viewFromHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <>
      <AppHeader current={view} />
      {view === 'identity' ? <IdentityPage /> : <HomePage />}
    </>
  )
}

export default App
