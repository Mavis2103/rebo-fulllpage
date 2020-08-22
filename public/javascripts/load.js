// import "node-fetch";
var menu_radio = document.getElementsByName("clicked");
for (let index = 0; index < menu_radio.length; index++) {
  const element_radio = menu_radio[index];
  if (element_radio.checked) {
    switch_of_menu(index);
    menuOnchange(element_radio, index);
  } else {
    menuOnchange(element_radio, index);
  }
}
function switch_of_menu(index) {
  switch (index) {
    case 0:
      $("#content").load("dashboard");

      break;
    case 1:
      $("#content").load("classes");

      break;
    case 2:
      $("#content").load("messages");

      break;
    case 3:
      $("#content").load("lesson");

      break;
    case 4:
      $("#content").load("tools");

      break;
    case 5:
      $("#content").load("library");

      break;
    case 6:
      $("#content").load("profile");

      break;
    case 7:
      $("#content").load("support");

      break;
    case 8:
      $("#content").load("setting");

      break;
    default:
      break;
  }
}
function menuOnchange(element_radio, index) {
  element_radio.addEventListener("change", function () {
    switch_of_menu(index);
  });
}
