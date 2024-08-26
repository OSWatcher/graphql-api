import type { SelectionSetNode, DocumentNode } from "graphql";
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
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: { input: string; output: string };
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: { input: boolean; output: boolean };
  /** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  Int: { input: number; output: number };
  /** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Float: { input: number; output: number };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export type Query = {
  __typename?: "Query";
  diffNodesAt: Array<DiffItem>;
  fetchCommitHistory: Array<Commit>;
  traversePath?: Maybe<Scalars["String"]["output"]>;
  getCommitExtractedDataLabels: Array<Scalars["String"]["output"]>;
  search: Array<SearchResult>;
  hashables: Array<Hashable>;
  hashablesConnection: HashablesConnection;
  hashablesAggregate: HashableAggregateSelection;
  blobs: Array<Blob>;
  blobsConnection: BlobsConnection;
  blobsAggregate: BlobAggregateSelection;
  trees: Array<Tree>;
  treesConnection: TreesConnection;
  treesAggregate: TreeAggregateSelection;
  commits: Array<Commit>;
  commitsConnection: CommitsConnection;
  commitsAggregate: CommitAggregateSelection;
  branches: Array<Branch>;
  branchesConnection: BranchesConnection;
  branchesAggregate: BranchAggregateSelection;
  winRegValues: Array<WinRegValue>;
  winRegValuesConnection: WinRegValuesConnection;
  winRegValuesAggregate: WinRegValueAggregateSelection;
  winRegKeys: Array<WinRegKey>;
  winRegKeysConnection: WinRegKeysConnection;
  winRegKeysAggregate: WinRegKeyAggregateSelection;
  symbols: Array<Symbol>;
  symbolsConnection: SymbolsConnection;
  symbolsAggregate: SymbolAggregateSelection;
  winStructs: Array<WinStruct>;
  winStructsConnection: WinStructsConnection;
  winStructsAggregate: WinStructAggregateSelection;
  winStructFields: Array<WinStructField>;
  winStructFieldsConnection: WinStructFieldsConnection;
  winStructFieldsAggregate: WinStructFieldAggregateSelection;
  winDataTypes: Array<WinDataType>;
  winDataTypesConnection: WinDataTypesConnection;
  winDataTypesAggregate: WinDataTypeAggregateSelection;
  hashableNodeProps: Array<HashableNodeProps>;
  hashableNodePropsConnection: HashableNodePropsConnection;
  hashableNodePropsAggregate: HashableNodePropsAggregateSelection;
  diffItems: Array<DiffItem>;
  diffItemsConnection: DiffItemsConnection;
  diffItemsAggregate: DiffItemAggregateSelection;
  users: Array<User>;
  usersConnection: UsersConnection;
  usersAggregate: UserAggregateSelection;
  searchResults: Array<SearchResult>;
  searchResultsConnection: SearchResultsConnection;
  searchResultsAggregate: SearchResultAggregateSelection;
};

export type QueryDiffNodesAtArgs = {
  parent_label: Scalars["String"]["input"];
  base_node_hash: Scalars["String"]["input"];
  diffee_node_hash: Scalars["String"]["input"];
  at_path: Scalars["String"]["input"];
  max_depth?: InputMaybe<Scalars["Int"]["input"]>;
  filter?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type QueryFetchCommitHistoryArgs = {
  branch_name: Scalars["String"]["input"];
};

export type QueryTraversePathArgs = {
  tree_hash: Scalars["String"]["input"];
  path: Scalars["String"]["input"];
};

export type QueryGetCommitExtractedDataLabelsArgs = {
  commit_hash: Scalars["String"]["input"];
};

export type QuerySearchArgs = {
  search_term: Scalars["String"]["input"];
};

export type QueryHashablesArgs = {
  where?: InputMaybe<HashableWhere>;
  options?: InputMaybe<HashableOptions>;
};

export type QueryHashablesConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<HashableWhere>;
  sort?: InputMaybe<Array<InputMaybe<HashableSort>>>;
};

export type QueryHashablesAggregateArgs = {
  where?: InputMaybe<HashableWhere>;
};

export type QueryBlobsArgs = {
  where?: InputMaybe<BlobWhere>;
  options?: InputMaybe<BlobOptions>;
};

export type QueryBlobsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<BlobWhere>;
  sort?: InputMaybe<Array<InputMaybe<BlobSort>>>;
};

export type QueryBlobsAggregateArgs = {
  where?: InputMaybe<BlobWhere>;
};

export type QueryTreesArgs = {
  where?: InputMaybe<TreeWhere>;
  options?: InputMaybe<TreeOptions>;
};

export type QueryTreesConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<TreeWhere>;
  sort?: InputMaybe<Array<InputMaybe<TreeSort>>>;
};

export type QueryTreesAggregateArgs = {
  where?: InputMaybe<TreeWhere>;
};

export type QueryCommitsArgs = {
  where?: InputMaybe<CommitWhere>;
  options?: InputMaybe<CommitOptions>;
};

export type QueryCommitsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<CommitWhere>;
  sort?: InputMaybe<Array<InputMaybe<CommitSort>>>;
};

export type QueryCommitsAggregateArgs = {
  where?: InputMaybe<CommitWhere>;
};

export type QueryBranchesArgs = {
  where?: InputMaybe<BranchWhere>;
  options?: InputMaybe<BranchOptions>;
};

export type QueryBranchesConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<BranchWhere>;
  sort?: InputMaybe<Array<InputMaybe<BranchSort>>>;
};

export type QueryBranchesAggregateArgs = {
  where?: InputMaybe<BranchWhere>;
};

export type QueryWinRegValuesArgs = {
  where?: InputMaybe<WinRegValueWhere>;
  options?: InputMaybe<WinRegValueOptions>;
};

export type QueryWinRegValuesConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<WinRegValueWhere>;
  sort?: InputMaybe<Array<InputMaybe<WinRegValueSort>>>;
};

export type QueryWinRegValuesAggregateArgs = {
  where?: InputMaybe<WinRegValueWhere>;
};

export type QueryWinRegKeysArgs = {
  where?: InputMaybe<WinRegKeyWhere>;
  options?: InputMaybe<WinRegKeyOptions>;
};

export type QueryWinRegKeysConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<WinRegKeyWhere>;
  sort?: InputMaybe<Array<InputMaybe<WinRegKeySort>>>;
};

export type QueryWinRegKeysAggregateArgs = {
  where?: InputMaybe<WinRegKeyWhere>;
};

export type QuerySymbolsArgs = {
  where?: InputMaybe<SymbolWhere>;
  options?: InputMaybe<SymbolOptions>;
};

export type QuerySymbolsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<SymbolWhere>;
  sort?: InputMaybe<Array<InputMaybe<SymbolSort>>>;
};

export type QuerySymbolsAggregateArgs = {
  where?: InputMaybe<SymbolWhere>;
};

export type QueryWinStructsArgs = {
  where?: InputMaybe<WinStructWhere>;
  options?: InputMaybe<WinStructOptions>;
};

export type QueryWinStructsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<WinStructWhere>;
  sort?: InputMaybe<Array<InputMaybe<WinStructSort>>>;
};

export type QueryWinStructsAggregateArgs = {
  where?: InputMaybe<WinStructWhere>;
};

export type QueryWinStructFieldsArgs = {
  where?: InputMaybe<WinStructFieldWhere>;
  options?: InputMaybe<WinStructFieldOptions>;
};

export type QueryWinStructFieldsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<WinStructFieldWhere>;
  sort?: InputMaybe<Array<InputMaybe<WinStructFieldSort>>>;
};

export type QueryWinStructFieldsAggregateArgs = {
  where?: InputMaybe<WinStructFieldWhere>;
};

export type QueryWinDataTypesArgs = {
  where?: InputMaybe<WinDataTypeWhere>;
  options?: InputMaybe<WinDataTypeOptions>;
};

export type QueryWinDataTypesConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<WinDataTypeWhere>;
  sort?: InputMaybe<Array<InputMaybe<WinDataTypeSort>>>;
};

export type QueryWinDataTypesAggregateArgs = {
  where?: InputMaybe<WinDataTypeWhere>;
};

export type QueryHashableNodePropsArgs = {
  where?: InputMaybe<HashableNodePropsWhere>;
  options?: InputMaybe<HashableNodePropsOptions>;
};

export type QueryHashableNodePropsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<HashableNodePropsWhere>;
  sort?: InputMaybe<Array<InputMaybe<HashableNodePropsSort>>>;
};

export type QueryHashableNodePropsAggregateArgs = {
  where?: InputMaybe<HashableNodePropsWhere>;
};

export type QueryDiffItemsArgs = {
  where?: InputMaybe<DiffItemWhere>;
  options?: InputMaybe<DiffItemOptions>;
};

export type QueryDiffItemsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<DiffItemWhere>;
  sort?: InputMaybe<Array<InputMaybe<DiffItemSort>>>;
};

export type QueryDiffItemsAggregateArgs = {
  where?: InputMaybe<DiffItemWhere>;
};

export type QueryUsersArgs = {
  where?: InputMaybe<UserWhere>;
  options?: InputMaybe<UserOptions>;
};

export type QueryUsersConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<UserWhere>;
  sort?: InputMaybe<Array<InputMaybe<UserSort>>>;
};

export type QueryUsersAggregateArgs = {
  where?: InputMaybe<UserWhere>;
};

export type QuerySearchResultsArgs = {
  where?: InputMaybe<SearchResultWhere>;
  options?: InputMaybe<SearchResultOptions>;
};

export type QuerySearchResultsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<SearchResultWhere>;
  sort?: InputMaybe<Array<InputMaybe<SearchResultSort>>>;
};

export type QuerySearchResultsAggregateArgs = {
  where?: InputMaybe<SearchResultWhere>;
};

export type Mutation = {
  __typename?: "Mutation";
  mergeTree: Scalars["String"]["output"];
  createBlobs: CreateBlobsMutationResponse;
  deleteBlobs: DeleteInfo;
  updateBlobs: UpdateBlobsMutationResponse;
  createTrees: CreateTreesMutationResponse;
  deleteTrees: DeleteInfo;
  updateTrees: UpdateTreesMutationResponse;
  createCommits: CreateCommitsMutationResponse;
  deleteCommits: DeleteInfo;
  updateCommits: UpdateCommitsMutationResponse;
  createBranches: CreateBranchesMutationResponse;
  deleteBranches: DeleteInfo;
  updateBranches: UpdateBranchesMutationResponse;
  createWinRegValues: CreateWinRegValuesMutationResponse;
  deleteWinRegValues: DeleteInfo;
  updateWinRegValues: UpdateWinRegValuesMutationResponse;
  createWinRegKeys: CreateWinRegKeysMutationResponse;
  deleteWinRegKeys: DeleteInfo;
  updateWinRegKeys: UpdateWinRegKeysMutationResponse;
  createSymbols: CreateSymbolsMutationResponse;
  deleteSymbols: DeleteInfo;
  updateSymbols: UpdateSymbolsMutationResponse;
  createWinStructs: CreateWinStructsMutationResponse;
  deleteWinStructs: DeleteInfo;
  updateWinStructs: UpdateWinStructsMutationResponse;
  createWinStructFields: CreateWinStructFieldsMutationResponse;
  deleteWinStructFields: DeleteInfo;
  updateWinStructFields: UpdateWinStructFieldsMutationResponse;
  createWinDataTypes: CreateWinDataTypesMutationResponse;
  deleteWinDataTypes: DeleteInfo;
  updateWinDataTypes: UpdateWinDataTypesMutationResponse;
  createHashableNodeProps: CreateHashableNodePropsMutationResponse;
  deleteHashableNodeProps: DeleteInfo;
  updateHashableNodeProps: UpdateHashableNodePropsMutationResponse;
  createDiffItems: CreateDiffItemsMutationResponse;
  deleteDiffItems: DeleteInfo;
  updateDiffItems: UpdateDiffItemsMutationResponse;
  createUsers: CreateUsersMutationResponse;
  deleteUsers: DeleteInfo;
  updateUsers: UpdateUsersMutationResponse;
  createSearchResults: CreateSearchResultsMutationResponse;
  deleteSearchResults: DeleteInfo;
  updateSearchResults: UpdateSearchResultsMutationResponse;
};

export type MutationMergeTreeArgs = {
  input: TreeCreateInput;
};

export type MutationCreateBlobsArgs = {
  input: Array<BlobCreateInput>;
};

export type MutationDeleteBlobsArgs = {
  where?: InputMaybe<BlobWhere>;
  delete?: InputMaybe<BlobDeleteInput>;
};

export type MutationUpdateBlobsArgs = {
  where?: InputMaybe<BlobWhere>;
  update?: InputMaybe<BlobUpdateInput>;
  connect?: InputMaybe<BlobConnectInput>;
  disconnect?: InputMaybe<BlobDisconnectInput>;
  create?: InputMaybe<BlobRelationInput>;
  delete?: InputMaybe<BlobDeleteInput>;
  connectOrCreate?: InputMaybe<BlobConnectOrCreateInput>;
};

export type MutationCreateTreesArgs = {
  input: Array<TreeCreateInput>;
};

export type MutationDeleteTreesArgs = {
  where?: InputMaybe<TreeWhere>;
  delete?: InputMaybe<TreeDeleteInput>;
};

export type MutationUpdateTreesArgs = {
  where?: InputMaybe<TreeWhere>;
  update?: InputMaybe<TreeUpdateInput>;
  connect?: InputMaybe<TreeConnectInput>;
  disconnect?: InputMaybe<TreeDisconnectInput>;
  create?: InputMaybe<TreeRelationInput>;
  delete?: InputMaybe<TreeDeleteInput>;
  connectOrCreate?: InputMaybe<TreeConnectOrCreateInput>;
};

export type MutationCreateCommitsArgs = {
  input: Array<CommitCreateInput>;
};

export type MutationDeleteCommitsArgs = {
  where?: InputMaybe<CommitWhere>;
  delete?: InputMaybe<CommitDeleteInput>;
};

export type MutationUpdateCommitsArgs = {
  where?: InputMaybe<CommitWhere>;
  update?: InputMaybe<CommitUpdateInput>;
  connect?: InputMaybe<CommitConnectInput>;
  disconnect?: InputMaybe<CommitDisconnectInput>;
  create?: InputMaybe<CommitRelationInput>;
  delete?: InputMaybe<CommitDeleteInput>;
  connectOrCreate?: InputMaybe<CommitConnectOrCreateInput>;
};

export type MutationCreateBranchesArgs = {
  input: Array<BranchCreateInput>;
};

export type MutationDeleteBranchesArgs = {
  where?: InputMaybe<BranchWhere>;
  delete?: InputMaybe<BranchDeleteInput>;
};

export type MutationUpdateBranchesArgs = {
  where?: InputMaybe<BranchWhere>;
  update?: InputMaybe<BranchUpdateInput>;
  connect?: InputMaybe<BranchConnectInput>;
  disconnect?: InputMaybe<BranchDisconnectInput>;
  create?: InputMaybe<BranchRelationInput>;
  delete?: InputMaybe<BranchDeleteInput>;
  connectOrCreate?: InputMaybe<BranchConnectOrCreateInput>;
};

export type MutationCreateWinRegValuesArgs = {
  input: Array<WinRegValueCreateInput>;
};

export type MutationDeleteWinRegValuesArgs = {
  where?: InputMaybe<WinRegValueWhere>;
};

export type MutationUpdateWinRegValuesArgs = {
  where?: InputMaybe<WinRegValueWhere>;
  update?: InputMaybe<WinRegValueUpdateInput>;
};

export type MutationCreateWinRegKeysArgs = {
  input: Array<WinRegKeyCreateInput>;
};

export type MutationDeleteWinRegKeysArgs = {
  where?: InputMaybe<WinRegKeyWhere>;
  delete?: InputMaybe<WinRegKeyDeleteInput>;
};

export type MutationUpdateWinRegKeysArgs = {
  where?: InputMaybe<WinRegKeyWhere>;
  update?: InputMaybe<WinRegKeyUpdateInput>;
  connect?: InputMaybe<WinRegKeyConnectInput>;
  disconnect?: InputMaybe<WinRegKeyDisconnectInput>;
  create?: InputMaybe<WinRegKeyRelationInput>;
  delete?: InputMaybe<WinRegKeyDeleteInput>;
  connectOrCreate?: InputMaybe<WinRegKeyConnectOrCreateInput>;
};

export type MutationCreateSymbolsArgs = {
  input: Array<SymbolCreateInput>;
};

export type MutationDeleteSymbolsArgs = {
  where?: InputMaybe<SymbolWhere>;
  delete?: InputMaybe<SymbolDeleteInput>;
};

export type MutationUpdateSymbolsArgs = {
  where?: InputMaybe<SymbolWhere>;
  update?: InputMaybe<SymbolUpdateInput>;
  connect?: InputMaybe<SymbolConnectInput>;
  disconnect?: InputMaybe<SymbolDisconnectInput>;
  create?: InputMaybe<SymbolRelationInput>;
  delete?: InputMaybe<SymbolDeleteInput>;
  connectOrCreate?: InputMaybe<SymbolConnectOrCreateInput>;
};

export type MutationCreateWinStructsArgs = {
  input: Array<WinStructCreateInput>;
};

export type MutationDeleteWinStructsArgs = {
  where?: InputMaybe<WinStructWhere>;
  delete?: InputMaybe<WinStructDeleteInput>;
};

export type MutationUpdateWinStructsArgs = {
  where?: InputMaybe<WinStructWhere>;
  update?: InputMaybe<WinStructUpdateInput>;
  connect?: InputMaybe<WinStructConnectInput>;
  disconnect?: InputMaybe<WinStructDisconnectInput>;
  create?: InputMaybe<WinStructRelationInput>;
  delete?: InputMaybe<WinStructDeleteInput>;
  connectOrCreate?: InputMaybe<WinStructConnectOrCreateInput>;
};

export type MutationCreateWinStructFieldsArgs = {
  input: Array<WinStructFieldCreateInput>;
};

export type MutationDeleteWinStructFieldsArgs = {
  where?: InputMaybe<WinStructFieldWhere>;
  delete?: InputMaybe<WinStructFieldDeleteInput>;
};

export type MutationUpdateWinStructFieldsArgs = {
  where?: InputMaybe<WinStructFieldWhere>;
  update?: InputMaybe<WinStructFieldUpdateInput>;
  connect?: InputMaybe<WinStructFieldConnectInput>;
  disconnect?: InputMaybe<WinStructFieldDisconnectInput>;
  create?: InputMaybe<WinStructFieldRelationInput>;
  delete?: InputMaybe<WinStructFieldDeleteInput>;
  connectOrCreate?: InputMaybe<WinStructFieldConnectOrCreateInput>;
};

export type MutationCreateWinDataTypesArgs = {
  input: Array<WinDataTypeCreateInput>;
};

export type MutationDeleteWinDataTypesArgs = {
  where?: InputMaybe<WinDataTypeWhere>;
  delete?: InputMaybe<WinDataTypeDeleteInput>;
};

export type MutationUpdateWinDataTypesArgs = {
  where?: InputMaybe<WinDataTypeWhere>;
  update?: InputMaybe<WinDataTypeUpdateInput>;
  connect?: InputMaybe<WinDataTypeConnectInput>;
  disconnect?: InputMaybe<WinDataTypeDisconnectInput>;
  create?: InputMaybe<WinDataTypeRelationInput>;
  delete?: InputMaybe<WinDataTypeDeleteInput>;
  connectOrCreate?: InputMaybe<WinDataTypeConnectOrCreateInput>;
};

export type MutationCreateHashableNodePropsArgs = {
  input: Array<HashableNodePropsCreateInput>;
};

export type MutationDeleteHashableNodePropsArgs = {
  where?: InputMaybe<HashableNodePropsWhere>;
};

export type MutationUpdateHashableNodePropsArgs = {
  where?: InputMaybe<HashableNodePropsWhere>;
  update?: InputMaybe<HashableNodePropsUpdateInput>;
};

export type MutationCreateDiffItemsArgs = {
  input: Array<DiffItemCreateInput>;
};

export type MutationDeleteDiffItemsArgs = {
  where?: InputMaybe<DiffItemWhere>;
};

export type MutationUpdateDiffItemsArgs = {
  where?: InputMaybe<DiffItemWhere>;
  update?: InputMaybe<DiffItemUpdateInput>;
};

export type MutationCreateUsersArgs = {
  input: Array<UserCreateInput>;
};

export type MutationDeleteUsersArgs = {
  where?: InputMaybe<UserWhere>;
};

export type MutationUpdateUsersArgs = {
  where?: InputMaybe<UserWhere>;
  update?: InputMaybe<UserUpdateInput>;
};

export type MutationCreateSearchResultsArgs = {
  input: Array<SearchResultCreateInput>;
};

export type MutationDeleteSearchResultsArgs = {
  where?: InputMaybe<SearchResultWhere>;
};

export type MutationUpdateSearchResultsArgs = {
  where?: InputMaybe<SearchResultWhere>;
  update?: InputMaybe<SearchResultUpdateInput>;
};

export enum DiffStatus {
  New = "NEW",
  Mod = "MOD",
  Del = "DEL",
}

export enum HashableImplementation {
  Blob = "Blob",
  Tree = "Tree",
  Commit = "Commit",
  WinRegValue = "WinRegValue",
  WinRegKey = "WinRegKey",
  WinStruct = "WinStruct",
  WinStructField = "WinStructField",
  WinDataType = "WinDataType",
}

export enum NodeType {
  Blob = "Blob",
  Tree = "Tree",
}

/** An enum for sorting in either ascending or descending order. */
export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = "ASC",
  /** Sort by field values in descending order. */
  Desc = "DESC",
}

