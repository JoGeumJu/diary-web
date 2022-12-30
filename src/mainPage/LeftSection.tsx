import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Calendar } from "./components/Calendar";
import { Dday } from "./components/Dday";

export const LeftSection: React.FC = () => {
  return (
    <Wrapper>
      <Calendar />
      <Dday />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 45%;
  height: 100%;
  align-items: center;
  padding: 12px;
  border-radius: 20px;
  box-shadow: 1px 1px 6px -1px #bbb;
  gap: 12px;
`;
