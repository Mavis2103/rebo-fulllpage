let cmtHistory = document.getElementById('comment__history');
let cmtInput = document.getElementById('comment__form--input');
let cmtButton = document.getElementById('comment__form--button');
let cmtHistoryContent = document.getElementById('comment__form__content');

// import io from '../../../node_modules/socket.io';
const socket = io('http://localhost:3000');
socket.on('sendFromServer', (data) => {
	console.log(data);
	let div = document.createElement('div');
	let div_content = document.createElement('div');
	let cmtMsg = document.createElement('p');
	let cmtUser = document.createElement('p');
	let cmtAvatar = document.createElement('img');
	cmtAvatar.src = '/st/images/appicon.png';
	cmtAvatar.style.width = cmtAvatar.style.height = '50px';
	cmtAvatar.classList.add('rounded');
	cmtUser.classList.add('mb-0', 'mr-1', 'font-weight-bold');
	cmtMsg.classList.add('mb-0', 'ml-2');
	let cmtMsg_text = document.createTextNode(data.msg);
	let cmtUser_text = document.createTextNode('Quan');
	cmtUser.appendChild(cmtUser_text);
	cmtMsg.appendChild(cmtMsg_text);
	div_content.classList.add('d-flex', 'align-items-baseline');
	div_content.appendChild(cmtUser);
	div_content.appendChild(cmtMsg);
	div.appendChild(cmtAvatar);
	div.appendChild(div_content);
	div.classList.add('align-items-center', 'd-flex');
	cmtHistory.appendChild(div);
});

cmtButton.addEventListener('click', (e) => {
	e.preventDefault();
	let valueCmt = cmtInput.value;
	socket.emit('sendFromClient', { msg: valueCmt });
	cmtInput.value = '';
});