export type Hashable = {
  hash: Scalars["String"]["output"];
};

export type Blob = Hashable & {
  __typename?: "Blob";
  hash: Scalars["String"]["output"];
  has_winregAggregate?: Maybe<BlobWinRegKeyHas_WinregAggregationSelection>;
  has_winreg?: Maybe<WinRegKey>;
  has_winregConnection: BlobHas_WinregConnection;
  has_symbolAggregate?: Maybe<BlobSymbolHas_SymbolAggregationSelection>;
  has_symbol: Array<Symbol>;
  has_symbolConnection: BlobHas_SymbolConnection;
  has_structAggregate?: Maybe<BlobWinStructHas_StructAggregationSelection>;
  has_struct: Array<WinStruct>;
  has_structConnection: BlobHas_StructConnection;
};

export type BlobHas_WinregAggregateArgs = {
  where?: InputMaybe<WinRegKeyWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type BlobHas_WinregArgs = {
  where?: InputMaybe<WinRegKeyWhere>;
  options?: InputMaybe<WinRegKeyOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type BlobHas_WinregConnectionArgs = {
  where?: InputMaybe<BlobHas_WinregConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<BlobHas_WinregConnectionSort>>;
};

export type BlobHas_SymbolAggregateArgs = {
  where?: InputMaybe<SymbolWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type BlobHas_SymbolArgs = {
  where?: InputMaybe<SymbolWhere>;
  options?: InputMaybe<SymbolOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type BlobHas_SymbolConnectionArgs = {
  where?: InputMaybe<BlobHas_SymbolConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<BlobHas_SymbolConnectionSort>>;
};

export type BlobHas_StructAggregateArgs = {
  where?: InputMaybe<WinStructWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type BlobHas_StructArgs = {
  where?: InputMaybe<WinStructWhere>;
  options?: InputMaybe<WinStructOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type BlobHas_StructConnectionArgs = {
  where?: InputMaybe<BlobHas_StructConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<BlobHas_StructConnectionSort>>;
};

export type BlobAggregateSelection = {
  __typename?: "BlobAggregateSelection";
  count: Scalars["Int"]["output"];
  hash: StringAggregateSelection;
};

export type BlobEdge = {
  __typename?: "BlobEdge";
  cursor: Scalars["String"]["output"];
  node: Blob;
};

export type BlobHas_StructConnection = {
  __typename?: "BlobHas_structConnection";
  edges: Array<BlobHas_StructRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
};

export type BlobHas_StructRelationship = {
  __typename?: "BlobHas_structRelationship";
  cursor: Scalars["String"]["output"];
  node: WinStruct;
};

export type BlobHas_SymbolConnection = {
  __typename?: "BlobHas_symbolConnection";
  edges: Array<BlobHas_SymbolRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
};

export type BlobHas_SymbolRelationship = {
  __typename?: "BlobHas_symbolRelationship";
  cursor: Scalars["String"]["output"];
  node: Symbol;
  properties: HasSymbolAddressRel;
};

export type BlobHas_WinregConnection = {
  __typename?: "BlobHas_winregConnection";
  edges: Array<BlobHas_WinregRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
};

export type BlobHas_WinregRelationship = {
  __typename?: "BlobHas_winregRelationship";
  cursor: Scalars["String"]["output"];
  node: WinRegKey;
};

export type BlobsConnection = {
  __typename?: "BlobsConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<BlobEdge>;
};

export type BlobSymbolHas_SymbolAggregationSelection = {
  __typename?: "BlobSymbolHas_symbolAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<BlobSymbolHas_SymbolNodeAggregateSelection>;
  edge?: Maybe<BlobSymbolHas_SymbolEdgeAggregateSelection>;
};

export type BlobSymbolHas_SymbolEdgeAggregateSelection = {
  __typename?: "BlobSymbolHas_symbolEdgeAggregateSelection";
  address: StringAggregateSelection;
};

export type BlobSymbolHas_SymbolNodeAggregateSelection = {
  __typename?: "BlobSymbolHas_symbolNodeAggregateSelection";
  name: StringAggregateSelection;
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

export type BlobWinStructHas_StructAggregationSelection = {
  __typename?: "BlobWinStructHas_structAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<BlobWinStructHas_StructNodeAggregateSelection>;
};

export type BlobWinStructHas_StructNodeAggregateSelection = {
  __typename?: "BlobWinStructHas_structNodeAggregateSelection";
  hash: StringAggregateSelection;
  name: StringAggregateSelection;
  size: IntAggregateSelection;
  kind: StringAggregateSelection;
};

export type Branch = {
  __typename?: "Branch";
  name: Scalars["String"]["output"];
  tracksAggregate?: Maybe<BranchCommitTracksAggregationSelection>;
  tracks?: Maybe<Commit>;
  tracksConnection: BranchTracksConnection;
};

export type BranchTracksAggregateArgs = {
  where?: InputMaybe<CommitWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type BranchTracksArgs = {
  where?: InputMaybe<CommitWhere>;
  options?: InputMaybe<CommitOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type BranchTracksConnectionArgs = {
  where?: InputMaybe<BranchTracksConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<BranchTracksConnectionSort>>;
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
  hash: StringAggregateSelection;
  name: StringAggregateSelection;
  description: StringAggregateSelection;
  date: StringAggregateSelection;
};

export type BranchEdge = {
  __typename?: "BranchEdge";
  cursor: Scalars["String"]["output"];
  node: Branch;
};

export type BranchesConnection = {
  __typename?: "BranchesConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<BranchEdge>;
};

export type BranchTracksConnection = {
  __typename?: "BranchTracksConnection";
  edges: Array<BranchTracksRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
};

export type BranchTracksRelationship = {
  __typename?: "BranchTracksRelationship";
  cursor: Scalars["String"]["output"];
  node: Commit;
};

export type Commit = Hashable & {
  __typename?: "Commit";
  hash: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  date: Scalars["String"]["output"];
  previousAggregate?: Maybe<CommitCommitPreviousAggregationSelection>;
  previous?: Maybe<Commit>;
  previousConnection: CommitPreviousConnection;
  filesystemAggregate?: Maybe<CommitTreeFilesystemAggregationSelection>;
  filesystem?: Maybe<Tree>;
  filesystemConnection: CommitFilesystemConnection;
};

export type CommitPreviousAggregateArgs = {
  where?: InputMaybe<CommitWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type CommitPreviousArgs = {
  where?: InputMaybe<CommitWhere>;
  options?: InputMaybe<CommitOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type CommitPreviousConnectionArgs = {
  where?: InputMaybe<CommitPreviousConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<CommitPreviousConnectionSort>>;
};

export type CommitFilesystemAggregateArgs = {
  where?: InputMaybe<TreeWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type CommitFilesystemArgs = {
  where?: InputMaybe<TreeWhere>;
  options?: InputMaybe<TreeOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type CommitFilesystemConnectionArgs = {
  where?: InputMaybe<CommitFilesystemConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<CommitFilesystemConnectionSort>>;
};

export type CommitAggregateSelection = {
  __typename?: "CommitAggregateSelection";
  count: Scalars["Int"]["output"];
  hash: StringAggregateSelection;
  name: StringAggregateSelection;
  description: StringAggregateSelection;
  date: StringAggregateSelection;
};

export type CommitCommitPreviousAggregationSelection = {
  __typename?: "CommitCommitPreviousAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<CommitCommitPreviousNodeAggregateSelection>;
};

export type CommitCommitPreviousNodeAggregateSelection = {
  __typename?: "CommitCommitPreviousNodeAggregateSelection";
  hash: StringAggregateSelection;
  name: StringAggregateSelection;
  description: StringAggregateSelection;
  date: StringAggregateSelection;
};

export type CommitEdge = {
  __typename?: "CommitEdge";
  cursor: Scalars["String"]["output"];
  node: Commit;
};

export type CommitFilesystemConnection = {
  __typename?: "CommitFilesystemConnection";
  edges: Array<CommitFilesystemRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
};

export type CommitFilesystemRelationship = {
  __typename?: "CommitFilesystemRelationship";
  cursor: Scalars["String"]["output"];
  node: Tree;
};

export type CommitPreviousConnection = {
  __typename?: "CommitPreviousConnection";
  edges: Array<CommitPreviousRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
};

export type CommitPreviousRelationship = {
  __typename?: "CommitPreviousRelationship";
  cursor: Scalars["String"]["output"];
  node: Commit;
};

export type CommitsConnection = {
  __typename?: "CommitsConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<CommitEdge>;
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

export type CreateBlobsMutationResponse = {
  __typename?: "CreateBlobsMutationResponse";
  info: CreateInfo;
  blobs: Array<Blob>;
};

export type CreateBranchesMutationResponse = {
  __typename?: "CreateBranchesMutationResponse";
  info: CreateInfo;
  branches: Array<Branch>;
};

export type CreateCommitsMutationResponse = {
  __typename?: "CreateCommitsMutationResponse";
  info: CreateInfo;
  commits: Array<Commit>;
};

export type CreateDiffItemsMutationResponse = {
  __typename?: "CreateDiffItemsMutationResponse";
  info: CreateInfo;
  diffItems: Array<DiffItem>;
};

export type CreateHashableNodePropsMutationResponse = {
  __typename?: "CreateHashableNodePropsMutationResponse";
  info: CreateInfo;
  hashableNodeProps: Array<HashableNodeProps>;
};

/** Information about the number of nodes and relationships created during a create mutation */
export type CreateInfo = {
  __typename?: "CreateInfo";
  /** @deprecated This field has been deprecated because bookmarks are now handled by the driver. */
  bookmark?: Maybe<Scalars["String"]["output"]>;
  nodesCreated: Scalars["Int"]["output"];
  relationshipsCreated: Scalars["Int"]["output"];
};

export type CreateSearchResultsMutationResponse = {
  __typename?: "CreateSearchResultsMutationResponse";
  info: CreateInfo;
  searchResults: Array<SearchResult>;
};

export type CreateSymbolsMutationResponse = {
  __typename?: "CreateSymbolsMutationResponse";
  info: CreateInfo;
  symbols: Array<Symbol>;
};

export type CreateTreesMutationResponse = {
  __typename?: "CreateTreesMutationResponse";
  info: CreateInfo;
  trees: Array<Tree>;
};

export type CreateUsersMutationResponse = {
  __typename?: "CreateUsersMutationResponse";
  info: CreateInfo;
  users: Array<User>;
};

export type CreateWinDataTypesMutationResponse = {
  __typename?: "CreateWinDataTypesMutationResponse";
  info: CreateInfo;
  winDataTypes: Array<WinDataType>;
};

export type CreateWinRegKeysMutationResponse = {
  __typename?: "CreateWinRegKeysMutationResponse";
  info: CreateInfo;
  winRegKeys: Array<WinRegKey>;
};

export type CreateWinRegValuesMutationResponse = {
  __typename?: "CreateWinRegValuesMutationResponse";
  info: CreateInfo;
  winRegValues: Array<WinRegValue>;
};

export type CreateWinStructFieldsMutationResponse = {
  __typename?: "CreateWinStructFieldsMutationResponse";
  info: CreateInfo;
  winStructFields: Array<WinStructField>;
};

export type CreateWinStructsMutationResponse = {
  __typename?: "CreateWinStructsMutationResponse";
  info: CreateInfo;
  winStructs: Array<WinStruct>;
};

/** Information about the number of nodes and relationships deleted during a delete mutation */
export type DeleteInfo = {
  __typename?: "DeleteInfo";
  /** @deprecated This field has been deprecated because bookmarks are now handled by the driver. */
  bookmark?: Maybe<Scalars["String"]["output"]>;
  nodesDeleted: Scalars["Int"]["output"];
  relationshipsDeleted: Scalars["Int"]["output"];
};

export type DiffItem = {
  __typename?: "DiffItem";
  status: DiffStatus;
  path: Scalars["String"]["output"];
  type: NodeType;
  old_props?: Maybe<HashableNodeProps>;
  new_props?: Maybe<HashableNodeProps>;
};

export type DiffItemAggregateSelection = {
  __typename?: "DiffItemAggregateSelection";
  count: Scalars["Int"]["output"];
  path: StringAggregateSelection;
};

export type DiffItemEdge = {
  __typename?: "DiffItemEdge";
  cursor: Scalars["String"]["output"];
  node: DiffItem;
};

export type DiffItemsConnection = {
  __typename?: "DiffItemsConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<DiffItemEdge>;
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

export type HashableNodeProps = {
  __typename?: "HashableNodeProps";
  hash: Scalars["String"]["output"];
  properties: Scalars["JSON"]["output"];
};

export type HashableNodePropsAggregateSelection = {
  __typename?: "HashableNodePropsAggregateSelection";
  count: Scalars["Int"]["output"];
  hash: StringAggregateSelection;
};

export type HashableNodePropsConnection = {
  __typename?: "HashableNodePropsConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<HashableNodePropsEdge>;
};

export type HashableNodePropsEdge = {
  __typename?: "HashableNodePropsEdge";
  cursor: Scalars["String"]["output"];
  node: HashableNodeProps;
};

export type HashablesConnection = {
  __typename?: "HashablesConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<HashableEdge>;
};

/**
 * The edge properties for the following fields:
 * * Blob.has_symbol
 * * Symbol.blob
 */
export type HasSymbolAddressRel = {
  __typename?: "HasSymbolAddressRel";
  address: Scalars["String"]["output"];
};

export type IntAggregateSelection = {
  __typename?: "IntAggregateSelection";
  max?: Maybe<Scalars["Int"]["output"]>;
  min?: Maybe<Scalars["Int"]["output"]>;
  average?: Maybe<Scalars["Float"]["output"]>;
  sum?: Maybe<Scalars["Int"]["output"]>;
};

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"]["output"];
  hasPreviousPage: Scalars["Boolean"]["output"];
  startCursor?: Maybe<Scalars["String"]["output"]>;
  endCursor?: Maybe<Scalars["String"]["output"]>;
};

export type SearchResult = {
  __typename?: "SearchResult";
  commit_name: Scalars["String"]["output"];
  commit_hash: Scalars["String"]["output"];
  hash: Scalars["String"]["output"];
  path: Scalars["String"]["output"];
};

export type SearchResultAggregateSelection = {
  __typename?: "SearchResultAggregateSelection";
  count: Scalars["Int"]["output"];
  commit_name: StringAggregateSelection;
  commit_hash: StringAggregateSelection;
  hash: StringAggregateSelection;
  path: StringAggregateSelection;
};

export type SearchResultEdge = {
  __typename?: "SearchResultEdge";
  cursor: Scalars["String"]["output"];
  node: SearchResult;
};

export type SearchResultsConnection = {
  __typename?: "SearchResultsConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<SearchResultEdge>;
};

export type StringAggregateSelection = {
  __typename?: "StringAggregateSelection";
  shortest?: Maybe<Scalars["String"]["output"]>;
  longest?: Maybe<Scalars["String"]["output"]>;
};

export type Symbol = {
  __typename?: "Symbol";
  name: Scalars["String"]["output"];
  blobAggregate?: Maybe<SymbolBlobBlobAggregationSelection>;
  blob: Blob;
  blobConnection: SymbolBlobConnection;
};

export type SymbolBlobAggregateArgs = {
  where?: InputMaybe<BlobWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SymbolBlobArgs = {
  where?: InputMaybe<BlobWhere>;
  options?: InputMaybe<BlobOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SymbolBlobConnectionArgs = {
  where?: InputMaybe<SymbolBlobConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<SymbolBlobConnectionSort>>;
};

export type SymbolAggregateSelection = {
  __typename?: "SymbolAggregateSelection";
  count: Scalars["Int"]["output"];
  name: StringAggregateSelection;
};

export type SymbolBlobBlobAggregationSelection = {
  __typename?: "SymbolBlobBlobAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<SymbolBlobBlobNodeAggregateSelection>;
  edge?: Maybe<SymbolBlobBlobEdgeAggregateSelection>;
};

export type SymbolBlobBlobEdgeAggregateSelection = {
  __typename?: "SymbolBlobBlobEdgeAggregateSelection";
  address: StringAggregateSelection;
};

export type SymbolBlobBlobNodeAggregateSelection = {
  __typename?: "SymbolBlobBlobNodeAggregateSelection";
  hash: StringAggregateSelection;
};

export type SymbolBlobConnection = {
  __typename?: "SymbolBlobConnection";
  edges: Array<SymbolBlobRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
};

export type SymbolBlobRelationship = {
  __typename?: "SymbolBlobRelationship";
  cursor: Scalars["String"]["output"];
  node: Blob;
  properties: HasSymbolAddressRel;
};

export type SymbolEdge = {
  __typename?: "SymbolEdge";
  cursor: Scalars["String"]["output"];
  node: Symbol;
};

export type SymbolsConnection = {
  __typename?: "SymbolsConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<SymbolEdge>;
};

export type Tree = Hashable & {
  __typename?: "Tree";
  hash: Scalars["String"]["output"];
  child_blobsAggregate?: Maybe<TreeBlobChild_BlobsAggregationSelection>;
  child_blobs: Array<Blob>;
  child_blobsConnection: TreeChild_BlobsConnection;
  child_treesAggregate?: Maybe<TreeTreeChild_TreesAggregationSelection>;
  child_trees: Array<Tree>;
  child_treesConnection: TreeChild_TreesConnection;
};

export type TreeChild_BlobsAggregateArgs = {
  where?: InputMaybe<BlobWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type TreeChild_BlobsArgs = {
  where?: InputMaybe<BlobWhere>;
  options?: InputMaybe<BlobOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type TreeChild_BlobsConnectionArgs = {
  where?: InputMaybe<TreeChild_BlobsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<TreeChild_BlobsConnectionSort>>;
};

export type TreeChild_TreesAggregateArgs = {
  where?: InputMaybe<TreeWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type TreeChild_TreesArgs = {
  where?: InputMaybe<TreeWhere>;
  options?: InputMaybe<TreeOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type TreeChild_TreesConnectionArgs = {
  where?: InputMaybe<TreeChild_TreesConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<TreeChild_TreesConnectionSort>>;
};

export type TreeAggregateSelection = {
  __typename?: "TreeAggregateSelection";
  count: Scalars["Int"]["output"];
  hash: StringAggregateSelection;
};

export type TreeBlobChild_BlobsAggregationSelection = {
  __typename?: "TreeBlobChild_blobsAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<TreeBlobChild_BlobsNodeAggregateSelection>;
  edge?: Maybe<TreeBlobChild_BlobsEdgeAggregateSelection>;
};

export type TreeBlobChild_BlobsEdgeAggregateSelection = {
  __typename?: "TreeBlobChild_blobsEdgeAggregateSelection";
  name: StringAggregateSelection;
};

export type TreeBlobChild_BlobsNodeAggregateSelection = {
  __typename?: "TreeBlobChild_blobsNodeAggregateSelection";
  hash: StringAggregateSelection;
};

export type TreeChild_BlobsConnection = {
  __typename?: "TreeChild_blobsConnection";
  edges: Array<TreeChild_BlobsRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
};

export type TreeChild_BlobsRelationship = {
  __typename?: "TreeChild_blobsRelationship";
  cursor: Scalars["String"]["output"];
  node: Blob;
  properties: HasFilenameRel;
};

export type TreeChild_TreesConnection = {
  __typename?: "TreeChild_treesConnection";
  edges: Array<TreeChild_TreesRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
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

export type TreesConnection = {
  __typename?: "TreesConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<TreeEdge>;
};

export type TreeTreeChild_TreesAggregationSelection = {
  __typename?: "TreeTreeChild_treesAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<TreeTreeChild_TreesNodeAggregateSelection>;
  edge?: Maybe<TreeTreeChild_TreesEdgeAggregateSelection>;
};

export type TreeTreeChild_TreesEdgeAggregateSelection = {
  __typename?: "TreeTreeChild_treesEdgeAggregateSelection";
  name: StringAggregateSelection;
};

export type TreeTreeChild_TreesNodeAggregateSelection = {
  __typename?: "TreeTreeChild_treesNodeAggregateSelection";
  hash: StringAggregateSelection;
};

export type UpdateBlobsMutationResponse = {
  __typename?: "UpdateBlobsMutationResponse";
  info: UpdateInfo;
  blobs: Array<Blob>;
};

export type UpdateBranchesMutationResponse = {
  __typename?: "UpdateBranchesMutationResponse";
  info: UpdateInfo;
  branches: Array<Branch>;
};

export type UpdateCommitsMutationResponse = {
  __typename?: "UpdateCommitsMutationResponse";
  info: UpdateInfo;
  commits: Array<Commit>;
};

export type UpdateDiffItemsMutationResponse = {
  __typename?: "UpdateDiffItemsMutationResponse";
  info: UpdateInfo;
  diffItems: Array<DiffItem>;
};

export type UpdateHashableNodePropsMutationResponse = {
  __typename?: "UpdateHashableNodePropsMutationResponse";
  info: UpdateInfo;
  hashableNodeProps: Array<HashableNodeProps>;
};

/** Information about the number of nodes and relationships created and deleted during an update mutation */
export type UpdateInfo = {
  __typename?: "UpdateInfo";
  /** @deprecated This field has been deprecated because bookmarks are now handled by the driver. */
  bookmark?: Maybe<Scalars["String"]["output"]>;
  nodesCreated: Scalars["Int"]["output"];
  nodesDeleted: Scalars["Int"]["output"];
  relationshipsCreated: Scalars["Int"]["output"];
  relationshipsDeleted: Scalars["Int"]["output"];
};

export type UpdateSearchResultsMutationResponse = {
  __typename?: "UpdateSearchResultsMutationResponse";
  info: UpdateInfo;
  searchResults: Array<SearchResult>;
};

export type UpdateSymbolsMutationResponse = {
  __typename?: "UpdateSymbolsMutationResponse";
  info: UpdateInfo;
  symbols: Array<Symbol>;
};

export type UpdateTreesMutationResponse = {
  __typename?: "UpdateTreesMutationResponse";
  info: UpdateInfo;
  trees: Array<Tree>;
};

export type UpdateUsersMutationResponse = {
  __typename?: "UpdateUsersMutationResponse";
  info: UpdateInfo;
  users: Array<User>;
};

export type UpdateWinDataTypesMutationResponse = {
  __typename?: "UpdateWinDataTypesMutationResponse";
  info: UpdateInfo;
  winDataTypes: Array<WinDataType>;
};

export type UpdateWinRegKeysMutationResponse = {
  __typename?: "UpdateWinRegKeysMutationResponse";
  info: UpdateInfo;
  winRegKeys: Array<WinRegKey>;
};

export type UpdateWinRegValuesMutationResponse = {
  __typename?: "UpdateWinRegValuesMutationResponse";
  info: UpdateInfo;
  winRegValues: Array<WinRegValue>;
};

export type UpdateWinStructFieldsMutationResponse = {
  __typename?: "UpdateWinStructFieldsMutationResponse";
  info: UpdateInfo;
  winStructFields: Array<WinStructField>;
};

export type UpdateWinStructsMutationResponse = {
  __typename?: "UpdateWinStructsMutationResponse";
  info: UpdateInfo;
  winStructs: Array<WinStruct>;
};

export type User = {
  __typename?: "User";
  name: Scalars["String"]["output"];
};

export type UserAggregateSelection = {
  __typename?: "UserAggregateSelection";
  count: Scalars["Int"]["output"];
  name: StringAggregateSelection;
};

export type UserEdge = {
  __typename?: "UserEdge";
  cursor: Scalars["String"]["output"];
  node: User;
};

export type UsersConnection = {
  __typename?: "UsersConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<UserEdge>;
};

export type WinDataType = Hashable & {
  __typename?: "WinDataType";
  hash: Scalars["String"]["output"];
  type: Scalars["String"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  array_counter?: Maybe<Scalars["Int"]["output"]>;
  bit_position?: Maybe<Scalars["Int"]["output"]>;
  bit_length?: Maybe<Scalars["Int"]["output"]>;
  has_data_typeAggregate?: Maybe<WinDataTypeWinDataTypeHas_Data_TypeAggregationSelection>;
  has_data_type?: Maybe<WinDataType>;
  has_data_typeConnection: WinDataTypeHas_Data_TypeConnection;
};

export type WinDataTypeHas_Data_TypeAggregateArgs = {
  where?: InputMaybe<WinDataTypeWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type WinDataTypeHas_Data_TypeArgs = {
  where?: InputMaybe<WinDataTypeWhere>;
  options?: InputMaybe<WinDataTypeOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type WinDataTypeHas_Data_TypeConnectionArgs = {
  where?: InputMaybe<WinDataTypeHas_Data_TypeConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<WinDataTypeHas_Data_TypeConnectionSort>>;
};

export type WinDataTypeAggregateSelection = {
  __typename?: "WinDataTypeAggregateSelection";
  count: Scalars["Int"]["output"];
  hash: StringAggregateSelection;
  type: StringAggregateSelection;
  name: StringAggregateSelection;
  array_counter: IntAggregateSelection;
  bit_position: IntAggregateSelection;
  bit_length: IntAggregateSelection;
};

export type WinDataTypeEdge = {
  __typename?: "WinDataTypeEdge";
  cursor: Scalars["String"]["output"];
  node: WinDataType;
};

export type WinDataTypeHas_Data_TypeConnection = {
  __typename?: "WinDataTypeHas_data_typeConnection";
  edges: Array<WinDataTypeHas_Data_TypeRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
};

export type WinDataTypeHas_Data_TypeRelationship = {
  __typename?: "WinDataTypeHas_data_typeRelationship";
  cursor: Scalars["String"]["output"];
  node: WinDataType;
};

export type WinDataTypesConnection = {
  __typename?: "WinDataTypesConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<WinDataTypeEdge>;
};

export type WinDataTypeWinDataTypeHas_Data_TypeAggregationSelection = {
  __typename?: "WinDataTypeWinDataTypeHas_data_typeAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<WinDataTypeWinDataTypeHas_Data_TypeNodeAggregateSelection>;
};

export type WinDataTypeWinDataTypeHas_Data_TypeNodeAggregateSelection = {
  __typename?: "WinDataTypeWinDataTypeHas_data_typeNodeAggregateSelection";
  hash: StringAggregateSelection;
  type: StringAggregateSelection;
  name: StringAggregateSelection;
  array_counter: IntAggregateSelection;
  bit_position: IntAggregateSelection;
  bit_length: IntAggregateSelection;
};

export type WinRegKey = Hashable & {
  __typename?: "WinRegKey";
  hash: Scalars["String"]["output"];
  child_valuesAggregate?: Maybe<WinRegKeyWinRegValueChild_ValuesAggregationSelection>;
  child_values: Array<WinRegValue>;
  child_valuesConnection: WinRegKeyChild_ValuesConnection;
  child_keysAggregate?: Maybe<WinRegKeyWinRegKeyChild_KeysAggregationSelection>;
  child_keys: Array<WinRegKey>;
  child_keysConnection: WinRegKeyChild_KeysConnection;
};

export type WinRegKeyChild_ValuesAggregateArgs = {
  where?: InputMaybe<WinRegValueWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type WinRegKeyChild_ValuesArgs = {
  where?: InputMaybe<WinRegValueWhere>;
  options?: InputMaybe<WinRegValueOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type WinRegKeyChild_ValuesConnectionArgs = {
  where?: InputMaybe<WinRegKeyChild_ValuesConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<WinRegKeyChild_ValuesConnectionSort>>;
};

export type WinRegKeyChild_KeysAggregateArgs = {
  where?: InputMaybe<WinRegKeyWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type WinRegKeyChild_KeysArgs = {
  where?: InputMaybe<WinRegKeyWhere>;
  options?: InputMaybe<WinRegKeyOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type WinRegKeyChild_KeysConnectionArgs = {
  where?: InputMaybe<WinRegKeyChild_KeysConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<WinRegKeyChild_KeysConnectionSort>>;
};

export type WinRegKeyAggregateSelection = {
  __typename?: "WinRegKeyAggregateSelection";
  count: Scalars["Int"]["output"];
  hash: StringAggregateSelection;
};

export type WinRegKeyChild_KeysConnection = {
  __typename?: "WinRegKeyChild_keysConnection";
  edges: Array<WinRegKeyChild_KeysRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
};

export type WinRegKeyChild_KeysRelationship = {
  __typename?: "WinRegKeyChild_keysRelationship";
  cursor: Scalars["String"]["output"];
  node: WinRegKey;
  properties: HasFilenameRel;
};

export type WinRegKeyChild_ValuesConnection = {
  __typename?: "WinRegKeyChild_valuesConnection";
  edges: Array<WinRegKeyChild_ValuesRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
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

export type WinRegKeysConnection = {
  __typename?: "WinRegKeysConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<WinRegKeyEdge>;
};

export type WinRegKeyWinRegKeyChild_KeysAggregationSelection = {
  __typename?: "WinRegKeyWinRegKeyChild_keysAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<WinRegKeyWinRegKeyChild_KeysNodeAggregateSelection>;
  edge?: Maybe<WinRegKeyWinRegKeyChild_KeysEdgeAggregateSelection>;
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
  node?: Maybe<WinRegKeyWinRegValueChild_ValuesNodeAggregateSelection>;
  edge?: Maybe<WinRegKeyWinRegValueChild_ValuesEdgeAggregateSelection>;
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

export type WinRegValuesConnection = {
  __typename?: "WinRegValuesConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<WinRegValueEdge>;
};

export type WinStruct = Hashable & {
  __typename?: "WinStruct";
  hash: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  size: Scalars["Int"]["output"];
  kind: Scalars["String"]["output"];
  fieldsAggregate?: Maybe<WinStructWinStructFieldFieldsAggregationSelection>;
  fields: Array<WinStructField>;
  fieldsConnection: WinStructFieldsConnection;
  blobAggregate?: Maybe<WinStructBlobBlobAggregationSelection>;
  blob: Blob;
  blobConnection: WinStructBlobConnection;
};

export type WinStructFieldsAggregateArgs = {
  where?: InputMaybe<WinStructFieldWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type WinStructFieldsArgs = {
  where?: InputMaybe<WinStructFieldWhere>;
  options?: InputMaybe<WinStructFieldOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type WinStructFieldsConnectionArgs = {
  where?: InputMaybe<WinStructFieldsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<WinStructFieldsConnectionSort>>;
};

export type WinStructBlobAggregateArgs = {
  where?: InputMaybe<BlobWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type WinStructBlobArgs = {
  where?: InputMaybe<BlobWhere>;
  options?: InputMaybe<BlobOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type WinStructBlobConnectionArgs = {
  where?: InputMaybe<WinStructBlobConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<WinStructBlobConnectionSort>>;
};

export type WinStructAggregateSelection = {
  __typename?: "WinStructAggregateSelection";
  count: Scalars["Int"]["output"];
  hash: StringAggregateSelection;
  name: StringAggregateSelection;
  size: IntAggregateSelection;
  kind: StringAggregateSelection;
};

export type WinStructBlobBlobAggregationSelection = {
  __typename?: "WinStructBlobBlobAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<WinStructBlobBlobNodeAggregateSelection>;
};

export type WinStructBlobBlobNodeAggregateSelection = {
  __typename?: "WinStructBlobBlobNodeAggregateSelection";
  hash: StringAggregateSelection;
};

export type WinStructBlobConnection = {
  __typename?: "WinStructBlobConnection";
  edges: Array<WinStructBlobRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
};

export type WinStructBlobRelationship = {
  __typename?: "WinStructBlobRelationship";
  cursor: Scalars["String"]["output"];
  node: Blob;
};

export type WinStructEdge = {
  __typename?: "WinStructEdge";
  cursor: Scalars["String"]["output"];
  node: WinStruct;
};

export type WinStructField = Hashable & {
  __typename?: "WinStructField";
  hash: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  offset: Scalars["Int"]["output"];
  typeAggregate?: Maybe<WinStructFieldWinDataTypeTypeAggregationSelection>;
  type: WinDataType;
  typeConnection: WinStructFieldTypeConnection;
};

export type WinStructFieldTypeAggregateArgs = {
  where?: InputMaybe<WinDataTypeWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type WinStructFieldTypeArgs = {
  where?: InputMaybe<WinDataTypeWhere>;
  options?: InputMaybe<WinDataTypeOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type WinStructFieldTypeConnectionArgs = {
  where?: InputMaybe<WinStructFieldTypeConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<WinStructFieldTypeConnectionSort>>;
};

export type WinStructFieldAggregateSelection = {
  __typename?: "WinStructFieldAggregateSelection";
  count: Scalars["Int"]["output"];
  hash: StringAggregateSelection;
  name: StringAggregateSelection;
  offset: IntAggregateSelection;
};

export type WinStructFieldEdge = {
  __typename?: "WinStructFieldEdge";
  cursor: Scalars["String"]["output"];
  node: WinStructField;
};

export type WinStructFieldsConnection = {
  __typename?: "WinStructFieldsConnection";
  edges: Array<WinStructFieldsRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
};

export type WinStructFieldsRelationship = {
  __typename?: "WinStructFieldsRelationship";
  cursor: Scalars["String"]["output"];
  node: WinStructField;
};

export type WinStructFieldTypeConnection = {
  __typename?: "WinStructFieldTypeConnection";
  edges: Array<WinStructFieldTypeRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
};

export type WinStructFieldTypeRelationship = {
  __typename?: "WinStructFieldTypeRelationship";
  cursor: Scalars["String"]["output"];
  node: WinDataType;
};

export type WinStructFieldWinDataTypeTypeAggregationSelection = {
  __typename?: "WinStructFieldWinDataTypeTypeAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<WinStructFieldWinDataTypeTypeNodeAggregateSelection>;
};

export type WinStructFieldWinDataTypeTypeNodeAggregateSelection = {
  __typename?: "WinStructFieldWinDataTypeTypeNodeAggregateSelection";
  hash: StringAggregateSelection;
  type: StringAggregateSelection;
  name: StringAggregateSelection;
  array_counter: IntAggregateSelection;
  bit_position: IntAggregateSelection;
  bit_length: IntAggregateSelection;
};

export type WinStructsConnection = {
  __typename?: "WinStructsConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<WinStructEdge>;
};

export type WinStructWinStructFieldFieldsAggregationSelection = {
  __typename?: "WinStructWinStructFieldFieldsAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<WinStructWinStructFieldFieldsNodeAggregateSelection>;
};

export type WinStructWinStructFieldFieldsNodeAggregateSelection = {
  __typename?: "WinStructWinStructFieldFieldsNodeAggregateSelection";
  hash: StringAggregateSelection;
  name: StringAggregateSelection;
  offset: IntAggregateSelection;
};

export type BlobConnectInput = {
  has_winreg?: InputMaybe<BlobHas_WinregConnectFieldInput>;
  has_symbol?: InputMaybe<Array<BlobHas_SymbolConnectFieldInput>>;
  has_struct?: InputMaybe<Array<BlobHas_StructConnectFieldInput>>;
};

export type BlobConnectOrCreateInput = {
  has_winreg?: InputMaybe<BlobHas_WinregConnectOrCreateFieldInput>;
  has_struct?: InputMaybe<Array<BlobHas_StructConnectOrCreateFieldInput>>;
};

export type BlobConnectOrCreateWhere = {
  node: BlobUniqueWhere;
};

export type BlobConnectWhere = {
  node: BlobWhere;
};

export type BlobCreateInput = {
  hash: Scalars["String"]["input"];
  has_winreg?: InputMaybe<BlobHas_WinregFieldInput>;
  has_symbol?: InputMaybe<BlobHas_SymbolFieldInput>;
  has_struct?: InputMaybe<BlobHas_StructFieldInput>;
};

export type BlobDeleteInput = {
  has_winreg?: InputMaybe<BlobHas_WinregDeleteFieldInput>;
  has_symbol?: InputMaybe<Array<BlobHas_SymbolDeleteFieldInput>>;
  has_struct?: InputMaybe<Array<BlobHas_StructDeleteFieldInput>>;
};

export type BlobDisconnectInput = {
  has_winreg?: InputMaybe<BlobHas_WinregDisconnectFieldInput>;
  has_symbol?: InputMaybe<Array<BlobHas_SymbolDisconnectFieldInput>>;
  has_struct?: InputMaybe<Array<BlobHas_StructDisconnectFieldInput>>;
};

export type BlobHas_StructAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<BlobHas_StructAggregateInput>>;
  OR?: InputMaybe<Array<BlobHas_StructAggregateInput>>;
  NOT?: InputMaybe<BlobHas_StructAggregateInput>;
  node?: InputMaybe<BlobHas_StructNodeAggregationWhereInput>;
};

export type BlobHas_StructConnectFieldInput = {
  where?: InputMaybe<WinStructConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<Array<WinStructConnectInput>>;
};

export type BlobHas_StructConnectionSort = {
  node?: InputMaybe<WinStructSort>;
};

export type BlobHas_StructConnectionWhere = {
  AND?: InputMaybe<Array<BlobHas_StructConnectionWhere>>;
  OR?: InputMaybe<Array<BlobHas_StructConnectionWhere>>;
  NOT?: InputMaybe<BlobHas_StructConnectionWhere>;
  node?: InputMaybe<WinStructWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<WinStructWhere>;
};

export type BlobHas_StructConnectOrCreateFieldInput = {
  where: WinStructConnectOrCreateWhere;
  onCreate: BlobHas_StructConnectOrCreateFieldInputOnCreate;
};

export type BlobHas_StructConnectOrCreateFieldInputOnCreate = {
  node: WinStructOnCreateInput;
};

export type BlobHas_StructCreateFieldInput = {
  node: WinStructCreateInput;
};

export type BlobHas_StructDeleteFieldInput = {
  where?: InputMaybe<BlobHas_StructConnectionWhere>;
  delete?: InputMaybe<WinStructDeleteInput>;
};

export type BlobHas_StructDisconnectFieldInput = {
  where?: InputMaybe<BlobHas_StructConnectionWhere>;
  disconnect?: InputMaybe<WinStructDisconnectInput>;
};

export type BlobHas_StructFieldInput = {
  connectOrCreate?: InputMaybe<Array<BlobHas_StructConnectOrCreateFieldInput>>;
  connect?: InputMaybe<Array<BlobHas_StructConnectFieldInput>>;
  create?: InputMaybe<Array<BlobHas_StructCreateFieldInput>>;
};

export type BlobHas_StructNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<BlobHas_StructNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<BlobHas_StructNodeAggregationWhereInput>>;
  NOT?: InputMaybe<BlobHas_StructNodeAggregationWhereInput>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  size_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  size_MIN_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  size_MAX_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  size_SUM_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  size_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  size_GT?: InputMaybe<Scalars["Int"]["input"]>;
  size_MIN_GT?: InputMaybe<Scalars["Int"]["input"]>;
  size_MAX_GT?: InputMaybe<Scalars["Int"]["input"]>;
  size_SUM_GT?: InputMaybe<Scalars["Int"]["input"]>;
  size_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  size_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  size_MIN_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  size_MAX_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  size_SUM_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  size_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  size_LT?: InputMaybe<Scalars["Int"]["input"]>;
  size_MIN_LT?: InputMaybe<Scalars["Int"]["input"]>;
  size_MAX_LT?: InputMaybe<Scalars["Int"]["input"]>;
  size_SUM_LT?: InputMaybe<Scalars["Int"]["input"]>;
  size_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  size_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  size_MIN_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  size_MAX_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  size_SUM_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  size_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  kind_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  kind_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  kind_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  kind_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  kind_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  kind_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  kind_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  kind_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  kind_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  kind_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  kind_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  kind_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  kind_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  kind_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  kind_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  kind_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  kind_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  kind_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  kind_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  kind_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  kind_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  kind_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  kind_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  kind_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  kind_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  kind_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  kind_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  kind_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  kind_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  kind_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  kind_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  kind_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  kind_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  kind_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  kind_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type BlobHas_StructUpdateConnectionInput = {
  node?: InputMaybe<WinStructUpdateInput>;
};

export type BlobHas_StructUpdateFieldInput = {
  where?: InputMaybe<BlobHas_StructConnectionWhere>;
  connectOrCreate?: InputMaybe<Array<BlobHas_StructConnectOrCreateFieldInput>>;
  connect?: InputMaybe<Array<BlobHas_StructConnectFieldInput>>;
  disconnect?: InputMaybe<Array<BlobHas_StructDisconnectFieldInput>>;
  create?: InputMaybe<Array<BlobHas_StructCreateFieldInput>>;
  update?: InputMaybe<BlobHas_StructUpdateConnectionInput>;
  delete?: InputMaybe<Array<BlobHas_StructDeleteFieldInput>>;
};

export type BlobHas_SymbolAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<BlobHas_SymbolAggregateInput>>;
  OR?: InputMaybe<Array<BlobHas_SymbolAggregateInput>>;
  NOT?: InputMaybe<BlobHas_SymbolAggregateInput>;
  node?: InputMaybe<BlobHas_SymbolNodeAggregationWhereInput>;
  edge?: InputMaybe<HasSymbolAddressRelAggregationWhereInput>;
};

export type BlobHas_SymbolConnectFieldInput = {
  edge: HasSymbolAddressRelCreateInput;
  where?: InputMaybe<SymbolConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<Array<SymbolConnectInput>>;
};

export type BlobHas_SymbolConnectionSort = {
  node?: InputMaybe<SymbolSort>;
  edge?: InputMaybe<HasSymbolAddressRelSort>;
};

export type BlobHas_SymbolConnectionWhere = {
  AND?: InputMaybe<Array<BlobHas_SymbolConnectionWhere>>;
  OR?: InputMaybe<Array<BlobHas_SymbolConnectionWhere>>;
  NOT?: InputMaybe<BlobHas_SymbolConnectionWhere>;
  node?: InputMaybe<SymbolWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<SymbolWhere>;
  edge?: InputMaybe<HasSymbolAddressRelWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  edge_NOT?: InputMaybe<HasSymbolAddressRelWhere>;
};

export type BlobHas_SymbolCreateFieldInput = {
  edge: HasSymbolAddressRelCreateInput;
  node: SymbolCreateInput;
};

export type BlobHas_SymbolDeleteFieldInput = {
  where?: InputMaybe<BlobHas_SymbolConnectionWhere>;
  delete?: InputMaybe<SymbolDeleteInput>;
};

export type BlobHas_SymbolDisconnectFieldInput = {
  where?: InputMaybe<BlobHas_SymbolConnectionWhere>;
  disconnect?: InputMaybe<SymbolDisconnectInput>;
};

export type BlobHas_SymbolFieldInput = {
  connect?: InputMaybe<Array<BlobHas_SymbolConnectFieldInput>>;
  create?: InputMaybe<Array<BlobHas_SymbolCreateFieldInput>>;
};

export type BlobHas_SymbolNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<BlobHas_SymbolNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<BlobHas_SymbolNodeAggregationWhereInput>>;
  NOT?: InputMaybe<BlobHas_SymbolNodeAggregationWhereInput>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type BlobHas_SymbolUpdateConnectionInput = {
  node?: InputMaybe<SymbolUpdateInput>;
  edge?: InputMaybe<HasSymbolAddressRelUpdateInput>;
};

export type BlobHas_SymbolUpdateFieldInput = {
  where?: InputMaybe<BlobHas_SymbolConnectionWhere>;
  connect?: InputMaybe<Array<BlobHas_SymbolConnectFieldInput>>;
  disconnect?: InputMaybe<Array<BlobHas_SymbolDisconnectFieldInput>>;
  create?: InputMaybe<Array<BlobHas_SymbolCreateFieldInput>>;
  update?: InputMaybe<BlobHas_SymbolUpdateConnectionInput>;
  delete?: InputMaybe<Array<BlobHas_SymbolDeleteFieldInput>>;
};

export type BlobHas_WinregAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<BlobHas_WinregAggregateInput>>;
  OR?: InputMaybe<Array<BlobHas_WinregAggregateInput>>;
  NOT?: InputMaybe<BlobHas_WinregAggregateInput>;
  node?: InputMaybe<BlobHas_WinregNodeAggregationWhereInput>;
};

export type BlobHas_WinregConnectFieldInput = {
  where?: InputMaybe<WinRegKeyConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<WinRegKeyConnectInput>;
};

export type BlobHas_WinregConnectionSort = {
  node?: InputMaybe<WinRegKeySort>;
};

export type BlobHas_WinregConnectionWhere = {
  AND?: InputMaybe<Array<BlobHas_WinregConnectionWhere>>;
  OR?: InputMaybe<Array<BlobHas_WinregConnectionWhere>>;
  NOT?: InputMaybe<BlobHas_WinregConnectionWhere>;
  node?: InputMaybe<WinRegKeyWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<WinRegKeyWhere>;
};

export type BlobHas_WinregConnectOrCreateFieldInput = {
  where: WinRegKeyConnectOrCreateWhere;
  onCreate: BlobHas_WinregConnectOrCreateFieldInputOnCreate;
};

export type BlobHas_WinregConnectOrCreateFieldInputOnCreate = {
  node: WinRegKeyOnCreateInput;
};

export type BlobHas_WinregCreateFieldInput = {
  node: WinRegKeyCreateInput;
};

export type BlobHas_WinregDeleteFieldInput = {
  where?: InputMaybe<BlobHas_WinregConnectionWhere>;
  delete?: InputMaybe<WinRegKeyDeleteInput>;
};

export type BlobHas_WinregDisconnectFieldInput = {
  where?: InputMaybe<BlobHas_WinregConnectionWhere>;
  disconnect?: InputMaybe<WinRegKeyDisconnectInput>;
};

export type BlobHas_WinregFieldInput = {
  connectOrCreate?: InputMaybe<BlobHas_WinregConnectOrCreateFieldInput>;
  connect?: InputMaybe<BlobHas_WinregConnectFieldInput>;
  create?: InputMaybe<BlobHas_WinregCreateFieldInput>;
};

export type BlobHas_WinregNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<BlobHas_WinregNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<BlobHas_WinregNodeAggregationWhereInput>>;
  NOT?: InputMaybe<BlobHas_WinregNodeAggregationWhereInput>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type BlobHas_WinregUpdateConnectionInput = {
  node?: InputMaybe<WinRegKeyUpdateInput>;
};

export type BlobHas_WinregUpdateFieldInput = {
  where?: InputMaybe<BlobHas_WinregConnectionWhere>;
  connectOrCreate?: InputMaybe<BlobHas_WinregConnectOrCreateFieldInput>;
  connect?: InputMaybe<BlobHas_WinregConnectFieldInput>;
  disconnect?: InputMaybe<BlobHas_WinregDisconnectFieldInput>;
  create?: InputMaybe<BlobHas_WinregCreateFieldInput>;
  update?: InputMaybe<BlobHas_WinregUpdateConnectionInput>;
  delete?: InputMaybe<BlobHas_WinregDeleteFieldInput>;
};

export type BlobOnCreateInput = {
  hash: Scalars["String"]["input"];
};

export type BlobOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more BlobSort objects to sort Blobs by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<BlobSort>>;
};

export type BlobRelationInput = {
  has_winreg?: InputMaybe<BlobHas_WinregCreateFieldInput>;
  has_symbol?: InputMaybe<Array<BlobHas_SymbolCreateFieldInput>>;
  has_struct?: InputMaybe<Array<BlobHas_StructCreateFieldInput>>;
};

/** Fields to sort Blobs by. The order in which sorts are applied is not guaranteed when specifying many fields in one BlobSort object. */
export type BlobSort = {
  hash?: InputMaybe<SortDirection>;
};

export type BlobUniqueWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
};

export type BlobUpdateInput = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  has_winreg?: InputMaybe<BlobHas_WinregUpdateFieldInput>;
  has_symbol?: InputMaybe<Array<BlobHas_SymbolUpdateFieldInput>>;
  has_struct?: InputMaybe<Array<BlobHas_StructUpdateFieldInput>>;
};

export type BlobWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT?: InputMaybe<Scalars["String"]["input"]>;
  hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  OR?: InputMaybe<Array<BlobWhere>>;
  AND?: InputMaybe<Array<BlobWhere>>;
  NOT?: InputMaybe<BlobWhere>;
  has_winreg?: InputMaybe<WinRegKeyWhere>;
  has_winreg_NOT?: InputMaybe<WinRegKeyWhere>;
  has_winregConnection?: InputMaybe<BlobHas_WinregConnectionWhere>;
  has_winregConnection_NOT?: InputMaybe<BlobHas_WinregConnectionWhere>;
  has_winregAggregate?: InputMaybe<BlobHas_WinregAggregateInput>;
  /** @deprecated Use `has_symbol_SOME` instead. */
  has_symbol?: InputMaybe<SymbolWhere>;
  /** @deprecated Use `has_symbol_NONE` instead. */
  has_symbol_NOT?: InputMaybe<SymbolWhere>;
  /** Return Blobs where all of the related Symbols match this filter */
  has_symbol_ALL?: InputMaybe<SymbolWhere>;
  /** Return Blobs where none of the related Symbols match this filter */
  has_symbol_NONE?: InputMaybe<SymbolWhere>;
  /** Return Blobs where one of the related Symbols match this filter */
  has_symbol_SINGLE?: InputMaybe<SymbolWhere>;
  /** Return Blobs where some of the related Symbols match this filter */
  has_symbol_SOME?: InputMaybe<SymbolWhere>;
  /** @deprecated Use `has_symbolConnection_SOME` instead. */
  has_symbolConnection?: InputMaybe<BlobHas_SymbolConnectionWhere>;
  /** @deprecated Use `has_symbolConnection_NONE` instead. */
  has_symbolConnection_NOT?: InputMaybe<BlobHas_SymbolConnectionWhere>;
  /** Return Blobs where all of the related BlobHas_symbolConnections match this filter */
  has_symbolConnection_ALL?: InputMaybe<BlobHas_SymbolConnectionWhere>;
  /** Return Blobs where none of the related BlobHas_symbolConnections match this filter */
  has_symbolConnection_NONE?: InputMaybe<BlobHas_SymbolConnectionWhere>;
  /** Return Blobs where one of the related BlobHas_symbolConnections match this filter */
  has_symbolConnection_SINGLE?: InputMaybe<BlobHas_SymbolConnectionWhere>;
  /** Return Blobs where some of the related BlobHas_symbolConnections match this filter */
  has_symbolConnection_SOME?: InputMaybe<BlobHas_SymbolConnectionWhere>;
  has_symbolAggregate?: InputMaybe<BlobHas_SymbolAggregateInput>;
  /** @deprecated Use `has_struct_SOME` instead. */
  has_struct?: InputMaybe<WinStructWhere>;
  /** @deprecated Use `has_struct_NONE` instead. */
  has_struct_NOT?: InputMaybe<WinStructWhere>;
  /** Return Blobs where all of the related WinStructs match this filter */
  has_struct_ALL?: InputMaybe<WinStructWhere>;
  /** Return Blobs where none of the related WinStructs match this filter */
  has_struct_NONE?: InputMaybe<WinStructWhere>;
  /** Return Blobs where one of the related WinStructs match this filter */
  has_struct_SINGLE?: InputMaybe<WinStructWhere>;
  /** Return Blobs where some of the related WinStructs match this filter */
  has_struct_SOME?: InputMaybe<WinStructWhere>;
  /** @deprecated Use `has_structConnection_SOME` instead. */
  has_structConnection?: InputMaybe<BlobHas_StructConnectionWhere>;
  /** @deprecated Use `has_structConnection_NONE` instead. */
  has_structConnection_NOT?: InputMaybe<BlobHas_StructConnectionWhere>;
  /** Return Blobs where all of the related BlobHas_structConnections match this filter */
  has_structConnection_ALL?: InputMaybe<BlobHas_StructConnectionWhere>;
  /** Return Blobs where none of the related BlobHas_structConnections match this filter */
  has_structConnection_NONE?: InputMaybe<BlobHas_StructConnectionWhere>;
  /** Return Blobs where one of the related BlobHas_structConnections match this filter */
  has_structConnection_SINGLE?: InputMaybe<BlobHas_StructConnectionWhere>;
  /** Return Blobs where some of the related BlobHas_structConnections match this filter */
  has_structConnection_SOME?: InputMaybe<BlobHas_StructConnectionWhere>;
  has_structAggregate?: InputMaybe<BlobHas_StructAggregateInput>;
};

export type BranchConnectInput = {
  tracks?: InputMaybe<BranchTracksConnectFieldInput>;
};

export type BranchConnectOrCreateInput = {
  tracks?: InputMaybe<BranchTracksConnectOrCreateFieldInput>;
};

export type BranchCreateInput = {
  name: Scalars["String"]["input"];
  tracks?: InputMaybe<BranchTracksFieldInput>;
};

export type BranchDeleteInput = {
  tracks?: InputMaybe<BranchTracksDeleteFieldInput>;
};

export type BranchDisconnectInput = {
  tracks?: InputMaybe<BranchTracksDisconnectFieldInput>;
};

export type BranchOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more BranchSort objects to sort Branches by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<BranchSort>>;
};

export type BranchRelationInput = {
  tracks?: InputMaybe<BranchTracksCreateFieldInput>;
};

/** Fields to sort Branches by. The order in which sorts are applied is not guaranteed when specifying many fields in one BranchSort object. */
export type BranchSort = {
  name?: InputMaybe<SortDirection>;
};

export type BranchTracksAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<BranchTracksAggregateInput>>;
  OR?: InputMaybe<Array<BranchTracksAggregateInput>>;
  NOT?: InputMaybe<BranchTracksAggregateInput>;
  node?: InputMaybe<BranchTracksNodeAggregationWhereInput>;
};

export type BranchTracksConnectFieldInput = {
  where?: InputMaybe<CommitConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<CommitConnectInput>;
};

export type BranchTracksConnectionSort = {
  node?: InputMaybe<CommitSort>;
};

export type BranchTracksConnectionWhere = {
  AND?: InputMaybe<Array<BranchTracksConnectionWhere>>;
  OR?: InputMaybe<Array<BranchTracksConnectionWhere>>;
  NOT?: InputMaybe<BranchTracksConnectionWhere>;
  node?: InputMaybe<CommitWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<CommitWhere>;
};

export type BranchTracksConnectOrCreateFieldInput = {
  where: CommitConnectOrCreateWhere;
  onCreate: BranchTracksConnectOrCreateFieldInputOnCreate;
};

export type BranchTracksConnectOrCreateFieldInputOnCreate = {
  node: CommitOnCreateInput;
};

export type BranchTracksCreateFieldInput = {
  node: CommitCreateInput;
};

export type BranchTracksDeleteFieldInput = {
  where?: InputMaybe<BranchTracksConnectionWhere>;
  delete?: InputMaybe<CommitDeleteInput>;
};

export type BranchTracksDisconnectFieldInput = {
  where?: InputMaybe<BranchTracksConnectionWhere>;
  disconnect?: InputMaybe<CommitDisconnectInput>;
};

export type BranchTracksFieldInput = {
  connectOrCreate?: InputMaybe<BranchTracksConnectOrCreateFieldInput>;
  connect?: InputMaybe<BranchTracksConnectFieldInput>;
  create?: InputMaybe<BranchTracksCreateFieldInput>;
};

export type BranchTracksNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<BranchTracksNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<BranchTracksNodeAggregationWhereInput>>;
  NOT?: InputMaybe<BranchTracksNodeAggregationWhereInput>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  description_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  description_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  description_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  description_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  description_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  date_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  date_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  date_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  date_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  date_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  date_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  date_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  date_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  date_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  date_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  date_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  date_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  date_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  date_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  date_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type BranchTracksUpdateConnectionInput = {
  node?: InputMaybe<CommitUpdateInput>;
};

export type BranchTracksUpdateFieldInput = {
  where?: InputMaybe<BranchTracksConnectionWhere>;
  connectOrCreate?: InputMaybe<BranchTracksConnectOrCreateFieldInput>;
  connect?: InputMaybe<BranchTracksConnectFieldInput>;
  disconnect?: InputMaybe<BranchTracksDisconnectFieldInput>;
  create?: InputMaybe<BranchTracksCreateFieldInput>;
  update?: InputMaybe<BranchTracksUpdateConnectionInput>;
  delete?: InputMaybe<BranchTracksDeleteFieldInput>;
};

export type BranchUpdateInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  tracks?: InputMaybe<BranchTracksUpdateFieldInput>;
};

export type BranchWhere = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT?: InputMaybe<Scalars["String"]["input"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  OR?: InputMaybe<Array<BranchWhere>>;
  AND?: InputMaybe<Array<BranchWhere>>;
  NOT?: InputMaybe<BranchWhere>;
  tracks?: InputMaybe<CommitWhere>;
  tracks_NOT?: InputMaybe<CommitWhere>;
  tracksConnection?: InputMaybe<BranchTracksConnectionWhere>;
  tracksConnection_NOT?: InputMaybe<BranchTracksConnectionWhere>;
  tracksAggregate?: InputMaybe<BranchTracksAggregateInput>;
};

export type CommitConnectInput = {
  previous?: InputMaybe<CommitPreviousConnectFieldInput>;
  filesystem?: InputMaybe<CommitFilesystemConnectFieldInput>;
};

export type CommitConnectOrCreateInput = {
  previous?: InputMaybe<CommitPreviousConnectOrCreateFieldInput>;
  filesystem?: InputMaybe<CommitFilesystemConnectOrCreateFieldInput>;
};

export type CommitConnectOrCreateWhere = {
  node: CommitUniqueWhere;
};

export type CommitConnectWhere = {
  node: CommitWhere;
};

export type CommitCreateInput = {
  hash: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  date: Scalars["String"]["input"];
  previous?: InputMaybe<CommitPreviousFieldInput>;
  filesystem?: InputMaybe<CommitFilesystemFieldInput>;
};

export type CommitDeleteInput = {
  previous?: InputMaybe<CommitPreviousDeleteFieldInput>;
  filesystem?: InputMaybe<CommitFilesystemDeleteFieldInput>;
};

export type CommitDisconnectInput = {
  previous?: InputMaybe<CommitPreviousDisconnectFieldInput>;
  filesystem?: InputMaybe<CommitFilesystemDisconnectFieldInput>;
};

export type CommitFilesystemAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<CommitFilesystemAggregateInput>>;
  OR?: InputMaybe<Array<CommitFilesystemAggregateInput>>;
  NOT?: InputMaybe<CommitFilesystemAggregateInput>;
  node?: InputMaybe<CommitFilesystemNodeAggregationWhereInput>;
};

export type CommitFilesystemConnectFieldInput = {
  where?: InputMaybe<TreeConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<TreeConnectInput>;
};

export type CommitFilesystemConnectionSort = {
  node?: InputMaybe<TreeSort>;
};

export type CommitFilesystemConnectionWhere = {
  AND?: InputMaybe<Array<CommitFilesystemConnectionWhere>>;
  OR?: InputMaybe<Array<CommitFilesystemConnectionWhere>>;
  NOT?: InputMaybe<CommitFilesystemConnectionWhere>;
  node?: InputMaybe<TreeWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<TreeWhere>;
};

export type CommitFilesystemConnectOrCreateFieldInput = {
  where: TreeConnectOrCreateWhere;
  onCreate: CommitFilesystemConnectOrCreateFieldInputOnCreate;
};

export type CommitFilesystemConnectOrCreateFieldInputOnCreate = {
  node: TreeOnCreateInput;
};

export type CommitFilesystemCreateFieldInput = {
  node: TreeCreateInput;
};

export type CommitFilesystemDeleteFieldInput = {
  where?: InputMaybe<CommitFilesystemConnectionWhere>;
  delete?: InputMaybe<TreeDeleteInput>;
};

export type CommitFilesystemDisconnectFieldInput = {
  where?: InputMaybe<CommitFilesystemConnectionWhere>;
  disconnect?: InputMaybe<TreeDisconnectInput>;
};

export type CommitFilesystemFieldInput = {
  connectOrCreate?: InputMaybe<CommitFilesystemConnectOrCreateFieldInput>;
  connect?: InputMaybe<CommitFilesystemConnectFieldInput>;
  create?: InputMaybe<CommitFilesystemCreateFieldInput>;
};

export type CommitFilesystemNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CommitFilesystemNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<CommitFilesystemNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CommitFilesystemNodeAggregationWhereInput>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CommitFilesystemUpdateConnectionInput = {
  node?: InputMaybe<TreeUpdateInput>;
};

export type CommitFilesystemUpdateFieldInput = {
  where?: InputMaybe<CommitFilesystemConnectionWhere>;
  connectOrCreate?: InputMaybe<CommitFilesystemConnectOrCreateFieldInput>;
  connect?: InputMaybe<CommitFilesystemConnectFieldInput>;
  disconnect?: InputMaybe<CommitFilesystemDisconnectFieldInput>;
  create?: InputMaybe<CommitFilesystemCreateFieldInput>;
  update?: InputMaybe<CommitFilesystemUpdateConnectionInput>;
  delete?: InputMaybe<CommitFilesystemDeleteFieldInput>;
};

export type CommitOnCreateInput = {
  hash: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  date: Scalars["String"]["input"];
};

export type CommitOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more CommitSort objects to sort Commits by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CommitSort>>;
};

export type CommitPreviousAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<CommitPreviousAggregateInput>>;
  OR?: InputMaybe<Array<CommitPreviousAggregateInput>>;
  NOT?: InputMaybe<CommitPreviousAggregateInput>;
  node?: InputMaybe<CommitPreviousNodeAggregationWhereInput>;
};

export type CommitPreviousConnectFieldInput = {
  where?: InputMaybe<CommitConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<CommitConnectInput>;
};

export type CommitPreviousConnectionSort = {
  node?: InputMaybe<CommitSort>;
};

export type CommitPreviousConnectionWhere = {
  AND?: InputMaybe<Array<CommitPreviousConnectionWhere>>;
  OR?: InputMaybe<Array<CommitPreviousConnectionWhere>>;
  NOT?: InputMaybe<CommitPreviousConnectionWhere>;
  node?: InputMaybe<CommitWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<CommitWhere>;
};

export type CommitPreviousConnectOrCreateFieldInput = {
  where: CommitConnectOrCreateWhere;
  onCreate: CommitPreviousConnectOrCreateFieldInputOnCreate;
};

export type CommitPreviousConnectOrCreateFieldInputOnCreate = {
  node: CommitOnCreateInput;
};

export type CommitPreviousCreateFieldInput = {
  node: CommitCreateInput;
};

export type CommitPreviousDeleteFieldInput = {
  where?: InputMaybe<CommitPreviousConnectionWhere>;
  delete?: InputMaybe<CommitDeleteInput>;
};

export type CommitPreviousDisconnectFieldInput = {
  where?: InputMaybe<CommitPreviousConnectionWhere>;
  disconnect?: InputMaybe<CommitDisconnectInput>;
};

export type CommitPreviousFieldInput = {
  connectOrCreate?: InputMaybe<CommitPreviousConnectOrCreateFieldInput>;
  connect?: InputMaybe<CommitPreviousConnectFieldInput>;
  create?: InputMaybe<CommitPreviousCreateFieldInput>;
};

export type CommitPreviousNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CommitPreviousNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<CommitPreviousNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CommitPreviousNodeAggregationWhereInput>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  description_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  description_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  description_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  description_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  description_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  description_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  description_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  description_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  description_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  description_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  description_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  description_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  description_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  description_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  description_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  description_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  description_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  description_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  description_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  description_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  description_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  date_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  date_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  date_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  date_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  date_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  date_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  date_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  date_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  date_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  date_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  date_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  date_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  date_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  date_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  date_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  date_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CommitPreviousUpdateConnectionInput = {
  node?: InputMaybe<CommitUpdateInput>;
};

export type CommitPreviousUpdateFieldInput = {
  where?: InputMaybe<CommitPreviousConnectionWhere>;
  connectOrCreate?: InputMaybe<CommitPreviousConnectOrCreateFieldInput>;
  connect?: InputMaybe<CommitPreviousConnectFieldInput>;
  disconnect?: InputMaybe<CommitPreviousDisconnectFieldInput>;
  create?: InputMaybe<CommitPreviousCreateFieldInput>;
  update?: InputMaybe<CommitPreviousUpdateConnectionInput>;
  delete?: InputMaybe<CommitPreviousDeleteFieldInput>;
};

export type CommitRelationInput = {
  previous?: InputMaybe<CommitPreviousCreateFieldInput>;
  filesystem?: InputMaybe<CommitFilesystemCreateFieldInput>;
};

/** Fields to sort Commits by. The order in which sorts are applied is not guaranteed when specifying many fields in one CommitSort object. */
export type CommitSort = {
  hash?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  description?: InputMaybe<SortDirection>;
  date?: InputMaybe<SortDirection>;
};

export type CommitUniqueWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
};

export type CommitUpdateInput = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  previous?: InputMaybe<CommitPreviousUpdateFieldInput>;
  filesystem?: InputMaybe<CommitFilesystemUpdateFieldInput>;
};

export type CommitWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT?: InputMaybe<Scalars["String"]["input"]>;
  hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT?: InputMaybe<Scalars["String"]["input"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  description_NOT?: InputMaybe<Scalars["String"]["input"]>;
  description_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  description_NOT_IN?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  description_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  description_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  description_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  description_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  description_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  description_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  date_NOT?: InputMaybe<Scalars["String"]["input"]>;
  date_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  date_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  date_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  date_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  date_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  date_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  date_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  date_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  OR?: InputMaybe<Array<CommitWhere>>;
  AND?: InputMaybe<Array<CommitWhere>>;
  NOT?: InputMaybe<CommitWhere>;
  previous?: InputMaybe<CommitWhere>;
  previous_NOT?: InputMaybe<CommitWhere>;
  previousConnection?: InputMaybe<CommitPreviousConnectionWhere>;
  previousConnection_NOT?: InputMaybe<CommitPreviousConnectionWhere>;
  previousAggregate?: InputMaybe<CommitPreviousAggregateInput>;
  filesystem?: InputMaybe<TreeWhere>;
  filesystem_NOT?: InputMaybe<TreeWhere>;
  filesystemConnection?: InputMaybe<CommitFilesystemConnectionWhere>;
  filesystemConnection_NOT?: InputMaybe<CommitFilesystemConnectionWhere>;
  filesystemAggregate?: InputMaybe<CommitFilesystemAggregateInput>;
};

export type DiffItemCreateInput = {
  status: DiffStatus;
  path: Scalars["String"]["input"];
  type: NodeType;
};

export type DiffItemOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more DiffItemSort objects to sort DiffItems by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<DiffItemSort>>;
};

/** Fields to sort DiffItems by. The order in which sorts are applied is not guaranteed when specifying many fields in one DiffItemSort object. */
export type DiffItemSort = {
  status?: InputMaybe<SortDirection>;
  path?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
};

export type DiffItemUpdateInput = {
  status?: InputMaybe<DiffStatus>;
  path?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<NodeType>;
};

export type DiffItemWhere = {
  status?: InputMaybe<DiffStatus>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  status_NOT?: InputMaybe<DiffStatus>;
  status_IN?: InputMaybe<Array<DiffStatus>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  status_NOT_IN?: InputMaybe<Array<DiffStatus>>;
  path?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  path_NOT?: InputMaybe<Scalars["String"]["input"]>;
  path_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  path_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  path_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  path_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  path_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  path_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  path_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  path_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<NodeType>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  type_NOT?: InputMaybe<NodeType>;
  type_IN?: InputMaybe<Array<NodeType>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  type_NOT_IN?: InputMaybe<Array<NodeType>>;
  OR?: InputMaybe<Array<DiffItemWhere>>;
  AND?: InputMaybe<Array<DiffItemWhere>>;
  NOT?: InputMaybe<DiffItemWhere>;
};

export type HasFilenameRelAggregationWhereInput = {
  AND?: InputMaybe<Array<HasFilenameRelAggregationWhereInput>>;
  OR?: InputMaybe<Array<HasFilenameRelAggregationWhereInput>>;
  NOT?: InputMaybe<HasFilenameRelAggregationWhereInput>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type HasFilenameRelCreateInput = {
  name: Scalars["String"]["input"];
};

export type HasFilenameRelSort = {
  name?: InputMaybe<SortDirection>;
};

export type HasFilenameRelUpdateInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type HasFilenameRelWhere = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT?: InputMaybe<Scalars["String"]["input"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  OR?: InputMaybe<Array<HasFilenameRelWhere>>;
  AND?: InputMaybe<Array<HasFilenameRelWhere>>;
  NOT?: InputMaybe<HasFilenameRelWhere>;
};

export type HashableNodePropsCreateInput = {
  hash: Scalars["String"]["input"];
  properties: Scalars["JSON"]["input"];
};

export type HashableNodePropsOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more HashableNodePropsSort objects to sort HashableNodeProps by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<HashableNodePropsSort>>;
};

/** Fields to sort HashableNodeProps by. The order in which sorts are applied is not guaranteed when specifying many fields in one HashableNodePropsSort object. */
export type HashableNodePropsSort = {
  hash?: InputMaybe<SortDirection>;
  properties?: InputMaybe<SortDirection>;
};

export type HashableNodePropsUpdateInput = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  properties?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type HashableNodePropsWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT?: InputMaybe<Scalars["String"]["input"]>;
  hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  properties?: InputMaybe<Scalars["JSON"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  properties_NOT?: InputMaybe<Scalars["JSON"]["input"]>;
  properties_IN?: InputMaybe<Array<Scalars["JSON"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  properties_NOT_IN?: InputMaybe<Array<Scalars["JSON"]["input"]>>;
  OR?: InputMaybe<Array<HashableNodePropsWhere>>;
  AND?: InputMaybe<Array<HashableNodePropsWhere>>;
  NOT?: InputMaybe<HashableNodePropsWhere>;
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
  hash?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT?: InputMaybe<Scalars["String"]["input"]>;
  hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  OR?: InputMaybe<Array<HashableWhere>>;
  AND?: InputMaybe<Array<HashableWhere>>;
  NOT?: InputMaybe<HashableWhere>;
  typename_IN?: InputMaybe<Array<HashableImplementation>>;
};

export type HasSymbolAddressRelAggregationWhereInput = {
  AND?: InputMaybe<Array<HasSymbolAddressRelAggregationWhereInput>>;
  OR?: InputMaybe<Array<HasSymbolAddressRelAggregationWhereInput>>;
  NOT?: InputMaybe<HasSymbolAddressRelAggregationWhereInput>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  address_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  address_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  address_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  address_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  address_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  address_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  address_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  address_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  address_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  address_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  address_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  address_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  address_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  address_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  address_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  address_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  address_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  address_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  address_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  address_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  address_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  address_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  address_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  address_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  address_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  address_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  address_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  address_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  address_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  address_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  address_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  address_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  address_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  address_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  address_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type HasSymbolAddressRelCreateInput = {
  address: Scalars["String"]["input"];
};

export type HasSymbolAddressRelSort = {
  address?: InputMaybe<SortDirection>;
};

export type HasSymbolAddressRelUpdateInput = {
  address?: InputMaybe<Scalars["String"]["input"]>;
};

export type HasSymbolAddressRelWhere = {
  address?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  address_NOT?: InputMaybe<Scalars["String"]["input"]>;
  address_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  address_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  address_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  address_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  address_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  address_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  address_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  address_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  OR?: InputMaybe<Array<HasSymbolAddressRelWhere>>;
  AND?: InputMaybe<Array<HasSymbolAddressRelWhere>>;
  NOT?: InputMaybe<HasSymbolAddressRelWhere>;
};

export type SearchResultCreateInput = {
  commit_name: Scalars["String"]["input"];
  commit_hash: Scalars["String"]["input"];
  hash: Scalars["String"]["input"];
  path: Scalars["String"]["input"];
};

export type SearchResultOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more SearchResultSort objects to sort SearchResults by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<SearchResultSort>>;
};

/** Fields to sort SearchResults by. The order in which sorts are applied is not guaranteed when specifying many fields in one SearchResultSort object. */
export type SearchResultSort = {
  commit_name?: InputMaybe<SortDirection>;
  commit_hash?: InputMaybe<SortDirection>;
  hash?: InputMaybe<SortDirection>;
  path?: InputMaybe<SortDirection>;
};

export type SearchResultUpdateInput = {
  commit_name?: InputMaybe<Scalars["String"]["input"]>;
  commit_hash?: InputMaybe<Scalars["String"]["input"]>;
  hash?: InputMaybe<Scalars["String"]["input"]>;
  path?: InputMaybe<Scalars["String"]["input"]>;
};

export type SearchResultWhere = {
  commit_name?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  commit_name_NOT?: InputMaybe<Scalars["String"]["input"]>;
  commit_name_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  commit_name_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  commit_name_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  commit_name_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  commit_name_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  commit_name_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  commit_name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  commit_name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  commit_hash?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  commit_hash_NOT?: InputMaybe<Scalars["String"]["input"]>;
  commit_hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  commit_hash_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  commit_hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  commit_hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  commit_hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  commit_hash_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  commit_hash_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  commit_hash_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  hash?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT?: InputMaybe<Scalars["String"]["input"]>;
  hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  path?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  path_NOT?: InputMaybe<Scalars["String"]["input"]>;
  path_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  path_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  path_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  path_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  path_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  path_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  path_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  path_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  OR?: InputMaybe<Array<SearchResultWhere>>;
  AND?: InputMaybe<Array<SearchResultWhere>>;
  NOT?: InputMaybe<SearchResultWhere>;
};

export type SymbolBlobAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<SymbolBlobAggregateInput>>;
  OR?: InputMaybe<Array<SymbolBlobAggregateInput>>;
  NOT?: InputMaybe<SymbolBlobAggregateInput>;
  node?: InputMaybe<SymbolBlobNodeAggregationWhereInput>;
  edge?: InputMaybe<HasSymbolAddressRelAggregationWhereInput>;
};

export type SymbolBlobConnectFieldInput = {
  edge: HasSymbolAddressRelCreateInput;
  where?: InputMaybe<BlobConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<BlobConnectInput>;
};

export type SymbolBlobConnectionSort = {
  node?: InputMaybe<BlobSort>;
  edge?: InputMaybe<HasSymbolAddressRelSort>;
};

export type SymbolBlobConnectionWhere = {
  AND?: InputMaybe<Array<SymbolBlobConnectionWhere>>;
  OR?: InputMaybe<Array<SymbolBlobConnectionWhere>>;
  NOT?: InputMaybe<SymbolBlobConnectionWhere>;
  node?: InputMaybe<BlobWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<BlobWhere>;
  edge?: InputMaybe<HasSymbolAddressRelWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  edge_NOT?: InputMaybe<HasSymbolAddressRelWhere>;
};

export type SymbolBlobConnectOrCreateFieldInput = {
  where: BlobConnectOrCreateWhere;
  onCreate: SymbolBlobConnectOrCreateFieldInputOnCreate;
};

export type SymbolBlobConnectOrCreateFieldInputOnCreate = {
  node: BlobOnCreateInput;
  edge: HasSymbolAddressRelCreateInput;
};

export type SymbolBlobCreateFieldInput = {
  edge: HasSymbolAddressRelCreateInput;
  node: BlobCreateInput;
};

export type SymbolBlobDeleteFieldInput = {
  where?: InputMaybe<SymbolBlobConnectionWhere>;
  delete?: InputMaybe<BlobDeleteInput>;
};

export type SymbolBlobDisconnectFieldInput = {
  where?: InputMaybe<SymbolBlobConnectionWhere>;
  disconnect?: InputMaybe<BlobDisconnectInput>;
};

export type SymbolBlobFieldInput = {
  connectOrCreate?: InputMaybe<SymbolBlobConnectOrCreateFieldInput>;
  connect?: InputMaybe<SymbolBlobConnectFieldInput>;
  create?: InputMaybe<SymbolBlobCreateFieldInput>;
};

export type SymbolBlobNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<SymbolBlobNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<SymbolBlobNodeAggregationWhereInput>>;
  NOT?: InputMaybe<SymbolBlobNodeAggregationWhereInput>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type SymbolBlobUpdateConnectionInput = {
  node?: InputMaybe<BlobUpdateInput>;
  edge?: InputMaybe<HasSymbolAddressRelUpdateInput>;
};

export type SymbolBlobUpdateFieldInput = {
  where?: InputMaybe<SymbolBlobConnectionWhere>;
  connectOrCreate?: InputMaybe<SymbolBlobConnectOrCreateFieldInput>;
  connect?: InputMaybe<SymbolBlobConnectFieldInput>;
  disconnect?: InputMaybe<SymbolBlobDisconnectFieldInput>;
  create?: InputMaybe<SymbolBlobCreateFieldInput>;
  update?: InputMaybe<SymbolBlobUpdateConnectionInput>;
  delete?: InputMaybe<SymbolBlobDeleteFieldInput>;
};

export type SymbolConnectInput = {
  blob?: InputMaybe<SymbolBlobConnectFieldInput>;
};

export type SymbolConnectOrCreateInput = {
  blob?: InputMaybe<SymbolBlobConnectOrCreateFieldInput>;
};

export type SymbolConnectWhere = {
  node: SymbolWhere;
};

export type SymbolCreateInput = {
  name: Scalars["String"]["input"];
  blob?: InputMaybe<SymbolBlobFieldInput>;
};

export type SymbolDeleteInput = {
  blob?: InputMaybe<SymbolBlobDeleteFieldInput>;
};

export type SymbolDisconnectInput = {
  blob?: InputMaybe<SymbolBlobDisconnectFieldInput>;
};

export type SymbolOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more SymbolSort objects to sort Symbols by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<SymbolSort>>;
};

export type SymbolRelationInput = {
  blob?: InputMaybe<SymbolBlobCreateFieldInput>;
};

/** Fields to sort Symbols by. The order in which sorts are applied is not guaranteed when specifying many fields in one SymbolSort object. */
export type SymbolSort = {
  name?: InputMaybe<SortDirection>;
};

export type SymbolUpdateInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  blob?: InputMaybe<SymbolBlobUpdateFieldInput>;
};

export type SymbolWhere = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT?: InputMaybe<Scalars["String"]["input"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  OR?: InputMaybe<Array<SymbolWhere>>;
  AND?: InputMaybe<Array<SymbolWhere>>;
  NOT?: InputMaybe<SymbolWhere>;
  blob?: InputMaybe<BlobWhere>;
  blob_NOT?: InputMaybe<BlobWhere>;
  blobConnection?: InputMaybe<SymbolBlobConnectionWhere>;
  blobConnection_NOT?: InputMaybe<SymbolBlobConnectionWhere>;
  blobAggregate?: InputMaybe<SymbolBlobAggregateInput>;
};

export type TreeChild_BlobsAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<TreeChild_BlobsAggregateInput>>;
  OR?: InputMaybe<Array<TreeChild_BlobsAggregateInput>>;
  NOT?: InputMaybe<TreeChild_BlobsAggregateInput>;
  node?: InputMaybe<TreeChild_BlobsNodeAggregationWhereInput>;
  edge?: InputMaybe<HasFilenameRelAggregationWhereInput>;
};

export type TreeChild_BlobsConnectFieldInput = {
  edge: HasFilenameRelCreateInput;
  where?: InputMaybe<BlobConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<Array<BlobConnectInput>>;
};

export type TreeChild_BlobsConnectionSort = {
  node?: InputMaybe<BlobSort>;
  edge?: InputMaybe<HasFilenameRelSort>;
};

export type TreeChild_BlobsConnectionWhere = {
  AND?: InputMaybe<Array<TreeChild_BlobsConnectionWhere>>;
  OR?: InputMaybe<Array<TreeChild_BlobsConnectionWhere>>;
  NOT?: InputMaybe<TreeChild_BlobsConnectionWhere>;
  node?: InputMaybe<BlobWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<BlobWhere>;
  edge?: InputMaybe<HasFilenameRelWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  edge_NOT?: InputMaybe<HasFilenameRelWhere>;
};

export type TreeChild_BlobsConnectOrCreateFieldInput = {
  where: BlobConnectOrCreateWhere;
  onCreate: TreeChild_BlobsConnectOrCreateFieldInputOnCreate;
};

export type TreeChild_BlobsConnectOrCreateFieldInputOnCreate = {
  node: BlobOnCreateInput;
  edge: HasFilenameRelCreateInput;
};

export type TreeChild_BlobsCreateFieldInput = {
  edge: HasFilenameRelCreateInput;
  node: BlobCreateInput;
};

export type TreeChild_BlobsDeleteFieldInput = {
  where?: InputMaybe<TreeChild_BlobsConnectionWhere>;
  delete?: InputMaybe<BlobDeleteInput>;
};

export type TreeChild_BlobsDisconnectFieldInput = {
  where?: InputMaybe<TreeChild_BlobsConnectionWhere>;
  disconnect?: InputMaybe<BlobDisconnectInput>;
};

export type TreeChild_BlobsFieldInput = {
  connectOrCreate?: InputMaybe<Array<TreeChild_BlobsConnectOrCreateFieldInput>>;
  connect?: InputMaybe<Array<TreeChild_BlobsConnectFieldInput>>;
  create?: InputMaybe<Array<TreeChild_BlobsCreateFieldInput>>;
};

export type TreeChild_BlobsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TreeChild_BlobsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<TreeChild_BlobsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<TreeChild_BlobsNodeAggregationWhereInput>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type TreeChild_BlobsUpdateConnectionInput = {
  node?: InputMaybe<BlobUpdateInput>;
  edge?: InputMaybe<HasFilenameRelUpdateInput>;
};

export type TreeChild_BlobsUpdateFieldInput = {
  where?: InputMaybe<TreeChild_BlobsConnectionWhere>;
  connectOrCreate?: InputMaybe<Array<TreeChild_BlobsConnectOrCreateFieldInput>>;
  connect?: InputMaybe<Array<TreeChild_BlobsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<TreeChild_BlobsDisconnectFieldInput>>;
  create?: InputMaybe<Array<TreeChild_BlobsCreateFieldInput>>;
  update?: InputMaybe<TreeChild_BlobsUpdateConnectionInput>;
  delete?: InputMaybe<Array<TreeChild_BlobsDeleteFieldInput>>;
};

export type TreeChild_TreesAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<TreeChild_TreesAggregateInput>>;
  OR?: InputMaybe<Array<TreeChild_TreesAggregateInput>>;
  NOT?: InputMaybe<TreeChild_TreesAggregateInput>;
  node?: InputMaybe<TreeChild_TreesNodeAggregationWhereInput>;
  edge?: InputMaybe<HasFilenameRelAggregationWhereInput>;
};

export type TreeChild_TreesConnectFieldInput = {
  edge: HasFilenameRelCreateInput;
  where?: InputMaybe<TreeConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<Array<TreeConnectInput>>;
};

export type TreeChild_TreesConnectionSort = {
  node?: InputMaybe<TreeSort>;
  edge?: InputMaybe<HasFilenameRelSort>;
};

export type TreeChild_TreesConnectionWhere = {
  AND?: InputMaybe<Array<TreeChild_TreesConnectionWhere>>;
  OR?: InputMaybe<Array<TreeChild_TreesConnectionWhere>>;
  NOT?: InputMaybe<TreeChild_TreesConnectionWhere>;
  node?: InputMaybe<TreeWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<TreeWhere>;
  edge?: InputMaybe<HasFilenameRelWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  edge_NOT?: InputMaybe<HasFilenameRelWhere>;
};

export type TreeChild_TreesConnectOrCreateFieldInput = {
  where: TreeConnectOrCreateWhere;
  onCreate: TreeChild_TreesConnectOrCreateFieldInputOnCreate;
};

export type TreeChild_TreesConnectOrCreateFieldInputOnCreate = {
  node: TreeOnCreateInput;
  edge: HasFilenameRelCreateInput;
};

export type TreeChild_TreesCreateFieldInput = {
  edge: HasFilenameRelCreateInput;
  node: TreeCreateInput;
};

export type TreeChild_TreesDeleteFieldInput = {
  where?: InputMaybe<TreeChild_TreesConnectionWhere>;
  delete?: InputMaybe<TreeDeleteInput>;
};

export type TreeChild_TreesDisconnectFieldInput = {
  where?: InputMaybe<TreeChild_TreesConnectionWhere>;
  disconnect?: InputMaybe<TreeDisconnectInput>;
};

export type TreeChild_TreesFieldInput = {
  connectOrCreate?: InputMaybe<Array<TreeChild_TreesConnectOrCreateFieldInput>>;
  connect?: InputMaybe<Array<TreeChild_TreesConnectFieldInput>>;
  create?: InputMaybe<Array<TreeChild_TreesCreateFieldInput>>;
};

export type TreeChild_TreesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<TreeChild_TreesNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<TreeChild_TreesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<TreeChild_TreesNodeAggregationWhereInput>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type TreeChild_TreesUpdateConnectionInput = {
  node?: InputMaybe<TreeUpdateInput>;
  edge?: InputMaybe<HasFilenameRelUpdateInput>;
};

export type TreeChild_TreesUpdateFieldInput = {
  where?: InputMaybe<TreeChild_TreesConnectionWhere>;
  connectOrCreate?: InputMaybe<Array<TreeChild_TreesConnectOrCreateFieldInput>>;
  connect?: InputMaybe<Array<TreeChild_TreesConnectFieldInput>>;
  disconnect?: InputMaybe<Array<TreeChild_TreesDisconnectFieldInput>>;
  create?: InputMaybe<Array<TreeChild_TreesCreateFieldInput>>;
  update?: InputMaybe<TreeChild_TreesUpdateConnectionInput>;
  delete?: InputMaybe<Array<TreeChild_TreesDeleteFieldInput>>;
};

export type TreeConnectInput = {
  child_blobs?: InputMaybe<Array<TreeChild_BlobsConnectFieldInput>>;
  child_trees?: InputMaybe<Array<TreeChild_TreesConnectFieldInput>>;
};

export type TreeConnectOrCreateInput = {
  child_blobs?: InputMaybe<Array<TreeChild_BlobsConnectOrCreateFieldInput>>;
  child_trees?: InputMaybe<Array<TreeChild_TreesConnectOrCreateFieldInput>>;
};

export type TreeConnectOrCreateWhere = {
  node: TreeUniqueWhere;
};

export type TreeConnectWhere = {
  node: TreeWhere;
};

export type TreeCreateInput = {
  hash: Scalars["String"]["input"];
  child_blobs?: InputMaybe<TreeChild_BlobsFieldInput>;
  child_trees?: InputMaybe<TreeChild_TreesFieldInput>;
};

export type TreeDeleteInput = {
  child_blobs?: InputMaybe<Array<TreeChild_BlobsDeleteFieldInput>>;
  child_trees?: InputMaybe<Array<TreeChild_TreesDeleteFieldInput>>;
};

export type TreeDisconnectInput = {
  child_blobs?: InputMaybe<Array<TreeChild_BlobsDisconnectFieldInput>>;
  child_trees?: InputMaybe<Array<TreeChild_TreesDisconnectFieldInput>>;
};

export type TreeOnCreateInput = {
  hash: Scalars["String"]["input"];
};

export type TreeOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more TreeSort objects to sort Trees by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TreeSort>>;
};

export type TreeRelationInput = {
  child_blobs?: InputMaybe<Array<TreeChild_BlobsCreateFieldInput>>;
  child_trees?: InputMaybe<Array<TreeChild_TreesCreateFieldInput>>;
};

/** Fields to sort Trees by. The order in which sorts are applied is not guaranteed when specifying many fields in one TreeSort object. */
export type TreeSort = {
  hash?: InputMaybe<SortDirection>;
};

export type TreeUniqueWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
};

export type TreeUpdateInput = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  child_blobs?: InputMaybe<Array<TreeChild_BlobsUpdateFieldInput>>;
  child_trees?: InputMaybe<Array<TreeChild_TreesUpdateFieldInput>>;
};

export type TreeWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT?: InputMaybe<Scalars["String"]["input"]>;
  hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  OR?: InputMaybe<Array<TreeWhere>>;
  AND?: InputMaybe<Array<TreeWhere>>;
  NOT?: InputMaybe<TreeWhere>;
  /** @deprecated Use `child_blobs_SOME` instead. */
  child_blobs?: InputMaybe<BlobWhere>;
  /** @deprecated Use `child_blobs_NONE` instead. */
  child_blobs_NOT?: InputMaybe<BlobWhere>;
  /** Return Trees where all of the related Blobs match this filter */
  child_blobs_ALL?: InputMaybe<BlobWhere>;
  /** Return Trees where none of the related Blobs match this filter */
  child_blobs_NONE?: InputMaybe<BlobWhere>;
  /** Return Trees where one of the related Blobs match this filter */
  child_blobs_SINGLE?: InputMaybe<BlobWhere>;
  /** Return Trees where some of the related Blobs match this filter */
  child_blobs_SOME?: InputMaybe<BlobWhere>;
  /** @deprecated Use `child_blobsConnection_SOME` instead. */
  child_blobsConnection?: InputMaybe<TreeChild_BlobsConnectionWhere>;
  /** @deprecated Use `child_blobsConnection_NONE` instead. */
  child_blobsConnection_NOT?: InputMaybe<TreeChild_BlobsConnectionWhere>;
  /** Return Trees where all of the related TreeChild_blobsConnections match this filter */
  child_blobsConnection_ALL?: InputMaybe<TreeChild_BlobsConnectionWhere>;
  /** Return Trees where none of the related TreeChild_blobsConnections match this filter */
  child_blobsConnection_NONE?: InputMaybe<TreeChild_BlobsConnectionWhere>;
  /** Return Trees where one of the related TreeChild_blobsConnections match this filter */
  child_blobsConnection_SINGLE?: InputMaybe<TreeChild_BlobsConnectionWhere>;
  /** Return Trees where some of the related TreeChild_blobsConnections match this filter */
  child_blobsConnection_SOME?: InputMaybe<TreeChild_BlobsConnectionWhere>;
  child_blobsAggregate?: InputMaybe<TreeChild_BlobsAggregateInput>;
  /** @deprecated Use `child_trees_SOME` instead. */
  child_trees?: InputMaybe<TreeWhere>;
  /** @deprecated Use `child_trees_NONE` instead. */
  child_trees_NOT?: InputMaybe<TreeWhere>;
  /** Return Trees where all of the related Trees match this filter */
  child_trees_ALL?: InputMaybe<TreeWhere>;
  /** Return Trees where none of the related Trees match this filter */
  child_trees_NONE?: InputMaybe<TreeWhere>;
  /** Return Trees where one of the related Trees match this filter */
  child_trees_SINGLE?: InputMaybe<TreeWhere>;
  /** Return Trees where some of the related Trees match this filter */
  child_trees_SOME?: InputMaybe<TreeWhere>;
  /** @deprecated Use `child_treesConnection_SOME` instead. */
  child_treesConnection?: InputMaybe<TreeChild_TreesConnectionWhere>;
  /** @deprecated Use `child_treesConnection_NONE` instead. */
  child_treesConnection_NOT?: InputMaybe<TreeChild_TreesConnectionWhere>;
  /** Return Trees where all of the related TreeChild_treesConnections match this filter */
  child_treesConnection_ALL?: InputMaybe<TreeChild_TreesConnectionWhere>;
  /** Return Trees where none of the related TreeChild_treesConnections match this filter */
  child_treesConnection_NONE?: InputMaybe<TreeChild_TreesConnectionWhere>;
  /** Return Trees where one of the related TreeChild_treesConnections match this filter */
  child_treesConnection_SINGLE?: InputMaybe<TreeChild_TreesConnectionWhere>;
  /** Return Trees where some of the related TreeChild_treesConnections match this filter */
  child_treesConnection_SOME?: InputMaybe<TreeChild_TreesConnectionWhere>;
  child_treesAggregate?: InputMaybe<TreeChild_TreesAggregateInput>;
};

export type UserCreateInput = {
  name: Scalars["String"]["input"];
};

export type UserOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more UserSort objects to sort Users by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<UserSort>>;
};

/** Fields to sort Users by. The order in which sorts are applied is not guaranteed when specifying many fields in one UserSort object. */
export type UserSort = {
  name?: InputMaybe<SortDirection>;
};

export type UserUpdateInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UserWhere = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT?: InputMaybe<Scalars["String"]["input"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  OR?: InputMaybe<Array<UserWhere>>;
  AND?: InputMaybe<Array<UserWhere>>;
  NOT?: InputMaybe<UserWhere>;
};

export type WinDataTypeConnectInput = {
  has_data_type?: InputMaybe<WinDataTypeHas_Data_TypeConnectFieldInput>;
};

export type WinDataTypeConnectOrCreateInput = {
  has_data_type?: InputMaybe<WinDataTypeHas_Data_TypeConnectOrCreateFieldInput>;
};

export type WinDataTypeConnectOrCreateWhere = {
  node: WinDataTypeUniqueWhere;
};

export type WinDataTypeConnectWhere = {
  node: WinDataTypeWhere;
};

export type WinDataTypeCreateInput = {
  hash: Scalars["String"]["input"];
  type: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  array_counter?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length?: InputMaybe<Scalars["Int"]["input"]>;
  has_data_type?: InputMaybe<WinDataTypeHas_Data_TypeFieldInput>;
};

export type WinDataTypeDeleteInput = {
  has_data_type?: InputMaybe<WinDataTypeHas_Data_TypeDeleteFieldInput>;
};

export type WinDataTypeDisconnectInput = {
  has_data_type?: InputMaybe<WinDataTypeHas_Data_TypeDisconnectFieldInput>;
};

export type WinDataTypeHas_Data_TypeAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<WinDataTypeHas_Data_TypeAggregateInput>>;
  OR?: InputMaybe<Array<WinDataTypeHas_Data_TypeAggregateInput>>;
  NOT?: InputMaybe<WinDataTypeHas_Data_TypeAggregateInput>;
  node?: InputMaybe<WinDataTypeHas_Data_TypeNodeAggregationWhereInput>;
};

export type WinDataTypeHas_Data_TypeConnectFieldInput = {
  where?: InputMaybe<WinDataTypeConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<WinDataTypeConnectInput>;
};

export type WinDataTypeHas_Data_TypeConnectionSort = {
  node?: InputMaybe<WinDataTypeSort>;
};

export type WinDataTypeHas_Data_TypeConnectionWhere = {
  AND?: InputMaybe<Array<WinDataTypeHas_Data_TypeConnectionWhere>>;
  OR?: InputMaybe<Array<WinDataTypeHas_Data_TypeConnectionWhere>>;
  NOT?: InputMaybe<WinDataTypeHas_Data_TypeConnectionWhere>;
  node?: InputMaybe<WinDataTypeWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<WinDataTypeWhere>;
};

export type WinDataTypeHas_Data_TypeConnectOrCreateFieldInput = {
  where: WinDataTypeConnectOrCreateWhere;
  onCreate: WinDataTypeHas_Data_TypeConnectOrCreateFieldInputOnCreate;
};

export type WinDataTypeHas_Data_TypeConnectOrCreateFieldInputOnCreate = {
  node: WinDataTypeOnCreateInput;
};

export type WinDataTypeHas_Data_TypeCreateFieldInput = {
  node: WinDataTypeCreateInput;
};

export type WinDataTypeHas_Data_TypeDeleteFieldInput = {
  where?: InputMaybe<WinDataTypeHas_Data_TypeConnectionWhere>;
  delete?: InputMaybe<WinDataTypeDeleteInput>;
};

export type WinDataTypeHas_Data_TypeDisconnectFieldInput = {
  where?: InputMaybe<WinDataTypeHas_Data_TypeConnectionWhere>;
  disconnect?: InputMaybe<WinDataTypeDisconnectInput>;
};

export type WinDataTypeHas_Data_TypeFieldInput = {
  connectOrCreate?: InputMaybe<WinDataTypeHas_Data_TypeConnectOrCreateFieldInput>;
  connect?: InputMaybe<WinDataTypeHas_Data_TypeConnectFieldInput>;
  create?: InputMaybe<WinDataTypeHas_Data_TypeCreateFieldInput>;
};

export type WinDataTypeHas_Data_TypeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<WinDataTypeHas_Data_TypeNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<WinDataTypeHas_Data_TypeNodeAggregationWhereInput>>;
  NOT?: InputMaybe<WinDataTypeHas_Data_TypeNodeAggregationWhereInput>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  type_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  type_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  type_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  type_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  type_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  type_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  type_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  type_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  type_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  type_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  type_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  type_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  type_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  type_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  type_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  type_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  type_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  type_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  type_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  type_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  array_counter_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MIN_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MAX_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_SUM_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  array_counter_GT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MIN_GT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MAX_GT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_SUM_GT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  array_counter_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MIN_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MAX_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_SUM_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  array_counter_LT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MIN_LT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MAX_LT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_SUM_LT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  array_counter_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MIN_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MAX_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_SUM_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_position_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MIN_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MAX_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_SUM_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_position_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MIN_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MAX_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_SUM_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_position_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MIN_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MAX_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_SUM_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_position_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MIN_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MAX_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_SUM_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_position_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MIN_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MAX_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_SUM_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_length_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MIN_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MAX_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_SUM_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_length_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MIN_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MAX_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_SUM_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_length_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MIN_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MAX_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_SUM_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_length_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MIN_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MAX_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_SUM_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_length_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MIN_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MAX_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_SUM_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
};

export type WinDataTypeHas_Data_TypeUpdateConnectionInput = {
  node?: InputMaybe<WinDataTypeUpdateInput>;
};

export type WinDataTypeHas_Data_TypeUpdateFieldInput = {
  where?: InputMaybe<WinDataTypeHas_Data_TypeConnectionWhere>;
  connectOrCreate?: InputMaybe<WinDataTypeHas_Data_TypeConnectOrCreateFieldInput>;
  connect?: InputMaybe<WinDataTypeHas_Data_TypeConnectFieldInput>;
  disconnect?: InputMaybe<WinDataTypeHas_Data_TypeDisconnectFieldInput>;
  create?: InputMaybe<WinDataTypeHas_Data_TypeCreateFieldInput>;
  update?: InputMaybe<WinDataTypeHas_Data_TypeUpdateConnectionInput>;
  delete?: InputMaybe<WinDataTypeHas_Data_TypeDeleteFieldInput>;
};

export type WinDataTypeOnCreateInput = {
  hash: Scalars["String"]["input"];
  type: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  array_counter?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length?: InputMaybe<Scalars["Int"]["input"]>;
};

export type WinDataTypeOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more WinDataTypeSort objects to sort WinDataTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<WinDataTypeSort>>;
};

export type WinDataTypeRelationInput = {
  has_data_type?: InputMaybe<WinDataTypeHas_Data_TypeCreateFieldInput>;
};

/** Fields to sort WinDataTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one WinDataTypeSort object. */
export type WinDataTypeSort = {
  hash?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  array_counter?: InputMaybe<SortDirection>;
  bit_position?: InputMaybe<SortDirection>;
  bit_length?: InputMaybe<SortDirection>;
};

export type WinDataTypeUniqueWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
};

export type WinDataTypeUpdateInput = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  array_counter?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_INCREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_DECREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_INCREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_DECREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_INCREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_DECREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  has_data_type?: InputMaybe<WinDataTypeHas_Data_TypeUpdateFieldInput>;
};

export type WinDataTypeWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT?: InputMaybe<Scalars["String"]["input"]>;
  hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  type_NOT?: InputMaybe<Scalars["String"]["input"]>;
  type_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  type_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  type_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  type_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  type_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  type_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  type_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  type_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT?: InputMaybe<Scalars["String"]["input"]>;
  name_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  array_counter?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  array_counter_NOT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_IN?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  array_counter_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  array_counter_LT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_GT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  bit_position_NOT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_IN?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  bit_position_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  bit_position_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  bit_length_NOT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_IN?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  bit_length_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  bit_length_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  OR?: InputMaybe<Array<WinDataTypeWhere>>;
  AND?: InputMaybe<Array<WinDataTypeWhere>>;
  NOT?: InputMaybe<WinDataTypeWhere>;
  has_data_type?: InputMaybe<WinDataTypeWhere>;
  has_data_type_NOT?: InputMaybe<WinDataTypeWhere>;
  has_data_typeConnection?: InputMaybe<WinDataTypeHas_Data_TypeConnectionWhere>;
  has_data_typeConnection_NOT?: InputMaybe<WinDataTypeHas_Data_TypeConnectionWhere>;
  has_data_typeAggregate?: InputMaybe<WinDataTypeHas_Data_TypeAggregateInput>;
};

export type WinRegKeyChild_KeysAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<WinRegKeyChild_KeysAggregateInput>>;
  OR?: InputMaybe<Array<WinRegKeyChild_KeysAggregateInput>>;
  NOT?: InputMaybe<WinRegKeyChild_KeysAggregateInput>;
  node?: InputMaybe<WinRegKeyChild_KeysNodeAggregationWhereInput>;
  edge?: InputMaybe<HasFilenameRelAggregationWhereInput>;
};

export type WinRegKeyChild_KeysConnectFieldInput = {
  edge: HasFilenameRelCreateInput;
  where?: InputMaybe<WinRegKeyConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<Array<WinRegKeyConnectInput>>;
};

export type WinRegKeyChild_KeysConnectionSort = {
  node?: InputMaybe<WinRegKeySort>;
  edge?: InputMaybe<HasFilenameRelSort>;
};

export type WinRegKeyChild_KeysConnectionWhere = {
  AND?: InputMaybe<Array<WinRegKeyChild_KeysConnectionWhere>>;
  OR?: InputMaybe<Array<WinRegKeyChild_KeysConnectionWhere>>;
  NOT?: InputMaybe<WinRegKeyChild_KeysConnectionWhere>;
  node?: InputMaybe<WinRegKeyWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<WinRegKeyWhere>;
  edge?: InputMaybe<HasFilenameRelWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  edge_NOT?: InputMaybe<HasFilenameRelWhere>;
};

export type WinRegKeyChild_KeysConnectOrCreateFieldInput = {
  where: WinRegKeyConnectOrCreateWhere;
  onCreate: WinRegKeyChild_KeysConnectOrCreateFieldInputOnCreate;
};

export type WinRegKeyChild_KeysConnectOrCreateFieldInputOnCreate = {
  node: WinRegKeyOnCreateInput;
  edge: HasFilenameRelCreateInput;
};

export type WinRegKeyChild_KeysCreateFieldInput = {
  edge: HasFilenameRelCreateInput;
  node: WinRegKeyCreateInput;
};

export type WinRegKeyChild_KeysDeleteFieldInput = {
  where?: InputMaybe<WinRegKeyChild_KeysConnectionWhere>;
  delete?: InputMaybe<WinRegKeyDeleteInput>;
};

export type WinRegKeyChild_KeysDisconnectFieldInput = {
  where?: InputMaybe<WinRegKeyChild_KeysConnectionWhere>;
  disconnect?: InputMaybe<WinRegKeyDisconnectInput>;
};

export type WinRegKeyChild_KeysFieldInput = {
  connectOrCreate?: InputMaybe<
    Array<WinRegKeyChild_KeysConnectOrCreateFieldInput>
  >;
  connect?: InputMaybe<Array<WinRegKeyChild_KeysConnectFieldInput>>;
  create?: InputMaybe<Array<WinRegKeyChild_KeysCreateFieldInput>>;
};

export type WinRegKeyChild_KeysNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<WinRegKeyChild_KeysNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<WinRegKeyChild_KeysNodeAggregationWhereInput>>;
  NOT?: InputMaybe<WinRegKeyChild_KeysNodeAggregationWhereInput>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type WinRegKeyChild_KeysUpdateConnectionInput = {
  node?: InputMaybe<WinRegKeyUpdateInput>;
  edge?: InputMaybe<HasFilenameRelUpdateInput>;
};

export type WinRegKeyChild_KeysUpdateFieldInput = {
  where?: InputMaybe<WinRegKeyChild_KeysConnectionWhere>;
  connectOrCreate?: InputMaybe<
    Array<WinRegKeyChild_KeysConnectOrCreateFieldInput>
  >;
  connect?: InputMaybe<Array<WinRegKeyChild_KeysConnectFieldInput>>;
  disconnect?: InputMaybe<Array<WinRegKeyChild_KeysDisconnectFieldInput>>;
  create?: InputMaybe<Array<WinRegKeyChild_KeysCreateFieldInput>>;
  update?: InputMaybe<WinRegKeyChild_KeysUpdateConnectionInput>;
  delete?: InputMaybe<Array<WinRegKeyChild_KeysDeleteFieldInput>>;
};

export type WinRegKeyChild_ValuesAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<WinRegKeyChild_ValuesAggregateInput>>;
  OR?: InputMaybe<Array<WinRegKeyChild_ValuesAggregateInput>>;
  NOT?: InputMaybe<WinRegKeyChild_ValuesAggregateInput>;
  node?: InputMaybe<WinRegKeyChild_ValuesNodeAggregationWhereInput>;
  edge?: InputMaybe<HasFilenameRelAggregationWhereInput>;
};

export type WinRegKeyChild_ValuesConnectFieldInput = {
  edge: HasFilenameRelCreateInput;
  where?: InputMaybe<WinRegValueConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
};

export type WinRegKeyChild_ValuesConnectionSort = {
  node?: InputMaybe<WinRegValueSort>;
  edge?: InputMaybe<HasFilenameRelSort>;
};

export type WinRegKeyChild_ValuesConnectionWhere = {
  AND?: InputMaybe<Array<WinRegKeyChild_ValuesConnectionWhere>>;
  OR?: InputMaybe<Array<WinRegKeyChild_ValuesConnectionWhere>>;
  NOT?: InputMaybe<WinRegKeyChild_ValuesConnectionWhere>;
  node?: InputMaybe<WinRegValueWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<WinRegValueWhere>;
  edge?: InputMaybe<HasFilenameRelWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  edge_NOT?: InputMaybe<HasFilenameRelWhere>;
};

export type WinRegKeyChild_ValuesConnectOrCreateFieldInput = {
  where: WinRegValueConnectOrCreateWhere;
  onCreate: WinRegKeyChild_ValuesConnectOrCreateFieldInputOnCreate;
};

export type WinRegKeyChild_ValuesConnectOrCreateFieldInputOnCreate = {
  node: WinRegValueOnCreateInput;
  edge: HasFilenameRelCreateInput;
};

export type WinRegKeyChild_ValuesCreateFieldInput = {
  edge: HasFilenameRelCreateInput;
  node: WinRegValueCreateInput;
};

export type WinRegKeyChild_ValuesDeleteFieldInput = {
  where?: InputMaybe<WinRegKeyChild_ValuesConnectionWhere>;
};

export type WinRegKeyChild_ValuesDisconnectFieldInput = {
  where?: InputMaybe<WinRegKeyChild_ValuesConnectionWhere>;
};

export type WinRegKeyChild_ValuesFieldInput = {
  connectOrCreate?: InputMaybe<
    Array<WinRegKeyChild_ValuesConnectOrCreateFieldInput>
  >;
  connect?: InputMaybe<Array<WinRegKeyChild_ValuesConnectFieldInput>>;
  create?: InputMaybe<Array<WinRegKeyChild_ValuesCreateFieldInput>>;
};

export type WinRegKeyChild_ValuesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<WinRegKeyChild_ValuesNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<WinRegKeyChild_ValuesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<WinRegKeyChild_ValuesNodeAggregationWhereInput>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  type_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  type_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  type_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  type_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  type_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  type_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  type_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  type_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  type_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  type_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  type_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  type_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  type_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  type_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  type_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  type_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  type_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  type_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  type_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  type_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  value_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  value_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  value_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  value_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  value_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  value_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  value_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  value_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  value_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  value_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  value_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  value_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  value_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  value_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  value_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  value_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  value_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  value_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  value_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  value_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  value_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  value_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  value_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  value_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  value_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  value_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  value_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  value_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  value_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  value_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  value_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  value_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  value_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  value_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  value_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type WinRegKeyChild_ValuesUpdateConnectionInput = {
  node?: InputMaybe<WinRegValueUpdateInput>;
  edge?: InputMaybe<HasFilenameRelUpdateInput>;
};

export type WinRegKeyChild_ValuesUpdateFieldInput = {
  where?: InputMaybe<WinRegKeyChild_ValuesConnectionWhere>;
  connectOrCreate?: InputMaybe<
    Array<WinRegKeyChild_ValuesConnectOrCreateFieldInput>
  >;
  connect?: InputMaybe<Array<WinRegKeyChild_ValuesConnectFieldInput>>;
  disconnect?: InputMaybe<Array<WinRegKeyChild_ValuesDisconnectFieldInput>>;
  create?: InputMaybe<Array<WinRegKeyChild_ValuesCreateFieldInput>>;
  update?: InputMaybe<WinRegKeyChild_ValuesUpdateConnectionInput>;
  delete?: InputMaybe<Array<WinRegKeyChild_ValuesDeleteFieldInput>>;
};

export type WinRegKeyConnectInput = {
  child_values?: InputMaybe<Array<WinRegKeyChild_ValuesConnectFieldInput>>;
  child_keys?: InputMaybe<Array<WinRegKeyChild_KeysConnectFieldInput>>;
};

export type WinRegKeyConnectOrCreateInput = {
  child_values?: InputMaybe<
    Array<WinRegKeyChild_ValuesConnectOrCreateFieldInput>
  >;
  child_keys?: InputMaybe<Array<WinRegKeyChild_KeysConnectOrCreateFieldInput>>;
};

export type WinRegKeyConnectOrCreateWhere = {
  node: WinRegKeyUniqueWhere;
};

export type WinRegKeyConnectWhere = {
  node: WinRegKeyWhere;
};

export type WinRegKeyCreateInput = {
  hash: Scalars["String"]["input"];
  child_values?: InputMaybe<WinRegKeyChild_ValuesFieldInput>;
  child_keys?: InputMaybe<WinRegKeyChild_KeysFieldInput>;
};

export type WinRegKeyDeleteInput = {
  child_values?: InputMaybe<Array<WinRegKeyChild_ValuesDeleteFieldInput>>;
  child_keys?: InputMaybe<Array<WinRegKeyChild_KeysDeleteFieldInput>>;
};

export type WinRegKeyDisconnectInput = {
  child_values?: InputMaybe<Array<WinRegKeyChild_ValuesDisconnectFieldInput>>;
  child_keys?: InputMaybe<Array<WinRegKeyChild_KeysDisconnectFieldInput>>;
};

export type WinRegKeyOnCreateInput = {
  hash: Scalars["String"]["input"];
};

export type WinRegKeyOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more WinRegKeySort objects to sort WinRegKeys by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<WinRegKeySort>>;
};

export type WinRegKeyRelationInput = {
  child_values?: InputMaybe<Array<WinRegKeyChild_ValuesCreateFieldInput>>;
  child_keys?: InputMaybe<Array<WinRegKeyChild_KeysCreateFieldInput>>;
};

/** Fields to sort WinRegKeys by. The order in which sorts are applied is not guaranteed when specifying many fields in one WinRegKeySort object. */
export type WinRegKeySort = {
  hash?: InputMaybe<SortDirection>;
};

export type WinRegKeyUniqueWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
};

export type WinRegKeyUpdateInput = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  child_values?: InputMaybe<Array<WinRegKeyChild_ValuesUpdateFieldInput>>;
  child_keys?: InputMaybe<Array<WinRegKeyChild_KeysUpdateFieldInput>>;
};

