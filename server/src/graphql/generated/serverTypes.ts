import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { Context } from '../context.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
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
  __typename?: 'GetAllPeopleResponse';
  people: Array<People>;
};

export type GetPersonDetailsResponse = {
  __typename?: 'GetPersonDetailsResponse';
  person: People;
};

export type ImportantDate = {
  __typename?: 'ImportantDate';
  createdAt?: Maybe<Scalars['Date']['output']>;
  dateType: Scalars['String']['output'];
  dateValue: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
};

export type ImportantDateInput = {
  dateType: Scalars['String']['input'];
  dateValue: Scalars['Date']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
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
  __typename?: 'People';
  aiTonePreference: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  importantDates: Array<ImportantDate>;
  name: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  relationshipType: Scalars['String']['output'];
  whatsappEnabled?: Maybe<Scalars['Boolean']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAllPeople: GetAllPeopleResponse;
  getPersonDetails: GetPersonDetailsResponse;
  me?: Maybe<User>;
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
  __typename?: 'User';
  createdAt?: Maybe<Scalars['Date']['output']>;
  email: Scalars['String']['output'];
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AddImportantDateInput: AddImportantDateInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreatePeopleInput: CreatePeopleInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  GetAllPeopleResponse: ResolverTypeWrapper<GetAllPeopleResponse>;
  GetPersonDetailsResponse: ResolverTypeWrapper<GetPersonDetailsResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  ImportantDate: ResolverTypeWrapper<ImportantDate>;
  ImportantDateInput: ImportantDateInput;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  People: ResolverTypeWrapper<People>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdatePeopleInput: UpdatePeopleInput;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddImportantDateInput: AddImportantDateInput;
  Boolean: Scalars['Boolean']['output'];
  CreatePeopleInput: CreatePeopleInput;
  Date: Scalars['Date']['output'];
  GetAllPeopleResponse: GetAllPeopleResponse;
  GetPersonDetailsResponse: GetPersonDetailsResponse;
  ID: Scalars['ID']['output'];
  ImportantDate: ImportantDate;
  ImportantDateInput: ImportantDateInput;
  Mutation: Record<PropertyKey, never>;
  People: People;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
  UpdatePeopleInput: UpdatePeopleInput;
  User: User;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GetAllPeopleResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetAllPeopleResponse'] = ResolversParentTypes['GetAllPeopleResponse']> = ResolversObject<{
  people?: Resolver<Array<ResolversTypes['People']>, ParentType, ContextType>;
}>;

export type GetPersonDetailsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetPersonDetailsResponse'] = ResolversParentTypes['GetPersonDetailsResponse']> = ResolversObject<{
  person?: Resolver<ResolversTypes['People'], ParentType, ContextType>;
}>;

export type ImportantDateResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ImportantDate'] = ResolversParentTypes['ImportantDate']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  dateType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dateValue?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addNewImportantDate?: Resolver<ResolversTypes['ImportantDate'], ParentType, ContextType, RequireFields<MutationAddNewImportantDateArgs, 'input'>>;
  createPerson?: Resolver<ResolversTypes['People'], ParentType, ContextType, RequireFields<MutationCreatePersonArgs, 'input'>>;
  googleAuthUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  login?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  setSession?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSetSessionArgs, 'token'>>;
  signUp?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'email' | 'password'>>;
  updatePerson?: Resolver<ResolversTypes['People'], ParentType, ContextType, RequireFields<MutationUpdatePersonArgs, 'input' | 'personId'>>;
}>;

export type PeopleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['People'] = ResolversParentTypes['People']> = ResolversObject<{
  aiTonePreference?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  importantDates?: Resolver<Array<ResolversTypes['ImportantDate']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  relationshipType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  whatsappEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAllPeople?: Resolver<ResolversTypes['GetAllPeopleResponse'], ParentType, ContextType>;
  getPersonDetails?: Resolver<ResolversTypes['GetPersonDetailsResponse'], ParentType, ContextType, RequireFields<QueryGetPersonDetailsArgs, 'personId'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Date?: GraphQLScalarType;
  GetAllPeopleResponse?: GetAllPeopleResponseResolvers<ContextType>;
  GetPersonDetailsResponse?: GetPersonDetailsResponseResolvers<ContextType>;
  ImportantDate?: ImportantDateResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  People?: PeopleResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

