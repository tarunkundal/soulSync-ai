import { ApolloServer } from "@apollo/server"
import { User } from "./user/index.js"
import { People } from "./people/index.js"
import { scalars } from "./scalars.js"

async function createGraphqlApolloServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
        ${User.typeDefs}
        ${People.typeDefs}
        type Query {
            ${User.queries}
            ${People.queries}
        }
        type Mutation {
            ${User.mutations}
            ${People.mutations}
        }
        `,
        resolvers: {
            ...scalars,
            Query: {
                ...User.resolvers.queries,
                ...People.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations,
                ...People.resolvers.mutations
            }
        }
    })

    await gqlServer.start()
    return gqlServer
}

export default createGraphqlApolloServer