import React, { useEffect } from "react";
import { useMapboxMap } from "./Mapbox";
import mapboxgl from "mapbox-gl";

const fullscreenControl = new mapboxgl.FullscreenControl({
  container: document.querySelector("body"),
});

const navigationControl = new mapboxgl.NavigationControl({
  visualizePitch: true,
});

const MapControls: React.VFC = () => {
  const map = useMapboxMap();
  useEffect(() => {
    if (!map) return;

    map.addControl(fullscreenControl);
    map.addControl(navigationControl, "top-right");
    return () => {
      map.removeControl(fullscreenControl);
      map.removeControl(navigationControl);
    };
  }, [map]);

  return null;
};

export default MapControls;
