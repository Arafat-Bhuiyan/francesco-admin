import Login from "@/Admin/Auth/Login";
import MainDashboard from "@/Admin/Dashboard/MainDashboard";
import AdminLayout from "@/layouts/AdminLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import TermsAndPolicies from "@/Admin/Settings/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <h2>Route not found</h2>,
    children: [
      {
        index: true,
        element: <MainDashboard />,
      },
      { path: "agency-management", element: <>Agency Management</> },
      { path: "global-pricing-rules", element: <>Global Pricing Rules</> },
      { path: "admin&agent-control", element: <>Admin & Agent Control</> },
      { path: "customer-overview", element: <>Customer Overview</> },
      { path: "payments&commission", element: <>Payments & Commission</> },
      { path: "settings", element: <TermsAndPolicies /> },
    ],
  },
]);

export default router;
