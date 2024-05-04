import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRouter, privateRouter } from "./config/routes";
import Cookies from "js-cookie";
import NotFound from "./features/pages/NotFound";
const role = Cookies.get("role")?.toLowerCase();
function App() {
  window.onload = function () {
    if (window.location.pathname==='/') {
      if (role) {
      window.location.href = `/${role}`;
    } else {
      // Redirect to the login page
      window.location.href = "/login";
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
              ) : null;
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
                    : null}
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