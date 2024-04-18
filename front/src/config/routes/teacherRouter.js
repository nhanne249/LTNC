import Layouts from "../../layouts/index.jsx";
import Dashboard from "../../features/Student/Dashboard";
import PersonalInformation from "../../features/Teacher/PersonalInformation/index.jsx"

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
        path: "notification",
        Component: PersonalInformation,
      },
      {
        path: "classes",
        Component: PersonalInformation,
      },
    ],
  },
];
export default teacherRouter;
