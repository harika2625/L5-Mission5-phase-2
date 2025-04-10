import { useEffect, useRef } from "react";
import { Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// search component that provides google places autocomplete functionality
// allows users to search for locations and handles place selection events
function Search({ onPlaceSelected, center }) {
  // refs to store search box container and autocomplete element
  const searchBoxRef = useRef(null);
  const searchElementRef = useRef(null);

  // initializes the search box with google places autocomplete
  // sets up event listeners and handles cleanup on unmount
  useEffect(() => {
    async function initializeSearch() {
      try {
        // verify google maps api is loaded
        if (!window.google) {
          console.error("Google Maps not loaded");
          return;
        }

        // prevent duplicate initialization
        if (searchElementRef.current) {
          console.log("Search element already exists");
          return;
        }

        console.log("Creating search element");
        // create the gmp-place-autocomplete element for modern places api
        const searchElement = document.createElement("gmp-place-autocomplete");
        searchElementRef.current = searchElement;

        // configure the search element styles for consistent ui
        searchElement.placeholder = "Enter an address to find Z stations nearby";
        searchElement.style.width = "100%";
        searchElement.style.border = "none";
        searchElement.style.outline = "none";
        searchElement.style.padding = "8px";
        searchElement.style.backgroundColor = "transparent";
        searchElement.style.fontSize = "16px";

        // set location bias based on current map center
        // this helps prioritize results near the current view
        if (center) {
          searchElement.locationBias = center;
        }

        // handle place selection events from the autocomplete
        searchElement.addEventListener("gmp-placeselect", async (e) => {
          console.log("Place select event triggered", e);
          try {
            // get the selected place prediction
            const placePrediction = e.placePrediction;
            console.log("Place prediction:", placePrediction);

            // convert prediction to full place object
            const place = await placePrediction.toPlace();
            console.log("Place before fields:", place);

            // fetch all necessary fields including geometry for viewport
            // this ensures we have complete place data for the map
            await place.fetchFields({
              fields: ["displayName", "formattedAddress", "location", "geometry.viewport"],
            });
            console.log("Place after fields:", place);

            // verify location data exists
            if (!place.location) {
              console.error("No location in place data");
              return;
            }

            // extract viewport information from the place geometry
            // viewport helps determine the best zoom level
            const viewport = place.geometry?.viewport;
            console.log("Viewport:", viewport);

            // prepare place data for the map component
            // includes coordinates, viewport, and display information
            const placeData = {
              lat: place.location.lat,
              lng: place.location.lng,
              viewport: viewport
                ? {
                    north: viewport.getNorthEast().lat(),
                    south: viewport.getSouthWest().lat(),
                    east: viewport.getNorthEast().lng(),
                    west: viewport.getSouthWest().lng(),
                  }
                : null,
              displayName: place.displayName || "",
              formattedAddress: place.formattedAddress || "",
            };

            console.log("Sending place data:", placeData);
            onPlaceSelected(placeData);
          } catch (error) {
            console.error("Error processing place:", error);
          }
        });

        // mount the search element to the dom
        // clear existing content first to prevent duplicates
        if (searchBoxRef.current) {
          searchBoxRef.current.innerHTML = "";
          searchBoxRef.current.appendChild(searchElement);
          console.log("Search element mounted");
        }
      } catch (error) {
        console.error("Error initializing search:", error);
      }
    }

    initializeSearch();

    // cleanup function to remove search element
    // prevents memory leaks and duplicate elements
    return () => {
      if (searchBoxRef.current) {
        searchBoxRef.current.innerHTML = "";
      }
      if (searchElementRef.current) {
        searchElementRef.current = null;
      }
      console.log("Search element cleaned up");
    };
  }, [onPlaceSelected, center]);

  // render a material-ui paper component containing the search box
  return (
    <Paper
      component="div"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        position: "absolute",
        top: 10,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1,
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      }}
    >
      <SearchIcon sx={{ p: "10px", color: "#666" }} />
      <div ref={searchBoxRef} style={{ flex: 1 }} />
    </Paper>
  );
}

export default Search;
