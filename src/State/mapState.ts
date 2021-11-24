import { atom } from "recoil";

export const mapStyleState = atom<
  "streets-v11" | "outdoors-v11" | "satellite-v9"
>({
  key: "mapStyle",
  default: "satellite-v9",
});
