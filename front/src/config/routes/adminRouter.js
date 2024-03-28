import AdminLayout from "../../layouts/Admin/index.jsx";
import Dashboard from "../../features/Admin/Dashboard"
import PersonalInformation from "../../features/Admin/PersonalInformation/index.jsx";

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
    ],
  },
];
export default adminRouter;