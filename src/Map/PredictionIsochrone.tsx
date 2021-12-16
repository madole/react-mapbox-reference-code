import React, { useEffect } from "react";
import { useMapboxMap } from "./Mapbox";
import prediction from "../StaticData/prediction-isochrone.json";
import { maskFeatureCollectionPolygons } from "../Utils/maskFeatureCollectionPolygons";
import mapboxgl from "mapbox-gl";
import { useRecoilValue } from "recoil";
import {
  isochronePredictionState,
  threeDIsochronePredictionState,
} from "../State/layerState";
import { Polygon } from "@turf/helpers";

const splitPredictions = maskFeatureCollectionPolygons(
  prediction as GeoJSON.FeatureCollection<Polygon>
);
const PREFIX = "isochrone";
let popups: mapboxgl.Popup[] = [];

const ExtrudedPredictionIsochroneComponent: React.VFC = () => {
  const map = useMapboxMap();
  const threeDPrediction = useRecoilValue(threeDIsochronePredictionState);

  useEffect(() => {
    splitPredictions.features.forEach((feature, i) => {
      map.addSource(`${PREFIX}-${i}-source`, {
        type: "geojson",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data: feature,
      });
      if (threeDPrediction) {
        if (map.getLayer(`${PREFIX}-${i}-fill`)) {
          map.removeLayer(`${PREFIX}-${i}-fill`);
        }
        map.addLayer({
          id: `${PREFIX}-${i}-extrusion`,
          type: "fill-extrusion",
          source: `${PREFIX}-${i}-source`,

          paint: {
            "fill-extrusion-color": [
              // interpolate colour from id property value
              "interpolate",
              ["linear"],
              ["get", "id"],
              0,
              "#8d6a9f",
              1,
              "#c5cbd3",
              2,
              "#8cbcb9",
              3,
              "#33a1fd",
              4,
              "#dda448",
              5,
              "#bb342f",
            ],
            "fill-extrusion-opacity": 0.85,
            // "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-height": ["/", 1000, ["get", "id"]],
          },
        });
      } else {
        if (map.getLayer(`${PREFIX}-${i}-extrusion`)) {
          map.removeLayer(`${PREFIX}-${i}-extrusion`);
        }
        map.addLayer({
          id: `${PREFIX}-${i}-fill`,
          type: "fill",
          source: `${PREFIX}-${i}-source`,
          layout: { "fill-sort-key": ["get", "id"] },
          paint: {
            "fill-color": [
              // interpolate colour from id property value
              "interpolate",
              ["linear"],
              ["get", "id"],
              0,
              "#8d6a9f",
              1,
              "#c5cbd3",
              2,
              "#8cbcb9",
              3,
              "#33a1fd",
              4,
              "#dda448",
              5,
              "#bb342f",
            ],
            "fill-opacity": 0.5,
          },
        });
      }

      const popup = new mapboxgl.Popup()
        .setLngLat(
          (Array.isArray(feature.geometry.coordinates[0][0][0])
            ? feature.geometry.coordinates[0][0][0]
            : feature.geometry.coordinates[0][0]) as mapboxgl.LngLatLike
        )
        .setHTML(
          `
          <h3>Type: ${feature.properties?.type}</h3>
          <p>Time: ${feature.properties?.time}</p>
          <p>Diff from now: ${feature.properties?.diff}</p>

      `
        )
        .addTo(map);
      popups.push(popup);
    });
    return () => {
      splitPredictions.features.forEach((_, i) => {
        if (map.getLayer(`${PREFIX}-${i}-extrusion`)) {
          map.removeLayer(`${PREFIX}-${i}-extrusion`);
        }
        if (map.getLayer(`${PREFIX}-${i}-fill`)) {
          map.removeLayer(`${PREFIX}-${i}-fill`);
        }
        if (map.getSource(`${PREFIX}-${i}-source`)) {
          map.removeSource(`${PREFIX}-${i}-source`);
        }
      });
      popups.forEach((popup) => {
        popup.remove();
      });
      popups = [];
    };
  }, [map, threeDPrediction]);
  return null;
};

const ExtrudedPredictionIsochrone = () => {
  const showPrediction = useRecoilValue(isochronePredictionState);
  if (!showPrediction) return null;
  return <ExtrudedPredictionIsochroneComponent />;
};

export default ExtrudedPredictionIsochrone;
