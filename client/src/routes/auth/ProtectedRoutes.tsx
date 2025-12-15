import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Auth";

const ProtectedRoutes = () => {
    const { loading, isAuthenticated } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
