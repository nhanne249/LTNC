import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRouter, privateRouter } from "./config/routes";
import NotFound from './features/pages/NotFound/index';
import Cookies from "js-cookie";
const role = Cookies.get("role")?.toLowerCase();
function App() {
  window.onload = function () {
    if (window.location.pathname==='/') {
      if (role) {
        window.location.href = `/${role}`;
      }
    }
  };
  
  return (
    <>
      <Router>
        <Routes>
          {role || role != undefined ? (privateRouter.map((routers) => {
            return routers.map((route, index) => {
              return route.role == role ? (
                <Route path={route.path} element={route.element} key={index}>
                  {route.index ? <Route index element={route.index} /> : null}
                  {route.children
                    ? route.children.map(({ path, Component }, index) => {
                      return (
                        <Route
                          path={path}
                          element={<Component/> }
                          key={index}
                        />
                      );
                    })
                    : null}
                </Route>
              ) : <Route path="*" element={<NotFound/>} />;
            });
          })) : (publicRouter.map((routers) => {
            return routers.map((route, index) => {
              return (
                <Route path={route.path} element={route.element} key={index}>
                  {route.index ? <Route index element={route.index} /> : (console.log('hehe'))}
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
                    : <Route path="*" element={<NotFound/>} />}
                </Route>
              );
            });
          }))}
        </Routes>
      </Router>
      {/* <Loading /> */}
      <ToastContainer />
    </>
  );
}

export default App;