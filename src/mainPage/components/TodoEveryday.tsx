import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

export const TodoEveryday: React.FC = () => {
  return (
    <Wrapper>
      <div id="to-doInsert">
        매일 할 일{/* <i class="fa-solid fa-heart">&nbsp;</i><b>매일할일</b> */}
        {/* <input id="everyday" type="text" class="todo-input" placeholder="해야 할 일을 입력해주세요."> */}
      </div>
      <div id="plusEveryday"></div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 17.5%;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  box-shadow: 1px 1px 6px -1px #bbb;
`;
