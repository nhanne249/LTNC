import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRouter, privateRouter } from "./config/routes";
import {useCookies} from 'react-cookie';
import Cookies from 'js-cookie';
import { useEffect } from "react";
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  // Extract the page title from the pathname (you might need custom logic here)
  const pathParts = pathname.split("/").filter(Boolean);
  const [cookies] = useCookies(['isBrowserClose', 'role']);
  var role=null;
  if (Cookies.get('role')) {role = Cookies.get('role').toLowerCase();
  }
  useEffect(()=>{if(!pathParts[0].includes(role) || pathname=='/') navigate(`${role}`)},[role])
  return (
    <>
      <Router>
        <Routes>
          {role!=null || role != undefined ? (privateRouter.map((routers) => {
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
