import Layouts from "../../layouts/index.jsx";
import Dashboard from "../../features/Student/Dashboard";
import CreateTeacherAccount from "../../features/Admin/UserList/CreateNewUser/CreateTeacherAccount/index.jsx";
import CreateStudentAccount from "../../features/Admin/UserList/CreateNewUser/CreateStudentAccount/index.jsx";
import ClassList from "../../features/Admin/Class/ClassList/index.jsx"
import CreateNewClass from "../../features/Admin/Class/CreateClass/index.jsx"
import UserList from "../../features/Admin/UserList/index.jsx"
import Faculties from "../../features/Admin/Faculties/index.jsx";

const adminRouter = [
  {
    role: "admin",
    path: "/admin",
    element: <Layouts/>,
    children: [
      {
        path: "*",
        Component: UserList,
      },
      {
        path: "",
        Component: UserList,
      },
      {
        path: "users",
        Component: UserList,
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
      {
        path: "faculties",
        Component: Faculties,
      },
    ],
  },
];
export default adminRouter;
