(async () => {
// 	document.getElementById('save').addEventListener('click', function () {
// 		var formInput = document.getElementById('form_new_folder-input');
// 		var folderName = formInput.value.trim();
// 		formInput.value = '';
// 		if (!folderName) {
// 			console.log('null');
// 		} else {
// 			var folderList = document.getElementById('folder');
// 			var folderNew = document.createElement('section');
// 			var childDiv = document.createElement('div');
// 			var childDiv_title = document.createElement('div');
// 			var childDiv_icon_more = document.createElement('div');
// 			var childDiv_more = document.createElement('div');
// 			folderNew.classList.add('popover-folder', 'col-xl-3', 'col-lg-4', 'col-sm-6', 'mb-4');
// 			childDiv.classList.add('folder-height', 'd-flex', 'align-items-center', 'justify-content-between', 'p-3', 'border', 'bg-white');
// 			childDiv_title.classList.add('d-flex', 'align-items-center');
// 			folderList.appendChild(folderNew);
// 			folderNew.appendChild(childDiv);
// 			childDiv.appendChild(childDiv_title);
// 			childDiv_title.innerHTML = "<i class='fa fa-folder mr-3' aria-hidden='true'></i><p class='mb-0 text-align-start folder_text-ellipsis'>" + folderName + '</p>';
// 			childDiv.appendChild(childDiv_icon_more);
// 			childDiv_icon_more.innerHTML = "<i class='fas fa-ellipsis-v more'><div class='more-bg'></div></i>";
// 			folderNew.appendChild(childDiv_more);
// 			// ----------Loi o day *folderName*-------------
// 		}
// 	});
// 	$('#lessonCard').click(function () {
// 		$('#content').load('/html/lesson-detail.html');
// 	});
// 	// var specifiedElement = document.getElementsByTagName('nav');
// 	// //I'm using "click" but it works with any event
// 	// document.addEventListener('click', function (event) {
// 	// 	for (let index = 0; index < specifiedElement.length; index++) {
// 	// 		const element = specifiedElement[index];
// 	// 		var isClickOutside = element.contains(event.target);
// 	// 		if (!isClickOutside) {
// 	// 			// Outside
// 	// 			console.log(!isClickOutside);
// 	// 			element.remove();
// 	// 		}
// 	// 	}
// 	// });
	var specifiedElement = document.getElementsByClassName('more');
	var specifiedElement_bg = document.querySelectorAll('.more-bg');
	var specifiedElement_parent = document.querySelectorAll('.popover-folder div+div');
	//I'm using "click" but it works with any event
	document.addEventListener('click', function (event) {
		for (let index = 0; index < specifiedElement.length; index++) {
			const element = specifiedElement[index];
			const element_bg = specifiedElement_bg[index];
			const element_parent = specifiedElement_parent[index];
			var isClickOutside = element.contains(event.target);
			if (isClickOutside) {
				// if (element_parent.hasChildNodes()) {
				// 	element_parent.innerHTML = '';
				// 	element_bg.style.backgroundColor = 'white';
				// } else {
				// 	element_parent.innerHTML = "<nav class='folder_popup' ></nav>";
				// 	element_child();
				// 	element_bg.style.backgroundColor = '#908F90';
				// }
				element_parent.innerHTML = "<nav class='folder_popup' ></nav>";
				element_child();
				element_bg.style.backgroundColor = '#908F90';
			} else {
				element_parent.innerHTML = '';
				element_bg.style.backgroundColor = 'rgba(255, 255, 255, 0)';
			}
		}
	});

	function element_child() {
		var popover_parent_class = document.getElementsByClassName('folder_popup')[0];
		var popover_icon = ['fa-folder-open', 'fa-file-archive', 'fa-trash-alt'];
		var char = ['Browse', 'Download', 'Delete'];
		for (let i = 0; i < char.length; i++) {
			const element = char[i];
			const element_icon = popover_icon[i];
			popover_parent_class.innerHTML += '<a> <i class="far ' + element_icon + '" aria-hidden="true"></i>' + element + '</a>';
		}
	}
})();