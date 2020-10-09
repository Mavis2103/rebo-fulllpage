// function user() {
//   fetch('/api/user/login-success', {
//       method: 'GET'
//     })
//     .then((res) => res.json())
//     .then((data) => console.log(data))
// }
// user()

const user = async () => {
  let username = document.getElementById('username')
  let ava = document.getElementById('ava')
  try {
    let url = '/api/user/login-success';
    let res = await fetch(url, {
      method: 'GET'
    })
    if (res.ok) {
      let result = await res.json();
      let data = result[0]
      username.textContent = data.username;
      if (data.avatar != null) {
        ava.src = `https://res.cloudinary.com/mavis/image/upload/Database_REBO/avatar/${data.avatar}`
      } else {
        ava.src = `https://res.cloudinary.com/mavis/image/upload/v1602261844/static/60111_oigwum.jpg`
      }
    } else {
      console.log("ERROR");
    }
  } catch (error) {
    console.log(error);
  }
}

user()