import { useState, useCallback } from 'react'
import { LoadScript } from '@react-google-maps/api'
import './App.css'
import Map from './components/Map/Map'

// Keep libraries array static outside component
const GOOGLE_MAPS_LIBRARIES = ['places', 'marker'];

function App() {
  // const [selectedStation, setSelectedStation] = useState(null)
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  const handleScriptLoad = useCallback(() => {
    console.log('Google Maps script loaded')
  }, [])

  const handleScriptError = useCallback((error) => {
    console.error('Error loading Google Maps:', error)
  }, [])

  if (!apiKey) {
    console.error('No Google Maps API key found')
    return <div>Error: Google Maps API key not configured</div>
  }

  console.log('Initializing app with libraries:', GOOGLE_MAPS_LIBRARIES)

  return (
    <div className="app-container">
      <h1>Z Station Locator</h1>
      <div className="main-content">
        <LoadScript 
          googleMapsApiKey={apiKey}
          libraries={GOOGLE_MAPS_LIBRARIES}
          onLoad={handleScriptLoad}
          onError={handleScriptError}
        >
          <Map />
        </LoadScript>
      </div>
    </div>
  )
}

export default App

// !
/*
What pins return:
{
    position: { lat: number, lng: number },  // Exact coordinates
    placeId: string,                         // Unique Google Place ID <-- ⚠️
    title: string                            // Marker title if set
}

*/