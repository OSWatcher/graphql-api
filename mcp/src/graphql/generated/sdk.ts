import { DocumentNode } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
    T extends { [key: string]: unknown },
    K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends " $fragmentName" | "__typename"
              ? T[P]
              : never;
      };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    DateTime: { input: any; output: any };
    JSON: { input: any; output: any };
};

export type Blob = Hashable & {
    __typename?: "Blob";
    has_struct: Array<Struct>;
    has_structAggregate?: Maybe<BlobStructHas_StructAggregationSelection>;
    has_structConnection: BlobHas_StructConnection;
    has_symbol: Array<Symbol>;
    has_symbolAggregate?: Maybe<BlobSymbolHas_SymbolAggregationSelection>;
    has_symbolConnection: BlobHas_SymbolConnection;
    has_winreg?: Maybe<WinRegKey>;
    has_winregAggregate?: Maybe<BlobWinRegKeyHas_WinregAggregationSelection>;
    has_winregConnection: BlobHas_WinregConnection;
    hash: Scalars["String"]["output"];
};

export type BlobHas_StructArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    options?: InputMaybe<StructOptions>;
    where?: InputMaybe<StructWhere>;
};

export type BlobHas_StructAggregateArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    where?: InputMaybe<StructWhere>;
};

export type BlobHas_StructConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<BlobHas_StructConnectionSort>>;
    where?: InputMaybe<BlobHas_StructConnectionWhere>;
};

export type BlobHas_SymbolArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    options?: InputMaybe<SymbolOptions>;
    where?: InputMaybe<SymbolWhere>;
};

export type BlobHas_SymbolAggregateArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    where?: InputMaybe<SymbolWhere>;
};

export type BlobHas_SymbolConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<BlobHas_SymbolConnectionSort>>;
    where?: InputMaybe<BlobHas_SymbolConnectionWhere>;
};

export type BlobHas_WinregArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    options?: InputMaybe<WinRegKeyOptions>;
    where?: InputMaybe<WinRegKeyWhere>;
};

export type BlobHas_WinregAggregateArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    where?: InputMaybe<WinRegKeyWhere>;
};

export type BlobHas_WinregConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<BlobHas_WinregConnectionSort>>;
    where?: InputMaybe<BlobHas_WinregConnectionWhere>;
};

export type BlobEdge = {
    __typename?: "BlobEdge";
    cursor: Scalars["String"]["output"];
    node: Blob;
};

export type BlobHas_StructAggregateInput = {
    AND?: InputMaybe<Array<BlobHas_StructAggregateInput>>;
    NOT?: InputMaybe<BlobHas_StructAggregateInput>;
    OR?: InputMaybe<Array<BlobHas_StructAggregateInput>>;
    count?: InputMaybe<Scalars["Int"]["input"]>;
    count_GT?: InputMaybe<Scalars["Int"]["input"]>;
    count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    count_LT?: InputMaybe<Scalars["Int"]["input"]>;
    count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    edge?: InputMaybe<HasNameRelAggregationWhereInput>;
    node?: InputMaybe<BlobHas_StructNodeAggregationWhereInput>;
};

export type BlobHas_StructConnection = {
    __typename?: "BlobHas_structConnection";
    edges: Array<BlobHas_StructRelationship>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type BlobHas_StructConnectionSort = {
    edge?: InputMaybe<HasNameRelSort>;
    node?: InputMaybe<StructSort>;
};

export type BlobHas_StructConnectionWhere = {
    AND?: InputMaybe<Array<BlobHas_StructConnectionWhere>>;
    NOT?: InputMaybe<BlobHas_StructConnectionWhere>;
    OR?: InputMaybe<Array<BlobHas_StructConnectionWhere>>;
    edge?: InputMaybe<HasNameRelWhere>;
    node?: InputMaybe<StructWhere>;
};

export type BlobHas_StructNodeAggregationWhereInput = {
    AND?: InputMaybe<Array<BlobHas_StructNodeAggregationWhereInput>>;
    NOT?: InputMaybe<BlobHas_StructNodeAggregationWhereInput>;
    OR?: InputMaybe<Array<BlobHas_StructNodeAggregationWhereInput>>;
    hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    kind_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    kind_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    kind_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    kind_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    kind_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    kind_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    kind_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    kind_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    kind_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    kind_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    kind_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    kind_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    kind_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    kind_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    kind_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    size_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    size_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
    size_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    size_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
    size_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    size_MAX_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    size_MAX_GT?: InputMaybe<Scalars["Int"]["input"]>;
    size_MAX_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    size_MAX_LT?: InputMaybe<Scalars["Int"]["input"]>;
    size_MAX_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    size_MIN_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    size_MIN_GT?: InputMaybe<Scalars["Int"]["input"]>;
    size_MIN_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    size_MIN_LT?: InputMaybe<Scalars["Int"]["input"]>;
    size_MIN_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    size_SUM_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    size_SUM_GT?: InputMaybe<Scalars["Int"]["input"]>;
    size_SUM_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    size_SUM_LT?: InputMaybe<Scalars["Int"]["input"]>;
    size_SUM_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type BlobHas_StructRelationship = {
    __typename?: "BlobHas_structRelationship";
    cursor: Scalars["String"]["output"];
    node: Struct;
    properties: HasNameRel;
};

export type BlobHas_SymbolAggregateInput = {
    AND?: InputMaybe<Array<BlobHas_SymbolAggregateInput>>;
    NOT?: InputMaybe<BlobHas_SymbolAggregateInput>;
    OR?: InputMaybe<Array<BlobHas_SymbolAggregateInput>>;
    count?: InputMaybe<Scalars["Int"]["input"]>;
    count_GT?: InputMaybe<Scalars["Int"]["input"]>;
    count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    count_LT?: InputMaybe<Scalars["Int"]["input"]>;
    count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    edge?: InputMaybe<HasNameRelAggregationWhereInput>;
    node?: InputMaybe<BlobHas_SymbolNodeAggregationWhereInput>;
};

export type BlobHas_SymbolConnection = {
    __typename?: "BlobHas_symbolConnection";
    edges: Array<BlobHas_SymbolRelationship>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type BlobHas_SymbolConnectionSort = {
    edge?: InputMaybe<HasNameRelSort>;
    node?: InputMaybe<SymbolSort>;
};

export type BlobHas_SymbolConnectionWhere = {
    AND?: InputMaybe<Array<BlobHas_SymbolConnectionWhere>>;
    NOT?: InputMaybe<BlobHas_SymbolConnectionWhere>;
    OR?: InputMaybe<Array<BlobHas_SymbolConnectionWhere>>;
    edge?: InputMaybe<HasNameRelWhere>;
    node?: InputMaybe<SymbolWhere>;
};

export type BlobHas_SymbolNodeAggregationWhereInput = {
    AND?: InputMaybe<Array<BlobHas_SymbolNodeAggregationWhereInput>>;
    NOT?: InputMaybe<BlobHas_SymbolNodeAggregationWhereInput>;
    OR?: InputMaybe<Array<BlobHas_SymbolNodeAggregationWhereInput>>;
    address_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    address_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    address_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    address_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    address_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    address_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    address_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    address_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    address_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    address_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    address_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    address_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    address_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    address_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    address_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type BlobHas_SymbolRelationship = {
    __typename?: "BlobHas_symbolRelationship";
    cursor: Scalars["String"]["output"];
    node: Symbol;
    properties: HasNameRel;
};

export type BlobHas_WinregAggregateInput = {
    AND?: InputMaybe<Array<BlobHas_WinregAggregateInput>>;
    NOT?: InputMaybe<BlobHas_WinregAggregateInput>;
    OR?: InputMaybe<Array<BlobHas_WinregAggregateInput>>;
    count?: InputMaybe<Scalars["Int"]["input"]>;
    count_GT?: InputMaybe<Scalars["Int"]["input"]>;
    count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    count_LT?: InputMaybe<Scalars["Int"]["input"]>;
    count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    node?: InputMaybe<BlobHas_WinregNodeAggregationWhereInput>;
};

export type BlobHas_WinregConnection = {
    __typename?: "BlobHas_winregConnection";
    edges: Array<BlobHas_WinregRelationship>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type BlobHas_WinregConnectionSort = {
    node?: InputMaybe<WinRegKeySort>;
};

export type BlobHas_WinregConnectionWhere = {
    AND?: InputMaybe<Array<BlobHas_WinregConnectionWhere>>;
    NOT?: InputMaybe<BlobHas_WinregConnectionWhere>;
    OR?: InputMaybe<Array<BlobHas_WinregConnectionWhere>>;
    node?: InputMaybe<WinRegKeyWhere>;
};

export type BlobHas_WinregNodeAggregationWhereInput = {
    AND?: InputMaybe<Array<BlobHas_WinregNodeAggregationWhereInput>>;
    NOT?: InputMaybe<BlobHas_WinregNodeAggregationWhereInput>;
    OR?: InputMaybe<Array<BlobHas_WinregNodeAggregationWhereInput>>;
    hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type BlobHas_WinregRelationship = {
    __typename?: "BlobHas_winregRelationship";
    cursor: Scalars["String"]["output"];
    node: WinRegKey;
};

export type BlobOptions = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    /** Specify one or more BlobSort objects to sort Blobs by. The sorts will be applied in the order in which they are arranged in the array. */
    sort?: InputMaybe<Array<BlobSort>>;
};

/** Fields to sort Blobs by. The order in which sorts are applied is not guaranteed when specifying many fields in one BlobSort object. */
export type BlobSort = {
    hash?: InputMaybe<SortDirection>;
};

export type BlobStructHas_StructAggregationSelection = {
    __typename?: "BlobStructHas_structAggregationSelection";
    count: Scalars["Int"]["output"];
    edge?: Maybe<BlobStructHas_StructEdgeAggregateSelection>;
    node?: Maybe<BlobStructHas_StructNodeAggregateSelection>;
};

export type BlobStructHas_StructEdgeAggregateSelection = {
    __typename?: "BlobStructHas_structEdgeAggregateSelection";
    name: StringAggregateSelection;
};

export type BlobStructHas_StructNodeAggregateSelection = {
    __typename?: "BlobStructHas_structNodeAggregateSelection";
    hash: StringAggregateSelection;
    kind: StringAggregateSelection;
    size: IntAggregateSelection;
};

export type BlobSymbolHas_SymbolAggregationSelection = {
    __typename?: "BlobSymbolHas_symbolAggregationSelection";
    count: Scalars["Int"]["output"];
    edge?: Maybe<BlobSymbolHas_SymbolEdgeAggregateSelection>;
    node?: Maybe<BlobSymbolHas_SymbolNodeAggregateSelection>;
};

export type BlobSymbolHas_SymbolEdgeAggregateSelection = {
    __typename?: "BlobSymbolHas_symbolEdgeAggregateSelection";
    name: StringAggregateSelection;
};

export type BlobSymbolHas_SymbolNodeAggregateSelection = {
    __typename?: "BlobSymbolHas_symbolNodeAggregateSelection";
    address: StringAggregateSelection;
    hash: StringAggregateSelection;
};

export type BlobWhere = {
    AND?: InputMaybe<Array<BlobWhere>>;
    NOT?: InputMaybe<BlobWhere>;
    OR?: InputMaybe<Array<BlobWhere>>;
    has_structAggregate?: InputMaybe<BlobHas_StructAggregateInput>;
    /** Return Blobs where all of the related BlobHas_structConnections match this filter */
    has_structConnection_ALL?: InputMaybe<BlobHas_StructConnectionWhere>;
    /** Return Blobs where none of the related BlobHas_structConnections match this filter */
    has_structConnection_NONE?: InputMaybe<BlobHas_StructConnectionWhere>;
    /** Return Blobs where one of the related BlobHas_structConnections match this filter */
    has_structConnection_SINGLE?: InputMaybe<BlobHas_StructConnectionWhere>;
    /** Return Blobs where some of the related BlobHas_structConnections match this filter */
    has_structConnection_SOME?: InputMaybe<BlobHas_StructConnectionWhere>;
    /** Return Blobs where all of the related Structs match this filter */
    has_struct_ALL?: InputMaybe<StructWhere>;
    /** Return Blobs where none of the related Structs match this filter */
    has_struct_NONE?: InputMaybe<StructWhere>;
    /** Return Blobs where one of the related Structs match this filter */
    has_struct_SINGLE?: InputMaybe<StructWhere>;
    /** Return Blobs where some of the related Structs match this filter */
    has_struct_SOME?: InputMaybe<StructWhere>;
    has_symbolAggregate?: InputMaybe<BlobHas_SymbolAggregateInput>;
    /** Return Blobs where all of the related BlobHas_symbolConnections match this filter */
    has_symbolConnection_ALL?: InputMaybe<BlobHas_SymbolConnectionWhere>;
    /** Return Blobs where none of the related BlobHas_symbolConnections match this filter */
    has_symbolConnection_NONE?: InputMaybe<BlobHas_SymbolConnectionWhere>;
    /** Return Blobs where one of the related BlobHas_symbolConnections match this filter */
    has_symbolConnection_SINGLE?: InputMaybe<BlobHas_SymbolConnectionWhere>;
    /** Return Blobs where some of the related BlobHas_symbolConnections match this filter */
    has_symbolConnection_SOME?: InputMaybe<BlobHas_SymbolConnectionWhere>;
    /** Return Blobs where all of the related Symbols match this filter */
    has_symbol_ALL?: InputMaybe<SymbolWhere>;
    /** Return Blobs where none of the related Symbols match this filter */
    has_symbol_NONE?: InputMaybe<SymbolWhere>;
    /** Return Blobs where one of the related Symbols match this filter */
    has_symbol_SINGLE?: InputMaybe<SymbolWhere>;
    /** Return Blobs where some of the related Symbols match this filter */
    has_symbol_SOME?: InputMaybe<SymbolWhere>;
    has_winreg?: InputMaybe<WinRegKeyWhere>;
    has_winregAggregate?: InputMaybe<BlobHas_WinregAggregateInput>;
    has_winregConnection?: InputMaybe<BlobHas_WinregConnectionWhere>;
    has_winregConnection_NOT?: InputMaybe<BlobHas_WinregConnectionWhere>;
    has_winreg_NOT?: InputMaybe<WinRegKeyWhere>;
    hash?: InputMaybe<Scalars["String"]["input"]>;
    hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
};

export type BlobWinRegKeyHas_WinregAggregationSelection = {
    __typename?: "BlobWinRegKeyHas_winregAggregationSelection";
    count: Scalars["Int"]["output"];
    node?: Maybe<BlobWinRegKeyHas_WinregNodeAggregateSelection>;
};

export type BlobWinRegKeyHas_WinregNodeAggregateSelection = {
    __typename?: "BlobWinRegKeyHas_winregNodeAggregateSelection";
    hash: StringAggregateSelection;
};

export type BlobWithSymbols = {
    __typename?: "BlobWithSymbols";
    blob_hash: Scalars["String"]["output"];
    blob_path: Scalars["String"]["output"];
};

export type BlobsConnection = {
    __typename?: "BlobsConnection";
    edges: Array<BlobEdge>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type Branch = {
    __typename?: "Branch";
    name: Scalars["String"]["output"];
    tracks?: Maybe<Commit>;
    tracksAggregate?: Maybe<BranchCommitTracksAggregationSelection>;
    tracksConnection: BranchTracksConnection;
};

export type BranchTracksArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    options?: InputMaybe<CommitOptions>;
    where?: InputMaybe<CommitWhere>;
};

export type BranchTracksAggregateArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    where?: InputMaybe<CommitWhere>;
};

export type BranchTracksConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<BranchTracksConnectionSort>>;
    where?: InputMaybe<BranchTracksConnectionWhere>;
};

export type BranchAggregateSelection = {
    __typename?: "BranchAggregateSelection";
    count: Scalars["Int"]["output"];
    name: StringAggregateSelection;
};

export type BranchCommitTracksAggregationSelection = {
    __typename?: "BranchCommitTracksAggregationSelection";
    count: Scalars["Int"]["output"];
    node?: Maybe<BranchCommitTracksNodeAggregateSelection>;
};

export type BranchCommitTracksNodeAggregateSelection = {
    __typename?: "BranchCommitTracksNodeAggregateSelection";
    date: DateTimeAggregateSelection;
    description: StringAggregateSelection;
    hash: StringAggregateSelection;
    name: StringAggregateSelection;
};

export type BranchEdge = {
    __typename?: "BranchEdge";
    cursor: Scalars["String"]["output"];
    node: Branch;
};

export type BranchOptions = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    /** Specify one or more BranchSort objects to sort Branches by. The sorts will be applied in the order in which they are arranged in the array. */
    sort?: InputMaybe<Array<BranchSort>>;
};

/** Fields to sort Branches by. The order in which sorts are applied is not guaranteed when specifying many fields in one BranchSort object. */
export type BranchSort = {
    name?: InputMaybe<SortDirection>;
};

export type BranchTracksAggregateInput = {
    AND?: InputMaybe<Array<BranchTracksAggregateInput>>;
    NOT?: InputMaybe<BranchTracksAggregateInput>;
    OR?: InputMaybe<Array<BranchTracksAggregateInput>>;
    count?: InputMaybe<Scalars["Int"]["input"]>;
    count_GT?: InputMaybe<Scalars["Int"]["input"]>;
    count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    count_LT?: InputMaybe<Scalars["Int"]["input"]>;
    count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    node?: InputMaybe<BranchTracksNodeAggregationWhereInput>;
};

export type BranchTracksConnection = {
    __typename?: "BranchTracksConnection";
    edges: Array<BranchTracksRelationship>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type BranchTracksConnectionSort = {
    node?: InputMaybe<CommitSort>;
};

export type BranchTracksConnectionWhere = {
    AND?: InputMaybe<Array<BranchTracksConnectionWhere>>;
    NOT?: InputMaybe<BranchTracksConnectionWhere>;
    OR?: InputMaybe<Array<BranchTracksConnectionWhere>>;
    node?: InputMaybe<CommitWhere>;
};

export type BranchTracksNodeAggregationWhereInput = {
    AND?: InputMaybe<Array<BranchTracksNodeAggregationWhereInput>>;
    NOT?: InputMaybe<BranchTracksNodeAggregationWhereInput>;
    OR?: InputMaybe<Array<BranchTracksNodeAggregationWhereInput>>;
    date_MAX_EQUAL?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MAX_GT?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MAX_GTE?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MAX_LT?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MAX_LTE?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MIN_EQUAL?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MIN_GT?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MIN_GTE?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MIN_LT?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MIN_LTE?: InputMaybe<Scalars["DateTime"]["input"]>;
    description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    description_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    description_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type BranchTracksRelationship = {
    __typename?: "BranchTracksRelationship";
    cursor: Scalars["String"]["output"];
    node: Commit;
};

export type BranchWhere = {
    AND?: InputMaybe<Array<BranchWhere>>;
    NOT?: InputMaybe<BranchWhere>;
    OR?: InputMaybe<Array<BranchWhere>>;
    name?: InputMaybe<Scalars["String"]["input"]>;
    name_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    name_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    name_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    name_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    tracks?: InputMaybe<CommitWhere>;
    tracksAggregate?: InputMaybe<BranchTracksAggregateInput>;
    tracksConnection?: InputMaybe<BranchTracksConnectionWhere>;
    tracksConnection_NOT?: InputMaybe<BranchTracksConnectionWhere>;
    tracks_NOT?: InputMaybe<CommitWhere>;
};

export type BranchesConnection = {
    __typename?: "BranchesConnection";
    edges: Array<BranchEdge>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type Commit = Hashable & {
    __typename?: "Commit";
    date: Scalars["DateTime"]["output"];
    description?: Maybe<Scalars["String"]["output"]>;
    filesystem?: Maybe<Tree>;
    filesystemAggregate?: Maybe<CommitTreeFilesystemAggregationSelection>;
    filesystemConnection: CommitFilesystemConnection;
    hash: Scalars["String"]["output"];
    name: Scalars["String"]["output"];
    next: Array<Commit>;
    nextAggregate?: Maybe<CommitCommitNextAggregationSelection>;
    nextConnection: CommitNextConnection;
    previous?: Maybe<Commit>;
    previousAggregate?: Maybe<CommitCommitPreviousAggregationSelection>;
    previousConnection: CommitPreviousConnection;
};

export type CommitFilesystemArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    options?: InputMaybe<TreeOptions>;
    where?: InputMaybe<TreeWhere>;
};

export type CommitFilesystemAggregateArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    where?: InputMaybe<TreeWhere>;
};

export type CommitFilesystemConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<CommitFilesystemConnectionSort>>;
    where?: InputMaybe<CommitFilesystemConnectionWhere>;
};

export type CommitNextArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    options?: InputMaybe<CommitOptions>;
    where?: InputMaybe<CommitWhere>;
};

export type CommitNextAggregateArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    where?: InputMaybe<CommitWhere>;
};

