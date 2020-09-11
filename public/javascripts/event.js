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
	seconds.innerHTML = date.getSeconds();
	minutes.innerHTML = date.getMinutes();
	hours.innerHTML = date.getHours();
	day.innerHTML = date.getDay() + 1;
	dates.innerHTML = date.getDate();
	month.innerHTML = date.getMonth() + 1; // 0-11
	year.innerHTML = date.getFullYear();
};

// function Dates() {
setTimeout(setInterval(date, 1000), date());
// }
// export {
// 	Dates,
// 	toggle
// };