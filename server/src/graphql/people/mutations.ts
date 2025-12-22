export const mutations = `#graphql
createPerson(input:CreatePeopleInput!):People!

updatePerson(input: UpdatePersonInput!): People!

addNewImportantDate(input: AddImportantDateInput!): ImportantDate!
`