export type WinRegKeyWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT?: InputMaybe<Scalars["String"]["input"]>;
  hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  OR?: InputMaybe<Array<WinRegKeyWhere>>;
  AND?: InputMaybe<Array<WinRegKeyWhere>>;
  NOT?: InputMaybe<WinRegKeyWhere>;
  /** @deprecated Use `child_values_SOME` instead. */
  child_values?: InputMaybe<WinRegValueWhere>;
  /** @deprecated Use `child_values_NONE` instead. */
  child_values_NOT?: InputMaybe<WinRegValueWhere>;
  /** Return WinRegKeys where all of the related WinRegValues match this filter */
  child_values_ALL?: InputMaybe<WinRegValueWhere>;
  /** Return WinRegKeys where none of the related WinRegValues match this filter */
  child_values_NONE?: InputMaybe<WinRegValueWhere>;
  /** Return WinRegKeys where one of the related WinRegValues match this filter */
  child_values_SINGLE?: InputMaybe<WinRegValueWhere>;
  /** Return WinRegKeys where some of the related WinRegValues match this filter */
  child_values_SOME?: InputMaybe<WinRegValueWhere>;
  /** @deprecated Use `child_valuesConnection_SOME` instead. */
  child_valuesConnection?: InputMaybe<WinRegKeyChild_ValuesConnectionWhere>;
  /** @deprecated Use `child_valuesConnection_NONE` instead. */
  child_valuesConnection_NOT?: InputMaybe<WinRegKeyChild_ValuesConnectionWhere>;
  /** Return WinRegKeys where all of the related WinRegKeyChild_valuesConnections match this filter */
  child_valuesConnection_ALL?: InputMaybe<WinRegKeyChild_ValuesConnectionWhere>;
  /** Return WinRegKeys where none of the related WinRegKeyChild_valuesConnections match this filter */
  child_valuesConnection_NONE?: InputMaybe<WinRegKeyChild_ValuesConnectionWhere>;
  /** Return WinRegKeys where one of the related WinRegKeyChild_valuesConnections match this filter */
  child_valuesConnection_SINGLE?: InputMaybe<WinRegKeyChild_ValuesConnectionWhere>;
  /** Return WinRegKeys where some of the related WinRegKeyChild_valuesConnections match this filter */
  child_valuesConnection_SOME?: InputMaybe<WinRegKeyChild_ValuesConnectionWhere>;
  child_valuesAggregate?: InputMaybe<WinRegKeyChild_ValuesAggregateInput>;
  /** @deprecated Use `child_keys_SOME` instead. */
  child_keys?: InputMaybe<WinRegKeyWhere>;
  /** @deprecated Use `child_keys_NONE` instead. */
  child_keys_NOT?: InputMaybe<WinRegKeyWhere>;
  /** Return WinRegKeys where all of the related WinRegKeys match this filter */
  child_keys_ALL?: InputMaybe<WinRegKeyWhere>;
  /** Return WinRegKeys where none of the related WinRegKeys match this filter */
  child_keys_NONE?: InputMaybe<WinRegKeyWhere>;
  /** Return WinRegKeys where one of the related WinRegKeys match this filter */
  child_keys_SINGLE?: InputMaybe<WinRegKeyWhere>;
  /** Return WinRegKeys where some of the related WinRegKeys match this filter */
  child_keys_SOME?: InputMaybe<WinRegKeyWhere>;
  /** @deprecated Use `child_keysConnection_SOME` instead. */
  child_keysConnection?: InputMaybe<WinRegKeyChild_KeysConnectionWhere>;
  /** @deprecated Use `child_keysConnection_NONE` instead. */
  child_keysConnection_NOT?: InputMaybe<WinRegKeyChild_KeysConnectionWhere>;
  /** Return WinRegKeys where all of the related WinRegKeyChild_keysConnections match this filter */
  child_keysConnection_ALL?: InputMaybe<WinRegKeyChild_KeysConnectionWhere>;
  /** Return WinRegKeys where none of the related WinRegKeyChild_keysConnections match this filter */
  child_keysConnection_NONE?: InputMaybe<WinRegKeyChild_KeysConnectionWhere>;
  /** Return WinRegKeys where one of the related WinRegKeyChild_keysConnections match this filter */
  child_keysConnection_SINGLE?: InputMaybe<WinRegKeyChild_KeysConnectionWhere>;
  /** Return WinRegKeys where some of the related WinRegKeyChild_keysConnections match this filter */
  child_keysConnection_SOME?: InputMaybe<WinRegKeyChild_KeysConnectionWhere>;
  child_keysAggregate?: InputMaybe<WinRegKeyChild_KeysAggregateInput>;
};

