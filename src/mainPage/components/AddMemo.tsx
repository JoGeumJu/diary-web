import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { BiMinus } from "react-icons/bi";
import { FiMaximize } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { memoDataState } from "../../recoil/userData";
import { useRecoilState } from "recoil";

interface MemoProps {
  id: number;
  x: number;
  y: number;
  content: string;
  f: boolean;
}
interface MemoStyle {
  x?: number;
  y?: number;
  isFold?: boolean;
  isDrag?: boolean;
  dragXY?: number[];
  isFocusing?: boolean;
}

export const AddMemo = (props: MemoProps) => {
  const [memoDataG, setMemoDataG] = useRecoilState(memoDataState);
  const [memoValue, setMemoValue] = useState<string>(props.content);
  const [isFold, setIsFold] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(props.f);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [mouseDownXY, setMouseDownXY] = useState<number[]>([props.x, props.y]);
  const [mouseUpXY, setMouseUpXY] = useState<number[]>([props.x, props.y]);

  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsDrag(true);
    setMouseDownXY([e.clientX, e.clientY]);
    console.log(mouseDownXY);
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpXY([e.clientX, e.clientY]);
    console.log(mouseUpXY);
  };
  useEffect(() => {
    const dragSpaceX = Math.abs(mouseDownXY[0] - mouseUpXY[0]);
    const dragSpaceY = Math.abs(mouseDownXY[1] - mouseUpXY[1]);
    const vector = dragSpaceX / dragSpaceY;
  }, [mouseDownXY, mouseUpXY]);

  return (
    <Wrapper
      x={props.x}
      y={props.y}
      isFold={isFold}
      isDrag={isDrag}
      dragXY={mouseUpXY}
      onClick={() => setIsFocus(true)}
      onMouseDown={(e) => {
        onMouseDown(e);
      }}
      onMouseUp={(e) => {
        onMouseUp(e);
      }}
    >
      <TopBar>
        <MinButton
          onClick={() => {
            setIsFold(true);
          }}
          isFold={isFold}
        >
          <BiMinus fontSize={16} />
        </MinButton>
        <MaxButton
          onClick={() => {
            setIsFold(false);
          }}
          isFold={isFold}
        >
          <FiMaximize fontSize={14} />
        </MaxButton>
        <CloseButton>
          <IoClose fontSize={18} style={{ color: "#ff6565" }} />
        </CloseButton>
      </TopBar>
      <Title isFold={isFold}>
        <TitleContent>{memoValue}</TitleContent>
      </Title>
      <Content
        isFold={isFold}
        placeholder="Memo"
        value={memoValue}
        onChange={(e) => {
          setMemoValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            setMemoValue((prev) => prev + "\t");
          }
        }}
      ></Content>
    </Wrapper>
  );
};
const Wrapper = styled.section<MemoStyle>`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 100;
  max-width: 90vw;
  min-width: 120px;
  min-height: ${(props) => (props.isFold ? "56px" : "120px")};
  background: #fff;
  box-shadow: 2px 2px 8px -1px #bbb;
  border-radius: 12px;
  top: ${(props) =>
    props.isDrag
      ? `${props.dragXY[1]}`
      : `calc((100% - 240px) / 100 * ` + props.y + ")"};
  left: ${(props) =>
    props.isDrag
      ? `${props.dragXY[0]}`
      : `calc((100% - 240px) / 100 * ` + props.x + ")"};
`;
const TopBar = styled.div<MemoStyle>`
  display: flex;
  position: relative;
  width: 100%;
  height: 28px;
  border-radius: 12px;
  padding: 0px 12px;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  &:after {
    position: absolute;
    content: "";
    width: 90%;
    height: 1px;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    box-shadow: 0px 1px 1px 0px#e2e2e2;
  }
`;
const MinButton = styled.button<MemoStyle>`
  display: flex;
  background: none;
  border: none;
  align-items: center;
  margin-left: 16px;
  cursor: pointer;
  opacity: ${(props) => (props.isFold ? "1" : "0.5")};
  &:hover,
  &:active {
    opacity: 1;
  }
`;
const MaxButton = styled.button<MemoStyle>`
  display: flex;
  background: none;
  border: none;
  align-items: center;
  margin-left: 16px;
  cursor: pointer;
  opacity: ${(props) => (props.isFold ? "0.5" : "1")};
  &:hover,
  &:active {
    opacity: 1;
  }
`;
const CloseButton = styled.button`
  display: flex;
  background: none;
  border: none;
  align-items: center;
  margin-left: 16px;
  cursor: pointer;
  opacity: 0.5;
  &:hover,
  &:active {
    opacity: 1;
  }
`;
const Title = styled.div<MemoStyle>`
  display: ${(props) => (props.isFold ? "flex" : "none")};
  width: 200px;
  height: 28px;
  padding: 0 16px;
  align-items: center;
  font-size: 15px;
  border-radius: 12px;
`;
const TitleContent = styled.span`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Content = styled.textarea<MemoStyle>`
  display: ${(props) => (props.isFold ? "none" : "flex")};
  white-space: pre-wrap;
  width: 100%;
  max-width: 90vw;
  min-width: 128px;
  height: 100%;
  max-height: 90vh;
  min-height: 120px;
  word-break: break-all;
  border: none;
  font-family: "다이어리체";
  font-size: 14px;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  &:focus {
    outline: none;
  }
`;
