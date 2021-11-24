import React, { useEffect } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import FreehandMode from "mapbox-gl-draw-freehand-mode";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { useMapboxMap } from "./Mapbox";
import turfLength from "@turf/length";
import turfArea from "@turf/area";
import { LngLatLike, Map } from "mapbox-gl";

FreehandMode.simplify = function () {
  /* noop */
};

const drawControl = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    line_string: true,
    polygon: true,
    point: true,
    trash: true,
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  modes: Object.assign(MapboxDraw.modes, {
    draw_polygon: FreehandMode,
  }),
  styles: [
    // ACTIVE (being drawn)
    // line stroke
    {
      id: "gl-draw-line",
      type: "line",
      filter: ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#D20C0C",
        "line-dasharray": [0.2, 2],
        "line-width": 5,
      },
    },
    // polygon fill
    {
      id: "gl-draw-polygon-fill",
      type: "fill",
      filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
      paint: {
        "fill-color": "#D20C0C",
        "fill-outline-color": "#D20C0C",
        "fill-opacity": 0.4,
      },
    },
    // polygon mid points
    {
      id: "gl-draw-polygon-midpoint",
      type: "circle",
      filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
      paint: {
        "circle-radius": 6,
        "circle-color": "#fbb03b",
      },
    },
    // polygon outline stroke
    // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
    {
      id: "gl-draw-polygon-stroke-active",
      type: "line",
      filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#D20C0C",
        "line-dasharray": [0.2, 2],
        "line-width": 5,
      },
    },
    // vertex point halos
    {
      id: "gl-draw-polygon-and-line-vertex-halo-active",
      type: "circle",
      filter: [
        "all",
        ["==", "meta", "vertex"],
        ["==", "$type", "Point"],
        ["!=", "mode", "static"],
      ],
      paint: {
        "circle-radius": 10,
        "circle-color": "#FFF",
      },
    },
    // vertex points
    {
      id: "gl-draw-polygon-and-line-vertex-active",
      type: "circle",
      filter: [
        "all",
        ["==", "meta", "vertex"],
        ["==", "$type", "Point"],
        ["!=", "mode", "static"],
      ],
      paint: {
        "circle-radius": 8,
        "circle-color": "#D20C0C",
      },
    },
    {
      id: "gl-draw-line-static",
      type: "line",
      filter: ["all", ["==", "$type", "LineString"], ["==", "mode", "static"]],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#000",
        "line-width": 5,
      },
    },
    // polygon fill
    {
      id: "gl-draw-polygon-fill-static",
      type: "fill",
      filter: ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
      paint: {
        "fill-color": "#000",
        "fill-outline-color": "#000",
        "fill-opacity": 0.3,
      },
    },
    // polygon outline
    {
      id: "gl-draw-polygon-stroke-static",
      type: "line",
      filter: ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#000",
        "line-width": 5,
      },
    },
    {
      id: "highlight-active-points",
      type: "circle",
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["==", "meta", "feature"],
        ["==", "active", "true"],
      ],
      paint: {
        "circle-radius": 7,
        "circle-color": "red",
        "circle-stroke-color": "white",
        "circle-stroke-width": 2,
      },
    },
    {
      id: "points-are-blue",
      type: "circle",
      filter: [
        "all",
        ["==", "$type", "Point"],
        ["==", "meta", "feature"],
        ["==", "active", "false"],
      ],
      paint: {
        "circle-radius": 7,
        "circle-color": "orange",
        "circle-stroke-color": "white",
        "circle-stroke-width": 2,
      },
    },
  ],
});

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

const DrawingControls: React.VFC = () => {
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

export default DrawingControls;