export type WinRegValueConnectOrCreateWhere = {
  node: WinRegValueUniqueWhere;
};

export type WinRegValueConnectWhere = {
  node: WinRegValueWhere;
};

export type WinRegValueCreateInput = {
  hash: Scalars["String"]["input"];
  type: Scalars["String"]["input"];
  value: Scalars["String"]["input"];
};

export type WinRegValueOnCreateInput = {
  hash: Scalars["String"]["input"];
  type: Scalars["String"]["input"];
  value: Scalars["String"]["input"];
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

export type WinRegValueUniqueWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
};

export type WinRegValueUpdateInput = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
  value?: InputMaybe<Scalars["String"]["input"]>;
};

export type WinRegValueWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT?: InputMaybe<Scalars["String"]["input"]>;
  hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  type_NOT?: InputMaybe<Scalars["String"]["input"]>;
  type_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  type_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  type_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  type_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  type_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  type_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  type_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  type_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  value?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  value_NOT?: InputMaybe<Scalars["String"]["input"]>;
  value_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  value_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  value_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  value_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  value_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  value_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  value_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  value_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  OR?: InputMaybe<Array<WinRegValueWhere>>;
  AND?: InputMaybe<Array<WinRegValueWhere>>;
  NOT?: InputMaybe<WinRegValueWhere>;
};

