import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const { loading, isAuthenticated } = useAuth();

    if (loading) return null;

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute