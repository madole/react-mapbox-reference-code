import React from "react";
import VisualVideo from "./VisualVideo";
import ThermalVideo from "./ThermalVideo";
import {
  videoDisplayState,
  videoOpacityState,
  videoTypeState,
} from "../State/videoState";
import { useRecoilValue } from "recoil";

export const Video = () => {
  const opacity = useRecoilValue(videoOpacityState);
  const videoSource = useRecoilValue(videoTypeState);
  const displayVideo = useRecoilValue(videoDisplayState);

  if (!displayVideo) return null;
  return (
    <>
      <VisualVideo
        opacity={opacity}
        visibility={
          ["visual", "mixed"].includes(videoSource) ? "visible" : "none"
        }
      />
      <ThermalVideo
        opacity={opacity}
        visibility={
          ["thermal", "mixed"].includes(videoSource) ? "visible" : "none"
        }
      />
    </>
  );
};
