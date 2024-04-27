import "./App.css";
import { BrowserRouter as Router, Route, Routes,useNavigate  } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRouter, privateRouter } from "./config/routes";
import Cookies from 'js-cookie';
import { useEffect,useRef } from 'react';
function App() {
  const navigate = useNavigate();
  var role=null;
  if (Cookies.get('role')) {role = Cookies.get('role').toLowerCase();
  }
  const pageContentRef = useRef(null);
  useEffect(() => {
    // Check page content after rendering
    const pageContent = pageContentRef.current.innerHTML;
    if (pageContent.trim().length === 0) {
      navigate(`/${role}`); // Redirect to /${role} if empty
    }
  }, []);
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
          }))}<Route
            path="*"
            element={() => {
              navigate(`/${role}`);
              return null;
            }}
          />
        </Routes>
      </Router>
      {/* <Loading /> */}
      <ToastContainer />
    </>
  );
}

export default App;
