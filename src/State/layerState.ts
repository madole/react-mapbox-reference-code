import { atom } from "recoil";

export const activeFireZoneState = atom<string | null>({
  key: "activeFireZone",
  default: null,
});

export const isochronePredictionState = atom<boolean>({
  key: "isochronePrediction",
  default: false,
});

export const threeDIsochronePredictionState = atom<boolean>({
  key: "threeDIsochronePrediction",
  default: false,
});

export const airTrafficState = atom<boolean>({
  key: "airTraffic",
  default: false,
});

export const buildingState = atom<boolean>({
  key: "building",
  default: true,
});

export const handDrawnIsochroneState = atom<boolean>({
  key: "showHandDrawnIsochrone",
  default: false,
});
