import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { Header } from "../src/mainPage/Header";
import styled from "@emotion/styled";
import { LeftSection } from "../src/mainPage/LeftSection";
import { RightSection } from "../src/mainPage/RightSection";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Wrapper>
      <Header />
      <MainContents>
        <LeftSection />
        <RightSection />
      </MainContents>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;
const MainContents = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100% - 48px);
  gap: 0 16px;
  padding: 16px;
`;
