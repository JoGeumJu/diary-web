import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

export const TodoToday: React.FC = () => {
  return (
    <Wrapper>
      <div id="to-doInsert">
        오늘 할 일
        {/* <i class="fa-solid fa-circle">&nbsp;</i><b>오늘할일</b> */}
        {/* <input id="today" type="text" class="todo-input" placeholder="해야 할 일을 입력해주세요."> */}
      </div>
      <div id="plusToday"></div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 35%;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  box-shadow: 1px 1px 6px -1px #bbb;
`;