export type CommitNextConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<CommitNextConnectionSort>>;
    where?: InputMaybe<CommitNextConnectionWhere>;
};

export type CommitPreviousArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    options?: InputMaybe<CommitOptions>;
    where?: InputMaybe<CommitWhere>;
};

export type CommitPreviousAggregateArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    where?: InputMaybe<CommitWhere>;
};

export type CommitPreviousConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<CommitPreviousConnectionSort>>;
    where?: InputMaybe<CommitPreviousConnectionWhere>;
};

export type CommitAggregateSelection = {
    __typename?: "CommitAggregateSelection";
    count: Scalars["Int"]["output"];
    date: DateTimeAggregateSelection;
    description: StringAggregateSelection;
    hash: StringAggregateSelection;
    name: StringAggregateSelection;
};

export type CommitCommitNextAggregationSelection = {
    __typename?: "CommitCommitNextAggregationSelection";
    count: Scalars["Int"]["output"];
    node?: Maybe<CommitCommitNextNodeAggregateSelection>;
};

export type CommitCommitNextNodeAggregateSelection = {
    __typename?: "CommitCommitNextNodeAggregateSelection";
    date: DateTimeAggregateSelection;
    description: StringAggregateSelection;
    hash: StringAggregateSelection;
    name: StringAggregateSelection;
};

export type CommitCommitPreviousAggregationSelection = {
    __typename?: "CommitCommitPreviousAggregationSelection";
    count: Scalars["Int"]["output"];
    node?: Maybe<CommitCommitPreviousNodeAggregateSelection>;
};

export type CommitCommitPreviousNodeAggregateSelection = {
    __typename?: "CommitCommitPreviousNodeAggregateSelection";
    date: DateTimeAggregateSelection;
    description: StringAggregateSelection;
    hash: StringAggregateSelection;
    name: StringAggregateSelection;
};

export type CommitEdge = {
    __typename?: "CommitEdge";
    cursor: Scalars["String"]["output"];
    node: Commit;
};

export type CommitFilesystemAggregateInput = {
    AND?: InputMaybe<Array<CommitFilesystemAggregateInput>>;
    NOT?: InputMaybe<CommitFilesystemAggregateInput>;
    OR?: InputMaybe<Array<CommitFilesystemAggregateInput>>;
    count?: InputMaybe<Scalars["Int"]["input"]>;
    count_GT?: InputMaybe<Scalars["Int"]["input"]>;
    count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    count_LT?: InputMaybe<Scalars["Int"]["input"]>;
    count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    node?: InputMaybe<CommitFilesystemNodeAggregationWhereInput>;
};