export type WinStructBlobAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<WinStructBlobAggregateInput>>;
  OR?: InputMaybe<Array<WinStructBlobAggregateInput>>;
  NOT?: InputMaybe<WinStructBlobAggregateInput>;
  node?: InputMaybe<WinStructBlobNodeAggregationWhereInput>;
};

export type WinStructBlobConnectFieldInput = {
  where?: InputMaybe<BlobConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<BlobConnectInput>;
};

export type WinStructBlobConnectionSort = {
  node?: InputMaybe<BlobSort>;
};

export type WinStructBlobConnectionWhere = {
  AND?: InputMaybe<Array<WinStructBlobConnectionWhere>>;
  OR?: InputMaybe<Array<WinStructBlobConnectionWhere>>;
  NOT?: InputMaybe<WinStructBlobConnectionWhere>;
  node?: InputMaybe<BlobWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<BlobWhere>;
};

export type WinStructBlobConnectOrCreateFieldInput = {
  where: BlobConnectOrCreateWhere;
  onCreate: WinStructBlobConnectOrCreateFieldInputOnCreate;
};

export type WinStructBlobConnectOrCreateFieldInputOnCreate = {
  node: BlobOnCreateInput;
};

export type WinStructBlobCreateFieldInput = {
  node: BlobCreateInput;
};

