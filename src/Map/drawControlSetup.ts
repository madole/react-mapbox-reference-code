import MapboxDraw from "@mapbox/mapbox-gl-draw";
import FreehandMode from "mapbox-gl-draw-freehand-mode";
FreehandMode.simplify = function () {
  /* noop */
};

export const drawControl = new MapboxDraw({
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
