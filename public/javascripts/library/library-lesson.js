const img = document.getElementById('lesson-img');
const nameLesson = document.getElementById('lesson-name');
const category = document.getElementById('category');
const auth = document.getElementById('lesson-auth');
const auth_avatar = document.getElementById('avatar-auth');
const slide = document.getElementById('lesson-slide');
const bg_override = document.getElementById('bg-blur');
const box_override = document.getElementById('box');
const click_s = document.querySelectorAll('#s .swiper-slide');
const get_class = document.querySelectorAll('#s .swiper-slide div');
let lesson_save = document.getElementById('lesson_save');
let lessonSelected;

let tag_loading = () => {
	let div = document.createElement('div');
	let div_child = document.createElement('div');
	div.style.width = '90vw';
	div.style.height = '90vh';
	div.setAttribute('id', 'loading-bg');
	div_child.setAttribute('class', 'loading');
	div.appendChild(div_child);
	box_override.insertBefore(div, box_override.childNodes[0]);
};

// let lengthSlide = click_s.length;
// for (let i = 0; i < lengthSlide; i += 1) {
// 	click_s[i].addEventListener('click', (e) => {
// 		/* Call loading */
// 		tag_loading();
// 		e.preventDefault();
// 		lessonSelected = get_class[i].getAttribute('class');
// 		bg_override.classList.remove('d-none');
// 		box_override.classList.remove('d-none');
// 		Get_Lesson(lessonSelected).then((ele) => {
// 			/* Loading data when page loading */
// 			nameLesson.textContent = ele.lessonName;
// 			auth.textContent = ele.username;
// 			category.textContent = ele.categoryName;
// 			lesson_save.setAttribute('name', ele.lessonID);
// 			auth_avatar.src = '/st/images/appicon.png';
// 			img.src = `https://res.cloudinary.com/mavis/image/upload/Database_REBO/lessonImage/${ele.lessonID}`;
// 			slide.href = `/slide/${ele.lessonID}`;
// 			/* Remove Loading */
// 			document.getElementById('loading-bg').remove();
// 			let lesson_icon_term = lesson_save.getAttribute('class');
// 			if (ele.state === 1) {
// 				let replaceClass = lesson_icon_term.replace(/far/, 'fas');
// 				lesson_save.setAttribute('class', replaceClass);
// 			} else {
// 				let replaceClass = lesson_icon_term.replace(/fas/, 'far');
// 				lesson_save.setAttribute('class', replaceClass);
// 			}
// 		});
// 		document.getElementById('close').addEventListener('click', () => {
// 			bg_override.classList.add('d-none');
// 			box_override.classList.add('d-none');
// 		});
// 	});
// }
document.body.addEventListener('click', (evt) => {
	let el = evt.target;
	if (el.classList.contains('swiper-lazy')) {
		lessonSelected = el.dataset.lesson;
		tag_loading();
		bg_override.classList.remove('d-none');
		box_override.classList.remove('d-none');
		Get_Lesson(lessonSelected).then((ele) => {
			/* Loading data when page loading */
			nameLesson.textContent = ele.lessonName;
			auth.textContent = ele.username;
			category.textContent = ele.categoryName;
			lesson_save.setAttribute('name', ele.lessonID);
			auth_avatar.src = '/st/images/appicon.png';
			img.src = `https://res.cloudinary.com/mavis/image/upload/Database_REBO/lessonImage/${ele.lessonID}`;
			slide.href = `/slide/${ele.lessonID}`;
			/* Remove Loading */
			document.getElementById('loading-bg').remove();
			let lesson_icon_term = lesson_save.getAttribute('class');
			if (ele.state === 1) {
				let replaceClass = lesson_icon_term.replace(/far/, 'fas');
				lesson_save.setAttribute('class', replaceClass);
			} else {
				let replaceClass = lesson_icon_term.replace(/fas/, 'far');
				lesson_save.setAttribute('class', replaceClass);
			}
		});
		document.getElementById('close').addEventListener('click', () => {
			bg_override.classList.add('d-none');
			box_override.classList.add('d-none');
		});
	}
});
async function Get_Lesson(x) {
	console.time();
	const url = `/api/lesson/${x}`;
	try {
		const response = await fetch(url).then((x) => x.json());
		console.log(response.lesson);
		return response.lesson.overview;
	} catch (error) {
		console.log(error);
	}
	console.timeEnd();
}