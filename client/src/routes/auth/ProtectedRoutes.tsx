import { Spinner } from "@/components/ui/spinner";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import ROUTES from "..";

const ProtectedRoutes = () => {
    const { loading, isAuthenticated } = useAuth();

    if (loading) return <Spinner isFullPage />

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.AUTH} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
