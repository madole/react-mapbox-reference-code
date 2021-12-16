import React, { useEffect, useState } from "react";
import { useMapboxMap } from "./Mapbox";
import { useRecoilValue } from "recoil";
import { drawControl } from "./drawControlSetup";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { maskFeatureCollectionPolygons } from "../Utils/maskFeatureCollectionPolygons";
import { handDrawnIsochroneState } from "../State/layerState";

const PREFIX = "handdrawn-isochrone";

const HandDrawnIsochroneComponent: React.VFC = () => {
  const map = useMapboxMap();
  const [geojson, setGeojson] = useState<GeoJSON.Feature<GeoJSON.Polygon>[]>(
    []
  );

  useEffect(() => {
    if (map.hasControl(drawControl)) {
      map.removeControl(drawControl);
    }

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
        const id = drawControl.getAll()?.features[0]?.id;
        if (id) {
          drawControl.delete(id.toString());
        }
        drawControl.changeMode("draw_polygon");
      }, 200);
    });
    return () => {
      drawControl.changeMode(null);
    };
  }, [map]);

  useEffect(() => {
    if (!geojson.length) return;
    const splitPredictions = maskFeatureCollectionPolygons({
      type: "FeatureCollection",
      features: geojson,
    });
    splitPredictions.features.forEach((feature, i) => {
      if (map.getLayer(`${PREFIX}-${i}`)) {
        return;
      }

      map.addLayer({
        id: `${PREFIX}-${i}`,
        type: "fill",
        source: {
          type: "geojson",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          data: feature,
        },

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
            6,
            "#6e1411",
            7,
            "#1c5792",
            8,
            "#5a0998",
          ],
          "fill-opacity": 0.65,
        },
      });
    });
  }, [geojson, map]);

  return null;
};

const HandDrawnIsochrone = () => {
  const showHandDrawnIsochrone = useRecoilValue(handDrawnIsochroneState);
  if (!showHandDrawnIsochrone) return null;
  return <HandDrawnIsochroneComponent />;
};
export default HandDrawnIsochrone;
