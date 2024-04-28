import Layouts from "../../layouts/index.jsx";
import PersonalInformation from "../../features/Teacher/PersonalInformation/index.jsx"
import Class from '../../features/Teacher/Class/index.jsx'
import Notification from "../../features/Teacher/Notification/index.jsx";
import UpdateTeacherInfo from '../../features/Teacher/PersonalInformation/UpdateTeacherInfo/index.jsx';

const teacherRouter = [
  {
    role: "teacher",
    path: "/teacher",
    element: <Layouts/>,
    children: [
      {
        path: "*",
        Component: PersonalInformation,
      },
      {
        path: "",
        Component: PersonalInformation,
      },
      {
        path: "personal-information",
        Component: PersonalInformation,
      },
      {
        path: "update-teacher-info",
        Component: UpdateTeacherInfo,
      },
      {
        path: "notification",
        Component: Notification,
      },
      {
        path: "classes",
        Component: Class,
      },
    ],
  },
];
export default teacherRouter;
