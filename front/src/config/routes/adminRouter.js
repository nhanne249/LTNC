import AdminLayout from "../../layouts/Admin/index.jsx";
import Dashboard from "../../features/Admin/Dashboard"

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
        // path: "product-list",
        // Component: ProductList,
      },
    ],
  },
];
export default adminRouter;