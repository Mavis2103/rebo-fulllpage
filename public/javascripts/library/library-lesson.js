const click_s = document.querySelectorAll('#s .swiper-slide');
const get_href = document.querySelectorAll('#s .swiper-slide a');
for (let i = 0; click_s.length; i += 1) {
	click_s[i].addEventListener('click', (e) => {
		e.preventDefault();
		const x = get_href[i].getAttribute('href');
		Get_Lesson(x);
	});
}
async function Get_Lesson(x) {
	const url = `/api/lesson/${x}`;
	const response = await fetch(url, {
		method: 'GET',
	});
	const result = await response.json();
	console.log(result[0]);
}
