import './App.css'

// Étape 1 : page d'accueil minimale, pour vérifier que le déploiement marche.
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <span className="logo">UNBOUND</span>
      </header>
      <main className="app-main">
        <h1>Prépare ta prochaine expédition.</h1>
        <p className="status">Étape 1 en ligne : le squelette de l’application fonctionne.</p>
      </main>
    </div>
  )
}

export default App
