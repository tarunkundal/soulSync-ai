/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation SignUp($email: String!, $password: String!) {\n  signUp(email: $email, password: $password)\n}\n\nmutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    id\n    email\n  }\n}\n\nmutation SetSession($token: String!) {\n  setSession(token: $token)\n}\n\nmutation GoogleAuthUrl {\n  googleAuthUrl\n}\n\nmutation Logout {\n  logout\n}": typeof types.SignUpDocument,
    "mutation AddPeople($input: CreatePeopleInput!) {\n  createPerson(input: $input) {\n    id\n    name\n    relationshipType\n    whatsappEnabled\n    importantDates {\n      dateValue\n      dateType\n    }\n    phoneNumber\n    aiTonePreference\n  }\n}\n\nmutation AddNewImportantDate($input: AddImportantDateInput!) {\n  addNewImportantDate(input: $input) {\n    id\n    dateValue\n    dateType\n  }\n}": typeof types.AddPeopleDocument,
    "query MeQuery {\n  me {\n    id\n    email\n    fullName\n  }\n}\n\nquery GetAllPeople {\n  getAllPeople {\n    people {\n      id\n      name\n      relationshipType\n      importantDates {\n        dateValue\n        dateType\n      }\n    }\n  }\n}\n\nquery GetPersonDetails($personId: ID!) {\n  getPersonDetails(personId: $personId) {\n    person {\n      id\n      name\n      relationshipType\n      whatsappEnabled\n      importantDates {\n        dateValue\n        dateType\n        id\n      }\n      phoneNumber\n      aiTonePreference\n    }\n  }\n}": typeof types.MeQueryDocument,
};
const documents: Documents = {
    "mutation SignUp($email: String!, $password: String!) {\n  signUp(email: $email, password: $password)\n}\n\nmutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    id\n    email\n  }\n}\n\nmutation SetSession($token: String!) {\n  setSession(token: $token)\n}\n\nmutation GoogleAuthUrl {\n  googleAuthUrl\n}\n\nmutation Logout {\n  logout\n}": types.SignUpDocument,
    "mutation AddPeople($input: CreatePeopleInput!) {\n  createPerson(input: $input) {\n    id\n    name\n    relationshipType\n    whatsappEnabled\n    importantDates {\n      dateValue\n      dateType\n    }\n    phoneNumber\n    aiTonePreference\n  }\n}\n\nmutation AddNewImportantDate($input: AddImportantDateInput!) {\n  addNewImportantDate(input: $input) {\n    id\n    dateValue\n    dateType\n  }\n}": types.AddPeopleDocument,
    "query MeQuery {\n  me {\n    id\n    email\n    fullName\n  }\n}\n\nquery GetAllPeople {\n  getAllPeople {\n    people {\n      id\n      name\n      relationshipType\n      importantDates {\n        dateValue\n        dateType\n      }\n    }\n  }\n}\n\nquery GetPersonDetails($personId: ID!) {\n  getPersonDetails(personId: $personId) {\n    person {\n      id\n      name\n      relationshipType\n      whatsappEnabled\n      importantDates {\n        dateValue\n        dateType\n        id\n      }\n      phoneNumber\n      aiTonePreference\n    }\n  }\n}": types.MeQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SignUp($email: String!, $password: String!) {\n  signUp(email: $email, password: $password)\n}\n\nmutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    id\n    email\n  }\n}\n\nmutation SetSession($token: String!) {\n  setSession(token: $token)\n}\n\nmutation GoogleAuthUrl {\n  googleAuthUrl\n}\n\nmutation Logout {\n  logout\n}"): (typeof documents)["mutation SignUp($email: String!, $password: String!) {\n  signUp(email: $email, password: $password)\n}\n\nmutation Login($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    id\n    email\n  }\n}\n\nmutation SetSession($token: String!) {\n  setSession(token: $token)\n}\n\nmutation GoogleAuthUrl {\n  googleAuthUrl\n}\n\nmutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddPeople($input: CreatePeopleInput!) {\n  createPerson(input: $input) {\n    id\n    name\n    relationshipType\n    whatsappEnabled\n    importantDates {\n      dateValue\n      dateType\n    }\n    phoneNumber\n    aiTonePreference\n  }\n}\n\nmutation AddNewImportantDate($input: AddImportantDateInput!) {\n  addNewImportantDate(input: $input) {\n    id\n    dateValue\n    dateType\n  }\n}"): (typeof documents)["mutation AddPeople($input: CreatePeopleInput!) {\n  createPerson(input: $input) {\n    id\n    name\n    relationshipType\n    whatsappEnabled\n    importantDates {\n      dateValue\n      dateType\n    }\n    phoneNumber\n    aiTonePreference\n  }\n}\n\nmutation AddNewImportantDate($input: AddImportantDateInput!) {\n  addNewImportantDate(input: $input) {\n    id\n    dateValue\n    dateType\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query MeQuery {\n  me {\n    id\n    email\n    fullName\n  }\n}\n\nquery GetAllPeople {\n  getAllPeople {\n    people {\n      id\n      name\n      relationshipType\n      importantDates {\n        dateValue\n        dateType\n      }\n    }\n  }\n}\n\nquery GetPersonDetails($personId: ID!) {\n  getPersonDetails(personId: $personId) {\n    person {\n      id\n      name\n      relationshipType\n      whatsappEnabled\n      importantDates {\n        dateValue\n        dateType\n        id\n      }\n      phoneNumber\n      aiTonePreference\n    }\n  }\n}"): (typeof documents)["query MeQuery {\n  me {\n    id\n    email\n    fullName\n  }\n}\n\nquery GetAllPeople {\n  getAllPeople {\n    people {\n      id\n      name\n      relationshipType\n      importantDates {\n        dateValue\n        dateType\n      }\n    }\n  }\n}\n\nquery GetPersonDetails($personId: ID!) {\n  getPersonDetails(personId: $personId) {\n    person {\n      id\n      name\n      relationshipType\n      whatsappEnabled\n      importantDates {\n        dateValue\n        dateType\n        id\n      }\n      phoneNumber\n      aiTonePreference\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;