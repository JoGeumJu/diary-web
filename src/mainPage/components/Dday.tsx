import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { TbSend } from "react-icons/tb";
import { BsTextLeft } from "react-icons/bs";
import { VscEdit } from "react-icons/vsc";
import { MdOutlineCancel } from "react-icons/md";
import { todayState } from "../../recoil/setting";
import { RecoilState, useRecoilValue } from "recoil";
import { keyframes } from "@emotion/react";
import { ddayDataState } from "../../recoil/userData";
import { useRecoilState } from "recoil";

interface Props {
  idx?: number;
  isEdit?: boolean;
  isDday?: string;
  isToday?: boolean;
}

export const Dday: React.FC = () => {
  const zeroFormat = (num: number) => {
    return num.toString().length < 2 ? "0" + String(num) : String(num);
  };

  const [ddayDataG, setDdayDataG] = useRecoilState(ddayDataState);
  const todayG = useRecoilValue(todayState);
  const [dateValue, setDateValue] = useState<string>(
    `${todayG[0]}-${zeroFormat(todayG[1])}-${zeroFormat(todayG[2])}`
  );
  const [contentValue, setContentValue] = useState<string>("");
  const [toggleEdit, setToggleEdit] = useState<boolean[]>([false]);
  const [editValue, setEditValue] = useState<string>("");

  const onClickSend = () => {
    if (contentValue !== "") {
      let day = new Date(dateValue);
      let dday = day.getTime();
      let tday = new Date(
        `${todayG[0]}-${zeroFormat(todayG[1])}-${zeroFormat(todayG[2])}`
      ).getTime();
      let togo = (dday - tday) / (1000 * 60 * 60 * 24);
      if (togo > 0) {
        setDdayDataG([
          ...ddayDataG,
          {
            day: `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`,
            dday: `Dday+${togo}`,
            content: contentValue,
          },
        ]);
        setDateValue(
          `${todayG[0]}-${zeroFormat(todayG[1])}-${zeroFormat(todayG[2])}`
        );
        setContentValue("");
        setToggleEdit([...toggleEdit, false]);
        (document.activeElement as HTMLElement).blur();
      } else if (togo === 0) {
        setDdayDataG([
          ...ddayDataG,
          {
            day: `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`,
            dday: `Dday-${togo}`,
            content: contentValue,
          },
        ]);
        setDateValue(
          `${todayG[0]}-${zeroFormat(todayG[1])}-${zeroFormat(todayG[2])}`
        );
        setContentValue("");
        setToggleEdit([...toggleEdit, false]);
        (document.activeElement as HTMLElement).blur();
      } else {
        setDdayDataG([
          ...ddayDataG,
          {
            day: `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`,
            dday: `Dday${togo}`,
            content: contentValue,
          },
        ]);
        setDateValue(
          `${todayG[0]}-${zeroFormat(todayG[1])}-${zeroFormat(todayG[2])}`
        );
        setContentValue("");
        setToggleEdit([...toggleEdit, false]);
        (document.activeElement as HTMLElement).blur();
      }
    }
  };
  const onClickCancel = (idx: number) => {
    setDdayDataG(ddayDataG.filter((i, id) => idx !== id));
    setToggleEdit(toggleEdit.filter((i, id) => idx !== id));
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
        setDdayDataG(
          ddayDataG.map((i, id) =>
            id === idx ? { ...i, content: editValue } : { ...i }
          )
        );
      setEditValue("");
      document.getElementById(`editDday${idx}`)?.blur();
    }
  };
  const onToggleEdit = (idx: number) => {
    setToggleEdit(toggleEdit.map((i, id) => (id === idx ? !i : false)));
    document.getElementById(`editDday${idx}`)?.focus();
  };
  const onBlurEdit = (idx: number) => {
    editValue !== "" &&
      setDdayDataG(
        ddayDataG.map((i, id) =>
          id === idx ? { ...i, content: editValue } : { ...i }
        )
      );
    setEditValue("");
    setToggleEdit(toggleEdit.map((i, id) => (id === idx ? false : false)));
  };

  return (
    <Wrapper>
      <Info>
        <DateInfo>
          <DateInput
            type="date"
            value={dateValue}
            onChange={(e) => {
              setDateValue(e.target.value);
            }}
            onKeyDown={onPressEnterSend}
          />
        </DateInfo>
        <ContentInfo>
          <BsTextLeft
            type="text"
            fontSize={18}
            style={{
              position: "absolute",
              margin: "0 0 2px 12px",
              color: "#000",
            }}
          />
          <ContentInput
            placeholder="D-day 이벤트를 입력해주세요"
            value={contentValue}
            maxLength={32}
            onChange={(e) => {
              setContentValue(e.target.value);
            }}
            onKeyDown={onPressEnterSend}
          />
        </ContentInfo>
        <Send onClick={onClickSend}>
          <TbSend />
        </Send>
      </Info>
      <DdayList>
        {ddayDataG.map(
          (item, idx) =>
            idx >= 1 && (
              <DdayBox key={idx}>
                <DDay isDday={item.dday[4]} isToday={item.dday[5] === "0"}>
                  {item.dday}
                </DDay>
                <EditInput
                  id={`editDday${idx}`}
                  type="text"
                  idx={idx}
                  value={editValue}
                  isEdit={toggleEdit[idx]}
                  onFocus={() => {
                    setEditValue(item.content);
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
                ></EditInput>
                <Content>{item.content}</Content>
                <HoverBtns>
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
              </DdayBox>
            )
        )}
      </DdayList>
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
  justify-content: flex-start;
  box-shadow: 1px 1px 6px -1px #bbb;
  border-radius: 16px;
  padding: 12px;
  gap: 12px;
  background: #fff7;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const DateInfo = styled.div`
  display: flex;
  align-items: center;
`;
const DateInput = styled.input`
  display: flex;
  flex-direction: row-reverse;
  background: #fff7;
  width: 144px;
  height: 32px;
  font-family: "다이어리체";
  font-size: 13px;
  padding: 8px 12px;
  border: 2px solid #0000;
  box-shadow: 1px 1px 6px -1px #bbb;
  margin-right: 8px;
  border-radius: 12px;
  color: #222;
  cursor: pointer;
  &::-webkit-calendar-picker-indicator {
    width: 16px;
    height: 16px;
    padding: 0;
    margin-right: 8px;
  }
  &:hover,
  &:focus {
    outline: 2px solid #222;
  }
`;
const ContentInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
`;
const ContentInput = styled.input`
  background: #fff7;
  width: 100%;
  height: 32px;
  font-family: "다이어리체";
  font-size: 14px;
  padding: 8px 12px 8px 40px;
  border: 2px solid #0000;
  box-shadow: 1px 1px 6px -1px #bbb;
  margin-right: 8px;
  border-radius: 12px;
  cursor: pointer;
  &::placeholder {
    color: #2228;
  }
  &:hover,
  &:focus {
    outline: 2px solid #222;
  }
`;
const Send = styled.button`
  display: flex;
  position: relative;
  background: #fff7;
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
const DdayList = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 8px;
  padding-bottom: 0;
  box-shadow: 1px 1px 6px -1px #bbb inset;
  border-radius: 12px;
  flex-direction: column;
  overflow-y: auto;
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
const DdayBox = styled.div`
  display: flex;
  position: relative;
  height: 41px;
  flex-direction: row;
  padding: 4px 8px;
  margin-bottom: 8px;
  border-radius: 16px;
  box-shadow: 1px 1px 6px -1px #bbb;
  align-items: center;
  background: #fff7;
`;
const DDay = styled.span<Props>`
  display: flex;
  font-size: 12px;
  margin-right: 8px;
  background: ${(props) => props?.isDday === "+" && "#6565ff44"};
  background: ${(props) => props?.isDday === "-" && "#ff656544"};
  background: ${(props) => props?.isToday && "#aaa4"};
  padding: 6px 8px;
  border-radius: 12px;
  white-space: nowrap;
`;
const Content = styled.span`
  display: flex;
  font-size: 14px;
  margin: 9px 0;
`;
const HoverBtns = styled.div`
  display: flex;
  margin-left: auto;
`;
const EditBtn = styled.button<Props>`
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
  width: calc(100% - 140px);
  height: 33px;
  font-family: "다이어리체";
  font-size: 14px;
  padding: 0px 8px;
  border: 2px solid #0000;
  box-shadow: 1px 1px 6px -1px #bbb inset;
  margin-right: 8px;
  margin-left: 72px;
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
