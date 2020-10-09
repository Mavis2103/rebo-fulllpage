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
// window.addEventListener("load", function () {
//     if (elementSwitch.checked == false) {
//         signupON()
//     } else {
//         loginON()
//     }
// })

function loginON() {
    bgEffect.classList.add("login--on");
    title.textContent = "Xin Chào bạn"
    content.textContent = "Nếu bạn chưa có tài khoản vui lòng đăng ký để tham gia với chúng tôi"
    nameBtn.textContent = "Đăng ký"
    bgEffect.classList.remove("signup--on");
    //Mobile
    signup.classList.add("d-none")
    login.classList.remove("d-none")
}

function signupON() {
    bgEffect.classList.add("signup--on");
    title.textContent = "Chào mừng trở lại"
    content.textContent = "Để giữ liên kết với chúng tôi vui lòng đăng nhập với thông tin của bạn"
    nameBtn.textContent = "Đăng nhập"
    bgEffect.classList.remove("login--on");
    // Mobile
    login.classList.add("d-none")
    signup.classList.remove("d-none")
}
const imgUP = {
    duration: 1000,
    // reset: true
}

ScrollReveal().reveal('img', imgUP)