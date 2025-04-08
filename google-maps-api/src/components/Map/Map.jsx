import { useState, useCallback } from 'react';
import { GoogleMap } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px'
};

// Center on New Zealand
const defaultCenter = {
  lat: -41.2865,
  lng: 174.7762
};

const defaultZoom = 6;

function Map() {
  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={defaultZoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        zoomControl: true,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      }}
    >
      {/* Markers will be added here */}
    </GoogleMap>
  );
}

export default Map;