// 이미지 미리보기 input 엘리먼트와 미리보기 영역을 가져옵니다.
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const uploadButton = document.getElementById('uploadButton'); // 업로드 버튼 추가

// 기본 이미지 경로 설정
const defaultImageURL = '002.png'; // 기본 이미지 파일 경로로 수정해야 합니다.

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
		imagePreview.style.backgroundImage = `url(${defaultImageURL})`;
	}
});

$(document).ready(function () {
	aa();
});

//test
function aa() {
	axios
	.get(`${baseURL}/a`,)
			.then(( res ) => {
				console.log('upload.js In / axios.post / res : ', res);
			})
}

console.log('baseURL : ', baseURL);

// 업로드 버튼 클릭 시 서버에 POST 요청을 보냅니다.
uploadButton.addEventListener('click', function () {
	const file = imageInput.files[0];
	console.log('upload.js In / file : ', file);
	if ( file ) {
		// FormData 객체를 생성하고 이미지 파일을 추가합니다.
		const formData = new FormData();
		formData.append('file', file);

		axios
	.get(`${baseURL}/a`,)
			.then(( res ) => {
				console.log('upload.js In / axios.post / res : ', res);
			})


		// Axios를 사용하여 서버에 POST 요청을 보냅니다.
		axios.post(`https://www.jecheolso.site/users/uploads`, formData)
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

				}else {
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
