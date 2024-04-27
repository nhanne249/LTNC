import Layouts from "../../layouts/index.jsx";
import PersonalInformation from "../../features/Student/PersonalInformation/index.jsx";
import Notification from "../../features/Student/Notification/index.jsx";
import UpdateStudentInfo from "../../features/Student/PersonalInformation/UpdateStudentInfo/index.jsx";
import Schedule from "../../features/Student/Schedule/index.jsx"
import ClassRegister from "../../features/Student/ClassRegister/index.jsx"

const studentRouter = [
  {
    role: "student",
    path: "/student",
    element: <Layouts />,
    children: [
      {
        path: "*",
        Component: PersonalInformation,
      },
      {
        path: "",
        Component: PersonalInformation,
      },
      // {
      //   path: "/",
      //   Component: PersonalInformation,
      // },
      {
        path: "personal-information",
        Component: PersonalInformation,
      },
      {
        path: "update-student-info",
        Component: UpdateStudentInfo,
      },
      {
        path: "notification",
        Component: Notification,
      },
      {
        path: "education-program",
        Component: PersonalInformation,
      },
      {
        path: "schedule",
        Component: Schedule,
      },
      {
        path: "class-register",
        Component: ClassRegister,
      },
    ],
  },
];
export default studentRouter;
