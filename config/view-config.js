// view-config.js
const currentDomain = window.location.hostname;
let baseURL;

if (currentDomain === 'localhost') {
  // 개발 환경에서 사용할 baseURL 설정
  baseURL = 'http://localhost:4000';
} else {
  // 배포 환경에서 사용할 baseURL 설정
  baseURL = `https://${currentDomain}`;
}

// baseURL 변수를 내보냅니다.
export { baseURL };
