// function user() {
//   fetch('/api/user/login-success', {
//       method: 'GET'
//     })
//     .then((res) => res.json())
//     .then((data) => console.log(data))
// }
// user()

const user = async () => {
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const ava = document.getElementsByClassName('ava');
  try {
    const url = '/api/user/login-success';
    const res = await fetch(url, {
      method: 'GET',
    });
    if (res.ok) {
      const result = await res.json();
      const data = result[0];
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
    } else {
      console.log('ERROR');
    }
  } catch (error) {
    console.log(error);
  }
};

user();
