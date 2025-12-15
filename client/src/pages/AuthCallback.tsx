import { SetSessionDocument } from "@/graphql/generated/graphql";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation } from "@apollo/client/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
    const navigate = useNavigate();
    const [setSession] = useMutation(SetSessionDocument);
    const { refetch } = useAuth();

    useEffect(() => {
        const run = async () => {
            const hash = window.location.hash.substring(1);
            const params = new URLSearchParams(hash);
            const accessToken = params.get("access_token");

            if (!accessToken) {
                navigate("/auth", { replace: true });
                return;
            }

            try {
                await setSession({ variables: { token: accessToken } });
                refetch();
                navigate("/onboarding", { replace: true });
                // navigate(user?.onboardingCompleted ? "/dashboard" : "/onboarding");
            } catch {
                navigate("/auth", { replace: true });
            }
        };

        run();
    }, [navigate, setSession, refetch]);

    return <div>Verifying your email...</div>;
};

export default AuthCallback;
