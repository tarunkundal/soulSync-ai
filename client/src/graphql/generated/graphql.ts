/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: { input: unknown; output: unknown; }
};

export type AddImportantDateInput = {
  dateType: Scalars['String']['input'];
  dateValue: Scalars['Date']['input'];
  personId: Scalars['ID']['input'];
};

export type CreatePeopleInput = {
  aiTonePreference: Scalars['String']['input'];
  importantDates: ImportantDateInput;
  name: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
  relationshipType: Scalars['String']['input'];
  whatsappEnabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GetAllPeopleResponse = {
  __typename: 'GetAllPeopleResponse';
  people: Array<People>;
};

export type GetPersonDetailsResponse = {
  __typename: 'GetPersonDetailsResponse';
  person: People;
};

export type ImportantDate = {
  __typename: 'ImportantDate';
  createdAt: Maybe<Scalars['Date']['output']>;
  dateType: Scalars['String']['output'];
  dateValue: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
};

export type ImportantDateInput = {
  dateType: Scalars['String']['input'];
  dateValue: Scalars['Date']['input'];
};

export type Mutation = {
  __typename: 'Mutation';
  addNewImportantDate: ImportantDate;
  createPerson: People;
  googleAuthUrl: Scalars['String']['output'];
  login: User;
  logout: Scalars['Boolean']['output'];
  setSession: Scalars['Boolean']['output'];
  signUp: Scalars['Boolean']['output'];
  updatePerson: People;
};


export type MutationAddNewImportantDateArgs = {
  input: AddImportantDateInput;
};


export type MutationCreatePersonArgs = {
  input: CreatePeopleInput;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSetSessionArgs = {
  token: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdatePersonArgs = {
  input: UpdatePeopleInput;
  personId: Scalars['ID']['input'];
};

export type People = {
  __typename: 'People';
  aiTonePreference: Scalars['String']['output'];
  createdAt: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  importantDates: Array<ImportantDate>;
  name: Scalars['String']['output'];
  phoneNumber: Maybe<Scalars['String']['output']>;
  relationshipType: Scalars['String']['output'];
  whatsappEnabled: Maybe<Scalars['Boolean']['output']>;
};

export type Query = {
  __typename: 'Query';
  getAllPeople: GetAllPeopleResponse;
  getPersonDetails: GetPersonDetailsResponse;
  me: Maybe<User>;
};


export type QueryGetPersonDetailsArgs = {
  personId: Scalars['ID']['input'];
};

export type UpdatePeopleInput = {
  aiTonePreference?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  relationshipType?: InputMaybe<Scalars['String']['input']>;
  whatsappEnabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type User = {
  __typename: 'User';
  createdAt: Maybe<Scalars['Date']['output']>;
  email: Scalars['String']['output'];
  fullName: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updatedAt: Maybe<Scalars['Date']['output']>;
};

export type SignUpMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignUpMutation = { signUp: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { login: { __typename: 'User', id: string, email: string } };

export type SetSessionMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type SetSessionMutation = { setSession: boolean };

export type GoogleAuthUrlMutationVariables = Exact<{ [key: string]: never; }>;


export type GoogleAuthUrlMutation = { googleAuthUrl: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout: boolean };

export type AddPeopleMutationVariables = Exact<{
  input: CreatePeopleInput;
}>;


export type AddPeopleMutation = { createPerson: { __typename: 'People', id: string, name: string, relationshipType: string, whatsappEnabled: boolean | null, phoneNumber: string | null, aiTonePreference: string, importantDates: Array<{ __typename: 'ImportantDate', dateValue: unknown, dateType: string }> } };

export type AddNewImportantDateMutationVariables = Exact<{
  input: AddImportantDateInput;
}>;


export type AddNewImportantDateMutation = { addNewImportantDate: { __typename: 'ImportantDate', id: string, dateValue: unknown, dateType: string } };

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { me: { __typename: 'User', id: string, email: string, fullName: string | null } | null };

export type GetAllPeopleQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPeopleQuery = { getAllPeople: { __typename: 'GetAllPeopleResponse', people: Array<{ __typename: 'People', id: string, name: string, relationshipType: string, importantDates: Array<{ __typename: 'ImportantDate', dateValue: unknown, dateType: string }> }> } };

export type GetPersonDetailsQueryVariables = Exact<{
  personId: Scalars['ID']['input'];
}>;


export type GetPersonDetailsQuery = { getPersonDetails: { __typename: 'GetPersonDetailsResponse', person: { __typename: 'People', id: string, name: string, relationshipType: string, whatsappEnabled: boolean | null, phoneNumber: string | null, aiTonePreference: string, importantDates: Array<{ __typename: 'ImportantDate', dateValue: unknown, dateType: string, id: string }> } } };


export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SetSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}]}}]} as unknown as DocumentNode<SetSessionMutation, SetSessionMutationVariables>;
export const GoogleAuthUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GoogleAuthUrl"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"googleAuthUrl"}}]}}]} as unknown as DocumentNode<GoogleAuthUrlMutation, GoogleAuthUrlMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const AddPeopleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPeople"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePeopleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPerson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"relationshipType"}},{"kind":"Field","name":{"kind":"Name","value":"whatsappEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"importantDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateValue"}},{"kind":"Field","name":{"kind":"Name","value":"dateType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"aiTonePreference"}}]}}]}}]} as unknown as DocumentNode<AddPeopleMutation, AddPeopleMutationVariables>;
export const AddNewImportantDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddNewImportantDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddImportantDateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addNewImportantDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dateValue"}},{"kind":"Field","name":{"kind":"Name","value":"dateType"}}]}}]}}]} as unknown as DocumentNode<AddNewImportantDateMutation, AddNewImportantDateMutationVariables>;
export const MeQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MeQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}}]} as unknown as DocumentNode<MeQueryQuery, MeQueryQueryVariables>;
export const GetAllPeopleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllPeople"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllPeople"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"people"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"relationshipType"}},{"kind":"Field","name":{"kind":"Name","value":"importantDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateValue"}},{"kind":"Field","name":{"kind":"Name","value":"dateType"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllPeopleQuery, GetAllPeopleQueryVariables>;
export const GetPersonDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPersonDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"personId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPersonDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"personId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"personId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"relationshipType"}},{"kind":"Field","name":{"kind":"Name","value":"whatsappEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"importantDates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateValue"}},{"kind":"Field","name":{"kind":"Name","value":"dateType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"aiTonePreference"}}]}}]}}]}}]} as unknown as DocumentNode<GetPersonDetailsQuery, GetPersonDetailsQueryVariables>;