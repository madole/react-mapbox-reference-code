import React, { useEffect } from "react";
import { useMapboxMap } from "./Mapbox";

const Sky: React.VFC = () => {
  const map = useMapboxMap();
  useEffect(() => {
    map.addLayer({
      id: "sky",
      type: "sky",
      paint: {
        "sky-type": "atmosphere",
        "sky-atmosphere-sun": [0.0, 0.0],
        "sky-atmosphere-sun-intensity": 15,
      },
    });
    return () => {
      map.removeLayer("sky");
    };
  }, [map]);

  return null;
};

export default Sky;
