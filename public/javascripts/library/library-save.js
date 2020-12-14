let lessonSave = document.getElementById('lesson_save');
let rsp;
const fetch_save = async (id) => {
	rsp = await fetch(`/api/save`, {
		method: 'POST',
		body: JSON.stringify({ id: id }),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((x) => x.json())
		.then((json) => console.log(json));
};
const fetch_unsave = async (id) => {
	rsp = await fetch(`/api/unsave`, {
		method: 'POST',
		body: JSON.stringify({ id: id }),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	}).then((x) => x.json());
};

lessonSave.addEventListener('click', () => {
	let class_term = lessonSave.getAttribute('class');
	let id = lessonSave.getAttribute('name');
	const save = async () => {
		let saved = class_term.replace(/far/, 'fas');
		lessonSave.setAttribute('class', saved);
		console.log(id);
		await fetch_save(id);
	};
	const not_save = async () => {
		let not_save = class_term.replace(/fas/, 'far');
		lessonSave.setAttribute('class', not_save);
		await fetch_unsave(id);
	};
	/far/.test(class_term) ? save() : not_save();
});
