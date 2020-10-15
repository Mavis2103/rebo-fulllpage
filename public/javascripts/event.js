/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
function toggle() {
  document.getElementById('menu').classList.toggle('d-none');
  document.getElementById('content').classList.toggle('d-none');
  // $('#content').toggle();
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
