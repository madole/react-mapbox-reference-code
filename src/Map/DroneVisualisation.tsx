import React, { useEffect } from "react";
import { useMapboxMap } from "./Mapbox";
import dronePositions from "../StaticData/positions-clipped.json";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { droneDisplayState, showVideoMarkerState } from "../State/videoState";

const DroneVisualisation: React.VFC = () => {
  const map = useMapboxMap();
  const setVideoMarkerState = useSetRecoilState(showVideoMarkerState);
  useEffect(() => {
    map.loadImage("/drone.png", (error, image) => {
      if (error || !image) throw error;
      map.addImage("drone", image);
    });
  }, [map]);

  useEffect(() => {
    map.addSource("drone", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                dronePositions[0].SensorLongitude,
                dronePositions[0].SensorLatitude,
              ],
            },
            properties: {
              title: "Drone",
              description: "Drone",
            },
          },
        ],
      },
    });
    map.addLayer({
      id: "drone",
      type: "symbol",
      source: "drone",
      layout: {
        "icon-image": "drone",
        "icon-allow-overlap": true,
        "icon-size": 0.1,
        "icon-pitch-alignment": "map",
        "icon-rotation-alignment": "map",
      },
    });
    map.on("click", "drone", () => {
      setVideoMarkerState(true);
    });
    return () => {
      map.removeLayer("drone");
      map.removeSource("drone");
    };
  }, [map]);

  return null;
};

const VideoDroneVisualisation = () => {
  const displayDrone = useRecoilValue(droneDisplayState);
  if (!displayDrone) return null;
  return <DroneVisualisation />;
};

export default VideoDroneVisualisation;
