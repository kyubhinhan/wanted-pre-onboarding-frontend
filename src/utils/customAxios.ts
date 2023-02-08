import axios, { AxiosInstance } from 'axios';

//통신할 baseUrl
const baseUrl = 'https://pre-onboarding-selection-task.shop/';
//access_token의 값을 가져옴
const accessToken = localStorage.getItem('access_token');
//customAxios instance를 만들어줌
const customAxios: AxiosInstance = axios.create({
  baseURL: `${baseUrl}`,
});

//request 요청을 가로채, header에 token을 넣어줌
customAxios.interceptors.request.use(
  (config) => {
    if (accessToken) {
      (config.headers as any)['Authorization'] = 'Bearer ' + accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

//response를 가로채, access_token이 없거나 이상한 값일 때
//signin으로 redirect 시켜줌
customAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response) {
      // access token이 이상할 때,
      if (err.response.status === 401) {
        // 토큰값 초기화
        localStorage.setItem('access_token', '');
        // 로그인 페이지로 redirect
        window.location.href = '/signin';
      }
    }
  },
);

export default customAxios;
