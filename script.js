new Swiper( '.swiper-container', {
    navigation : { // 네비게이션
        nextEl : '.swiper-button-next', // 오른쪽(다음) 화살표
        prevEl : '.swiper-button-prev', // 왼쪽(이전) 화살표
    },
    initialSlide: 1,
});
$.getJSON("https://hdmapi.hyungyo.me/data.json", function(data) {
//$.getJSON("data.json", function(data) {

  function load(name, date, koname, grade, class_) {

    $("#"+name+" #date").text(koname+", "+data[date].Date);

    menu = data[date].Meal.Menu;
    $("#"+name+" #menuBody").text("");
    if (!menu){
      $("#"+name+" #menuBody").text("식단정보가 없습니다.");
    } else if (menu[0] == "") {
      $("#"+name+" #menuBody").text("식단정보가 없습니다.");
    } else {
      for (var menuLoc in menu){
        $("#"+name+" #menuBody").append("<li>"+menu[menuLoc]+"</li>");
      }
    }

    $("#"+name+" #ttTitle").text(grade+"학년 "+class_+"반 시간표");
    if (data[date].Timetable) {
      tt = data[date].Timetable[grade][class_];
      console.log(tt);
      $("#"+name+" #ttBody").text("");
      if (!tt){
        $("#"+name+" #ttBody").text("시간표가 없습니다.");
      } else if (tt.length == 0) {
        $("#"+name+" #ttBody").text("시간표가 없습니다.");
      } else {
        for (var ttLoc in tt){
          $("#"+name+" #ttBody").append("<li>"+tt[ttLoc]+"</li>");
        }
      }
    } else {
      $("#"+name+" #ttBody").text("시간표가 없습니다.");
    }

    schdl = data[date].Schedule;
    $("#"+name+" #schdlBody").text("");
    if (!schdl){
      $("#"+name+" #schdlBody").text("학사일정이 없습니다.");
    } else if (schdl[0] == "") {
      $("#"+name+" #schdlBody").text("학사일정이 없습니다.");
    } else {
      for (var schdlLoc in schdl){
        $("#"+name+" #schdlBody").append("<li>"+schdl[schdlLoc]+"</li>");
      }
    }
  }

if (localStorage.Grade && localStorage.Class) {
  load("yesterday", "Yesterday", "어제", localStorage.Grade, localStorage.Class);
  load("today", "Today", "오늘", localStorage.Grade, localStorage.Class);
  load("tomorrow", "Tomorrow", "내일", localStorage.Grade, localStorage.Class);
} else {
  load("yesterday", "Yesterday", "어제", 1, 1);
  load("today", "Today", "오늘", 1, 1);
  load("tomorrow", "Tomorrow", "내일", 1, 1);
}
});

// 로딩 끝나면 화면전환
$(document).ready(function() {
  $(".lds-ring").animate(
    {
      opacity: "0"
    },
    500
  );
  $(".lds-ring").remove();
  $(".swiper-container").animate(
    {
      opacity: "1"
    },
    500
  );
  $(".swiper-button").delay(1000).animate({opacity:'0'},500);
});


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(() => {
    console.log('Service Worker Registered');
  });
}

window.addEventListener('beforeinstallprompt', (e) => {
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  showInstallPromotion();
});
