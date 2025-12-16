export const typeDefs = `#graphql
scalar Date

  type User {
  id: ID!
  email: String!
  fullName: String
}

type People {
  id: ID!
  name: String!
  relationshipType: String!
  phoneNumber: String
  aiTonePreference: String!
  whatsappEnabled: Boolean!
  createdAt: Date

  importantDates: [ImportantDate!]!
}

type ImportantDate {
  id: ID!
  dateValue: Date!
  createdAt: Date
}

input CreatePeopleInput {
  name: String!
  relationshipType: String!
  date: Date!
  aiTonePreference: String!
  phoneNumber:String!
}


`