const cmtHistory = document.getElementById('comment__history');
const cmtInput = document.getElementById('comment__form--input');
const cmtButton = document.getElementById('comment__form--button');
const cmtHistoryContent = document.getElementById('comment__form__content');
const cmtCount = document.getElementById('comment__count');
const socket = io.connect('http://rebo-vn2.herokuapp.com');
// const socket = io.connect('http://localhost:3000');
const infoUSer = async () => {
  await user();
  return res;
};
let info;

function addLineCmt(data) {
  const div = document.createElement('div');
  const div_content = document.createElement('div');
  const cmtMsg = document.createElement('p');
  const cmtUser = document.createElement('p');
  const cmtAvatar = document.createElement('img');
  if (data.user) {
    cmtAvatar.src = `https://res.cloudinary.com/mavis/v${data.avatar_ver}/Database_REBO/avatar/${data.user}?20130910043254`;
  } else {
    cmtAvatar.src = 'https://res.cloudinary.com/mavis/static/60111_oigwum.jpg';
  }
  cmtAvatar.style.width = cmtAvatar.style.height = '50px';
  cmtAvatar.style.objectFit = 'cover';
  cmtAvatar.classList.add('rounded-circle', 'mr-2');
  cmtUser.classList.add('mb-0', 'mr-1', 'font-weight-bold');
  cmtUser.style.fontSize = '1.4em';
  cmtMsg.classList.add('mb-0', 'ml-2');
  const cmtMsg_text = document.createTextNode(data.msg);
  const cmtUser_text = document.createTextNode('Quan');
  cmtUser.appendChild(cmtUser_text);
  cmtMsg.appendChild(cmtMsg_text);
  div_content.classList.add('d-flex', 'align-items-baseline');
  div_content.appendChild(cmtUser);
  div_content.appendChild(cmtMsg);
  div.appendChild(cmtAvatar);
  div.appendChild(div_content);
  div.classList.add('align-items-center', 'd-flex', 'mt-2', 'mb-4');
  cmtHistory.appendChild(div);
}
let lessonSelectedSocket;
// const allLesson = document.querySelectorAll('#s .swiper-slide');
document.body.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('swiper-lazy')) {
    cmtHistory.innerHTML = '';
    lessonSelectedSocket = el.dataset.lesson;
    // send id lesson to server
    socket.emit('selected', lessonSelectedSocket);
    socket.on(`history`, (sv) => {
      cmtHistory.innerHTML = '';
      if (sv.length > 0) {
        cmtCount.textContent = `${sv.length} Bình luận`;
        sv.forEach((data) => {
          addLineCmt(data);
        });
      } else {
        cmtCount.textContent = `Không có Bình luận`;
        // historyEmpty();
      }
    });
  }
});
cmtButton.addEventListener('click', async (e) => {
  e.preventDefault();
  if (!!cmtInput.value) {
    info = await infoUSer();
    const valueCmt = cmtInput.value;
    socket.emit(`sendFromClient`, {
      user: info[0].avatar,
      avatar_ver: info[0].avatar_ver,
      msg: valueCmt,
    });
    cmtInput.value = '';
  }
});

// let allLesson_length = allLesson.length;
// for (let i = 0; i < allLesson_length; i += 1) {
// 	allLesson[i].addEventListener('click', (e) => {
// 		cmtHistory.innerHTML = '';
// 		let lessonSelectedSocket = get_class[i].getAttribute('class');
// 		// send id lesson to server
// 		socket.emit('selected', lessonSelectedSocket);

// 		// View History Cmt

// 		// Send Cmt
// 		cmtButton.addEventListener('click', async (e) => {
// 			e.preventDefault();
// 			info = await infoUSer();
// 			let valueCmt = cmtInput.value;
// 			socket.emit('sendFromClient', { user: info[0].avatar, avatar_ver: info[0].avatar_ver, msg: valueCmt });
// 			cmtInput.value = '';
// 		});
// 	});
// }
socket.on(`sendFromServer`, (data) => {
  console.log(lessonSelectedSocket);
  addLineCmt(data);
});

function historyEmpty() {
  let div = document.createElement('div');
  let tag_content = document.createElement('p');
  let tag_text = document.createTextNode('Chưa có bình luận nào');
  tag_content.appendChild(tag_text);
  div.appendChild(tag_content);
  cmtHistory.appendChild(div);
}
