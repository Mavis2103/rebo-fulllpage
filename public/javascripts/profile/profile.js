var user_radio = document.getElementsByName("profile");
for (let index = 0; index < user_radio.length; index++) {
  const element = user_radio[index];
  if (element.checked) {
    switch_radio(index);
    element.addEventListener("change", function (e) {
      switch_radio(index);
    });
  } else {
    element.addEventListener("change", function (e) {
      switch_radio(index);
    });
  }
}
function switch_radio(index) {
  switch (index) {
    case 0:
      $("#profile-content").load("user-detail");
      break;
    case 1:
      $("#profile-content").load("user-privacy");
      break;

    default:
      break;
  }
}
