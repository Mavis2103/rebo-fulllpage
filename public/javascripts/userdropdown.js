/* eslint-disable camelcase */
const avatar = document.getElementById('a');
const user_dropdown = document.getElementById('user-dropdown');

document.addEventListener('click', (eve) => {
  const a = avatar.contains(eve.target);
  const b = user_dropdown.contains(eve.target);
  if (a) {
    user_dropdown.classList.remove('disable');
  } else if (a === false && b === false) {
    user_dropdown.classList.add('disable');
  }
});
