let avatar = document.getElementById('a');
let user_dropdown = document.getElementById('user-dropdown');

document.addEventListener('click', (eve) => {
  let a = avatar.contains(eve.target);
  let b = user_dropdown.contains(eve.target)
  if (a) {
    user_dropdown.classList.remove('disable')
  } else if (a == false && b == false) {
    user_dropdown.classList.add('disable')
  }
})