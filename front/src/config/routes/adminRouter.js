import Layouts from "../../layouts/index.jsx";
import Dashboard from "../../features/Student/Dashboard";

const adminRouter = [
  {
    role: "admin",
    path: "/admin",
    element: <Layouts/>,
    children: [
      {
        path: "*",
        Component: Dashboard,
      },
      {
        path: "",
        Component: Dashboard,
      },
      {
        path: "/users",
        Component: Dashboard,
      },
      {
        path: "/teacher-list",
        Component: Dashboard,
      },
      {
        path: "/student-list",
        Component: Dashboard,
      },
      {
        path: "/courses",
        Component: Dashboard,
      },
      {
        path: "/add-users",
        Component: Dashboard,
      },
      {
        path: "/add-courses",
        Component: Dashboard,
      },
    ],
  },
];
export default adminRouter;
