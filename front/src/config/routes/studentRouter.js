import StudentLayout from "../../layouts/Student/index.jsx";
import Dashboard from "../../features/Student/Dashboard"
import PersonalInformation from "../../features/Student/PersonalInformation/index.jsx";
import Notification from "../../features/Student/Notification/index.jsx"
import EducationProgram from "../../features/Student/EducationProgram/index.jsx"

const studentRouter = [
  {
    role: "student",
    path: "/student",
    element: <StudentLayout />,
    children: [
      {
        path: "*",
        Component: Dashboard,
      },
      //////////////////////Product//////////////////
      {
        path: "personal-information",
        Component: PersonalInformation,
      },
      {
        path: "notification",
        Component: Notification,
      },
      {
        path: "education-program",
        Component: EducationProgram,
      },
    ],
  },
];
export default studentRouter;