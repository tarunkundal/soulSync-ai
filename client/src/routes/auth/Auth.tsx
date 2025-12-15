import { MeQueryDocument } from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client/react";
import { createContext, ReactNode, useContext } from "react";

type AuthContextType = {
    user: unknown | null;
    loading: boolean;
    isAuthenticated: boolean;
    refetch: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { data, loading, refetch } = useQuery(MeQueryDocument, {
        fetchPolicy: "network-only",
    });

    return (
        <AuthContext.Provider
            value={{
                user: data?.me ?? null,
                loading,
                isAuthenticated: !!data?.me,
                refetch,
            }}
        >
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
