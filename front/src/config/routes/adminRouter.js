import AdminLayout from "../../layouts/Admin/index.jsx";
import Dashboard from "../../features/Admin/Dashboard"

const adminRouter = [
  {
    role: "Role_Admin",
    path: "/admin",
    element: <AdminLayout />,
    // index: <Dashboard />,
    children: [
      {
        path: "*",
        Component: Dashboard,
      },
      //////////////////////Product//////////////////
      {
        // path: "product-list",
        // Component: ProductList,
      },
    ],
  },
];
export default adminRouter;