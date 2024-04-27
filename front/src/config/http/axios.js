import axios from 'axios';

function getCookieValue(cookieName) {
    const cookieArray = document.cookie.split(';');
    for (const element of cookieArray) {
        const cookiePair = element.split('=');
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
      if (myCookieValue!=null) {
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
