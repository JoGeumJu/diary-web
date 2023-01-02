import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import {
  BsPatchCheck,
  BsTextLeft,
  BsSquare,
  BsCheckSquare,
} from "react-icons/bs";
import { VscEdit } from "react-icons/vsc";
import { MdOutlineCancel } from "react-icons/md";
import { TbSend } from "react-icons/tb";
import { todoLDataState } from "../../recoil/userData";
import { useRecoilState } from "recoil";

interface Props {
  idx?: number;
  isHover?: boolean;
  isCheck?: boolean;
  isEdit?: boolean;
}
export const TodoLate: React.FC = () => {
  const [todoLDataG, setTodoLDataG] = useRecoilState(todoLDataState);
  const [contentValue, setContentValue] = useState<string>("");
  const [isHover, setIsHover] = useState<boolean[]>([false]);
  const [isCheck, setIsCheck] = useState<boolean[]>([false]);
  const [toggleEdit, setToggleEdit] = useState<boolean[]>([false]);
  const [editValue, setEditValue] = useState<string>("");

  const onClickSend = () => {
    if (contentValue !== "") {
      setTodoLDataG([...todoLDataG, contentValue]);
      setIsHover([...isHover, false]);
      setToggleEdit([...toggleEdit, false]);
      setIsCheck([...isCheck, false]);
      setContentValue("");
    }
  };
  const onClickCancel = (idx: number) => {
    setTodoLDataG(todoLDataG.filter((i, id) => idx !== id));
    setIsHover(isHover.filter((i, id) => idx !== id));
    setIsCheck(isCheck.filter((i, id) => idx !== id));
    setToggleEdit(toggleEdit.filter((i, id) => idx !== id));
  };
  const onClickCheckBox = (idx: number) => {
    console.log(isCheck);

    setIsCheck(isCheck.map((i, id) => (id === idx ? !i : i)));
  };
  const onPressEnterSend = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onClickSend();
    }
  };
  const onPressEnterEdit = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      editValue !== "" &&
        setTodoLDataG(todoLDataG.map((i, id) => (id === idx ? editValue : i)));
      setEditValue("");
      document.getElementById(`editTodoL${idx}`)?.blur();
    }
  };
  const onToggleEdit = (idx: number) => {
    setToggleEdit(toggleEdit.map((i, id) => (id === idx ? !i : false)));
    document.getElementById(`editTodoL${idx}`)?.focus();
  };
  const onBlurEdit = (idx: number) => {
    editValue !== "" &&
      setTodoLDataG(todoLDataG.map((i, id) => (id === idx ? editValue : i)));
    setEditValue("");
    setToggleEdit(toggleEdit.map((i, id) => (id === idx ? false : false)));
  };

  return (
    <Wrapper>
      <Head>
        <Title>
          <TitleIcon>
            <BsPatchCheck fontSize={20} color={"#222"} />
          </TitleIcon>
          밀린 할 일
        </Title>
        <AddBox>
          <BsTextLeft
            type="text"
            fontSize={18}
            style={{
              position: "absolute",
              margin: "0 0 2px 12px",
              color: "#000",
            }}
          />
          <AddContent
            placeholder="To-do 이벤트를 입력해주세요"
            value={contentValue}
            maxLength={32}
            onChange={(e) => {
              setContentValue(e.target.value);
            }}
            onKeyDown={onPressEnterSend}
          />
          <Send onClick={onClickSend}>
            <TbSend />
          </Send>
        </AddBox>
      </Head>
      <TodoList>
        {todoLDataG.map(
          (item, idx) =>
            idx >= 1 && (
              <Todo key={idx}>
                <CheckBox
                  onClick={() => {
                    onClickCheckBox(idx);
                  }}
                >
                  {isCheck[idx] ? <BsCheckSquare /> : <BsSquare />}
                </CheckBox>
                <Content
                  isCheck={isCheck[idx]}
                  onMouseEnter={() =>
                    setIsHover(
                      isHover.map((i, id) => (id === idx ? true : false))
                    )
                  }
                  onMouseLeave={() => setIsHover(isHover.map((i) => false))}
                >
                  {item}
                </Content>
                <EditInput
                  id={`editTodoL${idx}`}
                  type="text"
                  idx={idx}
                  value={editValue}
                  isEdit={toggleEdit[idx]}
                  onFocus={() => {
                    setEditValue(item);
                  }}
                  onBlur={() => {
                    onBlurEdit(idx);
                  }}
                  onChange={(e) => {
                    setEditValue(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    onPressEnterEdit(idx, e);
                  }}
                />
                <HoverBtns
                  isHover={isHover[idx]}
                  onMouseEnter={() =>
                    setIsHover(
                      isHover.map((i, id) => (id === idx ? true : false))
                    )
                  }
                  onMouseLeave={() => setIsHover(isHover.map((i) => false))}
                >
                  <EditBtn
                    onClick={() => {
                      onToggleEdit(idx);
                    }}
                  >
                    <VscEdit />
                  </EditBtn>
                  <CancelBtn
                    onClick={() => {
                      onClickCancel(idx);
                    }}
                  >
                    <MdOutlineCancel />
                  </CancelBtn>
                </HoverBtns>
              </Todo>
            )
        )}
      </TodoList>
    </Wrapper>
  );
};

