import React from "react";
import "./App.css";
import Mapbox from "./Map/Mapbox";
import dronePositions from "./StaticData/positions-clipped.json";
import MapControls from "./Map/MapControls";
import Dem from "./Map/DEM";
import Sky from "./Map/Sky";
import DrawingControls from "./Map/DrawingControls";
import AppBarAndDrawer from "./UI/AppBarAndDrawer";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Video } from "./Map/Video";
import DroneVisualisation from "./Map/DroneVisualisation";
import { DrawFireBoundary } from "./UI/DrawFireBoundary";
import Firezone from "./Map/Firezone";
import MapStyle from "./Map/MapStyle";
import ShowMyLocation from "./Map/ShowMyLocation";
import { AccordionMenu } from "./UI/AccordionMenu";
import AirTraffic from "./Map/AirTraffic";
import PredictionIsochrone from "./Map/PredictionIsochrone";
import Buildings from "./Map/Buildings";

const API_KEY = import.meta.env.VITE_MAPBOX_KEY as string;

function App() {
  return (
    <>
      <CssBaseline />
      <AppBarAndDrawer>
        <AccordionMenu />
      </AppBarAndDrawer>
      <Box>
        <Toolbar />
        <Mapbox
          apiKey={API_KEY}
          center={[
            dronePositions[0].SensorLongitude,
            dronePositions[0].SensorLatitude,
          ]}
        >
          <MapStyle />
          <Sky />
          <Dem />
          <Buildings />
          <ShowMyLocation />
          <MapControls />
          <DrawingControls />
          <Video />
          <DroneVisualisation />
          <Firezone />
          <AirTraffic />
          <PredictionIsochrone />
        </Mapbox>
        <DrawFireBoundary />
      </Box>
    </>
  );
}

export default App;