export type CommitFilesystemConnection = {
    __typename?: "CommitFilesystemConnection";
    edges: Array<CommitFilesystemRelationship>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type CommitFilesystemConnectionSort = {
    node?: InputMaybe<TreeSort>;
};

export type CommitFilesystemConnectionWhere = {
    AND?: InputMaybe<Array<CommitFilesystemConnectionWhere>>;
    NOT?: InputMaybe<CommitFilesystemConnectionWhere>;
    OR?: InputMaybe<Array<CommitFilesystemConnectionWhere>>;
    node?: InputMaybe<TreeWhere>;
};

export type CommitFilesystemNodeAggregationWhereInput = {
    AND?: InputMaybe<Array<CommitFilesystemNodeAggregationWhereInput>>;
    NOT?: InputMaybe<CommitFilesystemNodeAggregationWhereInput>;
    OR?: InputMaybe<Array<CommitFilesystemNodeAggregationWhereInput>>;
    hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CommitFilesystemRelationship = {
    __typename?: "CommitFilesystemRelationship";
    cursor: Scalars["String"]["output"];
    node: Tree;
};

export enum CommitHistoryDirection {
    Backward = "BACKWARD",
    Forward = "FORWARD",
}

export type CommitNextAggregateInput = {
    AND?: InputMaybe<Array<CommitNextAggregateInput>>;
    NOT?: InputMaybe<CommitNextAggregateInput>;
    OR?: InputMaybe<Array<CommitNextAggregateInput>>;
    count?: InputMaybe<Scalars["Int"]["input"]>;
    count_GT?: InputMaybe<Scalars["Int"]["input"]>;
    count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    count_LT?: InputMaybe<Scalars["Int"]["input"]>;
    count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    node?: InputMaybe<CommitNextNodeAggregationWhereInput>;
};

export type CommitNextConnection = {
    __typename?: "CommitNextConnection";
    edges: Array<CommitNextRelationship>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type CommitNextConnectionSort = {
    node?: InputMaybe<CommitSort>;
};

export type CommitNextConnectionWhere = {
    AND?: InputMaybe<Array<CommitNextConnectionWhere>>;
    NOT?: InputMaybe<CommitNextConnectionWhere>;
    OR?: InputMaybe<Array<CommitNextConnectionWhere>>;
    node?: InputMaybe<CommitWhere>;
};

export type CommitNextNodeAggregationWhereInput = {
    AND?: InputMaybe<Array<CommitNextNodeAggregationWhereInput>>;
    NOT?: InputMaybe<CommitNextNodeAggregationWhereInput>;
    OR?: InputMaybe<Array<CommitNextNodeAggregationWhereInput>>;
    date_MAX_EQUAL?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MAX_GT?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MAX_GTE?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MAX_LT?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MAX_LTE?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MIN_EQUAL?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MIN_GT?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MIN_GTE?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MIN_LT?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MIN_LTE?: InputMaybe<Scalars["DateTime"]["input"]>;
    description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    description_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    description_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CommitNextRelationship = {
    __typename?: "CommitNextRelationship";
    cursor: Scalars["String"]["output"];
    node: Commit;
};

export type CommitOptions = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    /** Specify one or more CommitSort objects to sort Commits by. The sorts will be applied in the order in which they are arranged in the array. */
    sort?: InputMaybe<Array<CommitSort>>;
};

export type CommitPreviousAggregateInput = {
    AND?: InputMaybe<Array<CommitPreviousAggregateInput>>;
    NOT?: InputMaybe<CommitPreviousAggregateInput>;
    OR?: InputMaybe<Array<CommitPreviousAggregateInput>>;
    count?: InputMaybe<Scalars["Int"]["input"]>;
    count_GT?: InputMaybe<Scalars["Int"]["input"]>;
    count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    count_LT?: InputMaybe<Scalars["Int"]["input"]>;
    count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    node?: InputMaybe<CommitPreviousNodeAggregationWhereInput>;
};

export type CommitPreviousConnection = {
    __typename?: "CommitPreviousConnection";
    edges: Array<CommitPreviousRelationship>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type CommitPreviousConnectionSort = {
    node?: InputMaybe<CommitSort>;
};

export type CommitPreviousConnectionWhere = {
    AND?: InputMaybe<Array<CommitPreviousConnectionWhere>>;
    NOT?: InputMaybe<CommitPreviousConnectionWhere>;
    OR?: InputMaybe<Array<CommitPreviousConnectionWhere>>;
    node?: InputMaybe<CommitWhere>;
};

export type CommitPreviousNodeAggregationWhereInput = {
    AND?: InputMaybe<Array<CommitPreviousNodeAggregationWhereInput>>;
    NOT?: InputMaybe<CommitPreviousNodeAggregationWhereInput>;
    OR?: InputMaybe<Array<CommitPreviousNodeAggregationWhereInput>>;
    date_MAX_EQUAL?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MAX_GT?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MAX_GTE?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MAX_LT?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MAX_LTE?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MIN_EQUAL?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MIN_GT?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MIN_GTE?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MIN_LT?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_MIN_LTE?: InputMaybe<Scalars["DateTime"]["input"]>;
    description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    description_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    description_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CommitPreviousRelationship = {
    __typename?: "CommitPreviousRelationship";
    cursor: Scalars["String"]["output"];
    node: Commit;
};

export type CommitRange = {
    branch?: InputMaybe<Scalars["String"]["input"]>;
    direction?: InputMaybe<CommitHistoryDirection>;
    endRef?: InputMaybe<Scalars["String"]["input"]>;
    include_updates?: InputMaybe<Scalars["Boolean"]["input"]>;
    startRef: Scalars["String"]["input"];
};

/** Fields to sort Commits by. The order in which sorts are applied is not guaranteed when specifying many fields in one CommitSort object. */
export type CommitSort = {
    date?: InputMaybe<SortDirection>;
    description?: InputMaybe<SortDirection>;
    hash?: InputMaybe<SortDirection>;
    name?: InputMaybe<SortDirection>;
};

export type CommitTreeFilesystemAggregationSelection = {
    __typename?: "CommitTreeFilesystemAggregationSelection";
    count: Scalars["Int"]["output"];
    node?: Maybe<CommitTreeFilesystemNodeAggregateSelection>;
};

export type CommitTreeFilesystemNodeAggregateSelection = {
    __typename?: "CommitTreeFilesystemNodeAggregateSelection";
    hash: StringAggregateSelection;
};

export type CommitWhere = {
    AND?: InputMaybe<Array<CommitWhere>>;
    NOT?: InputMaybe<CommitWhere>;
    OR?: InputMaybe<Array<CommitWhere>>;
    date?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_GT?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_GTE?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_IN?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
    date_LT?: InputMaybe<Scalars["DateTime"]["input"]>;
    date_LTE?: InputMaybe<Scalars["DateTime"]["input"]>;
    description?: InputMaybe<Scalars["String"]["input"]>;
    description_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    description_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    description_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    description_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    filesystem?: InputMaybe<TreeWhere>;
    filesystemAggregate?: InputMaybe<CommitFilesystemAggregateInput>;
    filesystemConnection?: InputMaybe<CommitFilesystemConnectionWhere>;
    filesystemConnection_NOT?: InputMaybe<CommitFilesystemConnectionWhere>;
    filesystem_NOT?: InputMaybe<TreeWhere>;
    hash?: InputMaybe<Scalars["String"]["input"]>;
    hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    name?: InputMaybe<Scalars["String"]["input"]>;
    name_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    name_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    name_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    name_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    nextAggregate?: InputMaybe<CommitNextAggregateInput>;
    /** Return Commits where all of the related CommitNextConnections match this filter */
    nextConnection_ALL?: InputMaybe<CommitNextConnectionWhere>;
    /** Return Commits where none of the related CommitNextConnections match this filter */
    nextConnection_NONE?: InputMaybe<CommitNextConnectionWhere>;
    /** Return Commits where one of the related CommitNextConnections match this filter */
    nextConnection_SINGLE?: InputMaybe<CommitNextConnectionWhere>;
    /** Return Commits where some of the related CommitNextConnections match this filter */
    nextConnection_SOME?: InputMaybe<CommitNextConnectionWhere>;
    /** Return Commits where all of the related Commits match this filter */
    next_ALL?: InputMaybe<CommitWhere>;
    /** Return Commits where none of the related Commits match this filter */
    next_NONE?: InputMaybe<CommitWhere>;
    /** Return Commits where one of the related Commits match this filter */
    next_SINGLE?: InputMaybe<CommitWhere>;
    /** Return Commits where some of the related Commits match this filter */
    next_SOME?: InputMaybe<CommitWhere>;
    previous?: InputMaybe<CommitWhere>;
    previousAggregate?: InputMaybe<CommitPreviousAggregateInput>;
    previousConnection?: InputMaybe<CommitPreviousConnectionWhere>;
    previousConnection_NOT?: InputMaybe<CommitPreviousConnectionWhere>;
    previous_NOT?: InputMaybe<CommitWhere>;
};

export type CommitsConnection = {
    __typename?: "CommitsConnection";
    edges: Array<CommitEdge>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type DataType = Hashable & {
    __typename?: "DataType";
    array_counter?: Maybe<Scalars["Int"]["output"]>;
    bit_length?: Maybe<Scalars["Int"]["output"]>;
    bit_position?: Maybe<Scalars["Int"]["output"]>;
    has_data_type?: Maybe<DataType>;
    has_data_typeAggregate?: Maybe<DataTypeDataTypeHas_Data_TypeAggregationSelection>;
    has_data_typeConnection: DataTypeHas_Data_TypeConnection;
    hash: Scalars["String"]["output"];
    name?: Maybe<Scalars["String"]["output"]>;
    type: Scalars["String"]["output"];
};

export type DataTypeHas_Data_TypeArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    options?: InputMaybe<DataTypeOptions>;
    where?: InputMaybe<DataTypeWhere>;
};

export type DataTypeHas_Data_TypeAggregateArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    where?: InputMaybe<DataTypeWhere>;
};

export type DataTypeHas_Data_TypeConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<DataTypeHas_Data_TypeConnectionSort>>;
    where?: InputMaybe<DataTypeHas_Data_TypeConnectionWhere>;
};

export type DataTypeAggregateSelection = {
    __typename?: "DataTypeAggregateSelection";
    array_counter: IntAggregateSelection;
    bit_length: IntAggregateSelection;
    bit_position: IntAggregateSelection;
    count: Scalars["Int"]["output"];
    hash: StringAggregateSelection;
    name: StringAggregateSelection;
    type: StringAggregateSelection;
};

export type DataTypeDataTypeHas_Data_TypeAggregationSelection = {
    __typename?: "DataTypeDataTypeHas_data_typeAggregationSelection";
    count: Scalars["Int"]["output"];
    node?: Maybe<DataTypeDataTypeHas_Data_TypeNodeAggregateSelection>;
};

export type DataTypeDataTypeHas_Data_TypeNodeAggregateSelection = {
    __typename?: "DataTypeDataTypeHas_data_typeNodeAggregateSelection";
    array_counter: IntAggregateSelection;
    bit_length: IntAggregateSelection;
    bit_position: IntAggregateSelection;
    hash: StringAggregateSelection;
    name: StringAggregateSelection;
    type: StringAggregateSelection;
};

export type DataTypeEdge = {
    __typename?: "DataTypeEdge";
    cursor: Scalars["String"]["output"];
    node: DataType;
};

export type DataTypeHas_Data_TypeAggregateInput = {
    AND?: InputMaybe<Array<DataTypeHas_Data_TypeAggregateInput>>;
    NOT?: InputMaybe<DataTypeHas_Data_TypeAggregateInput>;
    OR?: InputMaybe<Array<DataTypeHas_Data_TypeAggregateInput>>;
    count?: InputMaybe<Scalars["Int"]["input"]>;
    count_GT?: InputMaybe<Scalars["Int"]["input"]>;
    count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    count_LT?: InputMaybe<Scalars["Int"]["input"]>;
    count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    node?: InputMaybe<DataTypeHas_Data_TypeNodeAggregationWhereInput>;
};

export type DataTypeHas_Data_TypeConnection = {
    __typename?: "DataTypeHas_data_typeConnection";
    edges: Array<DataTypeHas_Data_TypeRelationship>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type DataTypeHas_Data_TypeConnectionSort = {
    node?: InputMaybe<DataTypeSort>;
};

export type DataTypeHas_Data_TypeConnectionWhere = {
    AND?: InputMaybe<Array<DataTypeHas_Data_TypeConnectionWhere>>;
    NOT?: InputMaybe<DataTypeHas_Data_TypeConnectionWhere>;
    OR?: InputMaybe<Array<DataTypeHas_Data_TypeConnectionWhere>>;
    node?: InputMaybe<DataTypeWhere>;
};

export type DataTypeHas_Data_TypeNodeAggregationWhereInput = {
    AND?: InputMaybe<Array<DataTypeHas_Data_TypeNodeAggregationWhereInput>>;
    NOT?: InputMaybe<DataTypeHas_Data_TypeNodeAggregationWhereInput>;
    OR?: InputMaybe<Array<DataTypeHas_Data_TypeNodeAggregationWhereInput>>;
    array_counter_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    array_counter_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
    array_counter_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    array_counter_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
    array_counter_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    array_counter_MAX_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_MAX_GT?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_MAX_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_MAX_LT?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_MAX_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_MIN_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_MIN_GT?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_MIN_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_MIN_LT?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_MIN_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_SUM_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_SUM_GT?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_SUM_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_SUM_LT?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_SUM_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    bit_length_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
    bit_length_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    bit_length_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
    bit_length_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    bit_length_MAX_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_MAX_GT?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_MAX_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_MAX_LT?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_MAX_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_MIN_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_MIN_GT?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_MIN_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_MIN_LT?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_MIN_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_SUM_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_SUM_GT?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_SUM_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_SUM_LT?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_SUM_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    bit_position_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
    bit_position_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    bit_position_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
    bit_position_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    bit_position_MAX_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_MAX_GT?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_MAX_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_MAX_LT?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_MAX_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_MIN_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_MIN_GT?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_MIN_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_MIN_LT?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_MIN_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_SUM_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_SUM_GT?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_SUM_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_SUM_LT?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_SUM_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    type_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    type_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    type_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    type_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    type_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    type_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    type_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    type_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    type_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    type_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    type_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    type_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    type_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    type_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    type_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type DataTypeHas_Data_TypeRelationship = {
    __typename?: "DataTypeHas_data_typeRelationship";
    cursor: Scalars["String"]["output"];
    node: DataType;
};

export type DataTypeOptions = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    /** Specify one or more DataTypeSort objects to sort DataTypes by. The sorts will be applied in the order in which they are arranged in the array. */
    sort?: InputMaybe<Array<DataTypeSort>>;
};

/** Fields to sort DataTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one DataTypeSort object. */
export type DataTypeSort = {
    array_counter?: InputMaybe<SortDirection>;
    bit_length?: InputMaybe<SortDirection>;
    bit_position?: InputMaybe<SortDirection>;
    hash?: InputMaybe<SortDirection>;
    name?: InputMaybe<SortDirection>;
    type?: InputMaybe<SortDirection>;
};

export type DataTypeWhere = {
    AND?: InputMaybe<Array<DataTypeWhere>>;
    NOT?: InputMaybe<DataTypeWhere>;
    OR?: InputMaybe<Array<DataTypeWhere>>;
    array_counter?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_GT?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_IN?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
    array_counter_LT?: InputMaybe<Scalars["Int"]["input"]>;
    array_counter_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_GT?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_IN?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
    bit_length_LT?: InputMaybe<Scalars["Int"]["input"]>;
    bit_length_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_GT?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_IN?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
    bit_position_LT?: InputMaybe<Scalars["Int"]["input"]>;
    bit_position_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    has_data_type?: InputMaybe<DataTypeWhere>;
    has_data_typeAggregate?: InputMaybe<DataTypeHas_Data_TypeAggregateInput>;
    has_data_typeConnection?: InputMaybe<DataTypeHas_Data_TypeConnectionWhere>;
    has_data_typeConnection_NOT?: InputMaybe<DataTypeHas_Data_TypeConnectionWhere>;
    has_data_type_NOT?: InputMaybe<DataTypeWhere>;
    hash?: InputMaybe<Scalars["String"]["input"]>;
    hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    name?: InputMaybe<Scalars["String"]["input"]>;
    name_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    name_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    name_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
    name_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    type?: InputMaybe<Scalars["String"]["input"]>;
    type_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    type_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    type_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    type_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
};

export type DataTypesConnection = {
    __typename?: "DataTypesConnection";
    edges: Array<DataTypeEdge>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type DateTimeAggregateSelection = {
    __typename?: "DateTimeAggregateSelection";
    max?: Maybe<Scalars["DateTime"]["output"]>;
    min?: Maybe<Scalars["DateTime"]["output"]>;
};

export type DiffItem = {
    __typename?: "DiffItem";
    new_props?: Maybe<HashableNodeProps>;
    old_props?: Maybe<HashableNodeProps>;
    path: Scalars["String"]["output"];
    status: DiffStatus;
    type: NodeType;
};

export type DiffNodesAtResult = {
    __typename?: "DiffNodesAtResult";
    items: Array<DiffItem>;
    total_count: Scalars["Int"]["output"];
};

export type DiffNodesOptions = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    status_filter?: InputMaybe<Array<DiffStatus>>;
};

export enum DiffStatus {
    Del = "DEL",
    Mod = "MOD",
    New = "NEW",
    Unchanged = "UNCHANGED",
}

export enum EntityType {
    Filesystem = "FILESYSTEM",
    Registry = "REGISTRY",
    Struct = "STRUCT",
    Symbol = "SYMBOL",
}

export type GitLogEntry = {
    __typename?: "GitLogEntry";
    base_commit?: Maybe<Commit>;
    diff: DiffItem;
    diffee_commit: Commit;
};

export type GitLogOptions = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    order?: InputMaybe<GitLogOrder>;
    status_filter?: InputMaybe<Array<DiffStatus>>;
};

export enum GitLogOrder {
    Asc = "ASC",
    Desc = "DESC",
}

export type GitLogResult = {
    __typename?: "GitLogResult";
    entries: Array<GitLogEntry>;
    has_more: Scalars["Boolean"]["output"];
    total_count: Scalars["Int"]["output"];
};

/**
 * The edge properties for the following fields:
 * * Tree.child_blobs
 * * Tree.child_trees
 * * WinRegKey.child_values
 * * WinRegKey.child_keys
 */
export type HasFilenameRel = {
    __typename?: "HasFilenameRel";
    name: Scalars["String"]["output"];
};

export type HasFilenameRelAggregationWhereInput = {
    AND?: InputMaybe<Array<HasFilenameRelAggregationWhereInput>>;
    NOT?: InputMaybe<HasFilenameRelAggregationWhereInput>;
    OR?: InputMaybe<Array<HasFilenameRelAggregationWhereInput>>;
    name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type HasFilenameRelSort = {
    name?: InputMaybe<SortDirection>;
};

export type HasFilenameRelWhere = {
    AND?: InputMaybe<Array<HasFilenameRelWhere>>;
    NOT?: InputMaybe<HasFilenameRelWhere>;
    OR?: InputMaybe<Array<HasFilenameRelWhere>>;
    name?: InputMaybe<Scalars["String"]["input"]>;
    name_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    name_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    name_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    name_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
};

/**
 * The edge properties for the following fields:
 * * Blob.has_symbol
 * * Blob.has_struct
 * * Symbol.blob
 * * Struct.fields
 * * Struct.blob
 * * StructField.struct
 */
export type HasNameRel = {
    __typename?: "HasNameRel";
    name: Scalars["String"]["output"];
};

export type HasNameRelAggregationWhereInput = {
    AND?: InputMaybe<Array<HasNameRelAggregationWhereInput>>;
    NOT?: InputMaybe<HasNameRelAggregationWhereInput>;
    OR?: InputMaybe<Array<HasNameRelAggregationWhereInput>>;
    name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type HasNameRelSort = {
    name?: InputMaybe<SortDirection>;
};

export type HasNameRelWhere = {
    AND?: InputMaybe<Array<HasNameRelWhere>>;
    NOT?: InputMaybe<HasNameRelWhere>;
    OR?: InputMaybe<Array<HasNameRelWhere>>;
    name?: InputMaybe<Scalars["String"]["input"]>;
    name_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    name_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    name_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    name_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
};

export type Hashable = {
    hash: Scalars["String"]["output"];
};

export type HashableAggregateSelection = {
    __typename?: "HashableAggregateSelection";
    count: Scalars["Int"]["output"];
    hash: StringAggregateSelection;
};

export type HashableEdge = {
    __typename?: "HashableEdge";
    cursor: Scalars["String"]["output"];
    node: Hashable;
};

export enum HashableImplementation {
    Blob = "Blob",
    Commit = "Commit",
    DataType = "DataType",
    Struct = "Struct",
    StructField = "StructField",
    Symbol = "Symbol",
    Tree = "Tree",
    WinRegKey = "WinRegKey",
    WinRegValue = "WinRegValue",
}

export type HashableNodeProps = {
    __typename?: "HashableNodeProps";
    hash: Scalars["String"]["output"];
    properties: Scalars["JSON"]["output"];
};

export type HashableOptions = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    /** Specify one or more HashableSort objects to sort Hashables by. The sorts will be applied in the order in which they are arranged in the array. */
    sort?: InputMaybe<Array<InputMaybe<HashableSort>>>;
};

/** Fields to sort Hashables by. The order in which sorts are applied is not guaranteed when specifying many fields in one HashableSort object. */
export type HashableSort = {
    hash?: InputMaybe<SortDirection>;
};

export type HashableWhere = {
    AND?: InputMaybe<Array<HashableWhere>>;
    NOT?: InputMaybe<HashableWhere>;
    OR?: InputMaybe<Array<HashableWhere>>;
    hash?: InputMaybe<Scalars["String"]["input"]>;
    hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    typename_IN?: InputMaybe<Array<HashableImplementation>>;
};

export type HashablesConnection = {
    __typename?: "HashablesConnection";
    edges: Array<HashableEdge>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type IntAggregateSelection = {
    __typename?: "IntAggregateSelection";
    average?: Maybe<Scalars["Float"]["output"]>;
    max?: Maybe<Scalars["Int"]["output"]>;
    min?: Maybe<Scalars["Int"]["output"]>;
    sum?: Maybe<Scalars["Int"]["output"]>;
};

export type Mutation = {
    __typename?: "Mutation";
    searchClose: Scalars["Boolean"]["output"];
};

export type MutationSearchCloseArgs = {
    session_id: Scalars["String"]["input"];
};

export enum NodeType {
    Blob = "Blob",
    DataType = "DataType",
    Struct = "Struct",
    StructField = "StructField",
    Symbol = "Symbol",
    Tree = "Tree",
    WinRegKey = "WinRegKey",
    WinRegValue = "WinRegValue",
}

/** Pagination information (Relay) */
export type PageInfo = {
    __typename?: "PageInfo";
    endCursor?: Maybe<Scalars["String"]["output"]>;
    hasNextPage: Scalars["Boolean"]["output"];
    hasPreviousPage: Scalars["Boolean"]["output"];
    startCursor?: Maybe<Scalars["String"]["output"]>;
};

export type PaginatedSearchResult = {
    __typename?: "PaginatedSearchResult";
    has_more: Scalars["Boolean"]["output"];
    results: Array<SearchResult>;
    session_id?: Maybe<Scalars["String"]["output"]>;
    total_fetched: Scalars["Int"]["output"];
};

export type Query = {
    __typename?: "Query";
    blobs: Array<Blob>;
    blobsConnection: BlobsConnection;
    branches: Array<Branch>;
    branchesAggregate: BranchAggregateSelection;
    branchesConnection: BranchesConnection;
    commits: Array<Commit>;
    commitsAggregate: CommitAggregateSelection;
    commitsConnection: CommitsConnection;
    dataTypes: Array<DataType>;
    dataTypesAggregate: DataTypeAggregateSelection;
    dataTypesConnection: DataTypesConnection;
    diffNodesAt: DiffNodesAtResult;
    fetchCommitHistory: Array<Commit>;
    getBlobsWithSymbols: Array<BlobWithSymbols>;
    getCommitExtractedDataLabels: Array<Scalars["String"]["output"]>;
    gitLog: GitLogResult;
    hashables: Array<Hashable>;
    hashablesAggregate: HashableAggregateSelection;
    hashablesConnection: HashablesConnection;
    search: Array<SearchResult>;
    searchNext: PaginatedSearchResult;
    searchWithSession: PaginatedSearchResult;
    structFields: Array<StructField>;
    structFieldsAggregate: StructFieldAggregateSelection;
    structFieldsConnection: StructFieldsConnection;
    structs: Array<Struct>;
    structsAggregate: StructAggregateSelection;
    structsConnection: StructsConnection;
    symbols: Array<Symbol>;
    symbolsAggregate: SymbolAggregateSelection;
    symbolsConnection: SymbolsConnection;
    traversePath?: Maybe<Scalars["String"]["output"]>;
    trees: Array<Tree>;
    treesAggregate: TreeAggregateSelection;
    treesConnection: TreesConnection;
    winRegKeys: Array<WinRegKey>;
    winRegKeysAggregate: WinRegKeyAggregateSelection;
    winRegKeysConnection: WinRegKeysConnection;
    winRegValues: Array<WinRegValue>;
    winRegValuesAggregate: WinRegValueAggregateSelection;
    winRegValuesConnection: WinRegValuesConnection;
};

export type QueryBlobsArgs = {
    options?: InputMaybe<BlobOptions>;
    where?: InputMaybe<BlobWhere>;
};

export type QueryBlobsConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<InputMaybe<BlobSort>>>;
    where?: InputMaybe<BlobWhere>;
};

export type QueryBranchesArgs = {
    options?: InputMaybe<BranchOptions>;
    where?: InputMaybe<BranchWhere>;
};

export type QueryBranchesAggregateArgs = {
    where?: InputMaybe<BranchWhere>;
};

export type QueryBranchesConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<InputMaybe<BranchSort>>>;
    where?: InputMaybe<BranchWhere>;
};

export type QueryCommitsArgs = {
    options?: InputMaybe<CommitOptions>;
    where?: InputMaybe<CommitWhere>;
};

export type QueryCommitsAggregateArgs = {
    where?: InputMaybe<CommitWhere>;
};

export type QueryCommitsConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<InputMaybe<CommitSort>>>;
    where?: InputMaybe<CommitWhere>;
};

export type QueryDataTypesArgs = {
    options?: InputMaybe<DataTypeOptions>;
    where?: InputMaybe<DataTypeWhere>;
};

export type QueryDataTypesAggregateArgs = {
    where?: InputMaybe<DataTypeWhere>;
};

export type QueryDataTypesConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<InputMaybe<DataTypeSort>>>;
    where?: InputMaybe<DataTypeWhere>;
};

export type QueryDiffNodesAtArgs = {
    at_path: Scalars["String"]["input"];
    base_node_hash: Scalars["String"]["input"];
    diffee_node_hash: Scalars["String"]["input"];
    filter?: InputMaybe<Array<Scalars["String"]["input"]>>;
    max_depth?: InputMaybe<Scalars["Int"]["input"]>;
    options?: InputMaybe<DiffNodesOptions>;
    parent_label: Scalars["String"]["input"];
    with_intermediates?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryFetchCommitHistoryArgs = {
    commit_hash: Scalars["String"]["input"];
    direction?: InputMaybe<CommitHistoryDirection>;
};

export type QueryGetBlobsWithSymbolsArgs = {
    commit_hash: Scalars["String"]["input"];
};

export type QueryGetCommitExtractedDataLabelsArgs = {
    commit_hash: Scalars["String"]["input"];
};

export type QueryGitLogArgs = {
    commit_range: CommitRange;
    context: EntityType;
    options?: InputMaybe<GitLogOptions>;
    path: Scalars["String"]["input"];
};

export type QueryHashablesArgs = {
    options?: InputMaybe<HashableOptions>;
    where?: InputMaybe<HashableWhere>;
};

export type QueryHashablesAggregateArgs = {
    where?: InputMaybe<HashableWhere>;
};

export type QueryHashablesConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<InputMaybe<HashableSort>>>;
    where?: InputMaybe<HashableWhere>;
};

export type QuerySearchArgs = {
    input: SearchInput;
};

export type QuerySearchNextArgs = {
    session_id: Scalars["String"]["input"];
};

export type QuerySearchWithSessionArgs = {
    input: SearchInput;
    page_size?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryStructFieldsArgs = {
    options?: InputMaybe<StructFieldOptions>;
    where?: InputMaybe<StructFieldWhere>;
};

export type QueryStructFieldsAggregateArgs = {
    where?: InputMaybe<StructFieldWhere>;
};

export type QueryStructFieldsConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<InputMaybe<StructFieldSort>>>;
    where?: InputMaybe<StructFieldWhere>;
};

export type QueryStructsArgs = {
    options?: InputMaybe<StructOptions>;
    where?: InputMaybe<StructWhere>;
};

export type QueryStructsAggregateArgs = {
    where?: InputMaybe<StructWhere>;
};

export type QueryStructsConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<InputMaybe<StructSort>>>;
    where?: InputMaybe<StructWhere>;
};

export type QuerySymbolsArgs = {
    options?: InputMaybe<SymbolOptions>;
    where?: InputMaybe<SymbolWhere>;
};

export type QuerySymbolsAggregateArgs = {
    where?: InputMaybe<SymbolWhere>;
};

export type QuerySymbolsConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<InputMaybe<SymbolSort>>>;
    where?: InputMaybe<SymbolWhere>;
};

