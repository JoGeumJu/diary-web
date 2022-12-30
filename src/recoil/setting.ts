import { atom } from "recoil";
const date = new Date();

export const todayState = atom<number[]>({
  key: "today",
  default: [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ],
});
export const autoTodayState = atom<boolean>({
  key: "autoToday",
  default: true,
});
