/* eslint-disable no-restricted-globals */
const formButton = document.getElementById('save');
const input = document.getElementById('form_new_folder-input');
formButton.onclick = async () => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: input.value,
    }),
  };
  const url = '/myLibrary/create';
  const res_post = await fetch(url, options);
  const data_post = await res_post.json();
  console.log(data_post);
  location.reload();
};
