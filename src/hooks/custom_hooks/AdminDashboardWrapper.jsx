// AdminDashboardWrapper.jsx
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function AdminDashboardWrapper({ children }) {
    const navigate = useNavigate();
    const role = Cookies.get("role");

    useEffect(() => {
        if (role !== "super-admin") {
            navigate("/login", { replace: true });
        }
    }, [role, navigate]);

    if (role !== "super-admin") return null;

    return <>{children}</>;
}