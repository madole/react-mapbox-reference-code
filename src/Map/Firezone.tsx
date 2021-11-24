import React, { useEffect } from "react";
import firezone1 from "../StaticData/firezone-1.json";
import firezone2 from "../StaticData/firezone-2.json";
import firezone3 from "../StaticData/firezone-3.json";
import { useRecoilValue } from "recoil";
import { activeFireZoneState } from "../State/layerState";
import { useMapboxMap } from "./Mapbox";

const Firezone: React.VFC = () => {
  const firezoneId = useRecoilValue(activeFireZoneState);
  const map = useMapboxMap();

  useEffect(() => {
    map.addSource("abc123", { type: "geojson", data: firezone1 as any });
    map.addSource("abc234", { type: "geojson", data: firezone2 as any });
    map.addSource("abc345", { type: "geojson", data: firezone3 as any });
    map.addLayer({
      id: "abc123",
      type: "fill-extrusion",
      source: "abc123",
      paint: {
        "fill-extrusion-color": "#f00",
        "fill-extrusion-height": 20,
        "fill-extrusion-opacity": 0.5,
      },
    });
    map.addLayer({
      id: "abc234",
      type: "fill-extrusion",
      source: "abc234",
      paint: {
        "fill-extrusion-color": "#0f0",
        "fill-extrusion-height": 20,
        "fill-extrusion-opacity": 0.5,
      },
    });
    map.addLayer({
      id: "abc345",
      type: "fill",
      source: "abc345",
      paint: {
        "fill-color": "#00f",
        "fill-opacity": 0.5,
      },
    });
  }, [map]);

  useEffect(() => {
    if (firezoneId === "abc123") {
      map.setLayoutProperty("abc123", "visibility", "visible");
      map.setLayoutProperty("abc234", "visibility", "none");
      map.setLayoutProperty("abc345", "visibility", "none");
    } else if (firezoneId === "abc234") {
      map.setLayoutProperty("abc123", "visibility", "none");
      map.setLayoutProperty("abc234", "visibility", "visible");
      map.setLayoutProperty("abc345", "visibility", "none");
    } else if (firezoneId === "abc345") {
      map.setLayoutProperty("abc123", "visibility", "none");
      map.setLayoutProperty("abc234", "visibility", "none");
      map.setLayoutProperty("abc345", "visibility", "visible");
    } else {
      map.setLayoutProperty("abc123", "visibility", "none");
      map.setLayoutProperty("abc234", "visibility", "none");
      map.setLayoutProperty("abc345", "visibility", "none");
    }
  }, [firezoneId]);

  return null;
};

export default Firezone;
