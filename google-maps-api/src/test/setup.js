import '@testing-library/jest-dom/vitest'
import { vi, afterEach } from 'vitest'

// Mock window.google.maps
const mockGoogleMaps = {
  Map: vi.fn(),
  Marker: vi.fn(),
  InfoWindow: vi.fn(),
  LatLng: vi.fn(),
  places: {
    AutocompleteService: vi.fn(),
    PlacesService: vi.fn(),
  },
}

// Setup global mocks
window.google = {
  maps: mockGoogleMaps,
}

// Mock ResizeObserver
window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock IntersectionObserver
window.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock fetch if needed
window.fetch = vi.fn()

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks()
})