import { atom } from "recoil";

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
