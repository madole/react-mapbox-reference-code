import { atom } from "recoil";
import { Simulate } from "react-dom/test-utils";
import play = Simulate.play;

export const videoTypeState = atom<"thermal" | "visual" | "mixed">({
  key: "videoTypeState",
  default: "thermal",
});

export const videoOpacityState = atom<number>({
  key: "videoOpacityState",
  default: 1,
});

export const videoDisplayState = atom<boolean>({
  key: "videoDisplayState",
  default: false,
});

export const droneDisplayState = atom<boolean>({
  key: "droneDisplayState",
  default: true,
});

export const videoPlayState = atom<"play" | "pause">({
  key: "videoPlayState",
  default: "play",
});

export const videoTiming = atom<number>({
  key: "videoTiming",
  default: 0,
});

export const showVideoMarkerState = atom<boolean>({
  key: "videoMarker",
  default: false,
});
