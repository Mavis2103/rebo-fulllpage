const search = document.getElementById('search');
const result = document.getElementById('result');
let search_term = '';
let rs;
const fetchForSearch = async () => {
	rs = await fetch('/api/data').then((res) => res.json());
};
const showResults = async () => {
	await fetchForSearch();
	result.innerHTML = '';
	rs.filter((item) => {
		return item.keyword.toLowerCase().includes(search_term);
	}).forEach((e) => {
		const li = document.createElement('li');
		const p = document.createElement('p');
		if (e.role === 'category') {
			p.innerHTML = `<span class='p-2 bg-primary rounded-15px text-white mr-2'>Môn</span>		${e.keyword}`;
		} else if (e.role === 'teacher') {
			p.innerHTML = `<span class='p-2 bg-danger rounded-15px text-white mr-2'>Giáo viên</span> 		${e.keyword}`;
		} else if (e.role === 'lesson') {
			p.innerHTML = e.keyword;
		}
		result.appendChild(li);
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
