import LoginPage from "../../features/pages/login/index";
import RegisterPage from "../../features/pages/register/index";
const mainRouter = [
  {
    path: "/*",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];
export default mainRouter;
