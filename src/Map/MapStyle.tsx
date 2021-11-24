import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { mapStyleState } from "../State/mapState";
import { useMapboxMap } from "./Mapbox";

const MapStyle: React.VFC = () => {
  const mapStyle = useRecoilValue(mapStyleState);
  const map = useMapboxMap();

  useEffect(() => {
    //only set new style if it has changed
    if (!map.getStyle().sprite?.includes(mapStyle)) {
      map.setStyle("mapbox://styles/mapbox/" + mapStyle);
    }
  }, [map, mapStyle]);

  return null;
};

export default MapStyle;
