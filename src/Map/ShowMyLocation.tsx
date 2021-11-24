import React, { useEffect } from "react";
import { useMapboxMap } from "./Mapbox";
import mapboxgl from "mapbox-gl";

const geolocateControl = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true,
  },
  // When active the map will receive updates to the device's location as it changes.
  trackUserLocation: true,
  // Draw an arrow next to the location dot to indicate which direction the device is heading.
  showUserHeading: true,
});

const ShowMyLocation: React.VFC = () => {
  const map = useMapboxMap();
  useEffect(() => {
    map.addControl(geolocateControl);
    return () => {
      map.removeControl(geolocateControl);
    };
  }, [map]);

  return null;
};

export default ShowMyLocation;
