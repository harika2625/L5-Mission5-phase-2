import { useState, useCallback } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import Search from '../Search/Search';

const containerStyle = {
  width: '100%',
  height: '600px'
};

// centre on New Zealand because duh
const defaultCenter = {
  lat: -41.2865,
  lng: 174.7762
};

const defaultZoom = 6;

function Map() {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(defaultZoom);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handlePlaceSelected = useCallback((place) => {
    if (place.geometry) {
      const newCenter = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      setCenter(newCenter);
      setZoom(13); // zoom in when location selected for ease of use
    }
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <Search onPlaceSelected={handlePlaceSelected} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: true,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
        }}
      >
        {/* ⚠️ markers will be added here */}
      </GoogleMap>
    </div>
  );
}

export default Map;