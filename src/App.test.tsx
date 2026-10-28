import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('affiche le nom et le titre', () => {
    render(<App />)
    expect(screen.getByText('UNBOUND')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Prépare ta prochaine expédition.')
  })
})
