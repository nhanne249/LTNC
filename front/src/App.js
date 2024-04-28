import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRouter, privateRouter } from "./config/routes";
import Cookies from 'js-cookie';

function App() {
  const role = Cookies.get('role')?.toLowerCase(); // Optional chaining for nullish check
  console.log(role);
  return (
    <>
      <Router>
        <Routes>
          {role !== null && role !== undefined ? (
            privateRouter.map((routers) => (
              routers.map((route, index) => (
                route.role === role ? (
                  <Route path={route.path} element={route.element} key={index}>
                    {route.index ? <Route index element={route.index} /> : (console.log('here1'))}
                    {route.children ? (
                      route.children.map(({ path, Component }, index) => (
                        <Route
                          path={path}
                          element={<Component />}
                          key={index}
                        />
                      ))
                    ) : (console.log('here2'))}
                  </Route>
                ) : (console.log('here3'))
              ))
            ))
          ) : (
            publicRouter.map((routers) => (
              routers.map((route, index) => (
                <Route path={route.path} element={route.element} key={index}>
                  {route.index ? <Route index element={route.index} /> : null}
                  {route.children ? (
                    route.children.map(({ path, Component }, index) => (
                      <Route
                        path={route.path}
                        element={<Component />}
                        key={index}
                      />
                    ))
                  ) : (console.log('here4'))}
                </Route>
              ))
            ))
          )}
        </Routes>
      </Router>
      {/* <Loading /> */}
      <ToastContainer />
    </>
  );
}

export default App;
