import Login from "@/Admin/Auth/Login";
import MainDashboard from "@/Admin/Dashboard/MainDashboard";
import AgencyDashboard from "@/AgencyAdmin/Dashboard/AgencyDashboard";
import AdminLayout from "@/layouts/AdminLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import TermsAndPolicies from "@/Admin/Settings/Settings";
import Agency from "@/Admin/Agency/Agency";
import GlobalPricing from "@/Admin/GlobalPricing/GlobalPricing";
import Admin_AgentControl from "@/Admin/Admin_AgentControl/Admin_AgentControl";
import CustomerOverview from "@/Admin/CustomerOverview/CustomerOverview";
import Payment from "@/Admin/Payment/Payment";
import CarManagement from "@/AgencyAdmin/CarManagement/CarManagement";
import AgentManagement from "@/AgencyAdmin/AgentManagement/AgentManagement";
import BookingManagement from "@/AgencyAdmin/BookingManagement/BookingManagement";
import Quotation from "@/AgencyAdmin/Quotation/Quotation";
import CustomerManagement from "@/AgencyAdmin/CustomerManagement/CustomerManagement";
import AgencyPayment from "@/AgencyAdmin/Payment/Payment";
import Reports from "@/AgencyAdmin/Reports/Reports";
import Settings from "@/AgencyAdmin/Settings2/Settings";
import Operation from "@/Admin/Operation/Operation";
import Cookies from "js-cookie";
import { NotFound } from "@/NotFound/NotFound";
import { ErrorComponent } from "@/layouts/ErrorPage";

const DashboardWrapper = () => {
  const role = Cookies.get("role") || "Super Admin";
  return role === "agency_admin" ? <AgencyDashboard /> : <MainDashboard />;
};

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
    path: "*",
    element: <NotFound />
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorComponent />,
    children: [
      {
        index: true,
        element: <DashboardWrapper />,
      },
      { path: "agency-management", element: <Agency /> },
      { path: "global-pricing-rules", element: <GlobalPricing /> },
      { path: "admin&agent-control", element: <Admin_AgentControl /> },
      { path: "customer-overview", element: <CustomerOverview /> },
      { path: "operation", element: <Operation /> },
      { path: "payments&commission", element: <Payment /> },
      { path: "settings", element: <TermsAndPolicies /> },

      // Agency Admin specific routes
      { path: "car-management", element: <CarManagement /> },
      { path: "agent-management", element: <AgentManagement /> },
      { path: "booking-management", element: <BookingManagement /> },
      { path: "quotation-pricing", element: <Quotation /> },
      { path: "customer-management", element: <CustomerManagement /> },
      { path: "payments-deposits", element: <AgencyPayment /> },
      { path: "reports-analytics", element: <Reports /> },
      { path: "agency-settings", element: <Settings /> },
    ],
  },
]);

export default router;
