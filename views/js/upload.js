// 이미지 미리보기 input 엘리먼트와 미리보기 영역을 가져옵니다.
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const uploadButton = document.getElementById('uploadButton'); // 업로드 버튼 추가
const promptBackImage = document.getElementById('promptBackImage'); // 업로드 버튼 추가

let whitelist = ["Beach", "Mountain", "Space", "Forest", "Lake", "City", "Sunset", "Island", "Desert", "River", "Park", "Countryside", "Meadow", "Bridge", "Waterfall", "Harbor", "Valley", "Cave", "Glacier", "Volcano"];
let tagify = new Tagify(promptBackImage, {
  maxTags: 1,
  whitelist: whitelist,
  dropdown: {
    maxItems: 20,
    classname: "tags-look",
    enabled: 0,
    closeOnSelect: true
  },
  enforceWhitelist: true
});




let selectedTags = [];

tagify.on('add', function () {
	if ( tagify.value.length > 1 ) {
		tagify.removeTags(tagify.value.slice(0, -1));
	}

	selectedTags = tagify.value;
	console.log(selectedTags); // Log the selected tags
});



// 기본 이미지 경로 설정
const defaultImageURL = '../images/005.png';
imagePreview.style.backgroundImage = `url(${ defaultImageURL })`;

// 이미지가 업로드되면 미리보기를 업데이트합니다.
imageInput.addEventListener('change', function () {
	const file = imageInput.files[0];
	if ( file ) {
		// FileReader를 사용하여 이미지 파일을 읽고 미리보기로 표시합니다.
		const reader = new FileReader();
		reader.onload = function ( e ) {
			imagePreview.style.backgroundImage = `url(${ e.target.result })`;
		};
		reader.readAsDataURL(file);
	} else {
		// 이미지를 선택하지 않은 경우 미리보기를 초기화하고 기본 이미지를 표시합니다.
		imagePreview.style.backgroundImage = `url(${ defaultImageURL })`;
	}
});

// 이미지 미리보기 클릭 시 파일 업로드 창 띄우기
imagePreview.addEventListener('click', function () {
    imageInput.click(); // 파일 업로드 창 열기
});

// 업로드 버튼 클릭 시 서버에 POST 요청을 보냅니다.
uploadButton.addEventListener('click', function () {
    const file = imageInput.files[0];
    if (file) {
        // FormData 객체를 생성하고 이미지 파일 및 선택된 태그를 추가합니다.
        const formData = new FormData();
        formData.append('file', file);
        formData.append('tags', JSON.stringify(selectedTags))

		// Axios를 사용하여 서버에 POST 요청을 보냅니다.
		axios.post(`${ baseURL }/users/uploads`, formData)
			.then(res => {
				swal(
					'업로드 완료!',
					'작업이 완료되면 <b style="color:green;">메일로 </b> 알려드릴께요!',
					'success'
				).then(() => {
					// 확인 버튼을 누른 후에 실행될 코드
					window.location.href = '/mygallery';
				});
			})
			.catch(error => {
				if ( error.response.data.error ) {
					swal(
						'',
						'<b style="color:coral;">강아지 </b>or <b style="color:coral;">고양이</b> 아닙니다! 다시 확인해주세요!',
						'warning'
					).then(() => {
						// 확인 버튼을 누른 후에 실행될 코드
						window.location.reload();
					});
				} else {
					swal(
						'',
						'<b style="color:cornflowerblue;">작업중인 </b>사진이 있습니다.',
						'info'
					).then(() => {
						// 확인 버튼을 누른 후에 실행될 코드
						window.location.reload();
					});
				}
			});
	} else {
		swal(
			'',
			'<b style="color:coral;">사진 </b>을 선택해주세요!',
			'warning'
		);
	}
});
