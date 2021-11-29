import React, { useEffect } from "react";
import FreehandMode from "mapbox-gl-draw-freehand-mode";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { useMapboxMap } from "./Mapbox";
import turfLength from "@turf/length";
import turfArea from "@turf/area";
import { LngLatLike, Map } from "mapbox-gl";
import { drawControl } from "./drawControlSetup";
import { useRecoilValue } from "recoil";
import { handDrawnIsochroneState } from "../State/layerState";

const updateArea =
  (map: Map) =>
  (e: {
    type: string;
    features: {
      geometry: {
        coordinates: LngLatLike;
        type: "Point" | "LineString" | "Polygon";
      };
    }[];
  }) => {
    const data = drawControl.getAll();
    let message = "";
    if (data.features.length > 0 && e.type !== "draw.delete") {
      if (e.features[0].geometry.type === "Polygon") {
        const burnArea = turfArea(data);
        // Restrict the area to 2 decimal points.
        const rounded_area = Math.round(burnArea * 100) / 100;
        message = `${Math.round(rounded_area)} sq meters`;
      } else if (e.features[0].geometry.type === "LineString") {
        console.log(data.features[0]);
        const burnLength = turfLength(data, {
          units: "meters",
        });
        message = Math.round(burnLength) + " meters";
        // set modal title to "area"
      } else if (e.features[0].geometry.type === "Point") {
        const value = map.queryTerrainElevation(
          e.features[0].geometry.coordinates,
          {
            exaggerated: false,
          }
        );
        if (typeof value === "number") {
          message = Math.round(value) + " meters";
        }
      }
    } else {
      if (e.type !== "draw.delete") alert("Click the map to draw a polygon.");
    }
    alert(message);
  };

const DrawingControlsLayer: React.VFC = () => {
  const map = useMapboxMap();
  useEffect(() => {
    map.addControl(drawControl);

    map.on("draw.create", updateArea(map));
    map.on("draw.update", updateArea(map));
    return () => {
      map.removeControl(drawControl);
      map.off("draw.create", updateArea(map));
      map.off("draw.update", updateArea(map));
    };
  }, [map]);
  return null;
};

const DrawingControls = () => {
  const showHandDrawnIsochrone = useRecoilValue(handDrawnIsochroneState);
  if (showHandDrawnIsochrone) {
    return null;
  }
  return <DrawingControlsLayer />;
};

export default DrawingControls;
