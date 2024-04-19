import axios from 'axios';
// import Cookies from 'js-cookie';

function getCookieValue(cookieName) {
    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        const cookiePair = cookieArray[i].split('=');
        if (cookieName == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

// Sử dụng hàm
let myCookieValue = getCookieValue('userPresent');

const httpHandler = (baseURL) => {
  const axiosHttp = axios.create({
    baseURL,
  });
  axiosHttp.interceptors.request.use(
    async function intercept(config) {
      const interceptedConfig = config;
      if (myCookieValue) {
          interceptedConfig.headers['Authorization'] = 'Bearer ' + myCookieValue;
        }
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
