import LoginPage from "../../features/pages/login/index";

const mainRouter = [
  {
    path: "/*",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];
export default mainRouter;
