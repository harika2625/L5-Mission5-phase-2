import { useState, useCallback, useRef } from 'react';
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

// main map component that handles the google maps integration
function Map() {
  // state to track the map instance and current view settings
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(defaultZoom);
  
  // refs to persist marker and info window instances between renders
  const markerRef = useRef(null);
  const infoWindowRef = useRef(null);

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

    const { lat, lng, viewport, displayName, formattedAddress } = placeData;
    const position = { lat, lng };

    try {
      // update marker to the new selected location
      markerRef.current.position = position;

      // update map viewport to show the selected location
      if (viewport) {
        console.log('Using viewport:', viewport);
        // create bounds object from viewport coordinates
        const bounds = new window.google.maps.LatLngBounds(
          { lat: viewport.south, lng: viewport.west },
          { lat: viewport.north, lng: viewport.east }
        );
        
        // first center and zoom for smooth transition
        map.setCenter(position);
        map.setZoom(17);  // closer zoom for better detail
        
        // then fit the viewport with padding for context
        map.fitBounds(bounds, {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50
        });
      } else {
        // fallback if no viewport data available
        console.log('No viewport, centering on location');
        map.setCenter(position);
        map.setZoom(17);
      }

      // create and show info window with place details
      const content = `
        <div id="infowindow-content">
          <span id="place-displayname" class="title">${displayName || ''}</span><br />
          <span id="place-address">${formattedAddress || ''}</span>
        </div>
      `;
      updateInfoWindow(content, position);

      // update state to match new map position
      setCenter(position);
      setZoom(map.getZoom());
    } catch (error) {
      console.error('Error updating map:', error);
    }
  }, [map, updateInfoWindow]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Search onPlaceSelected={handlePlaceSelected} center={center} />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
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