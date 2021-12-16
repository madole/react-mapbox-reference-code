import { Fab } from "@mui/material";
import { Add, AirplanemodeActive } from "@mui/icons-material";
import React from "react";
import { drawControl } from "../Map/drawControlSetup";
import { useMapboxMap } from "../Map/Mapbox";

export function DrawFireBoundary() {
  const map = useMapboxMap();
  return (
    <Fab
      variant="extended"
      size="small"
      color="primary"
      aria-label="add"
      sx={{
        position: "fixed",
        bottom: "2rem",
        right: "3rem",
      }}
      onClick={() => {
        map.flyTo({
          center: [150.30739, -33.71977],
          pitch: 60,
        });
      }}
    >
      <AirplanemodeActive sx={{ mr: 1 }} />
      Fly to my LGA
    </Fab>
  );
}
