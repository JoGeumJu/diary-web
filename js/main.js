// ***header***
var today = new Date();//오늘 날짜//내 컴퓨터 로컬을 기준으로 today에 Date 객체를 넣어줌
var date = new Date();//today의 Date를 세어주는 역할
var YDM = document.getElementById("todayDate")
YDM.innerHTML = today.getFullYear() + "년 " + (today.getMonth() + 1) + "월 " + (today.getDate()) + "일";
