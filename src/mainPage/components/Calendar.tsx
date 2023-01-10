import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { todayState } from "../../recoil/setting";
import { ddayDataState } from "../../recoil/userData";
import { useRecoilValue, useRecoilState } from "recoil";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import holiday from "../../data/holiday.json";
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { addDays } from "date-fns";

interface Props {
  day?: number;
  isToday?: boolean;
  isCurrentMonth?: boolean;
  isSunday?: boolean;
  isSaturday?: boolean;
  themeBackground?: string;
  themeColor?: string;
  width?: number;
  parentWidth?: number;
}

export const Calendar: React.FC = () => {
  const todayG = useRecoilValue<number[]>(todayState);
  const [ddayDataG, setDdayDataG] = useRecoilState(ddayDataState);
  const dayOfWeek: Array<string> = ["일", "월", "화", "수", "목", "금", "토"];
  const [currentMonth, setCurrentMonth] = useState(
    new Date(todayG[0], todayG[1] - 1, todayG[2])
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date(todayG[0], todayG[1] - 1, todayG[2])
  );
  let monthStart = startOfMonth(currentMonth);
  let monthEnd = endOfMonth(monthStart);
  let startDate = startOfWeek(monthStart);
  let endDate = endOfWeek(monthEnd);
  let days = [];
  let day = startDate;
  let row = [];
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      days.push({ id: Number(format(day, "d")), day: day });
      day = addDays(day, 1);
    }
    row.push(days);
    days = [];
  }

  useEffect(() => {
    let monthStart = startOfMonth(currentMonth);
    let monthEnd = endOfMonth(monthStart);
    let startDate = startOfWeek(monthStart);
    let endDate = endOfWeek(monthEnd);
    let days = [];
    let day = startDate;
    let row = [];
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        days.push({ id: Number(format(day, "d")), day: day });
        day = addDays(day, 1);
      }
      row.push(days);
      days = [];
    }
  }, [currentMonth]);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const titleMonth = () => {
    setCurrentMonth(new Date(todayG[0], todayG[1] - 1, todayG[2]));
  };
  return (
    <Wrapper>
      <CalendarInner>
        <Thead>
          <Tr>
            <PrevArrow onClick={prevMonth}>
              <BsFillCaretLeftFill fontSize={16} />
            </PrevArrow>
            <th
              colSpan={5}
              style={{
                display: "flex",
                width: "calc(100% / 7 * 5)",
                justifyContent: "center",
              }}
            >
              {" "}
              <Title onClick={titleMonth}>{`${currentMonth.getFullYear()}년 ${
                currentMonth.getMonth() + 1
              }월`}</Title>
            </th>
            <NextArrow onClick={nextMonth}>
              <BsFillCaretRightFill fontSize={16} />
            </NextArrow>
          </Tr>
        </Thead>
        <Tbody>
          <Tr style={{ height: "6%" }}>
            {dayOfWeek.map((i, idx) => (
              <DayOfWeek key={idx}>{i}</DayOfWeek>
            ))}
          </Tr>
          {row.map((item, idx) => {
            return (
              <Tr key={idx}>
                {item.map((i, id) => {
                  return (
                    <Day
                      key={id}
                      isToday={
                        i.day.getFullYear() === todayG[0] &&
                        i.day.getMonth() + 1 === todayG[1] &&
                        i.day.getDate() === todayG[2]
                      }
                      isCurrentMonth={
                        i.day.getMonth() === currentMonth.getMonth()
                      }
                      // toggle창 생성
                    >
                      <DayTitle
                        isSunday={id === 0}
                        isSaturday={id === 6}
                        isCurrentMonth={
                          i.day.getMonth() === currentMonth.getMonth()
                        }
                      >
                        <>
                          {i.id}
                          {holiday.map((data) => {
                            if (
                              i.day.getMonth() === currentMonth.getMonth() &&
                              data.date[0] === currentMonth.getMonth() + 1 &&
                              data.date[1] === i.id
                            ) {
                              return (
                                <Holiday
                                  key={id}
                                  themeBackground={data.background}
                                  themeColor={data.color}
                                >
                                  {data.name}
                                </Holiday>
                              );
                            }
                          })}
                        </>
                      </DayTitle>
                      <DayContentBox>
                        {ddayDataG
                          .filter(
                            (item) =>
                              item.day ===
                              `${i.day.getFullYear()}-${i.day.getMonth()}-${i.day.getDate()}`
                          )
                          .map((i, id) => (
                            <DayContent key={id} id="day">
                              <DayContentText
                                id={`day${id}`}
                                width={i.content.length * 12}
                                parentWidth={
                                  document.getElementById("day")?.offsetWidth
                                }
                              >
                                {i.content}
                              </DayContentText>
                            </DayContent>
                          ))}
                      </DayContentBox>
                    </Day>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </CalendarInner>
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
const moveText = keyframes`
  0%{
    transform:translate(0,0);
  }
  20%{
    transform:translate(0,0);
  }
  100%{
    transform:translate(calc(-100%),0);
  }
`;
const Wrapper = styled.section`
  display: flex;
  width: 100%;
  height: 70%;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 6px -1px #bbb;
  border-radius: 16px;
  padding: 16px;
  background: #fff7;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const CalendarInner = styled.table`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const Tr = styled.tr`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: 2px 0;
`;
const Thead = styled.thead`
  display: flex;
  width: 100%;
  height: 14%;
  align-items: center;
  justify-content: center;
`;
const Tbody = styled.tbody`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 86%;
`;
const PrevArrow = styled.th`
  display: flex;
  position: relative;
  width: calc(100% / 7);
  height: 100%;
  align-items: center;
  justify-content: center;
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
      cursor: pointer;
    }
  }
`;
const NextArrow = styled.th`
  display: flex;
  position: relative;
  width: calc(100% / 7);
  height: 100%;
  align-items: center;
  justify-content: center;
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
      cursor: pointer;
    }
  }
`;
const Title = styled.span`
  display: flex;
  position: relative;
  width: 128px;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
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
      width: inherit;
      height: 36px;
      border-radius: 20px;
      animation: ${cursorOn} 0.3s ease;
      cursor: pointer;
    }
  }
`;
const DayOfWeek = styled.td`
  display: flex;
  width: calc(100% / 7);
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;
const Day = styled.td<Props>`
  display: flex;
  flex-direction: column;
  width: calc(100% / 7);
  height: 100%;
  border-radius: 12px;
  box-shadow: 1px 1px 6px -2px #bbb inset;
  margin: 0 2px;
  padding: 6px;
  ${(props) => props.isToday && "background:#ffc8;"}
  ${(props) => !props.isCurrentMonth && "background:#ddd8;"}
`;
const DayTitle = styled.div<Props>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 26%;
  font-size: 12px;
  align-items: center;
  ${(props) => props.isSunday && "color:#ff6565;"}
  ${(props) => props.isSaturday && "color:#6565ff;"};
  ${(props) => !props.isCurrentMonth && "color:#aaa;"}
`;
const Holiday = styled.div<Props>`
  display: flex;
  font-size: 12px;
  white-space: nowrap;
  padding: 1px 2px;
  border-radius: 4px;
  background: ${(props) => props.themeBackground};
  color: ${(props) => props.themeColor};
  overflow: hidden;
`;
const DayContentBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 74%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 2px 0;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #6665;
    border-radius: 12px;
    background-clip: padding-box;
    border: 2px solid transparent;
    &:hover,
    &:active {
      background-color: #6668;
    }
  }
`;
const DayContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  margin-top: 4px;
  white-space: nowrap;
`;
const DayContentText = styled.span<Props>`
  white-space: nowrap;
  ${(props) =>
    props.parentWidth + 14 < props.width && {
      animation: `${moveText} ${props.width / 40}s linear infinite;`,
    }}
  padding:1px 2px;
  background: #aaa5;
  border-radius: 4px;
`;
