///// Plus To-do /////
var inputLate = document.querySelector("#late");
var inputToday = document.querySelector("#today");
var inputEveryday = document.querySelector("#everyday");
var inputEverymonth = document.querySelector("#everymonth");

inputLate.addEventListener("keypress", function (key) {
  if (key.key == "Enter") {
    var inputValue = inputLate.value;
    var divLate = document.querySelector("#plusLate");
    divLate.innerHTML +=
      '<div id="todoPlus"><div id="todoContent" action="#">' +
      '<input type="checkbox" id="chk">&nbsp;<span class="text">' +
      inputValue +
      '</span></input></div><i class="fa-solid fa-xmark" id="todoRemove" onclick="removeF(event)"></i></div>';
    inputLate.value = null;
  }
});
inputToday.addEventListener("keypress", function (key) {
  if (key.key == "Enter") {
    var inputValue = inputToday.value;
    var divToday = document.querySelector("#plusToday");
    divToday.innerHTML +=
      '<div id="todoPlus"><div id="todoContent" action="#">' +
      '<input type="checkbox" id="chk">&nbsp;<span class="text">' +
      inputValue +
      '</span></input></div><i class="fa-solid fa-xmark" id="todoRemove" onclick="removeF(event)"></i></div>';
    inputToday.value = null;
  }
});
inputEveryday.addEventListener("keypress", function (key) {
  if (key.key == "Enter") {
    var inputValue = inputEveryday.value;
    var divEveryday = document.querySelector("#plusEveryday");
    divEveryday.innerHTML +=
      '<div id="todoPlus"><div id="todoContent" action="#">' +
      '<input type="checkbox" id="chk">&nbsp;<span class="text">' +
      inputValue +
      '</span></input></div><i class="fa-solid fa-xmark" id="todoRemove" onclick="removeF(event)"></i></div>';
    inputEveryday.value = null;
  }
});
inputEverymonth.addEventListener("keypress", function (key) {
  if (key.key == "Enter") {
    var inputValue = inputEverymonth.value;
    var divEverymonth = document.querySelector("#plusEverymonth");
    divEverymonth.innerHTML +=
      '<div id="todoPlus"><div id="todoContent" action="#">' +
      '<input type="checkbox" id="chk">&nbsp;<span class="text">' +
      inputValue +
      '</span></input></div><i class="fa-solid fa-xmark" id="todoRemove" onclick="removeF(event)"></i></div>';
    inputEverymonth.value = null;
  }
});

///// Remove To-do /////
function removeF(e) {
  e.target.parentNode.remove();
}