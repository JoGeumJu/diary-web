import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { TodoLate } from "./components/TodoLate";
import { TodoToday } from "./components/TodoToday";
import { TodoEveryday } from "./components/TodoEveryday";
import { TodoEveryMonth } from "./components/TodoEveryMonth";

export const RightSection: React.FC = () => {
  return (
    <Wrapper>
      <TodoLate />
      <TodoToday />
      <TodoEveryday />
      <TodoEveryMonth />
    </Wrapper>
  );
};
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 55%;
  height: 100%;
  align-items: center;
  padding: 12px;
  border-radius: 20px;
  box-shadow: 1px 1px 6px -1px #bbb;
  gap: 12px;
`;
