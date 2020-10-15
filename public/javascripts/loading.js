const loading = document.getElementById('loading-bg');
// const loading_checked = document.body.contains(loading);
// window.addEventListener("load", () => {
//     setTimeout(function () {
//         loading.remove()
//     }, 500);
// })
window.onload = () => {
  // Loaded complete 100%
  loading.remove();
};
