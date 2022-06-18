///// Plus D-day /////
function ddaying(Y,M,D){
    var today = new Date();
    var dday_ = new Date(Y,M-1,D);
    var dday = new Date(Y, M-1, dday_.getDate()+1);
    var toGo = dday.getTime() - today.getTime();
    if(toGo>=0){
        var daysGone = Math.floor(toGo/(1000*60*60*24));
        return "D-" + daysGone;
    }else{
        var toGo = today.getTime() - dday.getTime();
        var daysGone = Math.floor(toGo/(1000*60*60*24));
        return "D+" + daysGone;
    }
}

var plusBtn = document.querySelector("#d-dayPlusBtn");
var plusDDay = document.querySelector("#d-dayScroll");
plusBtn.addEventListener("click", function(){
    var date_DDay = document.querySelector("#ddayInputDate").value.split("-");
    var content = document.querySelector("#ddayInputContent").value;
    plusDDay.innerHTML += "<div id=\"d-dayDiv\"><div id=\"d-dayContent\">" + ddaying(date_DDay[0],date_DDay[1],date_DDay[2])
        + "\t" + content + "</div><i class=\"fa-solid fa-xmark\" id=\"d-dayRemove\" onclick=\"removeF(event)\"></i></div>";
    document.querySelector("#ddayInputDate").value = null;
    var content = document.querySelector("#ddayInputContent").value = null;
});

///// Remove D-day /////
function removeF(e){
    e.target.parentNode.remove();
}