import { Button } from '../components/Button'
import { ContourField } from '../components/ContourField'
import { EmptyState } from '../components/EmptyState'
import './HomePage.css'

export function HomePage() {
  return (
    <main className="page home">
      <section className="home-hero">
        <ContourField className="home-hero-contours" />
        <span className="label">45°49′ N · 06°51′ E · Carnet d'expédition</span>
        <h1>Prépare ta prochaine expédition.</h1>
        <p>Itinéraires, météo le long du parcours, matériel et logistique, réunis au même endroit.</p>
        <div className="home-actions">
          <Button disabled>Nouveau voyage</Button>
          <Button variant="secondary" disabled>
            Importer un GPX
          </Button>
          <span className="home-note">Disponible à l'étape 2 du plan.</span>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <span className="label">Mes voyages</span>
        </div>
        <EmptyState title="Aucun voyage pour l'instant">
          Crée ton premier voyage pour y ajouter des étapes, un tracé GPX et la météo de chaque point clé.
        </EmptyState>
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <span className="label">Aperçu de l'interface · données d'exemple</span>
        </div>
        <article className="trip-card">
          <svg className="trip-map" viewBox="0 0 640 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="640" height="220" className="trip-map-bg" />
            <g fill="none" className="trip-map-contours">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <ellipse key={i} cx={420} cy={96} rx={36 + i * 46} ry={22 + i * 28} />
              ))}
            </g>
            <path d="M24 196C120 170 150 130 230 124S350 120 400 92 500 44 616 34" className="trip-map-route" />
            <circle cx="230" cy="124" r="6" className="trip-map-wp" />
            <circle cx="400" cy="92" r="6" className="trip-map-wp is-alert" />
            <circle cx="616" cy="34" r="6" className="trip-map-wp" />
            <text x="410" y="84" className="trip-map-label">
              COL 2 699
            </text>
          </svg>
          <div className="trip-body">
            <span className="label">Exemple</span>
            <h3>Traversée du Queyras</h3>
            <dl className="trip-stats">
              <div>
                <dt>Durée</dt>
                <dd>7 j</dd>
              </div>
              <div>
                <dt>Distance</dt>
                <dd>98 km</dd>
              </div>
              <div>
                <dt>Dénivelé</dt>
                <dd>↑ 6 420 m</dd>
              </div>
            </dl>
            <ul className="trip-stages">
              <li>
                <span className="trip-day">J1</span>
                <span>Ceillac → Refuge du Mélezet</span>
                <span className="pill">RAS</span>
              </li>
              <li>
                <span className="trip-day">J2</span>
                <span>Col Girardin · rafales 72 km/h prévues</span>
                <span className="pill is-alert">Vent</span>
              </li>
            </ul>
            <p className="trip-source">Données inventées pour l'aperçu. Aucune prévision réelle.</p>
          </div>
        </article>
      </section>
    </main>
  )
}