export type QueryTraversePathArgs = {
    parent_label: Scalars["String"]["input"];
    path: Scalars["String"]["input"];
    tree_hash: Scalars["String"]["input"];
};

export type QueryTreesArgs = {
    options?: InputMaybe<TreeOptions>;
    where?: InputMaybe<TreeWhere>;
};

export type QueryTreesAggregateArgs = {
    where?: InputMaybe<TreeWhere>;
};

export type QueryTreesConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<InputMaybe<TreeSort>>>;
    where?: InputMaybe<TreeWhere>;
};

export type QueryWinRegKeysArgs = {
    options?: InputMaybe<WinRegKeyOptions>;
    where?: InputMaybe<WinRegKeyWhere>;
};

export type QueryWinRegKeysAggregateArgs = {
    where?: InputMaybe<WinRegKeyWhere>;
};

export type QueryWinRegKeysConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<InputMaybe<WinRegKeySort>>>;
    where?: InputMaybe<WinRegKeyWhere>;
};

export type QueryWinRegValuesArgs = {
    options?: InputMaybe<WinRegValueOptions>;
    where?: InputMaybe<WinRegValueWhere>;
};

export type QueryWinRegValuesAggregateArgs = {
    where?: InputMaybe<WinRegValueWhere>;
};

export type QueryWinRegValuesConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<InputMaybe<WinRegValueSort>>>;
    where?: InputMaybe<WinRegValueWhere>;
};

export type SearchInput = {
    case_sensitive?: InputMaybe<Scalars["Boolean"]["input"]>;
    commit_range: CommitRange;
    entity_types?: InputMaybe<Array<EntityType>>;
    search_term: Scalars["String"]["input"];
};

export type SearchResult = {
    __typename?: "SearchResult";
    blob_hash: Scalars["String"]["output"];
    blob_path: Scalars["String"]["output"];
    commit_hash: Scalars["String"]["output"];
    commit_name: Scalars["String"]["output"];
    entity_path?: Maybe<Scalars["String"]["output"]>;
    node_hash: Scalars["String"]["output"];
    type: EntityType;
};

/** An enum for sorting in either ascending or descending order. */
export enum SortDirection {
    /** Sort by field values in ascending order. */
    Asc = "ASC",
    /** Sort by field values in descending order. */
    Desc = "DESC",
}

export type StringAggregateSelection = {
    __typename?: "StringAggregateSelection";
    longest?: Maybe<Scalars["String"]["output"]>;
    shortest?: Maybe<Scalars["String"]["output"]>;
};

export type Struct = Hashable & {
    __typename?: "Struct";
    blob: Blob;
    blobAggregate?: Maybe<StructBlobBlobAggregationSelection>;
    blobConnection: StructBlobConnection;
    fields: Array<StructField>;
    fieldsAggregate?: Maybe<StructStructFieldFieldsAggregationSelection>;
    fieldsConnection: StructFieldsConnection;
    hash: Scalars["String"]["output"];
    kind: Scalars["String"]["output"];
    size: Scalars["Int"]["output"];
};

export type StructBlobArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    options?: InputMaybe<BlobOptions>;
    where?: InputMaybe<BlobWhere>;
};

export type StructBlobAggregateArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    where?: InputMaybe<BlobWhere>;
};

export type StructBlobConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<StructBlobConnectionSort>>;
    where?: InputMaybe<StructBlobConnectionWhere>;
};

export type StructFieldsArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    options?: InputMaybe<StructFieldOptions>;
    where?: InputMaybe<StructFieldWhere>;
};

export type StructFieldsAggregateArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    where?: InputMaybe<StructFieldWhere>;
};

export type StructFieldsConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<StructFieldsConnectionSort>>;
    where?: InputMaybe<StructFieldsConnectionWhere>;
};

export type StructAggregateSelection = {
    __typename?: "StructAggregateSelection";
    count: Scalars["Int"]["output"];
    hash: StringAggregateSelection;
    kind: StringAggregateSelection;
    size: IntAggregateSelection;
};

export type StructBlobAggregateInput = {
    AND?: InputMaybe<Array<StructBlobAggregateInput>>;
    NOT?: InputMaybe<StructBlobAggregateInput>;
    OR?: InputMaybe<Array<StructBlobAggregateInput>>;
    count?: InputMaybe<Scalars["Int"]["input"]>;
    count_GT?: InputMaybe<Scalars["Int"]["input"]>;
    count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    count_LT?: InputMaybe<Scalars["Int"]["input"]>;
    count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    edge?: InputMaybe<HasNameRelAggregationWhereInput>;
    node?: InputMaybe<StructBlobNodeAggregationWhereInput>;
};

export type StructBlobBlobAggregationSelection = {
    __typename?: "StructBlobBlobAggregationSelection";
    count: Scalars["Int"]["output"];
    edge?: Maybe<StructBlobBlobEdgeAggregateSelection>;
    node?: Maybe<StructBlobBlobNodeAggregateSelection>;
};

export type StructBlobBlobEdgeAggregateSelection = {
    __typename?: "StructBlobBlobEdgeAggregateSelection";
    name: StringAggregateSelection;
};

export type StructBlobBlobNodeAggregateSelection = {
    __typename?: "StructBlobBlobNodeAggregateSelection";
    hash: StringAggregateSelection;
};

export type StructBlobConnection = {
    __typename?: "StructBlobConnection";
    edges: Array<StructBlobRelationship>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type StructBlobConnectionSort = {
    edge?: InputMaybe<HasNameRelSort>;
    node?: InputMaybe<BlobSort>;
};

export type StructBlobConnectionWhere = {
    AND?: InputMaybe<Array<StructBlobConnectionWhere>>;
    NOT?: InputMaybe<StructBlobConnectionWhere>;
    OR?: InputMaybe<Array<StructBlobConnectionWhere>>;
    edge?: InputMaybe<HasNameRelWhere>;
    node?: InputMaybe<BlobWhere>;
};

export type StructBlobNodeAggregationWhereInput = {
    AND?: InputMaybe<Array<StructBlobNodeAggregationWhereInput>>;
    NOT?: InputMaybe<StructBlobNodeAggregationWhereInput>;
    OR?: InputMaybe<Array<StructBlobNodeAggregationWhereInput>>;
    hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type StructBlobRelationship = {
    __typename?: "StructBlobRelationship";
    cursor: Scalars["String"]["output"];
    node: Blob;
    properties: HasNameRel;
};

export type StructEdge = {
    __typename?: "StructEdge";
    cursor: Scalars["String"]["output"];
    node: Struct;
};

export type StructField = Hashable & {
    __typename?: "StructField";
    data_type: Scalars["JSON"]["output"];
    hash: Scalars["String"]["output"];
    offset: Scalars["Int"]["output"];
    struct: Struct;
    structAggregate?: Maybe<StructFieldStructStructAggregationSelection>;
    structConnection: StructFieldStructConnection;
};

export type StructFieldStructArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    options?: InputMaybe<StructOptions>;
    where?: InputMaybe<StructWhere>;
};

export type StructFieldStructAggregateArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    where?: InputMaybe<StructWhere>;
};

export type StructFieldStructConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<StructFieldStructConnectionSort>>;
    where?: InputMaybe<StructFieldStructConnectionWhere>;
};

export type StructFieldAggregateSelection = {
    __typename?: "StructFieldAggregateSelection";
    count: Scalars["Int"]["output"];
    hash: StringAggregateSelection;
    offset: IntAggregateSelection;
};

export type StructFieldEdge = {
    __typename?: "StructFieldEdge";
    cursor: Scalars["String"]["output"];
    node: StructField;
};

export type StructFieldOptions = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    /** Specify one or more StructFieldSort objects to sort StructFields by. The sorts will be applied in the order in which they are arranged in the array. */
    sort?: InputMaybe<Array<StructFieldSort>>;
};

/** Fields to sort StructFields by. The order in which sorts are applied is not guaranteed when specifying many fields in one StructFieldSort object. */
export type StructFieldSort = {
    data_type?: InputMaybe<SortDirection>;
    hash?: InputMaybe<SortDirection>;
    offset?: InputMaybe<SortDirection>;
};

export type StructFieldStructAggregateInput = {
    AND?: InputMaybe<Array<StructFieldStructAggregateInput>>;
    NOT?: InputMaybe<StructFieldStructAggregateInput>;
    OR?: InputMaybe<Array<StructFieldStructAggregateInput>>;
    count?: InputMaybe<Scalars["Int"]["input"]>;
    count_GT?: InputMaybe<Scalars["Int"]["input"]>;
    count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    count_LT?: InputMaybe<Scalars["Int"]["input"]>;
    count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    edge?: InputMaybe<HasNameRelAggregationWhereInput>;
    node?: InputMaybe<StructFieldStructNodeAggregationWhereInput>;
};

export type StructFieldStructConnection = {
    __typename?: "StructFieldStructConnection";
    edges: Array<StructFieldStructRelationship>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type StructFieldStructConnectionSort = {
    edge?: InputMaybe<HasNameRelSort>;
    node?: InputMaybe<StructSort>;
};

export type StructFieldStructConnectionWhere = {
    AND?: InputMaybe<Array<StructFieldStructConnectionWhere>>;
    NOT?: InputMaybe<StructFieldStructConnectionWhere>;
    OR?: InputMaybe<Array<StructFieldStructConnectionWhere>>;
    edge?: InputMaybe<HasNameRelWhere>;
    node?: InputMaybe<StructWhere>;
};

export type StructFieldStructNodeAggregationWhereInput = {
    AND?: InputMaybe<Array<StructFieldStructNodeAggregationWhereInput>>;
    NOT?: InputMaybe<StructFieldStructNodeAggregationWhereInput>;
    OR?: InputMaybe<Array<StructFieldStructNodeAggregationWhereInput>>;
    hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    kind_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    kind_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    kind_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    kind_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    kind_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    kind_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    kind_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    kind_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    kind_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    kind_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    kind_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    kind_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    kind_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    kind_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    kind_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    size_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    size_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
    size_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    size_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
    size_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    size_MAX_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    size_MAX_GT?: InputMaybe<Scalars["Int"]["input"]>;
    size_MAX_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    size_MAX_LT?: InputMaybe<Scalars["Int"]["input"]>;
    size_MAX_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    size_MIN_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    size_MIN_GT?: InputMaybe<Scalars["Int"]["input"]>;
    size_MIN_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    size_MIN_LT?: InputMaybe<Scalars["Int"]["input"]>;
    size_MIN_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    size_SUM_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    size_SUM_GT?: InputMaybe<Scalars["Int"]["input"]>;
    size_SUM_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    size_SUM_LT?: InputMaybe<Scalars["Int"]["input"]>;
    size_SUM_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type StructFieldStructRelationship = {
    __typename?: "StructFieldStructRelationship";
    cursor: Scalars["String"]["output"];
    node: Struct;
    properties: HasNameRel;
};

export type StructFieldStructStructAggregationSelection = {
    __typename?: "StructFieldStructStructAggregationSelection";
    count: Scalars["Int"]["output"];
    edge?: Maybe<StructFieldStructStructEdgeAggregateSelection>;
    node?: Maybe<StructFieldStructStructNodeAggregateSelection>;
};

export type StructFieldStructStructEdgeAggregateSelection = {
    __typename?: "StructFieldStructStructEdgeAggregateSelection";
    name: StringAggregateSelection;
};

export type StructFieldStructStructNodeAggregateSelection = {
    __typename?: "StructFieldStructStructNodeAggregateSelection";
    hash: StringAggregateSelection;
    kind: StringAggregateSelection;
    size: IntAggregateSelection;
};

export type StructFieldWhere = {
    AND?: InputMaybe<Array<StructFieldWhere>>;
    NOT?: InputMaybe<StructFieldWhere>;
    OR?: InputMaybe<Array<StructFieldWhere>>;
    data_type?: InputMaybe<Scalars["JSON"]["input"]>;
    data_type_IN?: InputMaybe<Array<Scalars["JSON"]["input"]>>;
    hash?: InputMaybe<Scalars["String"]["input"]>;
    hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    offset_GT?: InputMaybe<Scalars["Int"]["input"]>;
    offset_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    offset_IN?: InputMaybe<Array<Scalars["Int"]["input"]>>;
    offset_LT?: InputMaybe<Scalars["Int"]["input"]>;
    offset_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    struct?: InputMaybe<StructWhere>;
    structAggregate?: InputMaybe<StructFieldStructAggregateInput>;
    structConnection?: InputMaybe<StructFieldStructConnectionWhere>;
    structConnection_NOT?: InputMaybe<StructFieldStructConnectionWhere>;
    struct_NOT?: InputMaybe<StructWhere>;
};

export type StructFieldsAggregateInput = {
    AND?: InputMaybe<Array<StructFieldsAggregateInput>>;
    NOT?: InputMaybe<StructFieldsAggregateInput>;
    OR?: InputMaybe<Array<StructFieldsAggregateInput>>;
    count?: InputMaybe<Scalars["Int"]["input"]>;
    count_GT?: InputMaybe<Scalars["Int"]["input"]>;
    count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    count_LT?: InputMaybe<Scalars["Int"]["input"]>;
    count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    edge?: InputMaybe<HasNameRelAggregationWhereInput>;
    node?: InputMaybe<StructFieldsNodeAggregationWhereInput>;
};

export type StructFieldsConnection = {
    __typename?: "StructFieldsConnection";
    edges: Array<StructFieldsRelationship>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type StructFieldsConnectionSort = {
    edge?: InputMaybe<HasNameRelSort>;
    node?: InputMaybe<StructFieldSort>;
};

export type StructFieldsConnectionWhere = {
    AND?: InputMaybe<Array<StructFieldsConnectionWhere>>;
    NOT?: InputMaybe<StructFieldsConnectionWhere>;
    OR?: InputMaybe<Array<StructFieldsConnectionWhere>>;
    edge?: InputMaybe<HasNameRelWhere>;
    node?: InputMaybe<StructFieldWhere>;
};

export type StructFieldsNodeAggregationWhereInput = {
    AND?: InputMaybe<Array<StructFieldsNodeAggregationWhereInput>>;
    NOT?: InputMaybe<StructFieldsNodeAggregationWhereInput>;
    OR?: InputMaybe<Array<StructFieldsNodeAggregationWhereInput>>;
    hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    offset_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    offset_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
    offset_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    offset_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
    offset_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    offset_MAX_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    offset_MAX_GT?: InputMaybe<Scalars["Int"]["input"]>;
    offset_MAX_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    offset_MAX_LT?: InputMaybe<Scalars["Int"]["input"]>;
    offset_MAX_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    offset_MIN_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    offset_MIN_GT?: InputMaybe<Scalars["Int"]["input"]>;
    offset_MIN_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    offset_MIN_LT?: InputMaybe<Scalars["Int"]["input"]>;
    offset_MIN_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    offset_SUM_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    offset_SUM_GT?: InputMaybe<Scalars["Int"]["input"]>;
    offset_SUM_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    offset_SUM_LT?: InputMaybe<Scalars["Int"]["input"]>;
    offset_SUM_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type StructFieldsRelationship = {
    __typename?: "StructFieldsRelationship";
    cursor: Scalars["String"]["output"];
    node: StructField;
    properties: HasNameRel;
};

export type StructOptions = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    /** Specify one or more StructSort objects to sort Structs by. The sorts will be applied in the order in which they are arranged in the array. */
    sort?: InputMaybe<Array<StructSort>>;
};

/** Fields to sort Structs by. The order in which sorts are applied is not guaranteed when specifying many fields in one StructSort object. */
export type StructSort = {
    hash?: InputMaybe<SortDirection>;
    kind?: InputMaybe<SortDirection>;
    size?: InputMaybe<SortDirection>;
};

export type StructStructFieldFieldsAggregationSelection = {
    __typename?: "StructStructFieldFieldsAggregationSelection";
    count: Scalars["Int"]["output"];
    edge?: Maybe<StructStructFieldFieldsEdgeAggregateSelection>;
    node?: Maybe<StructStructFieldFieldsNodeAggregateSelection>;
};

export type StructStructFieldFieldsEdgeAggregateSelection = {
    __typename?: "StructStructFieldFieldsEdgeAggregateSelection";
    name: StringAggregateSelection;
};

export type StructStructFieldFieldsNodeAggregateSelection = {
    __typename?: "StructStructFieldFieldsNodeAggregateSelection";
    hash: StringAggregateSelection;
    offset: IntAggregateSelection;
};

export type StructWhere = {
    AND?: InputMaybe<Array<StructWhere>>;
    NOT?: InputMaybe<StructWhere>;
    OR?: InputMaybe<Array<StructWhere>>;
    blob?: InputMaybe<BlobWhere>;
    blobAggregate?: InputMaybe<StructBlobAggregateInput>;
    blobConnection?: InputMaybe<StructBlobConnectionWhere>;
    blobConnection_NOT?: InputMaybe<StructBlobConnectionWhere>;
    blob_NOT?: InputMaybe<BlobWhere>;
    fieldsAggregate?: InputMaybe<StructFieldsAggregateInput>;
    /** Return Structs where all of the related StructFieldsConnections match this filter */
    fieldsConnection_ALL?: InputMaybe<StructFieldsConnectionWhere>;
    /** Return Structs where none of the related StructFieldsConnections match this filter */
    fieldsConnection_NONE?: InputMaybe<StructFieldsConnectionWhere>;
    /** Return Structs where one of the related StructFieldsConnections match this filter */
    fieldsConnection_SINGLE?: InputMaybe<StructFieldsConnectionWhere>;
    /** Return Structs where some of the related StructFieldsConnections match this filter */
    fieldsConnection_SOME?: InputMaybe<StructFieldsConnectionWhere>;
    /** Return Structs where all of the related StructFields match this filter */
    fields_ALL?: InputMaybe<StructFieldWhere>;
    /** Return Structs where none of the related StructFields match this filter */
    fields_NONE?: InputMaybe<StructFieldWhere>;
    /** Return Structs where one of the related StructFields match this filter */
    fields_SINGLE?: InputMaybe<StructFieldWhere>;
    /** Return Structs where some of the related StructFields match this filter */
    fields_SOME?: InputMaybe<StructFieldWhere>;
    hash?: InputMaybe<Scalars["String"]["input"]>;
    hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    kind?: InputMaybe<Scalars["String"]["input"]>;
    kind_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    kind_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    kind_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    kind_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    size?: InputMaybe<Scalars["Int"]["input"]>;
    size_GT?: InputMaybe<Scalars["Int"]["input"]>;
    size_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    size_IN?: InputMaybe<Array<Scalars["Int"]["input"]>>;
    size_LT?: InputMaybe<Scalars["Int"]["input"]>;
    size_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type StructsConnection = {
    __typename?: "StructsConnection";
    edges: Array<StructEdge>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type Subscription = {
    __typename?: "Subscription";
    gitLogStream: GitLogEntry;
    searchStream: SearchResult;
};

export type SubscriptionGitLogStreamArgs = {
    commit_range: CommitRange;
    context: EntityType;
    options?: InputMaybe<GitLogOptions>;
    path: Scalars["String"]["input"];
};

export type SubscriptionSearchStreamArgs = {
    input: SearchInput;
};

export type Symbol = Hashable & {
    __typename?: "Symbol";
    address: Scalars["String"]["output"];
    blob: Blob;
    blobAggregate?: Maybe<SymbolBlobBlobAggregationSelection>;
    blobConnection: SymbolBlobConnection;
    hash: Scalars["String"]["output"];
};

export type SymbolBlobArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    options?: InputMaybe<BlobOptions>;
    where?: InputMaybe<BlobWhere>;
};

export type SymbolBlobAggregateArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    where?: InputMaybe<BlobWhere>;
};

export type SymbolBlobConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<SymbolBlobConnectionSort>>;
    where?: InputMaybe<SymbolBlobConnectionWhere>;
};

export type SymbolAggregateSelection = {
    __typename?: "SymbolAggregateSelection";
    address: StringAggregateSelection;
    count: Scalars["Int"]["output"];
    hash: StringAggregateSelection;
};

export type SymbolBlobAggregateInput = {
    AND?: InputMaybe<Array<SymbolBlobAggregateInput>>;
    NOT?: InputMaybe<SymbolBlobAggregateInput>;
    OR?: InputMaybe<Array<SymbolBlobAggregateInput>>;
    count?: InputMaybe<Scalars["Int"]["input"]>;
    count_GT?: InputMaybe<Scalars["Int"]["input"]>;
    count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    count_LT?: InputMaybe<Scalars["Int"]["input"]>;
    count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    edge?: InputMaybe<HasNameRelAggregationWhereInput>;
    node?: InputMaybe<SymbolBlobNodeAggregationWhereInput>;
};

export type SymbolBlobBlobAggregationSelection = {
    __typename?: "SymbolBlobBlobAggregationSelection";
    count: Scalars["Int"]["output"];
    edge?: Maybe<SymbolBlobBlobEdgeAggregateSelection>;
    node?: Maybe<SymbolBlobBlobNodeAggregateSelection>;
};

export type SymbolBlobBlobEdgeAggregateSelection = {
    __typename?: "SymbolBlobBlobEdgeAggregateSelection";
    name: StringAggregateSelection;
};

export type SymbolBlobBlobNodeAggregateSelection = {
    __typename?: "SymbolBlobBlobNodeAggregateSelection";
    hash: StringAggregateSelection;
};

export type SymbolBlobConnection = {
    __typename?: "SymbolBlobConnection";
    edges: Array<SymbolBlobRelationship>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type SymbolBlobConnectionSort = {
    edge?: InputMaybe<HasNameRelSort>;
    node?: InputMaybe<BlobSort>;
};

export type SymbolBlobConnectionWhere = {
    AND?: InputMaybe<Array<SymbolBlobConnectionWhere>>;
    NOT?: InputMaybe<SymbolBlobConnectionWhere>;
    OR?: InputMaybe<Array<SymbolBlobConnectionWhere>>;
    edge?: InputMaybe<HasNameRelWhere>;
    node?: InputMaybe<BlobWhere>;
};

export type SymbolBlobNodeAggregationWhereInput = {
    AND?: InputMaybe<Array<SymbolBlobNodeAggregationWhereInput>>;
    NOT?: InputMaybe<SymbolBlobNodeAggregationWhereInput>;
    OR?: InputMaybe<Array<SymbolBlobNodeAggregationWhereInput>>;
    hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type SymbolBlobRelationship = {
    __typename?: "SymbolBlobRelationship";
    cursor: Scalars["String"]["output"];
    node: Blob;
    properties: HasNameRel;
};

export type SymbolEdge = {
    __typename?: "SymbolEdge";
    cursor: Scalars["String"]["output"];
    node: Symbol;
};

export type SymbolOptions = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    /** Specify one or more SymbolSort objects to sort Symbols by. The sorts will be applied in the order in which they are arranged in the array. */
    sort?: InputMaybe<Array<SymbolSort>>;
};

/** Fields to sort Symbols by. The order in which sorts are applied is not guaranteed when specifying many fields in one SymbolSort object. */
export type SymbolSort = {
    address?: InputMaybe<SortDirection>;
    hash?: InputMaybe<SortDirection>;
};

export type SymbolWhere = {
    AND?: InputMaybe<Array<SymbolWhere>>;
    NOT?: InputMaybe<SymbolWhere>;
    OR?: InputMaybe<Array<SymbolWhere>>;
    address?: InputMaybe<Scalars["String"]["input"]>;
    address_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    address_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    address_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    address_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    blob?: InputMaybe<BlobWhere>;
    blobAggregate?: InputMaybe<SymbolBlobAggregateInput>;
    blobConnection?: InputMaybe<SymbolBlobConnectionWhere>;
    blobConnection_NOT?: InputMaybe<SymbolBlobConnectionWhere>;
    blob_NOT?: InputMaybe<BlobWhere>;
    hash?: InputMaybe<Scalars["String"]["input"]>;
    hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
};

export type SymbolsConnection = {
    __typename?: "SymbolsConnection";
    edges: Array<SymbolEdge>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type Tree = Hashable & {
    __typename?: "Tree";
    child_blobs: Array<Blob>;
    child_blobsAggregate?: Maybe<TreeBlobChild_BlobsAggregationSelection>;
    child_blobsConnection: TreeChild_BlobsConnection;
    child_trees: Array<Tree>;
    child_treesAggregate?: Maybe<TreeTreeChild_TreesAggregationSelection>;
    child_treesConnection: TreeChild_TreesConnection;
    hash: Scalars["String"]["output"];
};

export type TreeChild_BlobsArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    options?: InputMaybe<BlobOptions>;
    where?: InputMaybe<BlobWhere>;
};

export type TreeChild_BlobsAggregateArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    where?: InputMaybe<BlobWhere>;
};

export type TreeChild_BlobsConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<TreeChild_BlobsConnectionSort>>;
    where?: InputMaybe<TreeChild_BlobsConnectionWhere>;
};

export type TreeChild_TreesArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    options?: InputMaybe<TreeOptions>;
    where?: InputMaybe<TreeWhere>;
};

