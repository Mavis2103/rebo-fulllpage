const search = document.getElementById('search');
const result = document.getElementById('result');
let search_term = '';
let rs;
let found;
let result_to_server;
const fetchForSearch = async () => {
	rs = await fetch('/api/data').then((res) => res.json());
};
const showResults = async () => {
	await fetchForSearch();
	result.innerHTML = '';
	found = await rs.filter((item) => {
		return item.lessonName.toLowerCase().includes(search_term) || item.username.toLowerCase().includes(search_term) || item.categoryName.toLowerCase().includes(search_term);
	});
	found.forEach((e) => {
		const li = document.createElement('li');
		const link = document.createElement('a');
		const p = document.createElement('p');
		p.innerHTML = `<span class='p-2 bg-primary rounded-15px text-white mr-2'>Môn</span>${e.lessonName}`;
		result.appendChild(link);
		// link.setAttribute('href', `/search/${e.role}/${e.id}`);
		link.appendChild(li);
		li.appendChild(p);
	});
};
search.addEventListener('input', (e) => {
	let t0 = performance.now();
	// console.time();
	if (e.target.value.length === 0) {
		result.innerHTML = '';
	} else {
		search_term = e.target.value.toLowerCase();
		showResults();
	}
	// console.timeEnd();
	let t1 = performance.now();
	console.log(`Time:${t1 - t0}`);
});
const sendRequest = async () => {
	const options = {
		method: 'POST',
		body: JSON.stringify(found),
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			redirect: 'follow',
		},
	};
	result_to_server = await fetch(`/search/${search_term}`, options).then((response) => response.json());
};
const reloadWithValue = () => {
	window.location = `/search/${search_term}`;
};
const clearInput = () => {
	search.value = '';
};
search.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		// await sendRequest();
		reloadWithValue();
		clearInput();
	}
});
