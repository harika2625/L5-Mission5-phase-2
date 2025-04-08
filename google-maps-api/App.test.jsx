import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './src/App'

// Mock the Google Maps API components
vi.mock('@react-google-maps/api', () => ({
  LoadScript: vi.fn(({ children }) => children),
  GoogleMap: vi.fn(({ children }) => (
    <div data-testid="google-map">{children}</div>
  ))
}))

describe('Z Station Locator App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText('Z Station Locator')).toBeInTheDocument()
  })

  it('renders the map container', () => {
    render(<App />)
    expect(screen.getByTestId('google-map')).toBeInTheDocument()
  })
})