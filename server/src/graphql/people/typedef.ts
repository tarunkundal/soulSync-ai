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
  whatsappEnabled: Boolean
  createdAt: Date

  importantDates: [ImportantDate!]!
}

type ImportantDate {
  id: ID!
  dateValue: Date!
  dateType: String!
  createdAt: Date
}

input ImportantDateInput {
  dateValue: Date!
  dateType: String!
}


input CreatePeopleInput {
  name: String!
  relationshipType: String!
  aiTonePreference: String!
  phoneNumber:String!
  whatsappEnabled:Boolean
  importantDates: ImportantDateInput!
}

type GetAllPeopleResponse {
  people: [People!]!
}

input UpdatePeopleInput {
  name: String
  relationshipType: String
  phoneNumber: String
  aiTonePreference: String
  whatsappEnabled: Boolean
}

`