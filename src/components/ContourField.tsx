/** Courbes de niveau décoratives, fines et discrètes, pour les fonds de section. */
export function ContourField({ className }: { className?: string }) {
  const rings = [0, 1, 2, 3, 4, 5, 6, 7]
  return (
    <svg className={className} viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        {rings.map((i) => (
          <ellipse key={i} cx={430 - i * 6} cy={120 + i * 5} rx={30 + i * 34} ry={18 + i * 22} transform={`rotate(${-8 + i} 430 120)`} />
        ))}
      </g>
    </svg>
  )
}
