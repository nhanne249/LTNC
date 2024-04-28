import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRouter, privateRouter } from "./config/routes";
import Cookies from 'js-cookie';

function App() {
  const isLoggedIn = Cookies.get('userPresent') !== null && Cookies.get('userPresent') !== undefined;
  const role = Cookies.get('role')?.toLowerCase();

  return (
    <>
      <Router>
        <Routes>
          {isLoggedIn ? (
            // Trường hợp đã login
            //Lọc qua từng route đã liệt kê theo role
            privateRouter.map((routers) => (
              //Lọc qua từng route ứng với role
              routers.map((route, index) => (
                //Xử lý trường hợp route đúng với role
                //Khi Route đúng với role thì xem xét path mà người dùng đang truy cập có hợp lệ hay không nếu không thì sẽ tự động chuyển về path chính
                route.role === role ? (()=> { window.location.pathname == role ?
                  (<Route path={route.path} element={route.element} key={index}>
                    {route.index ? <Route index element={route.index} /> : null}
                    {route.children?.map(({ path, Component }, index) => (
                      <Route path={path} element={<Component />} key={index} />
                    ))}
                  </Route>): (<Route path="*" key={index} element={<Navigate to={`/${role}`} replace />} />)}
                ) : (
                  null)
              ))
            ))
          ) : (
            // Trường hợp chưa login
            publicRouter.map((routers) => (
              routers.map((route, index) => (
                <Route path={route.path} element={route.element} key={index}>
                  {route.index ? <Route index element={route.index} /> : null}
                  {route.children?.map(({ path, Component }, index) => (
                      <Route path={path} element={<Component />} key={index} />
                    ))}
                </Route>
              ))
            ))
          )}
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;