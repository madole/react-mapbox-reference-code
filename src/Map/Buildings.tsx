import React, { useEffect } from "react";
import { useMapboxMap } from "./Mapbox";
import { useRecoilValue } from "recoil";
import { buildingState } from "../State/layerState";

const BuildingsLayer: React.VFC = () => {
  const map = useMapboxMap();
  useEffect(() => {
    // The 'building' layer in the Mapbox Streets
    // vector tileset contains building height data
    // from OpenStreetMap.
    map.addLayer({
      id: "add-3d-buildings",
      source: "composite",
      "source-layer": "building",
      filter: ["==", "extrude", "true"],
      type: "fill-extrusion",
      minzoom: 12,
      paint: {
        "fill-extrusion-color": "#b405ee",

        // Use an 'interpolate' expression to
        // add a smooth transition effect to
        // the buildings as the user zooms in.
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          1,
          15.05,
          ["get", "height"],
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          1,
          15.05,
          ["get", "min_height"],
        ],
        "fill-extrusion-opacity": 0.8,
      },
    });
    return () => {
      map.removeLayer("add-3d-buildings");
    };
  }, [map]);

  return null;
};

const Buildings = () => {
  const showBuildings = useRecoilValue(buildingState);
  if (!showBuildings) {
    return null;
  }
  return <BuildingsLayer />;
};
export default Buildings;
