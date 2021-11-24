import React from "react";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useRecoilState } from "recoil";
import {
  activeFireZoneState,
  isochronePredictionState,
  threeDIsochronePredictionState,
  airTrafficState,
} from "../State/layerState";

const defaultFireZone = "abc123";

const LayerControls: React.VFC = () => {
  const [activeFireZone, setActiveFireZone] =
    useRecoilState(activeFireZoneState);
  const [showFireZone, setShowFireZone] = React.useState(false);
  const [showPredictionIsochrone, setShowPredictionIsochrone] = useRecoilState(
    isochronePredictionState
  );
  const [threeDPrediction, setThreeDPrediction] = useRecoilState(
    threeDIsochronePredictionState
  );

  const [showAirTraffic, setShowAirTraffic] = useRecoilState(airTrafficState);
  return (
    <>
      <Stack alignItems={"center"}>
        <FormControlLabel
          control={
            <Checkbox
              checked={showFireZone}
              onChange={(event, newValue) => {
                if (newValue === true && !activeFireZone) {
                  setActiveFireZone(defaultFireZone);
                }
                setShowFireZone(newValue);
                if (newValue === false) {
                  setActiveFireZone(null);
                }
              }}
            />
          }
          label={"Show Active Fire Zones"}
        />
        {showFireZone && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            {/*<InputLabel id="active-fire-zone-label">Active Fire Zone</InputLabel>*/}
            <Select
              labelId="active-fire-zone-label"
              id="active-fire-zone-select"
              value={activeFireZone}
              // label="Active Fire Zone"
              onChange={(event) => {
                setActiveFireZone(event.target.value as string);
              }}
            >
              <MenuItem value={"abc123"}>Zone 1</MenuItem>
              <MenuItem value={"abc234"}>Zone 2</MenuItem>
              <MenuItem value={"abc345"}>Zone 3</MenuItem>
            </Select>
          </FormControl>
        )}
      </Stack>
      <Divider />
      <Stack alignItems={"center"}>
        <FormControlLabel
          control={
            <Checkbox
              checked={showPredictionIsochrone}
              onChange={(event, newValue) => {
                setShowPredictionIsochrone(newValue);
              }}
            />
          }
          label={"Show Prediction Isochrone"}
        />
        {showPredictionIsochrone && (
          <FormControlLabel
            control={
              <Checkbox
                checked={threeDPrediction}
                onChange={(event, newValue) => {
                  setThreeDPrediction(newValue);
                }}
              />
            }
            label={"Show 3D Isochrone"}
          />
        )}
      </Stack>
      <Divider />
      <Stack alignItems={"start"}>
        <FormControlLabel
          control={
            <Checkbox
              checked={showAirTraffic}
              onChange={(event, newValue) => {
                setShowAirTraffic(newValue);
              }}
            />
          }
          label={"Show Air Traffic"}
        />
      </Stack>
    </>
  );
};

export default LayerControls;
