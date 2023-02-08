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

export default customAxios;
