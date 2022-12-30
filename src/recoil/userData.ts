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
export const todoDataState = atom({
  key: "todo",
  default: [],
});
