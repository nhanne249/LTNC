import Layouts from "../../layouts/index.jsx";
import Dashboard from "../../features/Student/Dashboard";

const teacherRouter = [
  {
    role: "teacher",
    path: "/teacher",
    element: <Layouts/>,
    children: [
      {
        path: "*",
        Component: Dashboard,
      },
      // {
      //   path: "/",
      //   Component: Dashboard,
      // },
      {
        path: "personal-information",
        Component: Dashboard,
      },
      {
        path: "notification",
        Component: Dashboard,
      },
      {
        path: "course",
        Component: Dashboard,
      },
    ],
  },
];
export default teacherRouter;