export type WinStructBlobDeleteFieldInput = {
  where?: InputMaybe<WinStructBlobConnectionWhere>;
  delete?: InputMaybe<BlobDeleteInput>;
};

export type WinStructBlobDisconnectFieldInput = {
  where?: InputMaybe<WinStructBlobConnectionWhere>;
  disconnect?: InputMaybe<BlobDisconnectInput>;
};

export type WinStructBlobFieldInput = {
  connectOrCreate?: InputMaybe<WinStructBlobConnectOrCreateFieldInput>;
  connect?: InputMaybe<WinStructBlobConnectFieldInput>;
  create?: InputMaybe<WinStructBlobCreateFieldInput>;
};

export type WinStructBlobNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<WinStructBlobNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<WinStructBlobNodeAggregationWhereInput>>;
  NOT?: InputMaybe<WinStructBlobNodeAggregationWhereInput>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
};

export type WinStructBlobUpdateConnectionInput = {
  node?: InputMaybe<BlobUpdateInput>;
};

export type WinStructBlobUpdateFieldInput = {
  where?: InputMaybe<WinStructBlobConnectionWhere>;
  connectOrCreate?: InputMaybe<WinStructBlobConnectOrCreateFieldInput>;
  connect?: InputMaybe<WinStructBlobConnectFieldInput>;
  disconnect?: InputMaybe<WinStructBlobDisconnectFieldInput>;
  create?: InputMaybe<WinStructBlobCreateFieldInput>;
  update?: InputMaybe<WinStructBlobUpdateConnectionInput>;
  delete?: InputMaybe<WinStructBlobDeleteFieldInput>;
};

