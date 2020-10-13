import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  tables: Array<Table>;
  table?: Maybe<Table>;
  player?: Maybe<Player>;
  players?: Maybe<Array<Player>>;
};


export type QueryTableArgs = {
  id: Scalars['Float'];
};


export type QueryPlayerArgs = {
  id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type Table = {
  __typename?: 'Table';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  ownerId: Scalars['Int'];
};

export type Player = {
  __typename?: 'Player';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  table: Table;
  name: Scalars['String'];
  score: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createTable?: Maybe<Table>;
  joinTable?: Maybe<Table>;
  deleteTable: Scalars['Boolean'];
  createPlayer: Player;
  deletePlayer: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationJoinTableArgs = {
  tableId: Scalars['Float'];
};


export type MutationDeleteTableArgs = {
  id: Scalars['Float'];
};


export type MutationCreatePlayerArgs = {
  name: Scalars['String'];
};


export type MutationDeletePlayerArgs = {
  id: Scalars['Float'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type CreatePlayerMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreatePlayerMutation = (
  { __typename?: 'Mutation' }
  & { createPlayer: (
    { __typename?: 'Player' }
    & Pick<Player, 'id' | 'name'>
  ) }
);

export type CreateTableMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateTableMutation = (
  { __typename?: 'Mutation' }
  & { createTable?: Maybe<(
    { __typename?: 'Table' }
    & Pick<Table, 'id'>
  )> }
);

export type DeleteTableMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteTableMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTable'>
);

export type JoinTableMutationVariables = Exact<{
  tableId: Scalars['Float'];
}>;


export type JoinTableMutation = (
  { __typename?: 'Mutation' }
  & { joinTable?: Maybe<(
    { __typename?: 'Table' }
    & Pick<Table, 'id'>
  )> }
);


export const CreatePlayerDocument = gql`
    mutation createPlayer($name: String!) {
  createPlayer(name: $name) {
    id
    name
  }
}
    `;
export type CreatePlayerMutationFn = Apollo.MutationFunction<CreatePlayerMutation, CreatePlayerMutationVariables>;

/**
 * __useCreatePlayerMutation__
 *
 * To run a mutation, you first call `useCreatePlayerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlayerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlayerMutation, { data, loading, error }] = useCreatePlayerMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreatePlayerMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlayerMutation, CreatePlayerMutationVariables>) {
        return Apollo.useMutation<CreatePlayerMutation, CreatePlayerMutationVariables>(CreatePlayerDocument, baseOptions);
      }
export type CreatePlayerMutationHookResult = ReturnType<typeof useCreatePlayerMutation>;
export type CreatePlayerMutationResult = Apollo.MutationResult<CreatePlayerMutation>;
export type CreatePlayerMutationOptions = Apollo.BaseMutationOptions<CreatePlayerMutation, CreatePlayerMutationVariables>;
export const CreateTableDocument = gql`
    mutation createTable {
  createTable {
    id
  }
}
    `;
export type CreateTableMutationFn = Apollo.MutationFunction<CreateTableMutation, CreateTableMutationVariables>;

/**
 * __useCreateTableMutation__
 *
 * To run a mutation, you first call `useCreateTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTableMutation, { data, loading, error }] = useCreateTableMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateTableMutation(baseOptions?: Apollo.MutationHookOptions<CreateTableMutation, CreateTableMutationVariables>) {
        return Apollo.useMutation<CreateTableMutation, CreateTableMutationVariables>(CreateTableDocument, baseOptions);
      }
export type CreateTableMutationHookResult = ReturnType<typeof useCreateTableMutation>;
export type CreateTableMutationResult = Apollo.MutationResult<CreateTableMutation>;
export type CreateTableMutationOptions = Apollo.BaseMutationOptions<CreateTableMutation, CreateTableMutationVariables>;
export const DeleteTableDocument = gql`
    mutation deleteTable($id: Float!) {
  deleteTable(id: $id)
}
    `;
export type DeleteTableMutationFn = Apollo.MutationFunction<DeleteTableMutation, DeleteTableMutationVariables>;

/**
 * __useDeleteTableMutation__
 *
 * To run a mutation, you first call `useDeleteTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTableMutation, { data, loading, error }] = useDeleteTableMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTableMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTableMutation, DeleteTableMutationVariables>) {
        return Apollo.useMutation<DeleteTableMutation, DeleteTableMutationVariables>(DeleteTableDocument, baseOptions);
      }
export type DeleteTableMutationHookResult = ReturnType<typeof useDeleteTableMutation>;
export type DeleteTableMutationResult = Apollo.MutationResult<DeleteTableMutation>;
export type DeleteTableMutationOptions = Apollo.BaseMutationOptions<DeleteTableMutation, DeleteTableMutationVariables>;
export const JoinTableDocument = gql`
    mutation joinTable($tableId: Float!) {
  joinTable(tableId: $tableId) {
    id
  }
}
    `;
export type JoinTableMutationFn = Apollo.MutationFunction<JoinTableMutation, JoinTableMutationVariables>;

/**
 * __useJoinTableMutation__
 *
 * To run a mutation, you first call `useJoinTableMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinTableMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinTableMutation, { data, loading, error }] = useJoinTableMutation({
 *   variables: {
 *      tableId: // value for 'tableId'
 *   },
 * });
 */
export function useJoinTableMutation(baseOptions?: Apollo.MutationHookOptions<JoinTableMutation, JoinTableMutationVariables>) {
        return Apollo.useMutation<JoinTableMutation, JoinTableMutationVariables>(JoinTableDocument, baseOptions);
      }
export type JoinTableMutationHookResult = ReturnType<typeof useJoinTableMutation>;
export type JoinTableMutationResult = Apollo.MutationResult<JoinTableMutation>;
export type JoinTableMutationOptions = Apollo.BaseMutationOptions<JoinTableMutation, JoinTableMutationVariables>;