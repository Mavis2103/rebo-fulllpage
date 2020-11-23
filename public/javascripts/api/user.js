let res;
const user = async () => {
	try {
		const url = '/api/user/login-success';
		res = await fetch(url, {
			method: 'GET',
			credentials: 'same-origin',
			mode: 'cors',
		}).then((result) => result.json());
	} catch (error) {
		console.log(error);
	}
};
const show = async () => {
	const username = document.getElementById('username');
	const email = document.getElementById('email');
	const ava = document.getElementsByClassName('ava');
	await user();
	const data = res[0];
	username.textContent = data.username;
	email.textContent = data.email;
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < 2; i++) {
		if (data.avatar != null) {
			ava[i].src = `https://res.cloudinary.com/mavis/v${data.avatar_ver}/Database_REBO/avatar/${data.avatar}?20130910043254`;
		} else {
			ava[i].src = 'https://res.cloudinary.com/mavis/static/60111_oigwum.jpg';
		}
	}
};
show();
