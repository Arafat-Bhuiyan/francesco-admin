import Login from "@/Admin/Auth/Login";
import MainDashboard from "@/Admin/Dashboard/MainDashboard";
import AdminLayout from "@/layouts/AdminLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import TermsAndPolicies from "@/Admin/Settings/Settings";
import Agency from "@/Admin/Agency/Agency";
import GlobalPricing from "@/Admin/GlobalPricing/GlobalPricing";
import Admin_AgentControl from "@/Admin/Admin_AgentControl/Admin_AgentControl";

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
      { path: "agency-management", element: <Agency /> },
      { path: "global-pricing-rules", element: <GlobalPricing /> },
      { path: "admin&agent-control", element: <Admin_AgentControl /> },
      { path: "customer-overview", element: <>Customer Overview</> },
      { path: "payments&commission", element: <>Payments & Commission</> },
      { path: "settings", element: <TermsAndPolicies /> },
    ],
  },
]);

export default router;
