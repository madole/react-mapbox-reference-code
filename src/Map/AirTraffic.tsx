import React, { useEffect, useState } from "react";
import { useMapboxMap } from "./Mapbox";
import { fetchAirTraffic } from "../API/airTraffic";
import { FeatureCollection } from "@turf/helpers";
import mapboxgl from "mapbox-gl";
import { useRecoilValue } from "recoil";
import { airTrafficState } from "../State/layerState";

const AirTrafficComponent: React.VFC = () => {
  const map = useMapboxMap();
  const [airTrafficJson, setAirTrafficJson] =
    useState<FeatureCollection | null>(null);
  useEffect(() => {
    fetchAirTraffic().then((json) => {
      console.log(json);
      setAirTrafficJson(json);
    });
  }, []);

  useEffect(() => {
    if (!airTrafficJson) return;
    // add point layer
    map.addSource("airTraffic", {
      type: "geojson",
      data: airTrafficJson as any,
    });
    map.addLayer({
      id: "airTraffic",
      type: "circle",
      source: "airTraffic",
      paint: {
        "circle-radius": 5,
        "circle-color": "red",
        "circle-stroke-width": 1,
        "circle-stroke-color": "white",
      },
    });
    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });
    map.on("mouseenter", "airTraffic", (e) => {
      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = "pointer";

      // Copy coordinates array.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const coordinates = e.features[0].geometry.coordinates.slice();
      console.log(e.features[0].properties);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const description = `<table>${Object.entries(e.features[0].properties)
        .map(([key, val]) => {
          if (!key || !val) return null;
          return `<tr><td>${key}</td><td>${val}</td></tr>`;
        })
        .filter(Boolean)
        .join("")}</table>
      `;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      // Populate the popup and set its coordinates
      // based on the feature found.
      popup.setLngLat(coordinates).setHTML(description).addTo(map);
    });
    map.on("mouseleave", "airTraffic", () => {
      map.getCanvas().style.cursor = "";
      popup.remove();
    });
    return () => {
      map.removeLayer("airTraffic");
      map.removeSource("airTraffic");
    };
  }, [airTrafficJson, map]);

  return null;
};

const AirTraffic = () => {
  const showAirTraffic = useRecoilValue(airTrafficState);
  if (!showAirTraffic) return null;
  return <AirTrafficComponent />;
};
export default AirTraffic;
