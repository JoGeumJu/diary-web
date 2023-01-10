import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { Header } from "../src/mainPage/Header";
import styled from "@emotion/styled";
import { AddMemo } from "../src/mainPage/components/AddMemo";
import { LeftSection } from "../src/mainPage/LeftSection";
import { RightSection } from "../src/mainPage/RightSection";
import { memoDataState } from "../src/recoil/userData";
import { useRecoilValue } from "recoil";

export default function Home() {
  const memoDataG = useRecoilValue(memoDataState);
  return (
    <Wrapper>
      <Header />
      <MainContents>
        {memoDataG.map((item, idx) => {
          if (idx >= 1) {
            return (
              <AddMemo
                id={idx}
                key={idx}
                x={item.x}
                y={item.y}
                content={item.content}
                f={item.f}
              />
            );
          }
        })}
        <LeftSection />
        <RightSection />
      </MainContents>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  &::before {
    position: absolute;
    width: 100%;
    height: 100%;
    content: "";
    z-index: 0;
    /* background: url("https://cdn.discordapp.com/attachments/912655210390904882/983723216432410624/66e8e84fe1405e9b.png"); */
    opacity: 0.6;
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
    background-attachment: fixed;
    top: 0;
    left: 0;
  }
`;
const MainContents = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  height: calc(100% - 48px);
  gap: 0 16px;
  padding: 16px;
  overflow: hidden;
`;
