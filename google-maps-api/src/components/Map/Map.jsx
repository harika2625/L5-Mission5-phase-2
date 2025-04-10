import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import Search from '../Search/Search';

// styles for the map container to ensure it fills the available space
const containerStyle = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0
};

// default center coordinates (wellington city center)
const defaultCenter = {
  lat: -41.2865,
  lng: 174.7762
};

// initial zoom level for the map (city level view)
const defaultZoom = 13;

// custom hook to manage map viewport
const useMapViewport = (map) => {
  const [viewport, setViewport] = useState({
    center: defaultCenter,
    zoom: defaultZoom
  });

  // update viewport when map instance changes
  useEffect(() => {
    if (map) {
      const currentCenter = map.getCenter();
      setViewport({
        center: { lat: currentCenter.lat(), lng: currentCenter.lng() },
        zoom: map.getZoom()
      });
    }
  }, [map]);

  // function to update viewport with new location
  const updateViewport = useCallback((position, newViewport = null) => {
    if (!map) return;

    try {
      if (newViewport) {
        // create bounds from viewport data
        const bounds = new window.google.maps.LatLngBounds(
          { lat: newViewport.south, lng: newViewport.west },
          { lat: newViewport.north, lng: newViewport.east }
        );

        // fit bounds with padding
        map.fitBounds(bounds, {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50
        });
      } else {
        // if no viewport provided, center on position with default zoom
        map.setCenter(position);
        map.setZoom(17);
      }

      // update state with new viewport
      const updatedCenter = map.getCenter();
      setViewport({
        center: { lat: updatedCenter.lat(), lng: updatedCenter.lng() },
        zoom: map.getZoom()
      });
    } catch (error) {
      console.error('Error updating viewport:', error);
    }
  }, [map]);

  return { viewport, updateViewport };
};

// main map component that handles the google maps integration
function Map() {
  // state to track the map instance
  const [map, setMap] = useState(null);
  
  // refs to persist marker and info window instances between renders
  const markerRef = useRef(null);
  const infoWindowRef = useRef(null);

  // use our custom viewport hook
  const { viewport, updateViewport } = useMapViewport(map);

  // initializes the map and creates marker and info window
  // this runs once when the map first loads
  const onLoad = useCallback((mapInstance) => {
    console.log('Map instance loaded');
    setMap(mapInstance);

    try {
      if (!window.google) {
        console.error('Google Maps not loaded');
        return;
      }

      // create new marker at default center position
      markerRef.current = new window.google.maps.marker.AdvancedMarkerElement({
        map: mapInstance,
        position: defaultCenter
      });

      // create info window for displaying place details
      infoWindowRef.current = new window.google.maps.InfoWindow({});
    } catch (error) {
      console.error('Error initializing marker:', error);
    }
  }, []);

  // cleans up map resources when component unmounts
  // prevents memory leaks by removing markers and listeners
  const onUnmount = useCallback(() => {
    console.log('Map unmounting');
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }
    if (infoWindowRef.current) {
      infoWindowRef.current.close();
      infoWindowRef.current = null;
    }
    setMap(null);
  }, []);

  // updates the info window content and position
  // called when a new place is selected to show its details
  const updateInfoWindow = useCallback((content, location) => {
    if (!infoWindowRef.current || !markerRef.current || !map) {
      console.error('Info window, marker, or map not initialized');
      return;
    }

    // set the html content and position of the info window
    infoWindowRef.current.setContent(content);
    infoWindowRef.current.setPosition(location);
    
    // open the info window anchored to the marker
    infoWindowRef.current.open({
      map,
      anchor: markerRef.current,
      shouldFocus: false,
    });
  }, [map]);

  // handles when a place is selected from the search box
  // updates marker position, map viewport, and info window
  const handlePlaceSelected = useCallback(async (placeData) => {
    console.log('Handling place selection:', placeData);
    
    if (!map || !markerRef.current) {
      console.error('Map or marker not initialized');
      return;
    }

    const { lat, lng, viewport: newViewport, displayName, formattedAddress } = placeData;
    const position = { lat, lng };

    try {
      // update marker to the new selected location
      markerRef.current.position = position;

      // update viewport using our custom hook
      updateViewport(position, newViewport);

      // create and show info window with place details
      const content = `
        <div id="infowindow-content">
          <span id="place-displayname" class="title">${displayName || ''}</span><br />
          <span id="place-address">${formattedAddress || ''}</span>
        </div>
      `;
      updateInfoWindow(content, position);
    } catch (error) {
      console.error('Error updating map:', error);
    }
  }, [map, updateViewport, updateInfoWindow]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Search onPlaceSelected={handlePlaceSelected} center={viewport.center} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={viewport.center}
        zoom={viewport.zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapId: '4504f8b37365c3d0',
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        }}
      />
    </div>
  );
}

export default Map;