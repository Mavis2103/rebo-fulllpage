function toggle() {
	document.getElementById("menu").classList.toggle("d-none");
	document.getElementById("content").classList.toggle("d-none");
	// $('#content').toggle();
}
var date = function date() {
	const date = new Date();
	var seconds = document.getElementsByClassName('seconds')[0];
	var minutes = document.getElementsByClassName('minutes')[0];
	var hours = document.getElementsByClassName('hours')[0];
	var day = document.getElementsByClassName('day')[0];
	var dates = document.getElementsByClassName('date')[0];
	var month = document.getElementsByClassName('month')[0];
	var year = document.getElementsByClassName('year')[0];
	seconds.textContent = date.getSeconds();
	minutes.textContent = date.getMinutes();
	hours.textContent = date.getHours();
	day.textContent = date.getDay() + 1;
	dates.textContent = date.getDate();
	month.textContent = date.getMonth() + 1; // 0-11
	year.textContent = date.getFullYear();
};

// function Dates() {
setTimeout(setInterval(date, 1000), date());
// }
// export {
// 	Dates,
// 	toggle
// };