import React, { useEffect, useState } from "react";
import { useMapboxMap } from "./Mapbox";
import { useRecoilValue } from "recoil";
import { drawControl } from "./drawControlSetup";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { maskFeatureCollectionPolygons } from "../Utils/maskFeatureCollectionPolygons";
import prediction from "../StaticData/prediction-isochrone.json";
import { Polygon } from "@turf/helpers";
import { handDrawnIsochroneState } from "../State/layerState";

const PREFIX = "handdrawn-isochrone";

const HandDrawnIsochroneLayer: React.VFC = () => {
  const map = useMapboxMap();
  const [geojson, setGeojson] = useState<GeoJSON.Feature<GeoJSON.Polygon>[]>(
    []
  );

  useEffect(() => {
    map.addControl(drawControl);
    drawControl.changeMode("draw_polygon");
    map.on("draw.create", (e) => {
      const { features } = e;

      setGeojson((existingGeojson) => {
        const newFeature = features[0];
        newFeature.properties.id = existingGeojson.length + 1;
        return [...existingGeojson, newFeature];
      });
      setTimeout(() => {
        drawControl.changeMode("draw_polygon");
      }, 200);
    });
    map.on("draw.update", (e) => {
      const { features } = e;
      const newFeature = features[0];
      newFeature.properties.id = geojson.length + 1;
      setGeojson((existingGeojson) => {
        const newFeature = features[0];
        newFeature.properties.id = existingGeojson.length;
        return [
          ...existingGeojson.slice(0, existingGeojson.length - 1),
          newFeature,
        ];
      });
    });
  }, [map]);

  useEffect(() => {
    if (!geojson.length) return;
    const splitPredictions = maskFeatureCollectionPolygons({
      type: "FeatureCollection",
      features: geojson,
    });
    splitPredictions.features.forEach((feature, i) => {
      if (map.getLayer(`${PREFIX}-${i}-extrusion`)) {
        map.removeLayer(`${PREFIX}-${i}-extrusion`);
      }
      if (map.getSource(`${PREFIX}-${i}-source`)) {
        map.removeSource(`${PREFIX}-${i}-source`);
      }
      map.addSource(`${PREFIX}-${i}-source`, {
        type: "geojson",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data: feature,
      });
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
            6,
            "#6e1411",
            7,
            "#1c5792",
            8,
            "#5a0998",
          ],
          "fill-extrusion-opacity": 0.85,
          // "fill-extrusion-height": ["get", "height"],
          "fill-extrusion-height": ["/", 500, ["get", "id"]],
        },
      });
    });
  }, [geojson, map]);

  return null;
};

const HandDrawnIsochrone = () => {
  const showHandDrawnIsochrone = useRecoilValue(handDrawnIsochroneState);
  if (!showHandDrawnIsochrone) return null;
  return <HandDrawnIsochroneLayer />;
};
export default HandDrawnIsochrone;
