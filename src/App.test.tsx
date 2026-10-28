import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('affiche le logo et le titre', () => {
    render(<App />)
    expect(screen.getByAltText('UNBOUND')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Prépare ta prochaine expédition.')
  })
})
