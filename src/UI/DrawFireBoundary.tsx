import { Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import React from "react";
import { drawControl } from "../Map/drawControlSetup";

export function DrawFireBoundary() {
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
        drawControl.changeMode("draw_polygon");
      }}
    >
      <Add sx={{ mr: 1 }} />
      Draw fire boundary
    </Fab>
  );
}
