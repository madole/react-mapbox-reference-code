import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapboxMapContext = React.createContext<mapboxgl.Map | null>(null);

export const useMapboxMap = () => {
  const mapboxMap = React.useContext(MapboxMapContext);
  if (!mapboxMap) {
    throw new Error("useMapboxMap must be used within a MapboxMapProvider");
  }
  return mapboxMap;
};

export interface MapboxProps {
  apiKey: string;
  center?: [number, number];
  children?: React.ReactNode;
  style?: mapboxgl.Style;
  zoom?: number;
}

const Mapbox: React.FC<MapboxProps> = (props) => {
  const { style } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { center = [0, 0], zoom = 17, apiKey, children } = props;
  const mapboxRef = useRef<mapboxgl.Map | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mapboxgl.accessToken = apiKey;
  }, [apiKey]);

  useEffect(() => {
    if (!ref.current) return;

    mapboxRef.current = new mapboxgl.Map({
      container: ref.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: center,
      zoom: zoom,
    }).on("load", () => {
      setLoaded(true);
    });
  }, [center, style, zoom]);

  return (
    <div style={{ height: "93.5vh" }} ref={ref}>
      {loaded && (
        <MapboxMapContext.Provider value={mapboxRef.current}>
          {children}
        </MapboxMapContext.Provider>
      )}
    </div>
  );
};

export default Mapbox;
