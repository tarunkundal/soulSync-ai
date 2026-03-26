import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";


const client_uri = import.meta.env.CLIENT_URL ? `${import.meta.env.CLIENT_URL}/graphql` : "http://localhost:4000/graphql"

const httpLink = createHttpLink({
    uri: client_uri,
    credentials: "include",
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
        },
    };
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
