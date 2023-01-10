import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { todayState, autoTodayState } from "../recoil/setting";
import { useRecoilState, useRecoilValue } from "recoil";
import { ToggleButtons } from "./components/ToggleButtons";

export const Header: React.FC = () => {
  const autoTodayG = useRecoilValue(autoTodayState);
  const [todayG, setTodayG] = useRecoilState(todayState);
  const [today, setToday] = useState(new Date());
  useEffect(() => {
    setToday(new Date());
    autoTodayG &&
      setTodayG([
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate(),
        today.getHours(),
        today.getMinutes(),
      ]);
  }, [autoTodayG, setTodayG, today]);

  const zeroFormat = (num: number) => {
    return num.toString().length < 2 ? "0" + String(num) : String(num);
  };

  return (
    <Wrapper>
      <Today>{`${todayG[0]}년 ${todayG[1]}월 ${todayG[2]}일 ${zeroFormat(
        todayG[3]
      )}:${zeroFormat(todayG[4])}`}</Today>
      <ToggleButtons />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  z-index: 15;
  height: 48px;
  width: 100%;
  padding: 0 24px;
  background: #fffa;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1px 4px -1px #bbb;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const Today = styled.span`
  padding: 0px 4px;
`;
