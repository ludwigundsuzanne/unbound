import { brandPaths } from './paths'

type LogoProps = {
  /** Hauteur des capitales du mot, en pixels. */
  height?: number
  className?: string
}

/** Logo horizontal : emblème + mot UNBOUND. Couleur héritée (currentColor). */
export function Logo({ height = 20, className }: LogoProps) {
  const { lockup } = brandPaths
  const [, , w, h] = lockup.viewBox.split(' ').map(Number)
  const total = (height * h) / 100
  return (
    <svg
      viewBox={lockup.viewBox}
      height={total}
      width={(total * w) / h}
      className={className}
      role="img"
      aria-label="UNBOUND"
      style={{ display: 'block' }}
    >
      <path fill="currentColor" transform={lockup.emblemTransform} d={brandPaths.emblem} />
      <path fill="currentColor" transform={`translate(${lockup.wordX} 0)`} d={brandPaths.wordmark} />
    </svg>
  )
}

/** Mot seul, sans emblème. */
export function Wordmark({ height = 16, className }: LogoProps) {
  const [, , w] = brandPaths.wordmarkViewBox.split(' ').map(Number)
  return (
    <svg
      viewBox={brandPaths.wordmarkViewBox}
      height={height}
      width={(height * w) / 100}
      className={className}
      role="img"
      aria-label="UNBOUND"
      style={{ display: 'block' }}
    >
      <path fill="currentColor" d={brandPaths.wordmark} />
    </svg>
  )
}
