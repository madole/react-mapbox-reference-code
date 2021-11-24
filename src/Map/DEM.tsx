import React, { useEffect } from "react";
import { useMapboxMap } from "./Mapbox";

const Dem: React.VFC = () => {
  const map = useMapboxMap();
  useEffect(() => {
    map.addSource("mapbox-dem", {
      type: "raster-dem",
      url: "mapbox://mapbox.mapbox-terrain-dem-v1",
      tileSize: 512,
      maxzoom: 14,
    });
    map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
    map.addLayer({
      id: "hillshading",
      source: "mapbox-dem",
      type: "hillshade",
      // insert below waterway-river-canal-shadow;
      // where hillshading sits in the Mapbox Outdoors style
    });

    return () => {
      map.removeSource("mapbox-dem");
      map.removeLayer("hillshading");
    };
  }, [map]);
  return null;
};

export default Dem;
