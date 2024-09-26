import axios from 'axios';
import queryString from 'query-string';

const REACT_APP_API: any = process.env.REACT_APP_API_URL
const getToken = (config: any)=>{
  const token = localStorage.getItem('accessToken');
  if(token){
    config.headers.accessToken = JSON.parse(token);
  }
  return config;
}
const axiosClient  = axios.create({
  baseURL: REACT_APP_API,
  headers: {
  'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
  });

axiosClient.interceptors.request.use(async (config) => {
  return getToken(config);
})
axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
  return response.data;
  }
  return response;
  }, async (error) => {
    const originalRequest = error.config;
  if (error.response.status === 403 && !originalRequest._retry) {
    originalRequest._retry = true;
    // const access_token = await refreshAccessToken();
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    return axiosClient(originalRequest);
  }
  return Promise.reject(error);
});

export default axiosClient;