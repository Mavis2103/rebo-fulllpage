const formButton = document.getElementById('save');
const input = document.getElementById('form_new_folder-input');
formButton.onclick = async () => {
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: input.value
    })
  }
  let url = '/myLibrary/create'
  let res_post = await fetch(url, options);
  let data_post = await res_post.json();
  console.log(data_post);
  location.reload()
}
