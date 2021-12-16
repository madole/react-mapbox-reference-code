import React, { useEffect } from "react";
import { useMapboxMap } from "./Mapbox";
import { Popup } from "mapbox-gl";
import dronePositions from "../StaticData/positions-clipped.json";
import { showVideoMarkerState } from "../State/videoState";
import { useRecoilState, useRecoilValue } from "recoil";

export interface VideoMarkerProps {}

const VideoMarker: React.FC<VideoMarkerProps> = (props) => {
  const map = useMapboxMap();
  const [showVideoMarker, setShowVideoMarker] =
    useRecoilState(showVideoMarkerState);
  useEffect(() => {
    const popup = new Popup({
      closeButton: true,
      closeOnClick: true,
      offset: [0, -20],
      className: "video-popup",
    })
      .setLngLat([
        dronePositions[0].SensorLongitude,
        dronePositions[0].SensorLatitude,
      ])
      .setHTML(
        `
        <div class="video-marker-container">
          <div class="top-video-container">
            <video  class="video-marker__video" src="/drone-video-clipped.mp4" autoplay /></video>
          </div>
          <video  class="video-marker__video" src="/thermal-clipped.mp4"  autoplay></video>
          <input type="range" id="slider" name="slider" min="0" max="100" value="0" />
        </div>
        `
      )
      .addTo(map);
    popup.on("close", () => {
      setShowVideoMarker(false);
    });
    setTimeout(() => {
      const slider = document.querySelector(
        "#slider"
      ) as HTMLInputElement | null;
      const video = document.querySelector(
        ".top-video-container"
      ) as HTMLImageElement | null;
      if (!slider || !video) {
        console.log("No slider or video");
        console.log({ slider, video });
        return;
      }
      slider.oninput = (e) => {
        video.style.setProperty(
          "--top-video-container-width",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          (800 / 100) * e.target.value + "px"
        );
      };
    }, 1000);
    return () => {
      popup.remove();
    };
  }, [map, setShowVideoMarker]);

  return null;
};
export default () => {
  const showVideoMarker = useRecoilValue(showVideoMarkerState);
  if (!showVideoMarker) {
    return null;
  }
  return <VideoMarker />;
};
