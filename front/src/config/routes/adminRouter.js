import Layouts from "../../layouts/index.jsx";
import Dashboard from "../../features/Student/Dashboard";
import CreateTeacherAccount from "../../features/Admin/UserList/CreateNewUser/CreateTeacherAccount/index.jsx";
import CreateStudentAccount from "../../features/Admin/UserList/CreateNewUser/CreateStudentAccount/index.jsx";
import ClassList from "../../features/Admin/Class/ClassList/index.jsx"
import CreateNewClass from "../../features/Admin/Class/CreateClass/index.jsx"

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
        path: "create-teacher-account",
        Component: CreateTeacherAccount,
      },
      {
        path: "create-student-account",
        Component: CreateStudentAccount,
      },
      {
        path: "class",
        Component: ClassList,
      },
      {
        path: "create-class",
        Component: CreateNewClass,
      },
    ],
  },
];
export default adminRouter;
