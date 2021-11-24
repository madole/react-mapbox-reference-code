import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { mapStyleState } from "../State/mapState";

const MapStyleControls: React.VFC = () => {
  const [mapStyle, setMapStyle] = useRecoilState(mapStyleState);
  return (
    <Stack>
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">Map Style</FormLabel>
        <RadioGroup
          aria-label="map-style"
          value={mapStyle}
          onChange={(event, newValue) => {
            setMapStyle(
              newValue as "streets-v11" | "outdoors-v11" | "satellite-v9"
            );
          }}
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="streets-v11"
            control={<Radio />}
            label="Streets"
          />
          <FormControlLabel
            value="outdoors-v11"
            control={<Radio />}
            label="Outdoors"
          />
          <FormControlLabel
            value="satellite-v9"
            control={<Radio />}
            label="Satellite"
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

export default MapStyleControls;
