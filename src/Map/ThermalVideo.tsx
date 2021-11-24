import React, { useEffect } from "react";
import { useMapboxMap } from "./Mapbox";
import bboxPolygon from "@turf/bbox-polygon";
import bbox from "@turf/bbox";
import circle from "@turf/circle";
import transformTranslate from "@turf/transform-translate";
import transformRotate from "@turf/transform-rotate";
import dronePositions from "../StaticData/positions-clipped.json";
import { Feature, Point, Properties } from "@turf/helpers";
import { useRecoilValue } from "recoil";
import { videoPlayState } from "../State/videoState";
import { CanvasSource } from "mapbox-gl";

export interface ThermalVideoProps {
  opacity: number;
  visibility: "visible" | "none";
}

// function adds degrees together and returns the result
function addDegrees(degrees: number, degreesToAdd: number) {
  let result = degrees + degreesToAdd;
  if (result >= 360) {
    result -= 360;
  }
  return result;
}

const createPolygon = (
  point: number[] | Point | Feature<Point>,
  radius: number
) => {
  return bboxPolygon(bbox(circle(point, radius, { steps: 64 })));
};

const videoPolygon = transformTranslate(
  transformRotate(
    createPolygon(
      [dronePositions[0].SensorLongitude, dronePositions[0].SensorLatitude],
      0.09
    ),
    addDegrees(dronePositions[0].PlatformHeading, 5)
  ),
  -0.085,
  dronePositions[0].PlatformHeading - 12
);

const ThermalVideo: React.FC<ThermalVideoProps> = (props) => {
  const { opacity = 1, visibility = "visible" } = props;
  const map = useMapboxMap();

  const playState = useRecoilValue(videoPlayState);

  useEffect(() => {
    map.addSource("thermalVideo", {
      type: "video",
      urls: ["/thermal-clipped.mp4"],
      coordinates: [
        videoPolygon.geometry.coordinates[0][0],
        videoPolygon.geometry.coordinates[0][1],
        videoPolygon.geometry.coordinates[0][2],
        videoPolygon.geometry.coordinates[0][3],
      ],
    });
    map.addLayer(
      {
        id: "thermalVideo",
        type: "raster",
        source: "thermalVideo",
        paint: {
          "raster-opacity": 1,
        },
      }
      // GL_DRAW_LAYER_NAME
    );
    return () => {
      map.removeLayer("thermalVideo");
      map.removeSource("thermalVideo");
    };
  }, [map]);

  useEffect(() => {
    if (map.getLayer("thermalVideo")) {
      map.setPaintProperty("thermalVideo", "raster-opacity", opacity);
    }
  }, [map, opacity]);

  useEffect(() => {
    if (map.getLayer("thermalVideo")) {
      map.setLayoutProperty("thermalVideo", "visibility", visibility);
    }
  }, [map, visibility]);

  useEffect(() => {
    const videoSource = map.getSource("thermalVideo") as CanvasSource;
    if (videoSource) {
      videoSource[playState]();
    }
  }, [map, playState]);
  return null;
};

export default ThermalVideo;
