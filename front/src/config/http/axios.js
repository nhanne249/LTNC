import axios from 'axios';

const httpHandler = (baseURL) => {
  const axiosHttp = axios.create({
    baseURL,
  });
  axiosHttp.interceptors.request.use(
    async function intercept(config) {
      console.log(JSON.parse(sessionStorage.getItem('userPresent')) ||
      JSON.parse(localStorage.getItem('userPresent')));
      const token =
        JSON.parse(sessionStorage.getItem('userPresent'))?.token ||
        JSON.parse(localStorage.getItem('userPresent'))?.token;
      // const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2YW5oYXVAZ21haWwuY29tIiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJvbGVfQWRtaW4ifV0sImlhdCI6MTY5NDQ4MzE0MCwiZXhwIjoxNjk0NTAxMTQwfQ.z5Dx0v9ifQKSwfke-nLznHUvZf6oaCrePUPaqiTsuH0'
      const interceptedConfig = config;
      interceptedConfig.headers['Authorization'] = 'Bearer ' + token;
      interceptedConfig.headers['Content-Type'] = 'application/json';
      return interceptedConfig;
    },
    function interceptError(error) {
      return Promise.reject(error);
    }
  );

  axiosHttp.interceptors.response.use(
    function intercept(response) {
      return response.data;
    },
    function interceptError(error) {
      switch (error.response.status) {
        case 403:
          return Promise.reject(error);
        case 401:
          return Promise.reject(error);
        default:
          return Promise.reject(error);
      }
    }
  );

  return axiosHttp;
};

export default httpHandler;