export type WinStructConnectInput = {
  fields?: InputMaybe<Array<WinStructFieldsConnectFieldInput>>;
  blob?: InputMaybe<WinStructBlobConnectFieldInput>;
};

export type WinStructConnectOrCreateInput = {
  fields?: InputMaybe<Array<WinStructFieldsConnectOrCreateFieldInput>>;
  blob?: InputMaybe<WinStructBlobConnectOrCreateFieldInput>;
};

export type WinStructConnectOrCreateWhere = {
  node: WinStructUniqueWhere;
};

export type WinStructConnectWhere = {
  node: WinStructWhere;
};

export type WinStructCreateInput = {
  hash: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  size: Scalars["Int"]["input"];
  kind: Scalars["String"]["input"];
  fields?: InputMaybe<WinStructFieldsFieldInput>;
  blob?: InputMaybe<WinStructBlobFieldInput>;
};

export type WinStructDeleteInput = {
  fields?: InputMaybe<Array<WinStructFieldsDeleteFieldInput>>;
  blob?: InputMaybe<WinStructBlobDeleteFieldInput>;
};

export type WinStructDisconnectInput = {
  fields?: InputMaybe<Array<WinStructFieldsDisconnectFieldInput>>;
  blob?: InputMaybe<WinStructBlobDisconnectFieldInput>;
};

export type WinStructFieldConnectInput = {
  type?: InputMaybe<WinStructFieldTypeConnectFieldInput>;
};

export type WinStructFieldConnectOrCreateInput = {
  type?: InputMaybe<WinStructFieldTypeConnectOrCreateFieldInput>;
};

export type WinStructFieldConnectOrCreateWhere = {
  node: WinStructFieldUniqueWhere;
};

export type WinStructFieldConnectWhere = {
  node: WinStructFieldWhere;
};

export type WinStructFieldCreateInput = {
  hash: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  offset: Scalars["Int"]["input"];
  type?: InputMaybe<WinStructFieldTypeFieldInput>;
};

export type WinStructFieldDeleteInput = {
  type?: InputMaybe<WinStructFieldTypeDeleteFieldInput>;
};

export type WinStructFieldDisconnectInput = {
  type?: InputMaybe<WinStructFieldTypeDisconnectFieldInput>;
};

export type WinStructFieldOnCreateInput = {
  hash: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  offset: Scalars["Int"]["input"];
};

export type WinStructFieldOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more WinStructFieldSort objects to sort WinStructFields by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<WinStructFieldSort>>;
};

export type WinStructFieldRelationInput = {
  type?: InputMaybe<WinStructFieldTypeCreateFieldInput>;
};

export type WinStructFieldsAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<WinStructFieldsAggregateInput>>;
  OR?: InputMaybe<Array<WinStructFieldsAggregateInput>>;
  NOT?: InputMaybe<WinStructFieldsAggregateInput>;
  node?: InputMaybe<WinStructFieldsNodeAggregationWhereInput>;
};

export type WinStructFieldsConnectFieldInput = {
  where?: InputMaybe<WinStructFieldConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<Array<WinStructFieldConnectInput>>;
};

export type WinStructFieldsConnectionSort = {
  node?: InputMaybe<WinStructFieldSort>;
};

export type WinStructFieldsConnectionWhere = {
  AND?: InputMaybe<Array<WinStructFieldsConnectionWhere>>;
  OR?: InputMaybe<Array<WinStructFieldsConnectionWhere>>;
  NOT?: InputMaybe<WinStructFieldsConnectionWhere>;
  node?: InputMaybe<WinStructFieldWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<WinStructFieldWhere>;
};

export type WinStructFieldsConnectOrCreateFieldInput = {
  where: WinStructFieldConnectOrCreateWhere;
  onCreate: WinStructFieldsConnectOrCreateFieldInputOnCreate;
};

export type WinStructFieldsConnectOrCreateFieldInputOnCreate = {
  node: WinStructFieldOnCreateInput;
};

export type WinStructFieldsCreateFieldInput = {
  node: WinStructFieldCreateInput;
};

export type WinStructFieldsDeleteFieldInput = {
  where?: InputMaybe<WinStructFieldsConnectionWhere>;
  delete?: InputMaybe<WinStructFieldDeleteInput>;
};

export type WinStructFieldsDisconnectFieldInput = {
  where?: InputMaybe<WinStructFieldsConnectionWhere>;
  disconnect?: InputMaybe<WinStructFieldDisconnectInput>;
};

export type WinStructFieldsFieldInput = {
  connectOrCreate?: InputMaybe<Array<WinStructFieldsConnectOrCreateFieldInput>>;
  connect?: InputMaybe<Array<WinStructFieldsConnectFieldInput>>;
  create?: InputMaybe<Array<WinStructFieldsCreateFieldInput>>;
};

export type WinStructFieldsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<WinStructFieldsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<WinStructFieldsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<WinStructFieldsNodeAggregationWhereInput>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  offset_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  offset_MIN_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  offset_MAX_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  offset_SUM_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  offset_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  offset_GT?: InputMaybe<Scalars["Int"]["input"]>;
  offset_MIN_GT?: InputMaybe<Scalars["Int"]["input"]>;
  offset_MAX_GT?: InputMaybe<Scalars["Int"]["input"]>;
  offset_SUM_GT?: InputMaybe<Scalars["Int"]["input"]>;
  offset_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  offset_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  offset_MIN_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  offset_MAX_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  offset_SUM_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  offset_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  offset_LT?: InputMaybe<Scalars["Int"]["input"]>;
  offset_MIN_LT?: InputMaybe<Scalars["Int"]["input"]>;
  offset_MAX_LT?: InputMaybe<Scalars["Int"]["input"]>;
  offset_SUM_LT?: InputMaybe<Scalars["Int"]["input"]>;
  offset_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  offset_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  offset_MIN_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  offset_MAX_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  offset_SUM_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  offset_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
};

/** Fields to sort WinStructFields by. The order in which sorts are applied is not guaranteed when specifying many fields in one WinStructFieldSort object. */
export type WinStructFieldSort = {
  hash?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  offset?: InputMaybe<SortDirection>;
};

export type WinStructFieldsUpdateConnectionInput = {
  node?: InputMaybe<WinStructFieldUpdateInput>;
};

export type WinStructFieldsUpdateFieldInput = {
  where?: InputMaybe<WinStructFieldsConnectionWhere>;
  connectOrCreate?: InputMaybe<Array<WinStructFieldsConnectOrCreateFieldInput>>;
  connect?: InputMaybe<Array<WinStructFieldsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<WinStructFieldsDisconnectFieldInput>>;
  create?: InputMaybe<Array<WinStructFieldsCreateFieldInput>>;
  update?: InputMaybe<WinStructFieldsUpdateConnectionInput>;
  delete?: InputMaybe<Array<WinStructFieldsDeleteFieldInput>>;
};

export type WinStructFieldTypeAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<WinStructFieldTypeAggregateInput>>;
  OR?: InputMaybe<Array<WinStructFieldTypeAggregateInput>>;
  NOT?: InputMaybe<WinStructFieldTypeAggregateInput>;
  node?: InputMaybe<WinStructFieldTypeNodeAggregationWhereInput>;
};

