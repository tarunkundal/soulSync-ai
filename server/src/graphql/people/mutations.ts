export const mutations = `#graphql
createPerson(input:CreatePeopleInput!):People!

updatePerson(
    personId: ID!
    input: UpdatePeopleInput!
  ): People!

addNewImportantDate(input: AddImportantDateInput!): ImportantDate!
`