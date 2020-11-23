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
		return item.lessonName.toLowerCase().includes(search_term);
	}).forEach((e) => {
		const li = document.createElement('li');
		li.innerHTML = `<i>Name:</i>${e.lessonName}`;
		result.appendChild(li);
	});
};

search.addEventListener('input', (e) => {
	search_term = e.target.value.toLowerCase();
	showResults();
});
showResults();