export type WinStructFieldTypeConnectFieldInput = {
  where?: InputMaybe<WinDataTypeConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<WinDataTypeConnectInput>;
};

export type WinStructFieldTypeConnectionSort = {
  node?: InputMaybe<WinDataTypeSort>;
};

export type WinStructFieldTypeConnectionWhere = {
  AND?: InputMaybe<Array<WinStructFieldTypeConnectionWhere>>;
  OR?: InputMaybe<Array<WinStructFieldTypeConnectionWhere>>;
  NOT?: InputMaybe<WinStructFieldTypeConnectionWhere>;
  node?: InputMaybe<WinDataTypeWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<WinDataTypeWhere>;
};

export type WinStructFieldTypeConnectOrCreateFieldInput = {
  where: WinDataTypeConnectOrCreateWhere;
  onCreate: WinStructFieldTypeConnectOrCreateFieldInputOnCreate;
};

export type WinStructFieldTypeConnectOrCreateFieldInputOnCreate = {
  node: WinDataTypeOnCreateInput;
};

export type WinStructFieldTypeCreateFieldInput = {
  node: WinDataTypeCreateInput;
};

export type WinStructFieldTypeDeleteFieldInput = {
  where?: InputMaybe<WinStructFieldTypeConnectionWhere>;
  delete?: InputMaybe<WinDataTypeDeleteInput>;
};

export type WinStructFieldTypeDisconnectFieldInput = {
  where?: InputMaybe<WinStructFieldTypeConnectionWhere>;
  disconnect?: InputMaybe<WinDataTypeDisconnectInput>;
};

export type WinStructFieldTypeFieldInput = {
  connectOrCreate?: InputMaybe<WinStructFieldTypeConnectOrCreateFieldInput>;
  connect?: InputMaybe<WinStructFieldTypeConnectFieldInput>;
  create?: InputMaybe<WinStructFieldTypeCreateFieldInput>;
};

export type WinStructFieldTypeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<WinStructFieldTypeNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<WinStructFieldTypeNodeAggregationWhereInput>>;
  NOT?: InputMaybe<WinStructFieldTypeNodeAggregationWhereInput>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  hash_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  hash_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  hash_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  hash_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  type_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  type_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  type_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  type_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  type_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  type_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  type_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  type_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  type_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  type_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  type_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  type_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  type_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  type_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  type_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  type_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  type_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  type_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  type_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  type_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  type_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_EQUAL?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_GT?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_LT?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  name_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_LONGEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Please use the explicit _LENGTH version for string aggregation. */
  name_SHORTEST_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  array_counter_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MIN_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MAX_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_SUM_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  array_counter_GT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MIN_GT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MAX_GT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_SUM_GT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  array_counter_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MIN_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MAX_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_SUM_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  array_counter_LT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MIN_LT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MAX_LT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_SUM_LT?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  array_counter_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MIN_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_MAX_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_SUM_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  array_counter_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_position_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MIN_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MAX_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_SUM_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_position_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MIN_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MAX_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_SUM_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_position_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MIN_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MAX_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_SUM_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_position_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MIN_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MAX_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_SUM_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_position_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MIN_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_MAX_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_SUM_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_length_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MIN_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MAX_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_SUM_EQUAL?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_AVERAGE_EQUAL?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_length_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MIN_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MAX_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_SUM_GT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_AVERAGE_GT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_length_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MIN_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MAX_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_SUM_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_AVERAGE_GTE?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_length_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MIN_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MAX_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_SUM_LT?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_AVERAGE_LT?: InputMaybe<Scalars["Float"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  bit_length_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MIN_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_MAX_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_SUM_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length_AVERAGE_LTE?: InputMaybe<Scalars["Float"]["input"]>;
};

export type WinStructFieldTypeUpdateConnectionInput = {
  node?: InputMaybe<WinDataTypeUpdateInput>;
};

export type WinStructFieldTypeUpdateFieldInput = {
  where?: InputMaybe<WinStructFieldTypeConnectionWhere>;
  connectOrCreate?: InputMaybe<WinStructFieldTypeConnectOrCreateFieldInput>;
  connect?: InputMaybe<WinStructFieldTypeConnectFieldInput>;
  disconnect?: InputMaybe<WinStructFieldTypeDisconnectFieldInput>;
  create?: InputMaybe<WinStructFieldTypeCreateFieldInput>;
  update?: InputMaybe<WinStructFieldTypeUpdateConnectionInput>;
  delete?: InputMaybe<WinStructFieldTypeDeleteFieldInput>;
};

export type WinStructFieldUniqueWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
};

export type WinStructFieldUpdateInput = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  offset_INCREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  offset_DECREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  type?: InputMaybe<WinStructFieldTypeUpdateFieldInput>;
};

export type WinStructFieldWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT?: InputMaybe<Scalars["String"]["input"]>;
  hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT?: InputMaybe<Scalars["String"]["input"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  offset_NOT?: InputMaybe<Scalars["Int"]["input"]>;
  offset_IN?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  offset_NOT_IN?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  offset_LT?: InputMaybe<Scalars["Int"]["input"]>;
  offset_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  offset_GT?: InputMaybe<Scalars["Int"]["input"]>;
  offset_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  OR?: InputMaybe<Array<WinStructFieldWhere>>;
  AND?: InputMaybe<Array<WinStructFieldWhere>>;
  NOT?: InputMaybe<WinStructFieldWhere>;
  type?: InputMaybe<WinDataTypeWhere>;
  type_NOT?: InputMaybe<WinDataTypeWhere>;
  typeConnection?: InputMaybe<WinStructFieldTypeConnectionWhere>;
  typeConnection_NOT?: InputMaybe<WinStructFieldTypeConnectionWhere>;
  typeAggregate?: InputMaybe<WinStructFieldTypeAggregateInput>;
};

export type WinStructOnCreateInput = {
  hash: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  size: Scalars["Int"]["input"];
  kind: Scalars["String"]["input"];
};

export type WinStructOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more WinStructSort objects to sort WinStructs by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<WinStructSort>>;
};

export type WinStructRelationInput = {
  fields?: InputMaybe<Array<WinStructFieldsCreateFieldInput>>;
  blob?: InputMaybe<WinStructBlobCreateFieldInput>;
};

/** Fields to sort WinStructs by. The order in which sorts are applied is not guaranteed when specifying many fields in one WinStructSort object. */
export type WinStructSort = {
  hash?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  size?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type WinStructUniqueWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
};

export type WinStructUpdateInput = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  size?: InputMaybe<Scalars["Int"]["input"]>;
  size_INCREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  size_DECREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  kind?: InputMaybe<Scalars["String"]["input"]>;
  fields?: InputMaybe<Array<WinStructFieldsUpdateFieldInput>>;
  blob?: InputMaybe<WinStructBlobUpdateFieldInput>;
};

export type WinStructWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT?: InputMaybe<Scalars["String"]["input"]>;
  hash_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  hash_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT?: InputMaybe<Scalars["String"]["input"]>;
  name_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  name_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  name_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  name_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  name_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  size?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  size_NOT?: InputMaybe<Scalars["Int"]["input"]>;
  size_IN?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  size_NOT_IN?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  size_LT?: InputMaybe<Scalars["Int"]["input"]>;
  size_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  size_GT?: InputMaybe<Scalars["Int"]["input"]>;
  size_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  kind?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  kind_NOT?: InputMaybe<Scalars["String"]["input"]>;
  kind_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  kind_NOT_IN?: InputMaybe<Array<Scalars["String"]["input"]>>;
  kind_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  kind_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  kind_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  kind_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  kind_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  kind_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  OR?: InputMaybe<Array<WinStructWhere>>;
  AND?: InputMaybe<Array<WinStructWhere>>;
  NOT?: InputMaybe<WinStructWhere>;
  /** @deprecated Use `fields_SOME` instead. */
  fields?: InputMaybe<WinStructFieldWhere>;
  /** @deprecated Use `fields_NONE` instead. */
  fields_NOT?: InputMaybe<WinStructFieldWhere>;
  /** Return WinStructs where all of the related WinStructFields match this filter */
  fields_ALL?: InputMaybe<WinStructFieldWhere>;
  /** Return WinStructs where none of the related WinStructFields match this filter */
  fields_NONE?: InputMaybe<WinStructFieldWhere>;
  /** Return WinStructs where one of the related WinStructFields match this filter */
  fields_SINGLE?: InputMaybe<WinStructFieldWhere>;
  /** Return WinStructs where some of the related WinStructFields match this filter */
  fields_SOME?: InputMaybe<WinStructFieldWhere>;
  /** @deprecated Use `fieldsConnection_SOME` instead. */
  fieldsConnection?: InputMaybe<WinStructFieldsConnectionWhere>;
  /** @deprecated Use `fieldsConnection_NONE` instead. */
  fieldsConnection_NOT?: InputMaybe<WinStructFieldsConnectionWhere>;
  /** Return WinStructs where all of the related WinStructFieldsConnections match this filter */
  fieldsConnection_ALL?: InputMaybe<WinStructFieldsConnectionWhere>;
  /** Return WinStructs where none of the related WinStructFieldsConnections match this filter */
  fieldsConnection_NONE?: InputMaybe<WinStructFieldsConnectionWhere>;
  /** Return WinStructs where one of the related WinStructFieldsConnections match this filter */
  fieldsConnection_SINGLE?: InputMaybe<WinStructFieldsConnectionWhere>;
  /** Return WinStructs where some of the related WinStructFieldsConnections match this filter */
  fieldsConnection_SOME?: InputMaybe<WinStructFieldsConnectionWhere>;
  fieldsAggregate?: InputMaybe<WinStructFieldsAggregateInput>;
  blob?: InputMaybe<BlobWhere>;
  blob_NOT?: InputMaybe<BlobWhere>;
  blobConnection?: InputMaybe<WinStructBlobConnectionWhere>;
  blobConnection_NOT?: InputMaybe<WinStructBlobConnectionWhere>;
  blobAggregate?: InputMaybe<WinStructBlobAggregateInput>;
};

export interface BlobAggregateSelectionInput {
  count?: boolean;
  hash?: boolean;
}

export declare class BlobModel {
  public find(args?: {
    where?: BlobWhere;

    options?: BlobOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Blob[]>;
  public create(args: {
    input: BlobCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateBlobsMutationResponse>;
  public update(args: {
    where?: BlobWhere;
    update?: BlobUpdateInput;
    connect?: BlobConnectInput;
    disconnect?: BlobDisconnectInput;
    create?: BlobCreateInput;
    connectOrCreate?: BlobConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateBlobsMutationResponse>;
  public delete(args: {
    where?: BlobWhere;
    delete?: BlobDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: BlobWhere;

    aggregate: BlobAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<BlobAggregateSelection>;
}

export interface TreeAggregateSelectionInput {
  count?: boolean;
  hash?: boolean;
}

export declare class TreeModel {
  public find(args?: {
    where?: TreeWhere;

    options?: TreeOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Tree[]>;
  public create(args: {
    input: TreeCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateTreesMutationResponse>;
  public update(args: {
    where?: TreeWhere;
    update?: TreeUpdateInput;
    connect?: TreeConnectInput;
    disconnect?: TreeDisconnectInput;
    create?: TreeCreateInput;
    connectOrCreate?: TreeConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateTreesMutationResponse>;
  public delete(args: {
    where?: TreeWhere;
    delete?: TreeDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: TreeWhere;

    aggregate: TreeAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<TreeAggregateSelection>;
}

export interface CommitAggregateSelectionInput {
  count?: boolean;
  hash?: boolean;
  name?: boolean;
  description?: boolean;
  date?: boolean;
}

export declare class CommitModel {
  public find(args?: {
    where?: CommitWhere;

    options?: CommitOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Commit[]>;
  public create(args: {
    input: CommitCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateCommitsMutationResponse>;
  public update(args: {
    where?: CommitWhere;
    update?: CommitUpdateInput;
    connect?: CommitConnectInput;
    disconnect?: CommitDisconnectInput;
    create?: CommitCreateInput;
    connectOrCreate?: CommitConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateCommitsMutationResponse>;
  public delete(args: {
    where?: CommitWhere;
    delete?: CommitDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: CommitWhere;

    aggregate: CommitAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<CommitAggregateSelection>;
}

export interface BranchAggregateSelectionInput {
  count?: boolean;
  name?: boolean;
}

export declare class BranchModel {
  public find(args?: {
    where?: BranchWhere;

    options?: BranchOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Branch[]>;
  public create(args: {
    input: BranchCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateBranchesMutationResponse>;
  public update(args: {
    where?: BranchWhere;
    update?: BranchUpdateInput;
    connect?: BranchConnectInput;
    disconnect?: BranchDisconnectInput;
    create?: BranchCreateInput;
    connectOrCreate?: BranchConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateBranchesMutationResponse>;
  public delete(args: {
    where?: BranchWhere;
    delete?: BranchDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: BranchWhere;

    aggregate: BranchAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<BranchAggregateSelection>;
}

export interface WinRegValueAggregateSelectionInput {
  count?: boolean;
  hash?: boolean;
  type?: boolean;
  value?: boolean;
}

export declare class WinRegValueModel {
  public find(args?: {
    where?: WinRegValueWhere;

    options?: WinRegValueOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<WinRegValue[]>;
  public create(args: {
    input: WinRegValueCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateWinRegValuesMutationResponse>;
  public update(args: {
    where?: WinRegValueWhere;
    update?: WinRegValueUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateWinRegValuesMutationResponse>;
  public delete(args: {
    where?: WinRegValueWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: WinRegValueWhere;

    aggregate: WinRegValueAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<WinRegValueAggregateSelection>;
}

export interface WinRegKeyAggregateSelectionInput {
  count?: boolean;
  hash?: boolean;
}

export declare class WinRegKeyModel {
  public find(args?: {
    where?: WinRegKeyWhere;

    options?: WinRegKeyOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<WinRegKey[]>;
  public create(args: {
    input: WinRegKeyCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateWinRegKeysMutationResponse>;
  public update(args: {
    where?: WinRegKeyWhere;
    update?: WinRegKeyUpdateInput;
    connect?: WinRegKeyConnectInput;
    disconnect?: WinRegKeyDisconnectInput;
    create?: WinRegKeyCreateInput;
    connectOrCreate?: WinRegKeyConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateWinRegKeysMutationResponse>;
  public delete(args: {
    where?: WinRegKeyWhere;
    delete?: WinRegKeyDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: WinRegKeyWhere;

    aggregate: WinRegKeyAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<WinRegKeyAggregateSelection>;
}

export interface SymbolAggregateSelectionInput {
  count?: boolean;
  name?: boolean;
}

export declare class SymbolModel {
  public find(args?: {
    where?: SymbolWhere;

    options?: SymbolOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Symbol[]>;
  public create(args: {
    input: SymbolCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateSymbolsMutationResponse>;
  public update(args: {
    where?: SymbolWhere;
    update?: SymbolUpdateInput;
    connect?: SymbolConnectInput;
    disconnect?: SymbolDisconnectInput;
    create?: SymbolCreateInput;
    connectOrCreate?: SymbolConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateSymbolsMutationResponse>;
  public delete(args: {
    where?: SymbolWhere;
    delete?: SymbolDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: SymbolWhere;

    aggregate: SymbolAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<SymbolAggregateSelection>;
}

export interface WinStructAggregateSelectionInput {
  count?: boolean;
  hash?: boolean;
  name?: boolean;
  size?: boolean;
  kind?: boolean;
}

export declare class WinStructModel {
  public find(args?: {
    where?: WinStructWhere;

    options?: WinStructOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<WinStruct[]>;
  public create(args: {
    input: WinStructCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateWinStructsMutationResponse>;
  public update(args: {
    where?: WinStructWhere;
    update?: WinStructUpdateInput;
    connect?: WinStructConnectInput;
    disconnect?: WinStructDisconnectInput;
    create?: WinStructCreateInput;
    connectOrCreate?: WinStructConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateWinStructsMutationResponse>;
  public delete(args: {
    where?: WinStructWhere;
    delete?: WinStructDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: WinStructWhere;

    aggregate: WinStructAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<WinStructAggregateSelection>;
}

export interface WinStructFieldAggregateSelectionInput {
  count?: boolean;
  hash?: boolean;
  name?: boolean;
  offset?: boolean;
}

export declare class WinStructFieldModel {
  public find(args?: {
    where?: WinStructFieldWhere;

    options?: WinStructFieldOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<WinStructField[]>;
  public create(args: {
    input: WinStructFieldCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateWinStructFieldsMutationResponse>;
  public update(args: {
    where?: WinStructFieldWhere;
    update?: WinStructFieldUpdateInput;
    connect?: WinStructFieldConnectInput;
    disconnect?: WinStructFieldDisconnectInput;
    create?: WinStructFieldCreateInput;
    connectOrCreate?: WinStructFieldConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateWinStructFieldsMutationResponse>;
  public delete(args: {
    where?: WinStructFieldWhere;
    delete?: WinStructFieldDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: WinStructFieldWhere;

    aggregate: WinStructFieldAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<WinStructFieldAggregateSelection>;
}

export interface WinDataTypeAggregateSelectionInput {
  count?: boolean;
  hash?: boolean;
  type?: boolean;
  name?: boolean;
  array_counter?: boolean;
  bit_position?: boolean;
  bit_length?: boolean;
}

export declare class WinDataTypeModel {
  public find(args?: {
    where?: WinDataTypeWhere;

    options?: WinDataTypeOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<WinDataType[]>;
  public create(args: {
    input: WinDataTypeCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateWinDataTypesMutationResponse>;
  public update(args: {
    where?: WinDataTypeWhere;
    update?: WinDataTypeUpdateInput;
    connect?: WinDataTypeConnectInput;
    disconnect?: WinDataTypeDisconnectInput;
    create?: WinDataTypeCreateInput;
    connectOrCreate?: WinDataTypeConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateWinDataTypesMutationResponse>;
  public delete(args: {
    where?: WinDataTypeWhere;
    delete?: WinDataTypeDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: WinDataTypeWhere;

    aggregate: WinDataTypeAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<WinDataTypeAggregateSelection>;
}

export interface HashableNodePropsAggregateSelectionInput {
  count?: boolean;
  hash?: boolean;
}

export declare class HashableNodePropsModel {
  public find(args?: {
    where?: HashableNodePropsWhere;

    options?: HashableNodePropsOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<HashableNodeProps[]>;
  public create(args: {
    input: HashableNodePropsCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateHashableNodePropsMutationResponse>;
  public update(args: {
    where?: HashableNodePropsWhere;
    update?: HashableNodePropsUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateHashableNodePropsMutationResponse>;
  public delete(args: {
    where?: HashableNodePropsWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: HashableNodePropsWhere;

    aggregate: HashableNodePropsAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<HashableNodePropsAggregateSelection>;
}

export interface DiffItemAggregateSelectionInput {
  count?: boolean;
  path?: boolean;
}

export declare class DiffItemModel {
  public find(args?: {
    where?: DiffItemWhere;

    options?: DiffItemOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<DiffItem[]>;
  public create(args: {
    input: DiffItemCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateDiffItemsMutationResponse>;
  public update(args: {
    where?: DiffItemWhere;
    update?: DiffItemUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateDiffItemsMutationResponse>;
  public delete(args: {
    where?: DiffItemWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: DiffItemWhere;

    aggregate: DiffItemAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<DiffItemAggregateSelection>;
}

export interface UserAggregateSelectionInput {
  count?: boolean;
  name?: boolean;
}

export declare class UserModel {
  public find(args?: {
    where?: UserWhere;

    options?: UserOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<User[]>;
  public create(args: {
    input: UserCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateUsersMutationResponse>;
  public update(args: {
    where?: UserWhere;
    update?: UserUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateUsersMutationResponse>;
  public delete(args: {
    where?: UserWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: UserWhere;

    aggregate: UserAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<UserAggregateSelection>;
}

export interface SearchResultAggregateSelectionInput {
  count?: boolean;
  commit_name?: boolean;
  commit_hash?: boolean;
  hash?: boolean;
  path?: boolean;
}

export declare class SearchResultModel {
  public find(args?: {
    where?: SearchResultWhere;

    options?: SearchResultOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<SearchResult[]>;
  public create(args: {
    input: SearchResultCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateSearchResultsMutationResponse>;
  public update(args: {
    where?: SearchResultWhere;
    update?: SearchResultUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateSearchResultsMutationResponse>;
  public delete(args: {
    where?: SearchResultWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: SearchResultWhere;

    aggregate: SearchResultAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<SearchResultAggregateSelection>;
}

export interface ModelMap {
  Blob: BlobModel;
  Tree: TreeModel;
  Commit: CommitModel;
  Branch: BranchModel;
  WinRegValue: WinRegValueModel;
  WinRegKey: WinRegKeyModel;
  Symbol: SymbolModel;
  WinStruct: WinStructModel;
  WinStructField: WinStructFieldModel;
  WinDataType: WinDataTypeModel;
  HashableNodeProps: HashableNodePropsModel;
  DiffItem: DiffItemModel;
  User: UserModel;
  SearchResult: SearchResultModel;
}
