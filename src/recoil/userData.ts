import { atom } from "recoil";

interface DdayProps {
  day: string;
  dday: string;
  content: string;
}
export const ddayDataState = atom<DdayProps[]>({
  key: "dday",
  default: [{ day: "2000-0-0", dday: "Dday-0", content: "샬라샬라" }],
});
export const todoLDataState = atom<string[]>({
  key: "todoLData",
  default: ["샬라샬라"],
});
export const todoTDataState = atom<string[]>({
  key: "todoTData",
  default: ["샬라샬라"],
});
export const todoEDDataState = atom<string[]>({
  key: "todoEDData",
  default: ["샬라샬라"],
});
export const todoEMDataState = atom<string[]>({
  key: "todoEMData",
  default: ["샬라샬라"],
});
