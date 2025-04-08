import { useState } from 'react'
import { LoadScript } from '@react-google-maps/api'
import './App.css'
import Map from './components/Map/Map'

function App() {
  const [selectedStation, setSelectedStation] = useState(null)

  return (
    <div className="app-container">
      <h1>Z Station Locator</h1>
      <div className="main-content">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <Map />
        </LoadScript>
      </div>
    </div>
  )
}

export default App
