import LoginPage from "../../features/pages/login/index";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

const mainRouter = [
  {
    path: "/*",
    element: Cookies.get("role") ? <Navigate to={`${Cookies.get("role").toLowerCase()}`} /> : <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "",
    element: Cookies.get("role") ? <Navigate to={`${Cookies.get("role").toLowerCase()}`} /> : <LoginPage />,
  },
];
export default mainRouter;
