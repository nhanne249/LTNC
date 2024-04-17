import Layouts from "../../layouts/index.jsx";
import Dashboard from "../../features/Student/Dashboard";
import CreateTeacherAccount from "../../features/Admin/UserList/CreateNewUser/CreateTeacherAccount/index.jsx";
import CreateStudentAccount from "../../features/Admin/UserList/CreateNewUser/CreateStudentAccount/index.jsx";

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
        path: "users",
        Component: Dashboard,
      },
      {
        path: "teacher-list",
        Component: Dashboard,
      },
      {
        path: "student-list",
        Component: Dashboard,
      },
      {
        path: "courses",
        Component: Dashboard,
      },
      {
        path: "create-teacher-account",
        Component: CreateTeacherAccount,
      },
      {
        path: "create-student-account",
        Component: CreateStudentAccount,
      },
      {
        path: "add-courses",
        Component: Dashboard,
      },
    ],
  },
];
export default adminRouter;
