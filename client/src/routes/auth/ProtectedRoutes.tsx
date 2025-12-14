import { useMe } from "@/hooks/useMe";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const { loading, isAuthenticated } = useMe();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
