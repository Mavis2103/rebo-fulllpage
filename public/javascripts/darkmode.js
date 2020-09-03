const darkBtn = document.getElementById('darkmode');
const darkArray = ['dark-dashboard', 'dark-lesson', 'dark-library', 'dark-profile'];
const main = document.getElementById('main');
const menu = document.getElementById('menu');
darkBtn.addEventListener('change', function () {
    const setChecked = document.getElementById("darkmode").checked;
    if (typeof (Storage) !== 'undefined') {
        localStorage.setItem("dark", setChecked)
    }
    setChecked ? light() : dark()
});
window.addEventListener("load", () => {
    const getChecked = localStorage.getItem("dark");
    getChecked == 'true' ? (darkBtn.checked = true, light()) : (darkBtn.checked = false, dark())
})

function dark() {
    main.classList.add('dark');
    menu.classList.add('dark-menu');
    darkArray.forEach(element => {
        document.getElementById('content').classList.add(element);
    });
}

function light() {
    main.classList.remove('dark');
    menu.classList.remove('dark-menu');
    darkArray.forEach(element => {
        document.getElementById('content').classList.remove(element);
    });
}