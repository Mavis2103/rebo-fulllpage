const img = document.getElementById('lesson-img');
const nameLesson = document.getElementById('lesson-name');
const auth = document.getElementById('lesson-auth');
const slide = document.getElementById('lesson-slide');
const bg_override = document.getElementById('bg-blur');
const box_override = document.getElementById('box');
const click_s = document.querySelectorAll('#s .swiper-slide');
const get_href = document.querySelectorAll('#s .swiper-slide a');

for (let i = 0; click_s.length; i += 1) {
	click_s[i].addEventListener('click', (e) => {
		e.preventDefault();
		const x = get_href[i].getAttribute('href');
		bg_override.classList.remove('d-none');
		box_override.classList.remove('d-none');
		Get_Lesson(x).then((x) => {
			nameLesson.textContent = x.lessonName;
			auth.textContent = x.username;
			img.src = `https://res.cloudinary.com/mavis/image/upload/Database_REBO/lessonImage/${x.lessonID}`;
			slide.href = `/slide/${x.lessonID}`;
		});
		document.getElementById('close').addEventListener('click', () => {
			bg_override.classList.add('d-none');
			box_override.classList.add('d-none');
		});
	});
}
async function Get_Lesson(x) {
	const url = `/api/lesson/${x}`;
	try {
		const response = await fetch(url, {
			method: 'GET',
		});
		const result = await response.json();
		console.log(result[0]);
		return result[0];
	} catch (error) {
		console.log(error);
	}
}
