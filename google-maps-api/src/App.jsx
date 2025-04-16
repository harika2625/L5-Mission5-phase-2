import React from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import Map from './components/Map/Map';

const App = () => {
  return (
    <APIProvider 
      apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      onLoad={() => console.log('Maps API has loaded')}
      libraries={['places']}
    >
      <div style={{ width: '100vw', height: '100vh' }}>
        <Map />
      </div>
    </APIProvider>
  );
};

export default App;