import { Emblem } from '../brand/Emblem'
import { Logo, Wordmark } from '../brand/Logo'
import { brandPaths } from '../brand/paths'
import { Button } from '../components/Button'
import { ContourField } from '../components/ContourField'
import { EmptyState } from '../components/EmptyState'
import { Loader } from '../components/Loader'
import './IdentityPage.css'

const SIZES = [48, 32, 24, 16]

const CONCEPTS = [
  {
    key: 'A',
    name: 'Le passage',
    idea: 'Deux demi-formes séparées, décalées en hauteur. Ensemble elles forment un U ; entre elles, un passage s’ouvre.',
    d: brandPaths.emblemSolid,
    viewBox: brandPaths.emblemViewBox,
  },
  {
    key: 'B',
    name: 'Précision topographique',
    idea: 'Trois courbes de niveau en U, comme celles d’une vallée sur une carte, coupées net par une diagonale.',
    d: brandPaths.conceptTopo,
    viewBox: '0 0 256 256',
  },
  {
    key: 'C',
    name: 'Le cap',
    idea: 'Deux traits parallèles orientés vers un même point : deux trajectoires, une destination.',
    d: brandPaths.conceptHeading,
    viewBox: '0 0 256 256',
  },
]

const PALETTE = [
  { name: 'Charcoal', hex: '#1E1E1E', role: 'Texte, fonds sombres, logo' },
  { name: 'Ivoire', hex: '#F3EFE9', role: 'Fond clair, logo inversé' },
  { name: 'Pierre', hex: '#A7A79F', role: 'Texte secondaire, emblème discret' },
  { name: 'Sauge', hex: '#556B5D', role: 'Accent, survol, focus' },
  { name: 'Sable', hex: '#D9D2C6', role: 'Filets, séparateurs' },
  { name: 'Terracotta', hex: '#C8754A', role: 'Itinéraire, point d’alerte' },
]

export function IdentityPage() {
  return (
    <main className="page identity">
      <section className="id-hero">
        <ContourField className="id-hero-contours" />
        <Logo height={44} className="id-hero-logo" />
        <p>Un instrument précis pour celles et ceux qui veulent aller plus loin.</p>
      </section>

      <section className="id-section">
        <span className="label">01 · Exploration</span>
        <h2>Trois directions, en noir et blanc</h2>
        <div className="id-concepts">
          {CONCEPTS.map((c) => (
            <article key={c.key} className={`id-concept ${c.key === 'A' ? 'is-picked' : ''}`}>
              <svg viewBox={c.viewBox} className="id-concept-mark" aria-hidden="true">
                <path fill="currentColor" d={c.d} />
              </svg>
              <div className="id-concept-text">
                <span className="label">Direction {c.key}</span>
                <h3>{c.name}</h3>
                <p>{c.idea}</p>
              </div>
              <div className="id-sizes" aria-label="Test en 48, 32, 24 et 16 pixels">
                {SIZES.map((s) => (
                  <svg key={s} viewBox={c.viewBox} width={s} height={s} aria-hidden="true">
                    <path fill="currentColor" d={c.d} />
                  </svg>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="id-section id-choice">
        <div className="id-choice-mark">
          <Emblem size={240} variant="detailed" />
        </div>
        <div className="id-choice-text">
          <span className="label">02 · Direction retenue</span>
          <h2>Le passage, tracé en courbes de niveau</h2>
          <p>
            La direction A est la plus simple et la plus propre au nom : deux formes qui s’écartent, une frontière qui
            s’ouvre. Elle reste lisible à 16 px, ce que B ne fait pas, et ne ressemble ni à une flèche ni à une icône
            d’interface, contrairement à C.
          </p>
          <p>
            De B, elle garde une découverte secondaire : chaque moitié est tracée en deux bandes parallèles, comme deux
            courbes de niveau. On voit d’abord un U ouvert ; on lit la carte ensuite. Sous 32 px, l’emblème passe
            automatiquement en version pleine.
          </p>
          <p className="id-limit">
            Limite assumée : l’emblème est un U placé devant un mot qui commence par U. L’espace généreux entre les deux
            et les bandes le font lire comme un symbole plutôt qu’une lettre.
          </p>
        </div>
      </section>

      <section className="id-section">
        <span className="label">03 · Système de logo</span>
        <h2>Versions</h2>
        <div className="id-boards">
          <figure className="id-board is-light">
            <Logo height={34} />
            <figcaption className="label">Principal · fond clair</figcaption>
          </figure>
          <figure className="id-board is-dark">
            <Logo height={34} />
            <figcaption className="label">Principal · fond sombre</figcaption>
          </figure>
          <figure className="id-board is-white">
            <Logo height={34} />
            <figcaption className="label">Noir pur</figcaption>
          </figure>
          <figure className="id-board is-black">
            <Logo height={34} />
            <figcaption className="label">Blanc pur</figcaption>
          </figure>
          <figure className="id-board is-sage">
            <Emblem size={96} />
            <figcaption className="label">Emblème seul · une couleur</figcaption>
          </figure>
          <figure className="id-board is-light">
            <Wordmark height={26} />
            <figcaption className="label">Mot seul</figcaption>
          </figure>
        </div>
      </section>

      <section className="id-section">
        <span className="label">04 · Icône d’appli et favicon</span>
        <h2>Pensée pour l’écran d’accueil</h2>
        <div className="id-icons">
          {[180, 60, 48, 32, 24, 16].map((s) => (
            <figure key={s} className="id-icon-fig">
              <div className="id-app-icon" style={{ width: s, height: s, borderRadius: s * 0.225 }}>
                <Emblem size={Math.round(s * 0.56)} />
              </div>
              <figcaption className="label">{s}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="id-section">
        <span className="label">05 · Couleurs</span>
        <h2>Palette</h2>
        <div className="id-palette">
          {PALETTE.map((c) => (
            <div key={c.hex} className="id-swatch">
              <div className="id-swatch-chip" style={{ background: c.hex }} />
              <strong>{c.name}</strong>
              <code>{c.hex}</code>
              <span>{c.role}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="id-section">
        <span className="label">06 · Typographie</span>
        <h2>Deux familles, une écriture de terrain</h2>
        <div className="id-type">
          <div>
            <span className="label">Sora · titres et mot</span>
            <p className="id-type-display">Col Girardin, 2 699 m</p>
          </div>
          <div>
            <span className="label">Inter · interface</span>
            <p className="id-type-body">Départ conseillé avant 7 h pour passer le col avant la hausse du vent.</p>
          </div>
          <div>
            <span className="label">Monospace système · relevés</span>
            <p className="id-type-mono">45°49′N 06°51′E · ↑ 1 140 m · 05:40</p>
          </div>
        </div>
      </section>

      <section className="id-section">
        <span className="label">07 · Composants</span>
        <h2>Boutons, chargement, état vide</h2>
        <div className="id-components">
          <div className="id-row">
            <Button>Planifier</Button>
            <Button variant="secondary">Importer un GPX</Button>
            <Button variant="ghost">Annuler</Button>
          </div>
          <Loader label="Récupération de la météo…" />
          <EmptyState title="Aucune étape">Ajoute une étape pour tracer ton premier itinéraire.</EmptyState>
        </div>
      </section>
    </main>
  )
}
