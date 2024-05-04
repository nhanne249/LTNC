import Layouts from "../../layouts/index.jsx";
import PersonalInformation from "../../features/Student/PersonalInformation/index.jsx";
import UpdateStudentInfo from "../../features/Student/PersonalInformation/UpdateStudentInfo/index.jsx";
import Schedule from "../../features/Student/Schedule/index.jsx"
import ClassRegister from "../../features/Student/ClassRegister/index.jsx"
import InstructorEvaluation from '../../features/Student/InstructorEvaluation/index.jsx'
import Resources from "../../features/Student/Resources/index.jsx"

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
      {
        path: "personal-information",
        Component: PersonalInformation,
      },
      {
        path: "update-student-info",
        Component: UpdateStudentInfo,
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
      {
        path: "instructor-evaluate",
        Component: InstructorEvaluation
      },
      {
        path: "resources",
        Component: Resources
      }
    ],
  },
];
export default studentRouter;
