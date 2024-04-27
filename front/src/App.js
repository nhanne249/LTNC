import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRouter, privateRouter } from "./config/routes";
import Cookies from 'js-cookie';
function App() {
  const location = useLocation();
  const pathname = location.pathname;
  var role = null;
  if (Cookies.get('role')) {
    role = Cookies.get('role').toLowerCase();
  }
  const pathParts = pathname.split("/").filter(Boolean);
  var roleFromPath = pathParts[0];
  return (
    <>
      <Router>
        <Routes>
          {role != null || role != undefined ? (privateRouter.map((routers,i) => {
            if (roleFromPath == '/') return <Navigate to={`${role}`} key={i} />;
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
          }))}
        </Routes>
      </Router>
      {/* <Loading /> */}
      <ToastContainer />
    </>
  );
}

export default App;
