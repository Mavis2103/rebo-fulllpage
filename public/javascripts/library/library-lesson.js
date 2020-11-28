const img = document.getElementById('lesson-img');
const nameLesson = document.getElementById('lesson-name');
const category = document.getElementById('category');
const auth = document.getElementById('lesson-auth');
const auth_avatar = document.getElementById('avatar-auth');
const slide = document.getElementById('lesson-slide');
const bg_override = document.getElementById('bg-blur');
const box_override = document.getElementById('box');
const click_s = document.querySelectorAll('#s .swiper-slide');
const get_href = document.querySelectorAll('#s .swiper-slide a');
let lengthSlide = click_s.length;
for (let i = 0; lengthSlide; i += 1) {
	click_s[i].addEventListener('click', (e) => {
		console.time();
		e.preventDefault();
		const x = get_href[i].getAttribute('href');
		bg_override.classList.remove('d-none');
		box_override.classList.remove('d-none');
		Get_Lesson(x).then((x) => {
			nameLesson.textContent = x.lessonName;
			auth.textContent = x.username;
			category.textContent = x.categoryName;
			auth_avatar.src = '/st/images/appicon.png';
			img.src = `https://res.cloudinary.com/mavis/image/upload/Database_REBO/lessonImage/${x.lessonID}`;
			slide.href = `/slide/${x.lessonID}`;
		});
		document.getElementById('close').addEventListener('click', () => {
			bg_override.classList.add('d-none');
			box_override.classList.add('d-none');
		});
		console.timeEnd();
	});
}
async function Get_Lesson(x) {
	const url = `/api/lesson/${x}`;
	try {
		const response = await fetch(url, {
			method: 'GET',
		});
		const result = await response.json();
		return result[0];
	} catch (error) {
		console.log(error);
	}
}
