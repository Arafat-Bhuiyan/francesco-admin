// AgencyDashboardWrapper.jsx
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AgencyDashboardWrapper({ children }) {
    const navigate = useNavigate();
    const role = Cookies.get("role");

    useEffect(() => {
        if (role !== "agency_admin") {
            navigate("/login", { replace: true });
        }
    }, [role, navigate]);

    if (role !== "agency_admin") return null;

    return <>{children}</>;
}