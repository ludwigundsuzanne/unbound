import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Emblem } from './Emblem'
import { brandPaths } from './paths'

describe('Emblem', () => {
  it('utilise la version pleine sous 32 px', () => {
    render(<Emblem size={16} title="petit" />)
    expect(screen.getByRole('img', { name: 'petit' }).querySelector('path')?.getAttribute('d')).toBe(brandPaths.emblemSolid)
  })

  it('utilise la version en bandes à partir de 32 px', () => {
    render(<Emblem size={48} title="grand" />)
    expect(screen.getByRole('img', { name: 'grand' }).querySelector('path')?.getAttribute('d')).toBe(brandPaths.emblem)
  })
})
