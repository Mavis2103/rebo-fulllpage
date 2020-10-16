/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
function toggle() {
  const main = document.getElementById('main');
  const menu = document.getElementById('menu');
  main.classList.toggle('menu-active-main');
  main.classList.toggle('w-100');
  menu.classList.toggle('menu-active');
  menu.classList.toggle('z-md-min');
}
const dat = function date() {
  const date = new Date();
  const seconds = document.getElementsByClassName('seconds')[0];
  const minutes = document.getElementsByClassName('minutes')[0];
  const hours = document.getElementsByClassName('hours')[0];
  const day = document.getElementsByClassName('day')[0];
  const dates = document.getElementsByClassName('date')[0];
  const month = document.getElementsByClassName('month')[0];
  const year = document.getElementsByClassName('year')[0];
  seconds.textContent = date.getSeconds();
  minutes.textContent = date.getMinutes();
  hours.textContent = date.getHours();
  day.textContent = date.getDay() + 1;
  dates.textContent = date.getDate();
  month.textContent = date.getMonth() + 1; // 0-11
  year.textContent = date.getFullYear();
};

// function Dates() {
setTimeout(setInterval(dat, 1000), dat());