export type TreeChild_TreesAggregateArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    where?: InputMaybe<TreeWhere>;
};

export type TreeChild_TreesConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<TreeChild_TreesConnectionSort>>;
    where?: InputMaybe<TreeChild_TreesConnectionWhere>;
};

export type TreeAggregateSelection = {
    __typename?: "TreeAggregateSelection";
    count: Scalars["Int"]["output"];
    hash: StringAggregateSelection;
};

export type TreeBlobChild_BlobsAggregationSelection = {
    __typename?: "TreeBlobChild_blobsAggregationSelection";
    count: Scalars["Int"]["output"];
    edge?: Maybe<TreeBlobChild_BlobsEdgeAggregateSelection>;
    node?: Maybe<TreeBlobChild_BlobsNodeAggregateSelection>;
};

export type TreeBlobChild_BlobsEdgeAggregateSelection = {
    __typename?: "TreeBlobChild_blobsEdgeAggregateSelection";
    name: StringAggregateSelection;
};

export type TreeBlobChild_BlobsNodeAggregateSelection = {
    __typename?: "TreeBlobChild_blobsNodeAggregateSelection";
    hash: StringAggregateSelection;
};

export type TreeChild_BlobsAggregateInput = {
    AND?: InputMaybe<Array<TreeChild_BlobsAggregateInput>>;
    NOT?: InputMaybe<TreeChild_BlobsAggregateInput>;
    OR?: InputMaybe<Array<TreeChild_BlobsAggregateInput>>;
    count?: InputMaybe<Scalars["Int"]["input"]>;
    count_GT?: InputMaybe<Scalars["Int"]["input"]>;
    count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    count_LT?: InputMaybe<Scalars["Int"]["input"]>;
    count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    edge?: InputMaybe<HasFilenameRelAggregationWhereInput>;
    node?: InputMaybe<TreeChild_BlobsNodeAggregationWhereInput>;
};

export type TreeChild_BlobsConnection = {
    __typename?: "TreeChild_blobsConnection";
    edges: Array<TreeChild_BlobsRelationship>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type TreeChild_BlobsConnectionSort = {
    edge?: InputMaybe<HasFilenameRelSort>;
    node?: InputMaybe<BlobSort>;
};

export type TreeChild_BlobsConnectionWhere = {
    AND?: InputMaybe<Array<TreeChild_BlobsConnectionWhere>>;
    NOT?: InputMaybe<TreeChild_BlobsConnectionWhere>;
    OR?: InputMaybe<Array<TreeChild_BlobsConnectionWhere>>;
    edge?: InputMaybe<HasFilenameRelWhere>;
    node?: InputMaybe<BlobWhere>;
};

export type TreeChild_BlobsNodeAggregationWhereInput = {
    AND?: InputMaybe<Array<TreeChild_BlobsNodeAggregationWhereInput>>;
    NOT?: InputMaybe<TreeChild_BlobsNodeAggregationWhereInput>;
    OR?: InputMaybe<Array<TreeChild_BlobsNodeAggregationWhereInput>>;
    hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type TreeChild_BlobsRelationship = {
    __typename?: "TreeChild_blobsRelationship";
    cursor: Scalars["String"]["output"];
    node: Blob;
    properties: HasFilenameRel;
};

export type TreeChild_TreesAggregateInput = {
    AND?: InputMaybe<Array<TreeChild_TreesAggregateInput>>;
    NOT?: InputMaybe<TreeChild_TreesAggregateInput>;
    OR?: InputMaybe<Array<TreeChild_TreesAggregateInput>>;
    count?: InputMaybe<Scalars["Int"]["input"]>;
    count_GT?: InputMaybe<Scalars["Int"]["input"]>;
    count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    count_LT?: InputMaybe<Scalars["Int"]["input"]>;
    count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    edge?: InputMaybe<HasFilenameRelAggregationWhereInput>;
    node?: InputMaybe<TreeChild_TreesNodeAggregationWhereInput>;
};

export type TreeChild_TreesConnection = {
    __typename?: "TreeChild_treesConnection";
    edges: Array<TreeChild_TreesRelationship>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type TreeChild_TreesConnectionSort = {
    edge?: InputMaybe<HasFilenameRelSort>;
    node?: InputMaybe<TreeSort>;
};

export type TreeChild_TreesConnectionWhere = {
    AND?: InputMaybe<Array<TreeChild_TreesConnectionWhere>>;
    NOT?: InputMaybe<TreeChild_TreesConnectionWhere>;
    OR?: InputMaybe<Array<TreeChild_TreesConnectionWhere>>;
    edge?: InputMaybe<HasFilenameRelWhere>;
    node?: InputMaybe<TreeWhere>;
};

export type TreeChild_TreesNodeAggregationWhereInput = {
    AND?: InputMaybe<Array<TreeChild_TreesNodeAggregationWhereInput>>;
    NOT?: InputMaybe<TreeChild_TreesNodeAggregationWhereInput>;
    OR?: InputMaybe<Array<TreeChild_TreesNodeAggregationWhereInput>>;
    hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type TreeChild_TreesRelationship = {
    __typename?: "TreeChild_treesRelationship";
    cursor: Scalars["String"]["output"];
    node: Tree;
    properties: HasFilenameRel;
};

export type TreeEdge = {
    __typename?: "TreeEdge";
    cursor: Scalars["String"]["output"];
    node: Tree;
};

export type TreeOptions = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    /** Specify one or more TreeSort objects to sort Trees by. The sorts will be applied in the order in which they are arranged in the array. */
    sort?: InputMaybe<Array<TreeSort>>;
};

/** Fields to sort Trees by. The order in which sorts are applied is not guaranteed when specifying many fields in one TreeSort object. */
export type TreeSort = {
    hash?: InputMaybe<SortDirection>;
};

export type TreeTreeChild_TreesAggregationSelection = {
    __typename?: "TreeTreeChild_treesAggregationSelection";
    count: Scalars["Int"]["output"];
    edge?: Maybe<TreeTreeChild_TreesEdgeAggregateSelection>;
    node?: Maybe<TreeTreeChild_TreesNodeAggregateSelection>;
};

export type TreeTreeChild_TreesEdgeAggregateSelection = {
    __typename?: "TreeTreeChild_treesEdgeAggregateSelection";
    name: StringAggregateSelection;
};

export type TreeTreeChild_TreesNodeAggregateSelection = {
    __typename?: "TreeTreeChild_treesNodeAggregateSelection";
    hash: StringAggregateSelection;
};

export type TreeWhere = {
    AND?: InputMaybe<Array<TreeWhere>>;
    NOT?: InputMaybe<TreeWhere>;
    OR?: InputMaybe<Array<TreeWhere>>;
    child_blobsAggregate?: InputMaybe<TreeChild_BlobsAggregateInput>;
    /** Return Trees where all of the related TreeChild_blobsConnections match this filter */
    child_blobsConnection_ALL?: InputMaybe<TreeChild_BlobsConnectionWhere>;
    /** Return Trees where none of the related TreeChild_blobsConnections match this filter */
    child_blobsConnection_NONE?: InputMaybe<TreeChild_BlobsConnectionWhere>;
    /** Return Trees where one of the related TreeChild_blobsConnections match this filter */
    child_blobsConnection_SINGLE?: InputMaybe<TreeChild_BlobsConnectionWhere>;
    /** Return Trees where some of the related TreeChild_blobsConnections match this filter */
    child_blobsConnection_SOME?: InputMaybe<TreeChild_BlobsConnectionWhere>;
    /** Return Trees where all of the related Blobs match this filter */
    child_blobs_ALL?: InputMaybe<BlobWhere>;
    /** Return Trees where none of the related Blobs match this filter */
    child_blobs_NONE?: InputMaybe<BlobWhere>;
    /** Return Trees where one of the related Blobs match this filter */
    child_blobs_SINGLE?: InputMaybe<BlobWhere>;
    /** Return Trees where some of the related Blobs match this filter */
    child_blobs_SOME?: InputMaybe<BlobWhere>;
    child_treesAggregate?: InputMaybe<TreeChild_TreesAggregateInput>;
    /** Return Trees where all of the related TreeChild_treesConnections match this filter */
    child_treesConnection_ALL?: InputMaybe<TreeChild_TreesConnectionWhere>;
    /** Return Trees where none of the related TreeChild_treesConnections match this filter */
    child_treesConnection_NONE?: InputMaybe<TreeChild_TreesConnectionWhere>;
    /** Return Trees where one of the related TreeChild_treesConnections match this filter */
    child_treesConnection_SINGLE?: InputMaybe<TreeChild_TreesConnectionWhere>;
    /** Return Trees where some of the related TreeChild_treesConnections match this filter */
    child_treesConnection_SOME?: InputMaybe<TreeChild_TreesConnectionWhere>;
    /** Return Trees where all of the related Trees match this filter */
    child_trees_ALL?: InputMaybe<TreeWhere>;
    /** Return Trees where none of the related Trees match this filter */
    child_trees_NONE?: InputMaybe<TreeWhere>;
    /** Return Trees where one of the related Trees match this filter */
    child_trees_SINGLE?: InputMaybe<TreeWhere>;
    /** Return Trees where some of the related Trees match this filter */
    child_trees_SOME?: InputMaybe<TreeWhere>;
    hash?: InputMaybe<Scalars["String"]["input"]>;
    hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
};

export type TreesConnection = {
    __typename?: "TreesConnection";
    edges: Array<TreeEdge>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type WinRegKey = Hashable & {
    __typename?: "WinRegKey";
    child_keys: Array<WinRegKey>;
    child_keysAggregate?: Maybe<WinRegKeyWinRegKeyChild_KeysAggregationSelection>;
    child_keysConnection: WinRegKeyChild_KeysConnection;
    child_values: Array<WinRegValue>;
    child_valuesAggregate?: Maybe<WinRegKeyWinRegValueChild_ValuesAggregationSelection>;
    child_valuesConnection: WinRegKeyChild_ValuesConnection;
    hash: Scalars["String"]["output"];
};

export type WinRegKeyChild_KeysArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    options?: InputMaybe<WinRegKeyOptions>;
    where?: InputMaybe<WinRegKeyWhere>;
};

export type WinRegKeyChild_KeysAggregateArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    where?: InputMaybe<WinRegKeyWhere>;
};

export type WinRegKeyChild_KeysConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<WinRegKeyChild_KeysConnectionSort>>;
    where?: InputMaybe<WinRegKeyChild_KeysConnectionWhere>;
};

export type WinRegKeyChild_ValuesArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    options?: InputMaybe<WinRegValueOptions>;
    where?: InputMaybe<WinRegValueWhere>;
};

