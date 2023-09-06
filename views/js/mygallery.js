window.addEventListener("app:mounted", (function () {
	new Popper("#top-header-menu", ".popper-ref", ".popper-root", {
		placement : "bottom-start",
		modifiers : [ { name : "offset", options : { offset : [ 0, 4 ] } } ]
	});
}), { once : !0 });


$(document).ready(function () {
	getUser();
});



function getUser() {
	axios
		.get('https://www.jecheolso.site/users/getUsers', {
		})
		.then(( res ) => {
			let row = res.data;
			for ( let i in row ) {
				let S3_URL = row[i].S3_URL;
				let updateAt = row[i].updatedAt;


				let imageList = `
	      <div class="card"
            onclick="showImagePopup('${ S3_URL }', '${ updateAt }')"
	      >
        <img
            class="h-72 w-full rounded-lg object-cover object-center"
            src="${ S3_URL }"
            alt="image"
        />
        	<div
            class="absolute inset-0 flex h-full w-full flex-col justify-end"
        >
          <div
              class="space-y-1.5 rounded-lg bg-gradient-to-t from-[#19213299] via-[#19213266] to-transparent px-4 pb-3 pt-12"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center text-xs text-slate-200">
                <p class="flex items-center space-x-1">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                  <span class="line-clamp-1"></span>
                </p>
                <div
                    class="mx-3 my-0.5 w-px self-stretch bg-white/20"
                ></div>
                <p class="shrink-0 text-tiny+">${ getTimeAgo(updateAt) }</p>
              </div>
              <div class="-mr-1.5 flex">
                <button
                    data-tooltip="Like"
                    data-tooltip-theme="secondary"
                    class="btn h-7 w-7 rounded-full p-0 text-secondary-light hover:bg-secondary/20 focus:bg-secondary/20 active:bg-secondary/25 dark:hover:bg-secondary-light/20 dark:focus:bg-secondary-light/20 dark:active:bg-secondary-light/25"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4.5 w-4.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <button
                    data-tooltip="Save"
                    class="btn h-7 w-7 rounded-full p-0 text-navy-100 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4.5 w-4.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>`;

				$('.grid').append(imageList);

			}

		});

}

function showImagePopup(imageURL, updateAt) {
  console.log('showImagePopup called');
  // 팝업을 표시하는 HTML을 생성합니다.
  let popupHTML = `
    <div class="image-popup-overlay">
      <div class="image-popup">
        <img src="${imageURL}" alt="image" />
        <br>
        <button
    class="btn space-x-2 bg-secondary font-medium text-white hover:bg-secondary-focus focus:bg-secondary-focus active:bg-secondary-focus/90"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
    <span><a class="download-button" href="${imageURL}" download>Download</a></span>
  </button>
        
        <br>
        <div style="float: right;">
            <button
    class="btn border border-warning/30 bg-warning/10 font-medium text-warning hover:bg-warning/20 focus:bg-warning/20 active:bg-warning/25"
    id="close-popup"
  >
    Close
  </button>
  </div>
      </div>
    </div>
  `;

  $('body').append(popupHTML);

  $('#close-popup').click(function () {
    closeImagePopup();
  });

  $('.image-popup-overlay').click(function (e) {
    if (e.target === this) {
      closeImagePopup();
    }
  });
}

function closeImagePopup() {
  $('.image-popup-overlay').remove();
}




function logout() {
	axios
		.post('https://www.jecheolso.site/auth/logout')
		.then(( res ) => {
			window.location.href = '/';
		})
		.catch(( err ) => {
			console.log(err);
		});
}


// Date 객체를 사용하여 일정 기간 전인지 계산하는 함수
function getTimeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(diff / 604800000);
  const months = Math.floor(diff / 2592000000);
  const years = Math.floor(diff / 31536000000);

  switch (true) {
    case minutes < 5:
      return `방금 전`;
    case hours < 1:
      return `${minutes}분 전`;
    case days < 1:
      return `${hours}시간 전`;
    case weeks < 1:
      return `${days}일 전`;
    case months < 1:
      return `${weeks}주 전`;
    case years < 1:
      return `${months}달 전`;
    default:
      return `${years}년 전`;
  }
}