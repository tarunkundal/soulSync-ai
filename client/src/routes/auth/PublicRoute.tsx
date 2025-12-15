import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import ROUTES from "..";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const { loading, isAuthenticated } = useAuth();

    if (loading) return null;

    if (isAuthenticated) {
        return <Navigate to={ROUTES.DASHBOARD} replace />;
    }

    return children;
};

export default PublicRoute