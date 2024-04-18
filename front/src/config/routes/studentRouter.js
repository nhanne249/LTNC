import Layouts from "../../layouts/index.jsx";
import PersonalInformation from "../../features/Student/PersonalInformation/index.jsx";
import Notification from "../../features/Student/Notification/index.jsx";
import IntructorEvaluate from "../../features/Student/InstructorEvaluate/index.jsx";

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
        path: "notification",
        Component: Notification,
      },
      {
        path: "education-program",
        Component: PersonalInformation,
      },
      {
        path: "instructor-evaluate",
        Component: IntructorEvaluate,
      },
    ],
  },
];
export default studentRouter;
