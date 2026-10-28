import { brandPaths } from './paths'

type EmblemProps = {
  /** Hauteur en pixels. Sous 32 px, la version pleine est utilisée automatiquement. */
  size?: number
  /** Forcer la version détaillée (bandes) ou pleine. */
  variant?: 'auto' | 'detailed' | 'solid'
  title?: string
  className?: string
}

/** L'emblème UNBOUND : deux demi-formes décalées qui ouvrent un passage. */
export function Emblem({ size = 32, variant = 'auto', title = 'UNBOUND', className }: EmblemProps) {
  const solid = variant === 'solid' || (variant === 'auto' && size < 32)
  return (
    <svg
      viewBox={brandPaths.emblemViewBox}
      height={size}
      className={className}
      role="img"
      aria-label={title}
      style={{ display: 'block', width: 'auto' }}
    >
      <path fill="currentColor" d={solid ? brandPaths.emblemSolid : brandPaths.emblem} />
    </svg>
  )
}
