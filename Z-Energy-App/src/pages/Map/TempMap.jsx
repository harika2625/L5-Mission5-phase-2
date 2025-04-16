import React, { useEffect, useState, useCallback } from "react";
import StationCard from "./components/stationCard";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
  Pin,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

const locations = [
  {
    key: "Z Kingsway Station",
    location: { lat: -37.0617319, lng: 174.9484291 },
  },
  {
    key: "Z Papakura North Station",
    location: { lat: -37.0506038, lng: 174.9297405 },
  },
  { key: "manlyBeach", location: { lat: -33.8209738, lng: 151.2563253 } },
  { key: "hyderPark", location: { lat: -33.8690081, lng: 151.2052393 } },
  { key: "theRocks", location: { lat: -33.8587568, lng: 151.2058246 } },
  { key: "circularQuay", location: { lat: -33.858761, lng: 151.2055688 } },
  { key: "harbourBridge", location: { lat: -33.852228, lng: 151.2038374 } },
  { key: "kingsCross", location: { lat: -33.8737375, lng: 151.222569 } },
  { key: "botanicGardens", location: { lat: -33.864167, lng: 151.216387 } },
  { key: "museumOfSydney", location: { lat: -33.8636005, lng: 151.2092542 } },
  { key: "maritimeMuseum", location: { lat: -33.869395, lng: 151.198648 } },
  { key: "kingStreetWharf", location: { lat: -33.8665445, lng: 151.1989808 } },
  { key: "aquarium", location: { lat: -33.869627, lng: 151.202146 } },
  { key: "darlingHarbour", location: { lat: -33.87488, lng: 151.1987113 } },
  { key: "barangaroo", location: { lat: -33.8605523, lng: 151.1972205 } },
];

export default function TempMap() {
  const [currentStation, setCurrentStation] = useState("");
  const [stationData, setStationData] = useState({});
  const [showStationCard, setShowStationCard] = useState(false);

  function getLocationName(lng, lat) {
    const foundLocation = locations.find((location) => {
      return location.location.lng === lng && location.location.lat === lat;
    });
    return foundLocation ? foundLocation.key : null;
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/stationdata/${currentStation}`
      );
      const data = await response.json();
      setStationData(data);
    };
    fetchData();
  }, [currentStation]);

  const PoiMarkers = (props) => {
    const map = useMap();
    const [markers, setMarkers] = useState({});
    const clusterer = MarkerClusterer;

    // Initialize MarkerClusterer, if the map has changed
    useEffect(() => {
      if (!map) return;
      if (!clusterer.current) {
        console.log(clusterer);
        clusterer.current = new MarkerClusterer({ map });
      }
    }, [map]);

    // Update markers, if the markers array has changed
    useEffect(() => {
      clusterer.current?.clearMarkers();
      clusterer.current?.addMarkers(Object.values(markers));
    }, [markers]);

    const setMarkerRef = (marker, key) => {
      if (marker && markers[key]) return;
      if (!marker && !markers[key]) return;

      setMarkers((prev) => {
        if (marker) {
          return { ...prev, [key]: marker };
        } else {
          const newMarkers = { ...prev };
          delete newMarkers[key];
          return newMarkers;
        }
      });
    };

    const handleClick = useCallback((ev) => {
      if (!map) return;
      if (!ev.latLng) return;
      console.log("marker clicked:", ev.latLng.toString());
      const stationName = getLocationName(ev.latLng.lng(), ev.latLng.lat());
      map.panTo(ev.latLng);
      map.setZoom(22);
      setCurrentStation(stationName);
      setShowStationCard(true);
    });

    return (
      <>
        {props.pois.map((poi) => (
          <AdvancedMarker
            key={poi.key}
            position={poi.location}
            ref={(marker) => setMarkerRef(marker, poi.key)}
            clickable={true}
            onClick={handleClick}
          >
            <Pin
              background={"#FBBC04"}
              glyphColor={"#000"}
              borderColor={"#000"}
            />
          </AdvancedMarker>
        ))}
      </>
    );
  };

  return (
    <div>
      <APIProvider apiKey={"AIzaSyBr7ORed3s00Qs8aAx_M8YGgkWq1JUeRnI"}>
        <Map
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={{ lat: -36.93766022803409, lng: 174.8148665666841 }}
          defaultZoom={12}
          mapId="acabcfd7d52bcb72"
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <PoiMarkers pois={locations} />
        </Map>
      </APIProvider>
      <StationCard
        showStationCard={showStationCard}
        name={stationData?.name || "Z Kingsway Station"}
        address={stationData?.address || "26 Clevedon Road, Papakura"}
        time_table={
          stationData?.time_table || {
            Sunday: "Open 24 hours",
            Monday: "Open 24 hours",
            Tuesday: "Open 24 hours",
            Wednesday: "Open 24 hours",
            Thursday: "Open 24 hours",
            Friday: "Open 24 hours",
            Saturday: "Open 24 hours",
          }
        }
        services={
          stationData?.services || [
            "Bathroom",
            "LPG SWAP'n'GO",
            "Z Express",
            "Trailer Hire",
            "ATM",
          ]
        }
        store_contact={stationData?.store_contact || "09-2988185"}
      />
    </div>
  );
}
