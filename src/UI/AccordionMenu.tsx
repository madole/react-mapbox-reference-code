import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import VideoControls from "./VideoControls";
import LayerControls from "./LayerControls";
import MapStyleControls from "./MapStyleControls";
import React from "react";
import { useSetRecoilState } from "recoil";
import {
  handDrawnExtrudedIsochroneState,
  handDrawnIsochroneState,
} from "../State/layerState";

export function AccordionMenu() {
  const setHandDrawnIsochroneMode = useSetRecoilState(handDrawnIsochroneState);
  const setHandDrawnExtrudedIsochroneMode = useSetRecoilState(
    handDrawnExtrudedIsochroneState
  );
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="video-controls-content"
          id="video-controls-header"
        >
          <Typography>Video Controls</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <VideoControls />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="layers-content"
          id="layers-header"
        >
          <Typography>Layers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <LayerControls />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="map-controls-content"
          id="map-controls-header"
        >
          Map Style
        </AccordionSummary>
        <AccordionDetails>
          <MapStyleControls />
        </AccordionDetails>
      </Accordion>
      <Stack alignItems="center" sx={{ p: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setHandDrawnExtrudedIsochroneMode(true)}
        >
          Hand drawn extruded isochrone
        </Button>
      </Stack>
      <Stack alignItems="center" sx={{ p: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setHandDrawnIsochroneMode(true)}
        >
          Hand draw isochrone
        </Button>
      </Stack>
    </>
  );
}
