document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    login();
  }
});

function login() {
	const userId = document.getElementById('userId').value;
	const userPw = document.getElementById('userPw').value;
	console.log(userId, userPw);

	axios
		.post('http://www.jecheolso.site/auth/login', {
			username : userId,
			password : userPw
		})
		.then(( res ) => {
			window.location.href = '/mygallery';
		})
		.catch(( err ) => {
			swal(
				'',
				'<b style="color:coral;">ID / PW </b> 다시 확인해주세요!',
				'warning'
			);
		});
}


function checkLoginStatus() {
  // 쿠키에서 idToken을 가져옵니다.
  const idToken = getCookie("idToken");

  if (idToken) {
    // idToken이 존재하는 경우, 로그인 상태입니다.
    swal('이미 로그인 되었습니다', '', 'info').then(function () {
      // 메인 페이지로 리다이렉트합니다.
      window.location.href = '/mygallery';
    });
  } else {
    // idToken이 없는 경우, 로그인되지 않은 상태입니다.
    // 로그인 화면 또는 다른 작업을 수행할 수 있습니다.
  }
}

// 쿠키를 읽는 함수
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// 페이지 로드 시 로그인 상태 확인
window.addEventListener('load', checkLoginStatus);



