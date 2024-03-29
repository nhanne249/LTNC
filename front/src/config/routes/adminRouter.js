import AdminLayout from "../../layouts/Admin/index.jsx";
import Dashboard from "../../features/Admin/Dashboard"
import PersonalInformation from "../../features/Admin/PersonalInformation/index.jsx";
import Notification from "../../features/Admin/Notification/index.jsx"

const adminRouter = [
  {
    role: "admin",
    path: "/admin",
    element: <AdminLayout />,
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
    ],
  },
];
export default adminRouter;