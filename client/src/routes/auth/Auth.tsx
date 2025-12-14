import { MeQueryDocument } from "@/graphql/generated/graphql";
import { useQuery } from "@apollo/client/react";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
    const { data, loading } = useQuery(MeQueryDocument)

    console.log('datata', data);


    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20%" }}>
                Loading...
            </div>
        );
    }

    return children;
};

export default AuthProvider;
