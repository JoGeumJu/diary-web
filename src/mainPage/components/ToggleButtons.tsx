import React from "react";
import styled from "@emotion/styled";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineQuestion, AiOutlinePlus } from "react-icons/ai";
import { keyframes } from "@emotion/react";

export const ToggleButtons: React.FC = () => {
  return (
    <Wrapper>
      <ToggleBtn>
        <IoSettingsOutline />
      </ToggleBtn>
      <ToggleBtn>
        <AiOutlineQuestion />
      </ToggleBtn>
      <ToggleBtn>
        <AiOutlinePlus />
      </ToggleBtn>
    </Wrapper>
  );
};

const cursorOn = keyframes`
0%{
    width:0px;
    height:0px;
}
`;
const cursorOut = keyframes`
0%{
    width:36px;
    height:36px;
}
`;
const Wrapper = styled.section`
  display: flex;
`;
const ToggleBtn = styled.button`
  display: flex;
  position: relative;
  padding: 8px;
  background: none;
  font-size: 20px;
  border: none;
  margin-left: 16px;
  border-radius: 30px;
  cursor: pointer;
  &:after {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: "";
    background: #bbb5;
    width: 0px;
    height: 0px;
    border-radius: 20px;
    animation: ${cursorOut} 0.3s ease;
  }
  &:hover,
  &:active {
    &:after {
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      content: "";
      background: #bbb5;
      width: 36px;
      height: 36px;
      border-radius: 20px;
      animation: ${cursorOn} 0.3s ease;
    }
  }
`;
