const elementSwitch = document.getElementById("switch");
const bgEffect = document.getElementById("bg");
const nameBtn = document.querySelector(".content label p");
const content = document.querySelector(".content h5")
const title = document.querySelector(".content h1")
const login = document.querySelector(".login")
const signup = document.querySelector(".signup")
document.getElementById("switch").addEventListener("change", function () {
    if (elementSwitch.checked == false) {
        signupON()
    } else {
        loginON()
    }
})
window.addEventListener("load", function () {
    if (elementSwitch.checked == false) {
        signupON()
    } else {
        loginON()
    }
})

function loginON() {
    bgEffect.classList.add("login--on");
    title.innerHTML = "Xin Chào bạn"
    content.innerHTML = "Nếu bạn chưa có tài khoản vui lòng đăng ký để tham gia với chúng tôi"
    nameBtn.innerHTML = "Đăng ký"
    bgEffect.classList.remove("signup--on");
    //Mobile
    signup.classList.add("d-none")
    login.classList.remove("d-none")
}

function signupON() {
    bgEffect.classList.add("signup--on");
    title.innerHTML = "Chào mừng trở lại"
    content.innerHTML = "Để giữ liên kết với chúng tôi vui lòng đăng nhập với thông tin của bạn"
    nameBtn.innerHTML = "Đăng nhập"
    bgEffect.classList.remove("login--on");
    // Mobile
    login.classList.add("d-none")
    signup.classList.remove("d-none")
}