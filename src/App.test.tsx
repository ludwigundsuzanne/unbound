import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

afterEach(() => {
  window.location.hash = ''
  document.documentElement.removeAttribute('data-theme')
})

describe('App', () => {
  it('affiche le logo et le titre d’accueil', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: 'UNBOUND, accueil' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Prépare ta prochaine expédition.')
  })

  it('marque l’aperçu comme données d’exemple', () => {
    render(<App />)
    expect(screen.getByText(/Données inventées pour l'aperçu/)).toBeInTheDocument()
  })

  it('ouvre la page Identité depuis la navigation', () => {
    render(<App />)
    act(() => {
      window.location.hash = '#identite'
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })
    expect(screen.getByRole('heading', { name: 'Trois directions, en noir et blanc' })).toBeInTheDocument()
  })

  it('change de thème au clic', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Thème : auto' }))
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    fireEvent.click(screen.getByRole('button', { name: 'Thème : clair' }))
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })
})
