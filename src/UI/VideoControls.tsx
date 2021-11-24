import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { useRecoilState } from "recoil";
import {
  droneDisplayState,
  videoDisplayState,
  videoOpacityState,
  videoPlayState,
  videoTypeState,
} from "../State/videoState";
import { Opacity as OpacityIcon, Pause, PlayArrow } from "@mui/icons-material";

const VideoControls: React.VFC = () => {
  const [opacity, setOpacity] = useRecoilState(videoOpacityState);
  const [videoType, setVideoType] = useRecoilState(videoTypeState);
  const [displayVideo, setDisplayVideo] = useRecoilState(videoDisplayState);
  const [displayDrone, setDisplayDrone] = useRecoilState(droneDisplayState);
  const [videoPlay, setVideoPlay] = useRecoilState(videoPlayState);
  return (
    <Stack sx={{ p: 2 }}>
      <Stack alignItems="center">
        <FormControlLabel
          labelPlacement="top"
          control={
            <Switch
              checked={displayVideo}
              onChange={(event, newValue) => {
                setDisplayVideo(newValue as boolean);
              }}
            />
          }
          label="Display Video"
        />
      </Stack>
      <Divider />
      <Stack alignItems={"center"}>
        <FormControlLabel
          labelPlacement="top"
          control={
            <Switch
              checked={displayDrone}
              onChange={(event, newValue) => {
                setDisplayDrone(newValue as boolean);
              }}
            />
          }
          label="Show Drone"
        />
      </Stack>
      <Divider />
      <Stack>
        <Stack spacing={2} sx={{ mt: 4, mb: 4 }} alignItems="center">
          <OpacityIcon />
          <Typography>Opacity</Typography>

          <Slider
            valueLabelDisplay="auto"
            step={0.1}
            min={0}
            max={1}
            aria-label="Opacity"
            value={opacity}
            onChange={(event, newValue) => {
              if (typeof newValue === "number") {
                setOpacity(newValue);
              }
            }}
          />
        </Stack>
        <Divider />

        <Button
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          onClick={() => setVideoPlay(videoPlay === "play" ? "pause" : "play")}
          startIcon={videoPlay === "play" ? <Pause /> : <PlayArrow />}
        >
          {videoPlay === "play" ? "Pause" : "Play"}
        </Button>
        <Divider />
        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <FormLabel component="legend">Video Type</FormLabel>
          <RadioGroup
            aria-label="video-type"
            value={videoType}
            onChange={(event, newValue) => {
              if (["thermal", "visual", "mixed"].includes(newValue)) {
                setVideoType(newValue as "thermal" | "visual" | "mixed");
                if (newValue === "mixed") {
                  setOpacity(0.7);
                }
              }
            }}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="thermal"
              control={<Radio />}
              label="Thermal"
            />
            <FormControlLabel
              value="visual"
              control={<Radio />}
              label="Visual"
            />
            <FormControlLabel value="mixed" control={<Radio />} label="Mixed" />
          </RadioGroup>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default VideoControls;
