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
};

export type Mutation = {
  __typename: 'Mutation';
  googleAuthUrl: Scalars['String']['output'];
  login: User;
  logout: Scalars['Boolean']['output'];
  setSession: Scalars['Boolean']['output'];
  signUp: Scalars['Boolean']['output'];
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

export type Query = {
  __typename: 'Query';
  me: Maybe<User>;
};

export type User = {
  __typename: 'User';
  createdAt: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  fullName: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updatedAt: Maybe<Scalars['String']['output']>;
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

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { me: { __typename: 'User', id: string, email: string, fullName: string | null } | null };


export const SignUpDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "SignUp" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "password" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "signUp" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "email" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "password" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "password" } } }] }] } }] } as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const LoginDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "Login" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "password" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "login" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "email" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "password" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "password" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "email" } }] } }] } }] } as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const SetSessionDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "SetSession" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "token" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "setSession" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "token" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "token" } } }] }] } }] } as unknown as DocumentNode<SetSessionMutation, SetSessionMutationVariables>;
export const GoogleAuthUrlDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "GoogleAuthUrl" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "googleAuthUrl" } }] } }] } as unknown as DocumentNode<GoogleAuthUrlMutation, GoogleAuthUrlMutationVariables>;
export const LogoutDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "Logout" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "logout" } }] } }] } as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const MeQueryDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "MeQuery" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "me" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "email" } }, { "kind": "Field", "name": { "kind": "Name", "value": "fullName" } }] } }] } }] } as unknown as DocumentNode<MeQueryQuery, MeQueryQueryVariables>;