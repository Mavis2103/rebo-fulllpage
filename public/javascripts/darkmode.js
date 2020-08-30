const darkBtn = document.getElementById('darkmode');
darkBtn.addEventListener('change', function () {
    const setChecked = document.getElementById("darkmode").checked;
    if (typeof (Storage) !== 'undefined') {
        localStorage.setItem("darkMode", setChecked)
    }
    setChecked ? (dark(darkArray)) : (light(darkArray))
});
const getChecked = localStorage.getItem("darkMode");
const darkArray = ['dark-dashboard', 'dark-lesson', 'dark-library', 'dark-profile']
getChecked == 'true' ? (darkBtn.checked = true, dark(darkArray)) : (light(darkArray))

function dark(darkArray) {
    document.getElementById('main').classList.add('dark');
    document.getElementById('menu').classList.add('dark-menu');
    darkArray.forEach(element => {
        document.getElementById('content').classList.add(element);
    });
}

function light(darkArray) {
    document.getElementById('main').classList.remove('dark');
    document.getElementById('menu').classList.remove('dark-menu');
    darkArray.forEach(element => {
        document.getElementById('content').classList.remove(element);
    });
}