export type WinRegKeyChild_ValuesAggregateArgs = {
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    where?: InputMaybe<WinRegValueWhere>;
};

export type WinRegKeyChild_ValuesConnectionArgs = {
    after?: InputMaybe<Scalars["String"]["input"]>;
    directed?: InputMaybe<Scalars["Boolean"]["input"]>;
    first?: InputMaybe<Scalars["Int"]["input"]>;
    sort?: InputMaybe<Array<WinRegKeyChild_ValuesConnectionSort>>;
    where?: InputMaybe<WinRegKeyChild_ValuesConnectionWhere>;
};

export type WinRegKeyAggregateSelection = {
    __typename?: "WinRegKeyAggregateSelection";
    count: Scalars["Int"]["output"];
    hash: StringAggregateSelection;
};

export type WinRegKeyChild_KeysAggregateInput = {
    AND?: InputMaybe<Array<WinRegKeyChild_KeysAggregateInput>>;
    NOT?: InputMaybe<WinRegKeyChild_KeysAggregateInput>;
    OR?: InputMaybe<Array<WinRegKeyChild_KeysAggregateInput>>;
    count?: InputMaybe<Scalars["Int"]["input"]>;
    count_GT?: InputMaybe<Scalars["Int"]["input"]>;
    count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    count_LT?: InputMaybe<Scalars["Int"]["input"]>;
    count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    edge?: InputMaybe<HasFilenameRelAggregationWhereInput>;
    node?: InputMaybe<WinRegKeyChild_KeysNodeAggregationWhereInput>;
};

