// $(function () {
//   $('#save').click(function (e) {
//     e.preventDefault();
//     const data = {
//       folderN: $("#form_new_folder-input").val()
//     }
//     $.post("/myLibrary/create", data, () => {
//         console.log(data);
//       })
//       .fail(() => {
//         console.log("Failed");
//       })
//   })
// })
const sendNew = document.getElementById('save');

sendNew.onclick = async (e) => {
  let folName = document.getElementById('form_new_folder-input').value;
  e.preventDefault();
  // try {
  //   let res = await fetch('/myLibrary/create', {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       folName: folName
  //     })
  //   });
  //   let result = res.json();
  //   console.log(result);
  // } catch (error) {
  //   console.log(error);
  // }
  fetch('/myLibrary/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json,text/plain',
        'content-type': 'application/json'
      },
      body: JSON.stringify(folName)
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
}