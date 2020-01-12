

const swalDefault = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary btn-lg',
    cancelButton: 'btn btn-lg'
  },
  buttonsStyling: false,
  heightAuto: false,
  confirmButtonText: "확인",
  timer: 1500
})
const swalFatalError = Swal.mixin({
  icon: "error",
  title: "오류",
  heightAuto: false,
  showConfirmButton: false,
  allowEscapeKey : false,
  allowOutsideClick: false
})

// 버튼 활성화
function activate() {
  document.getElementById("save").disabled = false;
  document.getElementById("delete").disabled = false;
}
// 버튼 비활성화
function disactivate() {
  document.getElementById("save").disabled = true;
  document.getElementById("delete").disabled = true;
  return false;
}
$("#save").click(function() {
  disactivate();
  localStorage.Grade = $("#grade option:selected").text();
  localStorage.Class = $("#class option:selected").text();
  // TODO: 알림 기능 구현
  //localStorage.Noti = $("#noti option:selected").val();
  //if ($("#noti option:selected").val() == "none") {
    swalDefault.fire({
      icon: "success",
      title: "저장했습니다."
    });
  //} else {
  //  Swal.fire({
  //    icon: "warning",
  //    title: "알림을 허용해주세요.",
  //    showConfirmButton: false,
  //    heightAuto: false,
  //    allowEscapeKey : false,
  //    allowOutsideClick: false
  //  });
  //  Notification.requestPermission().then(function(result) {
  //        if(result === 'granted') {
  //          swalDefault.fire({
  //            icon: "success",
  //            title: "저장했습니다."
  //          });
  //  *** CODE ***
  //        } else {
  //          localStorage.Noti = "none";
  //          swalDefault.fire({
  //            icon: "error",
  //            title: "알림 설정을 저장하지 못했습니다.",
  //            text: "나머지 설정은 저장했습니다."
  //          });
  //        }
  //    });
  //}
  activate();
});
$("#delete").click(function() {
  disactivate();
  Swal.fire({
    icon: "warning",
    title: "진짜 지우시게요?",
    showCancelButton: true,
    confirmButtonText: "지울건데요?",
    cancelButtonText: "음.. 생각해볼게요!",
    customClass: {
      actions: 'swal-vertical-buttons',
      confirmButton: 'btn textOnly',
      cancelButton: 'btn btn-primary btn-lg mb-2'
    },
    focusCancel: true,
    buttonsStyling: false,
    heightAuto: false,
    reverseButtons: true
  }).then(result => {
    if (result.value) {
      localStorage.clear();
      swalDefault.fire({
        icon: "success",
        title: "삭제했습니다.",
        text: "안녕히 가세요!",
        confirmButtonText: "확인"
      });
      activate();
    } else {
      activate();
    }
  });
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
  $(".form").animate(
    {
      opacity: "1"
    },
    500
  );
});

const classes = [1,2,3,4,5,6,7,8,9,10,11,12];
for (var i in classes) {
  $("#class").append(
    '<option value="' +
      classes[i] +
      '반">' +
      classes[i] +
      "</option>"
  );
}
if (localStorage.Grade) {
  $("#grade")
    .val(localStorage.Grade + "학년")
    .prop("selected", true);
}
if (localStorage.Class) {
  $("#class")
    .val(localStorage.Class + "반")
    .prop("selected", true);
}
//if (localStorage.Noti) {
//  $("#noti")
//    .val(localStorage.Noti)
//    .prop("selected", true);
//}
activate();
console.log(localStorage);
