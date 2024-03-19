import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRouter, privateRouter } from "./config/routes";
import Cookies from 'js-cookie';
function App() {
  // const role = useSelector((state) => state.login.role);
  const role = "aa";
  // lấy key session đầu tiên trong local
  const getfirstSession = () => {
    const allKeys = Object.keys(localStorage);
    const firstKey = allKeys.find(key => key.includes("userSession"));
    return firstKey
  }
  // lưu session khi copy URL qua tab khác 
  useEffect(() => {
    //cookie sẽ bị xóa sau khi trình duyệt đóng, check để clear toàn bộ session
    if (Cookies.get('isBrowserClose') === undefined)
      localStorage.clear()
    const firstKey = getfirstSession()
    let newnameSession = ''
    Cookies.set('isBrowserClose', false);
    //gán ngược từ session vào lại local (xử lý việc reload mất local))
    if (!firstKey && sessionStorage.getItem('userPresent')) {
      const { id, token } = JSON.parse(sessionStorage.getItem('userPresent'))
      newnameSession = "userSession" + (Math.floor(Date.now() / 1000)) % 100000 //uniquê key for 27hour
      localStorage.setItem(
        newnameSession,
        JSON.stringify(
          {
            id: id,
            token: token,
          }
        )
      )
    }
    //nếu không có session thì gán local cho session
    if (firstKey && (!sessionStorage.getItem('userPresent'))) {
      const { id, token } = JSON.parse(localStorage.getItem(firstKey))
      newnameSession = "userSession" + (Math.floor(Date.now() / 1000)) % 100000
      sessionStorage.setItem(
        'userPresent',
        JSON.stringify({
          id: id,
          token: token
        })
      );
      localStorage.setItem(
        newnameSession,
        JSON.stringify({
          id: id,
          token: token
        })
      )
    }
    // Hàm xử lý khi có tin nhắn được gửi từ tab khác
    const message_receive = (event) => {
      if (Cookies.get('isBrowserClose')) {
        if (event.key === 'SessionMessage') {
          if (JSON.parse(event.newValue)) {
            //(xử lý khi giữ lại local để freememory)
            if (!getfirstSession()) {
              const { id, token } = JSON.parse(event.newValue);
              newnameSession = "userSession" + (Math.floor(Date.now() / 1000)) % 100000
              localStorage.setItem(
                newnameSession,
                JSON.stringify({
                  id: id,
                  token: token
                }))
            }
          }
        } else if (event.key === 'ClearMessage') {
          sessionStorage.removeItem('userPresent');
        }
      }
    };
    // Hàm xử lý trước khi người dùng rời khỏi trang
    const handleBeforeUnload = () => {
      //có thể comment dòng này (để thì có thể tăng hiệu suất lúc tải trang lần đầu)
      localStorage.removeItem(newnameSession ? newnameSession : 'userSession')
      // Gửi tin nhắn trước khi tab bị đóng
      sendMessage();
    };
    const handleLoad = () => {
      freeMemoryLocal();
    };
    //Giải phóng bộ nhớ local khi quá nhiều (limit 5)
    const freeMemoryLocal = () => {
      const allKeys = Object.keys(localStorage);
      const userSessionKeys = allKeys.filter(key => key.includes("userSession"));
      if (userSessionKeys.length >= 5) {
        const keysToDelete = userSessionKeys.slice(0, Math.floor((userSessionKeys.length) / 2));
        keysToDelete.forEach(key => {
          localStorage.removeItem(key);
        });
      }
    }
    // Lắng nghe sự kiện storage
    window.addEventListener('storage', message_receive);
    // Lắng nghe sự kiện beforeunload 
    window.addEventListener('beforeunload', handleBeforeUnload);
    // Lắng nghe sự kiện load
    window.addEventListener('load', handleLoad);
    return () => {
      // Gỡ lắng nghe sự khi component unmounted
      window.removeEventListener('storage', message_receive);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
    };
  }, []);
  // Giao tiếp với các tab khác để lưu trữ session
  const sendMessage = () => {
    localStorage.setItem('SessionMessage', JSON.stringify(
      JSON.parse(sessionStorage.getItem('userPresent'))));
    localStorage.removeItem('SessionMessage');
  };

  return (
    <>
      <Router>
        <Routes>
          {publicRouter.map((routers) => {
            return routers.map((route, index) => {
              return (
                <Route path={route.path} element={route.element} key={index}>
                  {route.index ? <Route index element={route.index} /> : null}
                  {route.children
                    ? route.children.map(({ path, Component }, index) => {
                      return (
                        <Route
                          path={path}
                          element={<Component />}
                          key={index}
                        />
                      );
                    })
                    : null}
                </Route>
              );
            });
          })}
          {privateRouter.map((routers) => {
            return routers.map((route, index) => {
              return route.role === role || route.role === "Role_Admin" ? (
                <Route path={route.path} element={route.element} key={index}>
                  {route.index ? <Route index element={route.index} /> : null}
                  {route.children
                    ? route.children.map(({ path, Component }, index) => {
                      return (
                        <Route
                          path={path}
                          element={<Component />}
                          key={index}
                        />
                      );
                    })
                    : null}
                </Route>
              ) : null;
            });
          })}
        </Routes>
      </Router>
      {/* <Loading /> */}
      <ToastContainer />
    </>
  );
}

export default App;