const spin = keyframes`
0%{
  transform: rotate(30deg);
}
100%{
  transform:rotate(390deg);
}
`;
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 30%;
  border-radius: 16px;
  box-shadow: 1px 1px 6px -1px #bbb;
  padding: 16px;
  gap: 8px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const Head = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
const Title = styled.span`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  align-items: center;
`;
const TitleIcon = styled.div`
  margin-right: 8px;
  margin-top: 2px;
`;
const AddBox = styled.div`
  display: flex;
  width: calc(100% - 132px);
  align-items: center;
  position: relative;
`;
const Send = styled.button`
  display: flex;
  position: relative;
  background: none;
  border: 2px solid #0000;
  border-radius: 20px;
  font-size: 20px;
  padding: 8px;
  color: #333;
  transform: rotate(30deg);
  box-shadow: 1px 1px 6px -1px #bbb;
  cursor: pointer;
  &:hover,
  &:active {
    outline: 2px solid #222;
    animation: ${spin} 0.4s;
  }
`;
const AddContent = styled.input`
  width: 100%;
  height: 32px;
  font-family: "다이어리체";
  font-size: 14px;
  padding: 0 12px 0 40px;
  border: 2px solid #0000;
  box-shadow: 1px 1px 6px -1px #bbb;
  border-radius: 12px;
  margin-right: 12px;
  cursor: pointer;
  &::placeholder {
    color: #2228;
  }
  &:hover,
  &:focus {
    outline: 2px solid #222;
  }
`;
const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 8px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 24px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #6665;
    border-radius: 30px;
    background-clip: padding-box;
    border: 8px solid transparent;
    &:hover,
    &:active {
      background-color: #6668;
    }
  }
`;
const Todo = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  padding: 4px 0;
`;
const CheckBox = styled.div`
  margin-right: 8px;
  margin-top: 4px;
  color: #666;
  cursor: pointer;
`;
const Content = styled.span<Props>`
  font-size: 14px;
  white-space: nowrap;
  padding-right: 12px;
  ${(props) => props.isCheck && "text-decoration: line-through; color:#888;"}
`;
const HoverBtns = styled.div<Props>`
  display: ${(props) => (props.isHover ? "flex" : "none")};
`;
const EditBtn = styled.button`
  display: flex;
  border: none;
  background: none;
  margin: 4px;
  font-size: 16px;
  color: #777777;
  cursor: pointer;
  &:hover,
  &:active {
    color: #222;
  }
`;
const CancelBtn = styled.button`
  display: flex;
  border: none;
  background: none;
  margin: 4px;
  font-size: 16px;
  color: #ff7e7e;
  cursor: pointer;
  &:hover,
  &:active {
    color: #ff2b2b;
  }
`;
const EditInput = styled.input<Props>`
  position: absolute;
  transform: ${(props) =>
    props.isEdit ? "translate(0,0)" : "translate(-5000px,0)"};
  width: calc(100% - 36px);
  height: 33px;
  font-family: "다이어리체";
  font-size: 14px;
  padding: 0px 8px;
  border: 2px solid #0000;
  box-shadow: 1px 1px 6px -1px #bbb inset;
  margin-right: 8px;
  margin-left: 24px;
  border-radius: 12px;
  cursor: pointer;
  &::placeholder {
    color: #2228;
  }
  &:hover,
  &:focus {
    outline: 2px solid #bbb;
  }
`;
