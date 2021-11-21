import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  DateTime: string;
  JSON: Record<string, unknown>;
  JSONObject: Record<string, unknown>;
  Time: string;
};

export type Address = {
  __typename?: 'Address';
  addressNumber?: Maybe<Scalars['String']>;
  addressStreet?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  postalCode?: Maybe<Scalars['String']>;
  restaurant: Restaurant;
  restaurantId: Scalars['String'];
  state?: Maybe<Scalars['String']>;
};

export type BusInfo = {
  __typename?: 'BusInfo';
  address?: Maybe<Address>;
  description?: Maybe<Scalars['String']>;
  hours?: Maybe<Hours>;
  id: Scalars['String'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  valueProp1?: Maybe<Scalars['String']>;
  valueProp2?: Maybe<Scalars['String']>;
  valueProp3?: Maybe<Scalars['String']>;
};

export type CreateAddressInput = {
  addressNumber?: Maybe<Scalars['String']>;
  addressStreet?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type CreateCheckoutSessionInput = {
  priceId: Scalars['String'];
};

export type CreateMenuInput = {
  restaurantId: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  firebaseId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  onboarded: Scalars['Boolean'];
  stripeId?: Maybe<Scalars['String']>;
  stripeSubscriptionid?: Maybe<Scalars['String']>;
};

export type Hours = {
  __typename?: 'Hours';
  friday?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  monday?: Maybe<Scalars['String']>;
  saturday?: Maybe<Scalars['String']>;
  sunday?: Maybe<Scalars['String']>;
  thursday?: Maybe<Scalars['String']>;
  tuesday?: Maybe<Scalars['String']>;
  wednesday?: Maybe<Scalars['String']>;
};

export type Item = {
  __typename?: 'Item';
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
};

export type Menu = {
  __typename?: 'Menu';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  items: Array<Maybe<Item>>;
  name: Scalars['String'];
  restaurant: Restaurant;
  restaurantId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCheckoutSession?: Maybe<Scalars['String']>;
  onboard?: Maybe<Scalars['String']>;
  updateRestaurant: Restaurant;
  updateUser: User;
};


export type MutationCreateCheckoutSessionArgs = {
  input: CreateCheckoutSessionInput;
};


export type MutationOnboardArgs = {
  input: OnboardInput;
};


export type MutationUpdateRestaurantArgs = {
  id: Scalars['String'];
  input: UpdateRestaurantInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type OnboardInput = {
  address?: Maybe<CreateAddressInput>;
  brandColor: Scalars['String'];
  restaurantName: Scalars['String'];
  userName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  menus: Array<Menu>;
  menusByRestaurantId: Menu;
  redwood?: Maybe<Redwood>;
  restaurantById: Restaurant;
  restaurantByOwnerId: Restaurant;
  restaurants: Array<Restaurant>;
  user: User;
  users: Array<User>;
};


export type QueryMenusByRestaurantIdArgs = {
  restaurantId: Scalars['String'];
};


export type QueryRestaurantByIdArgs = {
  id: Scalars['String'];
};


export type QueryRestaurantByOwnerIdArgs = {
  ownerId: Scalars['String'];
};


export type QueryUserArgs = {
  email: Scalars['String'];
};

export type Redwood = {
  __typename?: 'Redwood';
  currentUser?: Maybe<Scalars['JSON']>;
  prismaVersion?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

export type Restaurant = {
  __typename?: 'Restaurant';
  address: Address;
  brandColor: Scalars['String'];
  busInfo?: Maybe<BusInfo>;
  createdAt: Scalars['DateTime'];
  domain?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  menus?: Maybe<Array<Maybe<Menu>>>;
  name: Scalars['String'];
  owner: User;
  ownerId: Scalars['String'];
  sheetId: Scalars['String'];
  theme?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type UpdateAddressInput = {
  addressNumber?: Maybe<Scalars['String']>;
  addressStreet?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type UpdateMenuInput = {
  restaurantId?: Maybe<Scalars['String']>;
};

export type UpdateRestaurantInput = {
  address?: Maybe<UpdateAddressInput>;
  brandColor?: Maybe<Scalars['String']>;
  domain?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ownerId?: Maybe<Scalars['String']>;
  sheetId?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  onboarded?: Maybe<Scalars['Boolean']>;
  stripeId?: Maybe<Scalars['String']>;
  stripeSubscriptionid?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firebaseId: Scalars['String'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  onboarded: Scalars['Boolean'];
  restaurant: Array<Maybe<Restaurant>>;
  stripeId?: Maybe<Scalars['String']>;
  stripeSubscriptionid?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BusInfo: ResolverTypeWrapper<BusInfo>;
  CreateAddressInput: CreateAddressInput;
  CreateCheckoutSessionInput: CreateCheckoutSessionInput;
  CreateMenuInput: CreateMenuInput;
  CreateUserInput: CreateUserInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Hours: ResolverTypeWrapper<Hours>;
  Item: ResolverTypeWrapper<Item>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Menu: ResolverTypeWrapper<Menu>;
  Mutation: ResolverTypeWrapper<{}>;
  OnboardInput: OnboardInput;
  Query: ResolverTypeWrapper<{}>;
  Redwood: ResolverTypeWrapper<Redwood>;
  Restaurant: ResolverTypeWrapper<Restaurant>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Time: ResolverTypeWrapper<Scalars['Time']>;
  UpdateAddressInput: UpdateAddressInput;
  UpdateMenuInput: UpdateMenuInput;
  UpdateRestaurantInput: UpdateRestaurantInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  Boolean: Scalars['Boolean'];
  BusInfo: BusInfo;
  CreateAddressInput: CreateAddressInput;
  CreateCheckoutSessionInput: CreateCheckoutSessionInput;
  CreateMenuInput: CreateMenuInput;
  CreateUserInput: CreateUserInput;
  Date: Scalars['Date'];
  DateTime: Scalars['DateTime'];
  Float: Scalars['Float'];
  Hours: Hours;
  Item: Item;
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Menu: Menu;
  Mutation: {};
  OnboardInput: OnboardInput;
  Query: {};
  Redwood: Redwood;
  Restaurant: Restaurant;
  String: Scalars['String'];
  Time: Scalars['Time'];
  UpdateAddressInput: UpdateAddressInput;
  UpdateMenuInput: UpdateMenuInput;
  UpdateRestaurantInput: UpdateRestaurantInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
};

export type RequireAuthDirectiveArgs = {
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type RequireAuthDirectiveResolver<Result, Parent, ContextType = any, Args = RequireAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type SkipAuthDirectiveArgs = { };

export type SkipAuthDirectiveResolver<Result, Parent, ContextType = any, Args = SkipAuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  addressNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addressStreet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  restaurant?: Resolver<ResolversTypes['Restaurant'], ParentType, ContextType>;
  restaurantId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BusInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['BusInfo'] = ResolversParentTypes['BusInfo']> = {
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hours?: Resolver<Maybe<ResolversTypes['Hours']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  valueProp1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  valueProp2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  valueProp3?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type HoursResolvers<ContextType = any, ParentType extends ResolversParentTypes['Hours'] = ResolversParentTypes['Hours']> = {
  friday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  monday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  saturday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sunday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thursday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tuesday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wednesday?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MenuResolvers<ContextType = any, ParentType extends ResolversParentTypes['Menu'] = ResolversParentTypes['Menu']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  items?: Resolver<Array<Maybe<ResolversTypes['Item']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  restaurant?: Resolver<ResolversTypes['Restaurant'], ParentType, ContextType>;
  restaurantId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCheckoutSession?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCreateCheckoutSessionArgs, 'input'>>;
  onboard?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationOnboardArgs, 'input'>>;
  updateRestaurant?: Resolver<ResolversTypes['Restaurant'], ParentType, ContextType, RequireFields<MutationUpdateRestaurantArgs, 'id' | 'input'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  menus?: Resolver<Array<ResolversTypes['Menu']>, ParentType, ContextType>;
  menusByRestaurantId?: Resolver<ResolversTypes['Menu'], ParentType, ContextType, RequireFields<QueryMenusByRestaurantIdArgs, 'restaurantId'>>;
  redwood?: Resolver<Maybe<ResolversTypes['Redwood']>, ParentType, ContextType>;
  restaurantById?: Resolver<ResolversTypes['Restaurant'], ParentType, ContextType, RequireFields<QueryRestaurantByIdArgs, 'id'>>;
  restaurantByOwnerId?: Resolver<ResolversTypes['Restaurant'], ParentType, ContextType, RequireFields<QueryRestaurantByOwnerIdArgs, 'ownerId'>>;
  restaurants?: Resolver<Array<ResolversTypes['Restaurant']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'email'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type RedwoodResolvers<ContextType = any, ParentType extends ResolversParentTypes['Redwood'] = ResolversParentTypes['Redwood']> = {
  currentUser?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  prismaVersion?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RestaurantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Restaurant'] = ResolversParentTypes['Restaurant']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  brandColor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  busInfo?: Resolver<Maybe<ResolversTypes['BusInfo']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  domain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  menus?: Resolver<Maybe<Array<Maybe<ResolversTypes['Menu']>>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sheetId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  theme?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firebaseId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  onboarded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  restaurant?: Resolver<Array<Maybe<ResolversTypes['Restaurant']>>, ParentType, ContextType>;
  stripeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  stripeSubscriptionid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  BusInfo?: BusInfoResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Hours?: HoursResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Menu?: MenuResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Redwood?: RedwoodResolvers<ContextType>;
  Restaurant?: RestaurantResolvers<ContextType>;
  Time?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  requireAuth?: RequireAuthDirectiveResolver<any, any, ContextType>;
  skipAuth?: SkipAuthDirectiveResolver<any, any, ContextType>;
};