export type WinRegKeyChild_KeysConnection = {
    __typename?: "WinRegKeyChild_keysConnection";
    edges: Array<WinRegKeyChild_KeysRelationship>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type WinRegKeyChild_KeysConnectionSort = {
    edge?: InputMaybe<HasFilenameRelSort>;
    node?: InputMaybe<WinRegKeySort>;
};

export type WinRegKeyChild_KeysConnectionWhere = {
    AND?: InputMaybe<Array<WinRegKeyChild_KeysConnectionWhere>>;
    NOT?: InputMaybe<WinRegKeyChild_KeysConnectionWhere>;
    OR?: InputMaybe<Array<WinRegKeyChild_KeysConnectionWhere>>;
    edge?: InputMaybe<HasFilenameRelWhere>;
    node?: InputMaybe<WinRegKeyWhere>;
};

export type WinRegKeyChild_KeysNodeAggregationWhereInput = {
    AND?: InputMaybe<Array<WinRegKeyChild_KeysNodeAggregationWhereInput>>;
    NOT?: InputMaybe<WinRegKeyChild_KeysNodeAggregationWhereInput>;
    OR?: InputMaybe<Array<WinRegKeyChild_KeysNodeAggregationWhereInput>>;
    hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type WinRegKeyChild_KeysRelationship = {
    __typename?: "WinRegKeyChild_keysRelationship";
    cursor: Scalars["String"]["output"];
    node: WinRegKey;
    properties: HasFilenameRel;
};

export type WinRegKeyChild_ValuesAggregateInput = {
    AND?: InputMaybe<Array<WinRegKeyChild_ValuesAggregateInput>>;
    NOT?: InputMaybe<WinRegKeyChild_ValuesAggregateInput>;
    OR?: InputMaybe<Array<WinRegKeyChild_ValuesAggregateInput>>;
    count?: InputMaybe<Scalars["Int"]["input"]>;
    count_GT?: InputMaybe<Scalars["Int"]["input"]>;
    count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    count_LT?: InputMaybe<Scalars["Int"]["input"]>;
    count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    edge?: InputMaybe<HasFilenameRelAggregationWhereInput>;
    node?: InputMaybe<WinRegKeyChild_ValuesNodeAggregationWhereInput>;
};

export type WinRegKeyChild_ValuesConnection = {
    __typename?: "WinRegKeyChild_valuesConnection";
    edges: Array<WinRegKeyChild_ValuesRelationship>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type WinRegKeyChild_ValuesConnectionSort = {
    edge?: InputMaybe<HasFilenameRelSort>;
    node?: InputMaybe<WinRegValueSort>;
};

export type WinRegKeyChild_ValuesConnectionWhere = {
    AND?: InputMaybe<Array<WinRegKeyChild_ValuesConnectionWhere>>;
    NOT?: InputMaybe<WinRegKeyChild_ValuesConnectionWhere>;
    OR?: InputMaybe<Array<WinRegKeyChild_ValuesConnectionWhere>>;
    edge?: InputMaybe<HasFilenameRelWhere>;
    node?: InputMaybe<WinRegValueWhere>;
};

export type WinRegKeyChild_ValuesNodeAggregationWhereInput = {
    AND?: InputMaybe<Array<WinRegKeyChild_ValuesNodeAggregationWhereInput>>;
    NOT?: InputMaybe<WinRegKeyChild_ValuesNodeAggregationWhereInput>;
    OR?: InputMaybe<Array<WinRegKeyChild_ValuesNodeAggregationWhereInput>>;
    hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    type_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    type_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    type_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    type_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    type_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    type_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    type_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    type_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    type_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    type_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    type_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    type_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    type_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    type_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    type_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    value_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
    value_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
    value_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
    value_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
    value_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
    value_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    value_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    value_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    value_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    value_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
    value_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
    value_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
    value_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
    value_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
    value_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type WinRegKeyChild_ValuesRelationship = {
    __typename?: "WinRegKeyChild_valuesRelationship";
    cursor: Scalars["String"]["output"];
    node: WinRegValue;
    properties: HasFilenameRel;
};

export type WinRegKeyEdge = {
    __typename?: "WinRegKeyEdge";
    cursor: Scalars["String"]["output"];
    node: WinRegKey;
};

export type WinRegKeyOptions = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    /** Specify one or more WinRegKeySort objects to sort WinRegKeys by. The sorts will be applied in the order in which they are arranged in the array. */
    sort?: InputMaybe<Array<WinRegKeySort>>;
};

/** Fields to sort WinRegKeys by. The order in which sorts are applied is not guaranteed when specifying many fields in one WinRegKeySort object. */
export type WinRegKeySort = {
    hash?: InputMaybe<SortDirection>;
};

export type WinRegKeyWhere = {
    AND?: InputMaybe<Array<WinRegKeyWhere>>;
    NOT?: InputMaybe<WinRegKeyWhere>;
    OR?: InputMaybe<Array<WinRegKeyWhere>>;
    child_keysAggregate?: InputMaybe<WinRegKeyChild_KeysAggregateInput>;
    /** Return WinRegKeys where all of the related WinRegKeyChild_keysConnections match this filter */
    child_keysConnection_ALL?: InputMaybe<WinRegKeyChild_KeysConnectionWhere>;
    /** Return WinRegKeys where none of the related WinRegKeyChild_keysConnections match this filter */
    child_keysConnection_NONE?: InputMaybe<WinRegKeyChild_KeysConnectionWhere>;
    /** Return WinRegKeys where one of the related WinRegKeyChild_keysConnections match this filter */
    child_keysConnection_SINGLE?: InputMaybe<WinRegKeyChild_KeysConnectionWhere>;
    /** Return WinRegKeys where some of the related WinRegKeyChild_keysConnections match this filter */
    child_keysConnection_SOME?: InputMaybe<WinRegKeyChild_KeysConnectionWhere>;
    /** Return WinRegKeys where all of the related WinRegKeys match this filter */
    child_keys_ALL?: InputMaybe<WinRegKeyWhere>;
    /** Return WinRegKeys where none of the related WinRegKeys match this filter */
    child_keys_NONE?: InputMaybe<WinRegKeyWhere>;
    /** Return WinRegKeys where one of the related WinRegKeys match this filter */
    child_keys_SINGLE?: InputMaybe<WinRegKeyWhere>;
    /** Return WinRegKeys where some of the related WinRegKeys match this filter */
    child_keys_SOME?: InputMaybe<WinRegKeyWhere>;
    child_valuesAggregate?: InputMaybe<WinRegKeyChild_ValuesAggregateInput>;
    /** Return WinRegKeys where all of the related WinRegKeyChild_valuesConnections match this filter */
    child_valuesConnection_ALL?: InputMaybe<WinRegKeyChild_ValuesConnectionWhere>;
    /** Return WinRegKeys where none of the related WinRegKeyChild_valuesConnections match this filter */
    child_valuesConnection_NONE?: InputMaybe<WinRegKeyChild_ValuesConnectionWhere>;
    /** Return WinRegKeys where one of the related WinRegKeyChild_valuesConnections match this filter */
    child_valuesConnection_SINGLE?: InputMaybe<WinRegKeyChild_ValuesConnectionWhere>;
    /** Return WinRegKeys where some of the related WinRegKeyChild_valuesConnections match this filter */
    child_valuesConnection_SOME?: InputMaybe<WinRegKeyChild_ValuesConnectionWhere>;
    /** Return WinRegKeys where all of the related WinRegValues match this filter */
    child_values_ALL?: InputMaybe<WinRegValueWhere>;
    /** Return WinRegKeys where none of the related WinRegValues match this filter */
    child_values_NONE?: InputMaybe<WinRegValueWhere>;
    /** Return WinRegKeys where one of the related WinRegValues match this filter */
    child_values_SINGLE?: InputMaybe<WinRegValueWhere>;
    /** Return WinRegKeys where some of the related WinRegValues match this filter */
    child_values_SOME?: InputMaybe<WinRegValueWhere>;
    hash?: InputMaybe<Scalars["String"]["input"]>;
    hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
};

export type WinRegKeyWinRegKeyChild_KeysAggregationSelection = {
    __typename?: "WinRegKeyWinRegKeyChild_keysAggregationSelection";
    count: Scalars["Int"]["output"];
    edge?: Maybe<WinRegKeyWinRegKeyChild_KeysEdgeAggregateSelection>;
    node?: Maybe<WinRegKeyWinRegKeyChild_KeysNodeAggregateSelection>;
};

export type WinRegKeyWinRegKeyChild_KeysEdgeAggregateSelection = {
    __typename?: "WinRegKeyWinRegKeyChild_keysEdgeAggregateSelection";
    name: StringAggregateSelection;
};

export type WinRegKeyWinRegKeyChild_KeysNodeAggregateSelection = {
    __typename?: "WinRegKeyWinRegKeyChild_keysNodeAggregateSelection";
    hash: StringAggregateSelection;
};

export type WinRegKeyWinRegValueChild_ValuesAggregationSelection = {
    __typename?: "WinRegKeyWinRegValueChild_valuesAggregationSelection";
    count: Scalars["Int"]["output"];
    edge?: Maybe<WinRegKeyWinRegValueChild_ValuesEdgeAggregateSelection>;
    node?: Maybe<WinRegKeyWinRegValueChild_ValuesNodeAggregateSelection>;
};

export type WinRegKeyWinRegValueChild_ValuesEdgeAggregateSelection = {
    __typename?: "WinRegKeyWinRegValueChild_valuesEdgeAggregateSelection";
    name: StringAggregateSelection;
};

export type WinRegKeyWinRegValueChild_ValuesNodeAggregateSelection = {
    __typename?: "WinRegKeyWinRegValueChild_valuesNodeAggregateSelection";
    hash: StringAggregateSelection;
    type: StringAggregateSelection;
    value: StringAggregateSelection;
};

export type WinRegKeysConnection = {
    __typename?: "WinRegKeysConnection";
    edges: Array<WinRegKeyEdge>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type WinRegValue = Hashable & {
    __typename?: "WinRegValue";
    hash: Scalars["String"]["output"];
    type: Scalars["String"]["output"];
    value: Scalars["String"]["output"];
};

export type WinRegValueAggregateSelection = {
    __typename?: "WinRegValueAggregateSelection";
    count: Scalars["Int"]["output"];
    hash: StringAggregateSelection;
    type: StringAggregateSelection;
    value: StringAggregateSelection;
};

export type WinRegValueEdge = {
    __typename?: "WinRegValueEdge";
    cursor: Scalars["String"]["output"];
    node: WinRegValue;
};

export type WinRegValueOptions = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    offset?: InputMaybe<Scalars["Int"]["input"]>;
    /** Specify one or more WinRegValueSort objects to sort WinRegValues by. The sorts will be applied in the order in which they are arranged in the array. */
    sort?: InputMaybe<Array<WinRegValueSort>>;
};

/** Fields to sort WinRegValues by. The order in which sorts are applied is not guaranteed when specifying many fields in one WinRegValueSort object. */
export type WinRegValueSort = {
    hash?: InputMaybe<SortDirection>;
    type?: InputMaybe<SortDirection>;
    value?: InputMaybe<SortDirection>;
};

export type WinRegValueWhere = {
    AND?: InputMaybe<Array<WinRegValueWhere>>;
    NOT?: InputMaybe<WinRegValueWhere>;
    OR?: InputMaybe<Array<WinRegValueWhere>>;
    hash?: InputMaybe<Scalars["String"]["input"]>;
    hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    type?: InputMaybe<Scalars["String"]["input"]>;
    type_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    type_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    type_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    type_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    value?: InputMaybe<Scalars["String"]["input"]>;
    value_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
    value_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
    value_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
    value_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
};

export type WinRegValuesConnection = {
    __typename?: "WinRegValuesConnection";
    edges: Array<WinRegValueEdge>;
    pageInfo: PageInfo;
    totalCount: Scalars["Int"]["output"];
};

export type FetchBranchesQueryVariables = Exact<{ [key: string]: never }>;

export type FetchBranchesQuery = {
    __typename?: "Query";
    branches: Array<{
        __typename?: "Branch";
        name: string;
        tracks?: {
            __typename?: "Commit";
            hash: string;
            name: string;
            date: any;
        } | null;
    }>;
};

export type ResolveCommitRefQueryVariables = Exact<{
    ref: Scalars["String"]["input"];
}>;

export type ResolveCommitRefQuery = {
    __typename?: "Query";
    branches: Array<{
        __typename?: "Branch";
        name: string;
        tracks?: {
            __typename?: "Commit";
            hash: string;
            filesystem?: { __typename?: "Tree"; hash: string } | null;
        } | null;
    }>;
    commits: Array<{
        __typename?: "Commit";
        hash: string;
        filesystem?: { __typename?: "Tree"; hash: string } | null;
    }>;
};

export type SearchQueryVariables = Exact<{
    input: SearchInput;
}>;

export type SearchQuery = {
    __typename?: "Query";
    search: Array<{
        __typename?: "SearchResult";
        type: EntityType;
        commit_name: string;
        commit_hash: string;
        blob_path: string;
        blob_hash: string;
        entity_path?: string | null;
        node_hash: string;
    }>;
};

export type FetchCommitHistoryQueryVariables = Exact<{
    commitHash: Scalars["String"]["input"];
    direction?: InputMaybe<CommitHistoryDirection>;
}>;

export type FetchCommitHistoryQuery = {
    __typename?: "Query";
    fetchCommitHistory: Array<{
        __typename?: "Commit";
        hash: string;
        name: string;
        description?: string | null;
        date: any;
        previous?: { __typename?: "Commit"; hash: string } | null;
        next: Array<{ __typename?: "Commit"; hash: string }>;
    }>;
};

export type DiffNodesAtQueryVariables = Exact<{
    parentLabel: Scalars["String"]["input"];
    baseNodeHash: Scalars["String"]["input"];
    diffeeNodeHash: Scalars["String"]["input"];
    atPath: Scalars["String"]["input"];
    maxDepth?: InputMaybe<Scalars["Int"]["input"]>;
    withIntermediates?: InputMaybe<Scalars["Boolean"]["input"]>;
    filter?: InputMaybe<
        Array<Scalars["String"]["input"]> | Scalars["String"]["input"]
    >;
    options?: InputMaybe<DiffNodesOptions>;
}>;

export type DiffNodesAtQuery = {
    __typename?: "Query";
    diffNodesAt: {
        __typename?: "DiffNodesAtResult";
        total_count: number;
        items: Array<{
            __typename?: "DiffItem";
            status: DiffStatus;
            path: string;
            type: NodeType;
            old_props?: {
                __typename?: "HashableNodeProps";
                hash: string;
                properties: any;
            } | null;
            new_props?: {
                __typename?: "HashableNodeProps";
                hash: string;
                properties: any;
            } | null;
        }>;
    };
};

export type TraversePathQueryVariables = Exact<{
    parentLabel: Scalars["String"]["input"];
    treeHash: Scalars["String"]["input"];
    path: Scalars["String"]["input"];
}>;

export type TraversePathQuery = {
    __typename?: "Query";
    traversePath?: string | null;
};

export type GetBlobWinRegRootQueryVariables = Exact<{
    hash: Scalars["String"]["input"];
}>;

export type GetBlobWinRegRootQuery = {
    __typename?: "Query";
    blobs: Array<{
        __typename?: "Blob";
        hash: string;
        has_winreg?: { __typename?: "WinRegKey"; hash: string } | null;
    }>;
};

export type GetBlobsWithSymbolsQueryVariables = Exact<{
    commitHash: Scalars["String"]["input"];
}>;

export type GetBlobsWithSymbolsQuery = {
    __typename?: "Query";
    getBlobsWithSymbols: Array<{
        __typename?: "BlobWithSymbols";
        blob_hash: string;
        blob_path: string;
    }>;
};

export type SearchWithSessionQueryVariables = Exact<{
    input: SearchInput;
    pageSize?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type SearchWithSessionQuery = {
    __typename?: "Query";
    searchWithSession: {
        __typename?: "PaginatedSearchResult";
        session_id?: string | null;
        has_more: boolean;
        total_fetched: number;
        results: Array<{
            __typename?: "SearchResult";
            type: EntityType;
            commit_name: string;
            commit_hash: string;
            blob_path: string;
            blob_hash: string;
            entity_path?: string | null;
            node_hash: string;
        }>;
    };
};

export type SearchNextQueryVariables = Exact<{
    sessionId: Scalars["String"]["input"];
}>;

export type SearchNextQuery = {
    __typename?: "Query";
    searchNext: {
        __typename?: "PaginatedSearchResult";
        session_id?: string | null;
        has_more: boolean;
        total_fetched: number;
        results: Array<{
            __typename?: "SearchResult";
            type: EntityType;
            commit_name: string;
            commit_hash: string;
            blob_path: string;
            blob_hash: string;
            entity_path?: string | null;
            node_hash: string;
        }>;
    };
};

export type SearchCloseMutationVariables = Exact<{
    sessionId: Scalars["String"]["input"];
}>;

export type SearchCloseMutation = {
    __typename?: "Mutation";
    searchClose: boolean;
};

export type FetchStructByNameQueryVariables = Exact<{
    blobHash: Scalars["String"]["input"];
    structName: Scalars["String"]["input"];
}>;

export type FetchStructByNameQuery = {
    __typename?: "Query";
    blobs: Array<{
        __typename?: "Blob";
        has_structConnection: {
            __typename?: "BlobHas_structConnection";
            edges: Array<{
                __typename?: "BlobHas_structRelationship";
                properties: { __typename?: "HasNameRel"; name: string };
                node: {
                    __typename?: "Struct";
                    hash: string;
                    size: number;
                    kind: string;
                };
            }>;
        };
    }>;
};

export type FetchStructFieldsQueryVariables = Exact<{
    structHash: Scalars["String"]["input"];
}>;

export type FetchStructFieldsQuery = {
    __typename?: "Query";
    structs: Array<{
        __typename?: "Struct";
        fieldsConnection: {
            __typename?: "StructFieldsConnection";
            totalCount: number;
            edges: Array<{
                __typename?: "StructFieldsRelationship";
                properties: { __typename?: "HasNameRel"; name: string };
                node: {
                    __typename?: "StructField";
                    hash: string;
                    offset: number;
                    data_type: any;
                };
            }>;
        };
    }>;
};

export type ListStructsQueryVariables = Exact<{
    blobHash: Scalars["String"]["input"];
    first?: InputMaybe<Scalars["Int"]["input"]>;
    after?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type ListStructsQuery = {
    __typename?: "Query";
    blobs: Array<{
        __typename?: "Blob";
        has_structConnection: {
            __typename?: "BlobHas_structConnection";
            totalCount: number;
            edges: Array<{
                __typename?: "BlobHas_structRelationship";
                properties: { __typename?: "HasNameRel"; name: string };
                node: {
                    __typename?: "Struct";
                    hash: string;
                    size: number;
                    kind: string;
                };
            }>;
            pageInfo: {
                __typename?: "PageInfo";
                hasNextPage: boolean;
                endCursor?: string | null;
            };
        };
    }>;
};

export type ListStructsByNameQueryVariables = Exact<{
    blobHash: Scalars["String"]["input"];
    structName: Scalars["String"]["input"];
    first?: InputMaybe<Scalars["Int"]["input"]>;
    after?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type ListStructsByNameQuery = {
    __typename?: "Query";
    blobs: Array<{
        __typename?: "Blob";
        has_structConnection: {
            __typename?: "BlobHas_structConnection";
            totalCount: number;
            edges: Array<{
                __typename?: "BlobHas_structRelationship";
                properties: { __typename?: "HasNameRel"; name: string };
                node: {
                    __typename?: "Struct";
                    hash: string;
                    size: number;
                    kind: string;
                };
            }>;
            pageInfo: {
                __typename?: "PageInfo";
                hasNextPage: boolean;
                endCursor?: string | null;
            };
        };
    }>;
};

export type ListSymbolsQueryVariables = Exact<{
    blobHash: Scalars["String"]["input"];
    first?: InputMaybe<Scalars["Int"]["input"]>;
    after?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type ListSymbolsQuery = {
    __typename?: "Query";
    blobs: Array<{
        __typename?: "Blob";
        has_symbolConnection: {
            __typename?: "BlobHas_symbolConnection";
            totalCount: number;
            edges: Array<{
                __typename?: "BlobHas_symbolRelationship";
                properties: { __typename?: "HasNameRel"; name: string };
                node: { __typename?: "Symbol"; hash: string; address: string };
            }>;
            pageInfo: {
                __typename?: "PageInfo";
                hasNextPage: boolean;
                endCursor?: string | null;
            };
        };
    }>;
};

export type ListSymbolsByNameQueryVariables = Exact<{
    blobHash: Scalars["String"]["input"];
    symbolName: Scalars["String"]["input"];
    first?: InputMaybe<Scalars["Int"]["input"]>;
    after?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type ListSymbolsByNameQuery = {
    __typename?: "Query";
    blobs: Array<{
        __typename?: "Blob";
        has_symbolConnection: {
            __typename?: "BlobHas_symbolConnection";
            totalCount: number;
            edges: Array<{
                __typename?: "BlobHas_symbolRelationship";
                properties: { __typename?: "HasNameRel"; name: string };
                node: { __typename?: "Symbol"; hash: string; address: string };
            }>;
            pageInfo: {
                __typename?: "PageInfo";
                hasNextPage: boolean;
                endCursor?: string | null;
            };
        };
    }>;
};

export type ListTreeQueryVariables = Exact<{
    treeHash: Scalars["String"]["input"];
    first?: InputMaybe<Scalars["Int"]["input"]>;
    afterTrees?: InputMaybe<Scalars["String"]["input"]>;
    afterBlobs?: InputMaybe<Scalars["String"]["input"]>;
    includeTrees: Scalars["Boolean"]["input"];
    includeBlobs: Scalars["Boolean"]["input"];
}>;

export type ListTreeQuery = {
    __typename?: "Query";
    trees: Array<{
        __typename?: "Tree";
        child_treesConnection?: {
            __typename?: "TreeChild_treesConnection";
            totalCount: number;
            edges: Array<{
                __typename?: "TreeChild_treesRelationship";
                properties: { __typename?: "HasFilenameRel"; name: string };
                node: { __typename?: "Tree"; hash: string };
            }>;
            pageInfo: {
                __typename?: "PageInfo";
                hasNextPage: boolean;
                endCursor?: string | null;
            };
        };
        child_blobsConnection?: {
            __typename?: "TreeChild_blobsConnection";
            totalCount: number;
            edges: Array<{
                __typename?: "TreeChild_blobsRelationship";
                properties: { __typename?: "HasFilenameRel"; name: string };
                node: { __typename?: "Blob"; hash: string };
            }>;
            pageInfo: {
                __typename?: "PageInfo";
                hasNextPage: boolean;
                endCursor?: string | null;
            };
        };
    }>;
};

export type ListRegistryKeyQueryVariables = Exact<{
    keyHash: Scalars["String"]["input"];
    first?: InputMaybe<Scalars["Int"]["input"]>;
    afterKeys?: InputMaybe<Scalars["String"]["input"]>;
    afterValues?: InputMaybe<Scalars["String"]["input"]>;
    includeKeys: Scalars["Boolean"]["input"];
    includeValues: Scalars["Boolean"]["input"];
}>;

export type ListRegistryKeyQuery = {
    __typename?: "Query";
    winRegKeys: Array<{
        __typename?: "WinRegKey";
        child_keysConnection?: {
            __typename?: "WinRegKeyChild_keysConnection";
            totalCount: number;
            edges: Array<{
                __typename?: "WinRegKeyChild_keysRelationship";
                properties: { __typename?: "HasFilenameRel"; name: string };
                node: { __typename?: "WinRegKey"; hash: string };
            }>;
            pageInfo: {
                __typename?: "PageInfo";
                hasNextPage: boolean;
                endCursor?: string | null;
            };
        };
        child_valuesConnection?: {
            __typename?: "WinRegKeyChild_valuesConnection";
            totalCount: number;
            edges: Array<{
                __typename?: "WinRegKeyChild_valuesRelationship";
                properties: { __typename?: "HasFilenameRel"; name: string };
                node: {
                    __typename?: "WinRegValue";
                    hash: string;
                    type: string;
                    value: string;
                };
            }>;
            pageInfo: {
                __typename?: "PageInfo";
                hasNextPage: boolean;
                endCursor?: string | null;
            };
        };
    }>;
};

export type TraverseRegistryPathQueryVariables = Exact<{
    rootHash: Scalars["String"]["input"];
    path: Scalars["String"]["input"];
}>;

export type TraverseRegistryPathQuery = {
    __typename?: "Query";
    traversePath?: string | null;
};

export type GitLogQueryVariables = Exact<{
    path: Scalars["String"]["input"];
    context: EntityType;
    commitRange: CommitRange;
    options?: InputMaybe<GitLogOptions>;
}>;

export type GitLogQuery = {
    __typename?: "Query";
    gitLog: {
        __typename?: "GitLogResult";
        total_count: number;
        has_more: boolean;
        entries: Array<{
            __typename?: "GitLogEntry";
            base_commit?: {
                __typename?: "Commit";
                hash: string;
                name: string;
                date: any;
            } | null;
            diffee_commit: {
                __typename?: "Commit";
                hash: string;
                name: string;
                date: any;
            };
            diff: {
                __typename?: "DiffItem";
                path: string;
                status: DiffStatus;
                type: NodeType;
                old_props?: {
                    __typename?: "HashableNodeProps";
                    hash: string;
                    properties: any;
                } | null;
                new_props?: {
                    __typename?: "HashableNodeProps";
                    hash: string;
                    properties: any;
                } | null;
            };
        }>;
    };
};

export type GetCommitCapabilitiesQueryVariables = Exact<{
    commitHash: Scalars["String"]["input"];
}>;

export type GetCommitCapabilitiesQuery = {
    __typename?: "Query";
    getCommitExtractedDataLabels: Array<string>;
};

export const FetchBranchesDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "FetchBranches" },
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "branches" },
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "tracks" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "hash",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "name",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "date",
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const ResolveCommitRefDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "ResolveCommitRef" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "ref" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "branches" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "where" },
                                value: {
                                    kind: "ObjectValue",
                                    fields: [
                                        {
                                            kind: "ObjectField",
                                            name: {
                                                kind: "Name",
                                                value: "name",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "ref",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "tracks" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "hash",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "filesystem",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "hash",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "commits" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "where" },
                                value: {
                                    kind: "ObjectValue",
                                    fields: [
                                        {
                                            kind: "ObjectField",
                                            name: {
                                                kind: "Name",
                                                value: "hash",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "ref",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "hash" },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "filesystem" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "hash",
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const SearchDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "Search" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "input" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "SearchInput" },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "search" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "input" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "input" },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "type" },
                                },
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "commit_name",
                                    },
                                },
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "commit_hash",
                                    },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "blob_path" },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "blob_hash" },
                                },
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "entity_path",
                                    },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "node_hash" },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const FetchCommitHistoryDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "FetchCommitHistory" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "commitHash" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "direction" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "CommitHistoryDirection" },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "fetchCommitHistory" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "commit_hash" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "commitHash" },
                                },
                            },
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "direction" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "direction" },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "hash" },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                },
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "description",
                                    },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "date" },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "previous" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "hash",
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "next" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "hash",
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const DiffNodesAtDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "DiffNodesAt" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "parentLabel" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "baseNodeHash" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "diffeeNodeHash" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "atPath" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "maxDepth" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "Int" },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "withIntermediates" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "Boolean" },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "filter" },
                    },
                    type: {
                        kind: "ListType",
                        type: {
                            kind: "NonNullType",
                            type: {
                                kind: "NamedType",
                                name: { kind: "Name", value: "String" },
                            },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "options" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "DiffNodesOptions" },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "diffNodesAt" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "parent_label" },
                                value: {
                                    kind: "Variable",
                                    name: {
                                        kind: "Name",
                                        value: "parentLabel",
                                    },
                                },
                            },
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "base_node_hash" },
                                value: {
                                    kind: "Variable",
                                    name: {
                                        kind: "Name",
                                        value: "baseNodeHash",
                                    },
                                },
                            },
                            {
                                kind: "Argument",
                                name: {
                                    kind: "Name",
                                    value: "diffee_node_hash",
                                },
                                value: {
                                    kind: "Variable",
                                    name: {
                                        kind: "Name",
                                        value: "diffeeNodeHash",
                                    },
                                },
                            },
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "at_path" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "atPath" },
                                },
                            },
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "max_depth" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "maxDepth" },
                                },
                            },
                            {
                                kind: "Argument",
                                name: {
                                    kind: "Name",
                                    value: "with_intermediates",
                                },
                                value: {
                                    kind: "Variable",
                                    name: {
                                        kind: "Name",
                                        value: "withIntermediates",
                                    },
                                },
                            },
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "filter" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "filter" },
                                },
                            },
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "options" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "options" },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "total_count",
                                    },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "items" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "status",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "path",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "type",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "old_props",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "hash",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "properties",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "new_props",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "hash",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "properties",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const TraversePathDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "TraversePath" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "parentLabel" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "treeHash" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "path" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "traversePath" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "parent_label" },
                                value: {
                                    kind: "Variable",
                                    name: {
                                        kind: "Name",
                                        value: "parentLabel",
                                    },
                                },
                            },
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "tree_hash" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "treeHash" },
                                },
                            },
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "path" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "path" },
                                },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const GetBlobWinRegRootDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "GetBlobWinRegRoot" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "hash" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "blobs" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "where" },
                                value: {
                                    kind: "ObjectValue",
                                    fields: [
                                        {
                                            kind: "ObjectField",
                                            name: {
                                                kind: "Name",
                                                value: "hash",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "hash",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "hash" },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "has_winreg" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "hash",
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const GetBlobsWithSymbolsDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "GetBlobsWithSymbols" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "commitHash" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "getBlobsWithSymbols" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "commit_hash" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "commitHash" },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "blob_hash" },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "blob_path" },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const SearchWithSessionDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "SearchWithSession" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "input" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "SearchInput" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pageSize" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "Int" },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "searchWithSession" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "input" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "input" },
                                },
                            },
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "page_size" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "pageSize" },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "session_id" },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "results" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "type",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "commit_name",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "commit_hash",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "blob_path",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "blob_hash",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "entity_path",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "node_hash",
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "has_more" },
                                },
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "total_fetched",
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const SearchNextDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "SearchNext" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "sessionId" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "searchNext" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "session_id" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "sessionId" },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "session_id" },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "results" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "type",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "commit_name",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "commit_hash",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "blob_path",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "blob_hash",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "entity_path",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "node_hash",
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "has_more" },
                                },
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "total_fetched",
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const SearchCloseDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "mutation",
            name: { kind: "Name", value: "SearchClose" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "sessionId" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "searchClose" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "session_id" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "sessionId" },
                                },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const FetchStructByNameDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "FetchStructByName" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "blobHash" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "structName" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "blobs" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "where" },
                                value: {
                                    kind: "ObjectValue",
                                    fields: [
                                        {
                                            kind: "ObjectField",
                                            name: {
                                                kind: "Name",
                                                value: "hash",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "blobHash",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "has_structConnection",
                                    },
                                    arguments: [
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "where",
                                            },
                                            value: {
                                                kind: "ObjectValue",
                                                fields: [
                                                    {
                                                        kind: "ObjectField",
                                                        name: {
                                                            kind: "Name",
                                                            value: "edge",
                                                        },
                                                        value: {
                                                            kind: "ObjectValue",
                                                            fields: [
                                                                {
                                                                    kind: "ObjectField",
                                                                    name: {
                                                                        kind: "Name",
                                                                        value: "name",
                                                                    },
                                                                    value: {
                                                                        kind: "Variable",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "structName",
                                                                        },
                                                                    },
                                                                },
                                                            ],
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "edges",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "properties",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "name",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "node",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "hash",
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "size",
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "kind",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const FetchStructFieldsDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "FetchStructFields" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "structHash" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "structs" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "where" },
                                value: {
                                    kind: "ObjectValue",
                                    fields: [
                                        {
                                            kind: "ObjectField",
                                            name: {
                                                kind: "Name",
                                                value: "hash",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "structHash",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "fieldsConnection",
                                    },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "totalCount",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "edges",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "properties",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "name",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "node",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "hash",
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "offset",
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "data_type",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const ListStructsDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "ListStructs" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "blobHash" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "first" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "Int" },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "after" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "String" },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "blobs" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "where" },
                                value: {
                                    kind: "ObjectValue",
                                    fields: [
                                        {
                                            kind: "ObjectField",
                                            name: {
                                                kind: "Name",
                                                value: "hash",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "blobHash",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "has_structConnection",
                                    },
                                    arguments: [
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "first",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "first",
                                                },
                                            },
                                        },
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "after",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "after",
                                                },
                                            },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "totalCount",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "edges",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "properties",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "name",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "node",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "hash",
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "size",
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "kind",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "pageInfo",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "hasNextPage",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "endCursor",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const ListStructsByNameDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "ListStructsByName" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "blobHash" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "structName" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "first" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "Int" },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "after" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "String" },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "blobs" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "where" },
                                value: {
                                    kind: "ObjectValue",
                                    fields: [
                                        {
                                            kind: "ObjectField",
                                            name: {
                                                kind: "Name",
                                                value: "hash",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "blobHash",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "has_structConnection",
                                    },
                                    arguments: [
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "where",
                                            },
                                            value: {
                                                kind: "ObjectValue",
                                                fields: [
                                                    {
                                                        kind: "ObjectField",
                                                        name: {
                                                            kind: "Name",
                                                            value: "edge",
                                                        },
                                                        value: {
                                                            kind: "ObjectValue",
                                                            fields: [
                                                                {
                                                                    kind: "ObjectField",
                                                                    name: {
                                                                        kind: "Name",
                                                                        value: "name",
                                                                    },
                                                                    value: {
                                                                        kind: "Variable",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "structName",
                                                                        },
                                                                    },
                                                                },
                                                            ],
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "first",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "first",
                                                },
                                            },
                                        },
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "after",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "after",
                                                },
                                            },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "totalCount",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "edges",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "properties",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "name",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "node",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "hash",
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "size",
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "kind",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "pageInfo",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "hasNextPage",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "endCursor",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const ListSymbolsDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "ListSymbols" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "blobHash" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "first" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "Int" },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "after" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "String" },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "blobs" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "where" },
                                value: {
                                    kind: "ObjectValue",
                                    fields: [
                                        {
                                            kind: "ObjectField",
                                            name: {
                                                kind: "Name",
                                                value: "hash",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "blobHash",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "has_symbolConnection",
                                    },
                                    arguments: [
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "first",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "first",
                                                },
                                            },
                                        },
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "after",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "after",
                                                },
                                            },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "totalCount",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "edges",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "properties",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "name",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "node",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "hash",
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "address",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "pageInfo",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "hasNextPage",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "endCursor",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const ListSymbolsByNameDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "ListSymbolsByName" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "blobHash" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "symbolName" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "first" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "Int" },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "after" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "String" },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "blobs" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "where" },
                                value: {
                                    kind: "ObjectValue",
                                    fields: [
                                        {
                                            kind: "ObjectField",
                                            name: {
                                                kind: "Name",
                                                value: "hash",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "blobHash",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "has_symbolConnection",
                                    },
                                    arguments: [
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "where",
                                            },
                                            value: {
                                                kind: "ObjectValue",
                                                fields: [
                                                    {
                                                        kind: "ObjectField",
                                                        name: {
                                                            kind: "Name",
                                                            value: "edge",
                                                        },
                                                        value: {
                                                            kind: "ObjectValue",
                                                            fields: [
                                                                {
                                                                    kind: "ObjectField",
                                                                    name: {
                                                                        kind: "Name",
                                                                        value: "name",
                                                                    },
                                                                    value: {
                                                                        kind: "Variable",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "symbolName",
                                                                        },
                                                                    },
                                                                },
                                                            ],
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "first",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "first",
                                                },
                                            },
                                        },
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "after",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "after",
                                                },
                                            },
                                        },
                                    ],
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "totalCount",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "edges",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "properties",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "name",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "node",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "hash",
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "address",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "pageInfo",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "hasNextPage",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "endCursor",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const ListTreeDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "ListTree" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "treeHash" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "first" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "Int" },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "afterTrees" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "String" },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "afterBlobs" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "String" },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "includeTrees" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "Boolean" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "includeBlobs" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "Boolean" },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "trees" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "where" },
                                value: {
                                    kind: "ObjectValue",
                                    fields: [
                                        {
                                            kind: "ObjectField",
                                            name: {
                                                kind: "Name",
                                                value: "hash",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "treeHash",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "child_treesConnection",
                                    },
                                    arguments: [
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "first",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "first",
                                                },
                                            },
                                        },
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "after",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "afterTrees",
                                                },
                                            },
                                        },
                                    ],
                                    directives: [
                                        {
                                            kind: "Directive",
                                            name: {
                                                kind: "Name",
                                                value: "include",
                                            },
                                            arguments: [
                                                {
                                                    kind: "Argument",
                                                    name: {
                                                        kind: "Name",
                                                        value: "if",
                                                    },
                                                    value: {
                                                        kind: "Variable",
                                                        name: {
                                                            kind: "Name",
                                                            value: "includeTrees",
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "totalCount",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "edges",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "properties",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "name",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "node",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "hash",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "pageInfo",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "hasNextPage",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "endCursor",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "child_blobsConnection",
                                    },
                                    arguments: [
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "first",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "first",
                                                },
                                            },
                                        },
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "after",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "afterBlobs",
                                                },
                                            },
                                        },
                                    ],
                                    directives: [
                                        {
                                            kind: "Directive",
                                            name: {
                                                kind: "Name",
                                                value: "include",
                                            },
                                            arguments: [
                                                {
                                                    kind: "Argument",
                                                    name: {
                                                        kind: "Name",
                                                        value: "if",
                                                    },
                                                    value: {
                                                        kind: "Variable",
                                                        name: {
                                                            kind: "Name",
                                                            value: "includeBlobs",
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "totalCount",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "edges",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "properties",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "name",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "node",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "hash",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "pageInfo",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "hasNextPage",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "endCursor",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const ListRegistryKeyDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "ListRegistryKey" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "keyHash" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "first" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "Int" },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "afterKeys" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "String" },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "afterValues" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "String" },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "includeKeys" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "Boolean" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "includeValues" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "Boolean" },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "winRegKeys" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "where" },
                                value: {
                                    kind: "ObjectValue",
                                    fields: [
                                        {
                                            kind: "ObjectField",
                                            name: {
                                                kind: "Name",
                                                value: "hash",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "keyHash",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "child_keysConnection",
                                    },
                                    arguments: [
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "first",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "first",
                                                },
                                            },
                                        },
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "after",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "afterKeys",
                                                },
                                            },
                                        },
                                    ],
                                    directives: [
                                        {
                                            kind: "Directive",
                                            name: {
                                                kind: "Name",
                                                value: "include",
                                            },
                                            arguments: [
                                                {
                                                    kind: "Argument",
                                                    name: {
                                                        kind: "Name",
                                                        value: "if",
                                                    },
                                                    value: {
                                                        kind: "Variable",
                                                        name: {
                                                            kind: "Name",
                                                            value: "includeKeys",
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "totalCount",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "edges",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "properties",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "name",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "node",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "hash",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "pageInfo",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "hasNextPage",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "endCursor",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "child_valuesConnection",
                                    },
                                    arguments: [
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "first",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "first",
                                                },
                                            },
                                        },
                                        {
                                            kind: "Argument",
                                            name: {
                                                kind: "Name",
                                                value: "after",
                                            },
                                            value: {
                                                kind: "Variable",
                                                name: {
                                                    kind: "Name",
                                                    value: "afterValues",
                                                },
                                            },
                                        },
                                    ],
                                    directives: [
                                        {
                                            kind: "Directive",
                                            name: {
                                                kind: "Name",
                                                value: "include",
                                            },
                                            arguments: [
                                                {
                                                    kind: "Argument",
                                                    name: {
                                                        kind: "Name",
                                                        value: "if",
                                                    },
                                                    value: {
                                                        kind: "Variable",
                                                        name: {
                                                            kind: "Name",
                                                            value: "includeValues",
                                                        },
                                                    },
                                                },
                                            ],
                                        },
                                    ],
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "totalCount",
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "edges",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "properties",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "name",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "node",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "hash",
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "type",
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "value",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "pageInfo",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "hasNextPage",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "endCursor",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const TraverseRegistryPathDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "TraverseRegistryPath" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "rootHash" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "path" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "traversePath" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "parent_label" },
                                value: {
                                    kind: "StringValue",
                                    value: "WinRegKey",
                                    block: false,
                                },
                            },
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "tree_hash" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "rootHash" },
                                },
                            },
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "path" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "path" },
                                },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const GitLogDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "GitLog" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "path" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "context" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "EntityType" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "commitRange" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "CommitRange" },
                        },
                    },
                },
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "options" },
                    },
                    type: {
                        kind: "NamedType",
                        name: { kind: "Name", value: "GitLogOptions" },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: { kind: "Name", value: "gitLog" },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "path" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "path" },
                                },
                            },
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "context" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "context" },
                                },
                            },
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "commit_range" },
                                value: {
                                    kind: "Variable",
                                    name: {
                                        kind: "Name",
                                        value: "commitRange",
                                    },
                                },
                            },
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "options" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "options" },
                                },
                            },
                        ],
                        selectionSet: {
                            kind: "SelectionSet",
                            selections: [
                                {
                                    kind: "Field",
                                    name: {
                                        kind: "Name",
                                        value: "total_count",
                                    },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "has_more" },
                                },
                                {
                                    kind: "Field",
                                    name: { kind: "Name", value: "entries" },
                                    selectionSet: {
                                        kind: "SelectionSet",
                                        selections: [
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "base_commit",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "hash",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "name",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "date",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "diffee_commit",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "hash",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "name",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "date",
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                kind: "Field",
                                                name: {
                                                    kind: "Name",
                                                    value: "diff",
                                                },
                                                selectionSet: {
                                                    kind: "SelectionSet",
                                                    selections: [
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "path",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "status",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "type",
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "old_props",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "hash",
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "properties",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                        {
                                                            kind: "Field",
                                                            name: {
                                                                kind: "Name",
                                                                value: "new_props",
                                                            },
                                                            selectionSet: {
                                                                kind: "SelectionSet",
                                                                selections: [
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "hash",
                                                                        },
                                                                    },
                                                                    {
                                                                        kind: "Field",
                                                                        name: {
                                                                            kind: "Name",
                                                                            value: "properties",
                                                                        },
                                                                    },
                                                                ],
                                                            },
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export const GetCommitCapabilitiesDocument = {
    kind: "Document",
    definitions: [
        {
            kind: "OperationDefinition",
            operation: "query",
            name: { kind: "Name", value: "GetCommitCapabilities" },
            variableDefinitions: [
                {
                    kind: "VariableDefinition",
                    variable: {
                        kind: "Variable",
                        name: { kind: "Name", value: "commitHash" },
                    },
                    type: {
                        kind: "NonNullType",
                        type: {
                            kind: "NamedType",
                            name: { kind: "Name", value: "String" },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: "SelectionSet",
                selections: [
                    {
                        kind: "Field",
                        name: {
                            kind: "Name",
                            value: "getCommitExtractedDataLabels",
                        },
                        arguments: [
                            {
                                kind: "Argument",
                                name: { kind: "Name", value: "commit_hash" },
                                value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "commitHash" },
                                },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode;
export type Requester<C = {}> = <R, V>(
    doc: DocumentNode,
    vars?: V,
    options?: C,
) => Promise<R> | AsyncIterable<R>;
export function getSdk<C>(requester: Requester<C>) {
    return {
        FetchBranches(
            variables?: FetchBranchesQueryVariables,
            options?: C,
        ): Promise<FetchBranchesQuery> {
            return requester<FetchBranchesQuery, FetchBranchesQueryVariables>(
                FetchBranchesDocument,
                variables,
                options,
            ) as Promise<FetchBranchesQuery>;
        },
        ResolveCommitRef(
            variables: ResolveCommitRefQueryVariables,
            options?: C,
        ): Promise<ResolveCommitRefQuery> {
            return requester<
                ResolveCommitRefQuery,
                ResolveCommitRefQueryVariables
            >(
                ResolveCommitRefDocument,
                variables,
                options,
            ) as Promise<ResolveCommitRefQuery>;
        },
        Search(
            variables: SearchQueryVariables,
            options?: C,
        ): Promise<SearchQuery> {
            return requester<SearchQuery, SearchQueryVariables>(
                SearchDocument,
                variables,
                options,
            ) as Promise<SearchQuery>;
        },
        FetchCommitHistory(
            variables: FetchCommitHistoryQueryVariables,
            options?: C,
        ): Promise<FetchCommitHistoryQuery> {
            return requester<
                FetchCommitHistoryQuery,
                FetchCommitHistoryQueryVariables
            >(
                FetchCommitHistoryDocument,
                variables,
                options,
            ) as Promise<FetchCommitHistoryQuery>;
        },
        DiffNodesAt(
            variables: DiffNodesAtQueryVariables,
            options?: C,
        ): Promise<DiffNodesAtQuery> {
            return requester<DiffNodesAtQuery, DiffNodesAtQueryVariables>(
                DiffNodesAtDocument,
                variables,
                options,
            ) as Promise<DiffNodesAtQuery>;
        },
        TraversePath(
            variables: TraversePathQueryVariables,
            options?: C,
        ): Promise<TraversePathQuery> {
            return requester<TraversePathQuery, TraversePathQueryVariables>(
                TraversePathDocument,
                variables,
                options,
            ) as Promise<TraversePathQuery>;
        },
        GetBlobWinRegRoot(
            variables: GetBlobWinRegRootQueryVariables,
            options?: C,
        ): Promise<GetBlobWinRegRootQuery> {
            return requester<
                GetBlobWinRegRootQuery,
                GetBlobWinRegRootQueryVariables
            >(
                GetBlobWinRegRootDocument,
                variables,
                options,
            ) as Promise<GetBlobWinRegRootQuery>;
        },
        GetBlobsWithSymbols(
            variables: GetBlobsWithSymbolsQueryVariables,
            options?: C,
        ): Promise<GetBlobsWithSymbolsQuery> {
            return requester<
                GetBlobsWithSymbolsQuery,
                GetBlobsWithSymbolsQueryVariables
            >(
                GetBlobsWithSymbolsDocument,
                variables,
                options,
            ) as Promise<GetBlobsWithSymbolsQuery>;
        },
        SearchWithSession(
            variables: SearchWithSessionQueryVariables,
            options?: C,
        ): Promise<SearchWithSessionQuery> {
            return requester<
                SearchWithSessionQuery,
                SearchWithSessionQueryVariables
            >(
                SearchWithSessionDocument,
                variables,
                options,
            ) as Promise<SearchWithSessionQuery>;
        },
        SearchNext(
            variables: SearchNextQueryVariables,
            options?: C,
        ): Promise<SearchNextQuery> {
            return requester<SearchNextQuery, SearchNextQueryVariables>(
                SearchNextDocument,
                variables,
                options,
            ) as Promise<SearchNextQuery>;
        },
        SearchClose(
            variables: SearchCloseMutationVariables,
            options?: C,
        ): Promise<SearchCloseMutation> {
            return requester<SearchCloseMutation, SearchCloseMutationVariables>(
                SearchCloseDocument,
                variables,
                options,
            ) as Promise<SearchCloseMutation>;
        },
        FetchStructByName(
            variables: FetchStructByNameQueryVariables,
            options?: C,
        ): Promise<FetchStructByNameQuery> {
            return requester<
                FetchStructByNameQuery,
                FetchStructByNameQueryVariables
            >(
                FetchStructByNameDocument,
                variables,
                options,
            ) as Promise<FetchStructByNameQuery>;
        },
        FetchStructFields(
            variables: FetchStructFieldsQueryVariables,
            options?: C,
        ): Promise<FetchStructFieldsQuery> {
            return requester<
                FetchStructFieldsQuery,
                FetchStructFieldsQueryVariables
            >(
                FetchStructFieldsDocument,
                variables,
                options,
            ) as Promise<FetchStructFieldsQuery>;
        },
        ListStructs(
            variables: ListStructsQueryVariables,
            options?: C,
        ): Promise<ListStructsQuery> {
            return requester<ListStructsQuery, ListStructsQueryVariables>(
                ListStructsDocument,
                variables,
                options,
            ) as Promise<ListStructsQuery>;
        },
        ListStructsByName(
            variables: ListStructsByNameQueryVariables,
            options?: C,
        ): Promise<ListStructsByNameQuery> {
            return requester<
                ListStructsByNameQuery,
                ListStructsByNameQueryVariables
            >(
                ListStructsByNameDocument,
                variables,
                options,
            ) as Promise<ListStructsByNameQuery>;
        },
        ListSymbols(
            variables: ListSymbolsQueryVariables,
            options?: C,
        ): Promise<ListSymbolsQuery> {
            return requester<ListSymbolsQuery, ListSymbolsQueryVariables>(
                ListSymbolsDocument,
                variables,
                options,
            ) as Promise<ListSymbolsQuery>;
        },
        ListSymbolsByName(
            variables: ListSymbolsByNameQueryVariables,
            options?: C,
        ): Promise<ListSymbolsByNameQuery> {
            return requester<
                ListSymbolsByNameQuery,
                ListSymbolsByNameQueryVariables
            >(
                ListSymbolsByNameDocument,
                variables,
                options,
            ) as Promise<ListSymbolsByNameQuery>;
        },
        ListTree(
            variables: ListTreeQueryVariables,
            options?: C,
        ): Promise<ListTreeQuery> {
            return requester<ListTreeQuery, ListTreeQueryVariables>(
                ListTreeDocument,
                variables,
                options,
            ) as Promise<ListTreeQuery>;
        },
        ListRegistryKey(
            variables: ListRegistryKeyQueryVariables,
            options?: C,
        ): Promise<ListRegistryKeyQuery> {
            return requester<
                ListRegistryKeyQuery,
                ListRegistryKeyQueryVariables
            >(
                ListRegistryKeyDocument,
                variables,
                options,
            ) as Promise<ListRegistryKeyQuery>;
        },
        TraverseRegistryPath(
            variables: TraverseRegistryPathQueryVariables,
            options?: C,
        ): Promise<TraverseRegistryPathQuery> {
            return requester<
                TraverseRegistryPathQuery,
                TraverseRegistryPathQueryVariables
            >(
                TraverseRegistryPathDocument,
                variables,
                options,
            ) as Promise<TraverseRegistryPathQuery>;
        },
        GitLog(
            variables: GitLogQueryVariables,
            options?: C,
        ): Promise<GitLogQuery> {
            return requester<GitLogQuery, GitLogQueryVariables>(
                GitLogDocument,
                variables,
                options,
            ) as Promise<GitLogQuery>;
        },
        GetCommitCapabilities(
            variables: GetCommitCapabilitiesQueryVariables,
            options?: C,
        ): Promise<GetCommitCapabilitiesQuery> {
            return requester<
                GetCommitCapabilitiesQuery,
                GetCommitCapabilitiesQueryVariables
            >(
                GetCommitCapabilitiesDocument,
                variables,
                options,
            ) as Promise<GetCommitCapabilitiesQuery>;
        },
    };
}
export type Sdk = ReturnType<typeof getSdk>;
