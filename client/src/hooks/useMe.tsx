import { MeQueryDocument } from '@/graphql/generated/graphql';
import { useQuery } from '@apollo/client/react';

export const useMe = () => {
    const { data, loading, error } = useQuery(MeQueryDocument);

    return { user: data?.me, loading, error };
};
