import LoginPage from "../../features/General/WorkingSession/Pages/Login";
import RegisterPage from "../../features/General/WorkingSession/Pages/Register";
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
