import "./App.css";
import { BrowserRouter as Router, Route, Routes,useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRouter, privateRouter } from "./config/routes";
import Cookies from "js-cookie";
import NotFound from "./features/pages/NotFound";
import Login from "./features/pages/login";
function App() {
  const naviagte = useNavigate();
  const role = Cookies.get("role")?.toLowerCase();
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
          <Route path="/" element={role ? (()=>naviagte(`/${role}`), {replace:true}) : (<Login />)} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      {/* <Loading /> */}
      <ToastContainer />
    </>
  );
}

export default App;