export const mutations = `#graphql
signUp(email:String!,password:String!):Boolean!
 login(email: String!, password: String!): User!
 logout: Boolean!
 setSession(token: String!): Boolean!
 googleAuthUrl: String!
`