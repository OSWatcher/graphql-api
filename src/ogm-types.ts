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
  /** A date and time, represented as an ISO-8601 string */
  DateTime: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export type Query = {
  __typename?: "Query";
  diffNodesAt: DiffNodesAtResult;
  fetchCommitHistory: Array<Commit>;
  traversePath?: Maybe<Scalars["String"]["output"]>;
  getCommitExtractedDataLabels: Array<Scalars["String"]["output"]>;
  search: Array<SearchResult>;
  fetchSymbols: Array<SymbolFetchResult>;
  fetchStructs: Array<StructFetchResult>;
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
  structs: Array<Struct>;
  structsConnection: StructsConnection;
  structsAggregate: StructAggregateSelection;
  structFields: Array<StructField>;
  structFieldsConnection: StructFieldsConnection;
  structFieldsAggregate: StructFieldAggregateSelection;
  dataTypes: Array<DataType>;
  dataTypesConnection: DataTypesConnection;
  dataTypesAggregate: DataTypeAggregateSelection;
  hashableNodeProps: Array<HashableNodeProps>;
  hashableNodePropsConnection: HashableNodePropsConnection;
  hashableNodePropsAggregate: HashableNodePropsAggregateSelection;
  diffNodesAtResults: Array<DiffNodesAtResult>;
  diffNodesAtResultsConnection: DiffNodesAtResultsConnection;
  diffNodesAtResultsAggregate: DiffNodesAtResultAggregateSelection;
  diffItems: Array<DiffItem>;
  diffItemsConnection: DiffItemsConnection;
  diffItemsAggregate: DiffItemAggregateSelection;
  searchResults: Array<SearchResult>;
  searchResultsConnection: SearchResultsConnection;
  searchResultsAggregate: SearchResultAggregateSelection;
  symbolFetchResults: Array<SymbolFetchResult>;
  symbolFetchResultsConnection: SymbolFetchResultsConnection;
  symbolFetchResultsAggregate: SymbolFetchResultAggregateSelection;
  structFieldFetchResults: Array<StructFieldFetchResult>;
  structFieldFetchResultsConnection: StructFieldFetchResultsConnection;
  structFieldFetchResultsAggregate: StructFieldFetchResultAggregateSelection;
  structFetchResults: Array<StructFetchResult>;
  structFetchResultsConnection: StructFetchResultsConnection;
  structFetchResultsAggregate: StructFetchResultAggregateSelection;
};

export type QueryDiffNodesAtArgs = {
  parent_label: Scalars["String"]["input"];
  base_node_hash: Scalars["String"]["input"];
  diffee_node_hash: Scalars["String"]["input"];
  at_path: Scalars["String"]["input"];
  max_depth?: InputMaybe<Scalars["Int"]["input"]>;
  filter?: InputMaybe<Array<Scalars["String"]["input"]>>;
  with_intermediates?: InputMaybe<Scalars["Boolean"]["input"]>;
  options?: InputMaybe<DiffNodesOptions>;
};

export type QueryFetchCommitHistoryArgs = {
  commit_hash: Scalars["String"]["input"];
  direction?: InputMaybe<CommitHistoryDirection>;
};

export type QueryTraversePathArgs = {
  parent_label: Scalars["String"]["input"];
  tree_hash: Scalars["String"]["input"];
  path: Scalars["String"]["input"];
};

export type QueryGetCommitExtractedDataLabelsArgs = {
  commit_hash: Scalars["String"]["input"];
};

export type QuerySearchArgs = {
  commit_range: CommitRange;
  search_term: Scalars["String"]["input"];
};

export type QueryFetchSymbolsArgs = {
  blob_hash: Scalars["String"]["input"];
  options?: InputMaybe<SymbolOptions>;
};

export type QueryFetchStructsArgs = {
  blob_hash: Scalars["String"]["input"];
  options?: InputMaybe<StructOptions>;
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

export type QueryStructsArgs = {
  where?: InputMaybe<StructWhere>;
  options?: InputMaybe<StructOptions>;
};

export type QueryStructsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<StructWhere>;
  sort?: InputMaybe<Array<InputMaybe<StructSort>>>;
};

export type QueryStructsAggregateArgs = {
  where?: InputMaybe<StructWhere>;
};

export type QueryStructFieldsArgs = {
  where?: InputMaybe<StructFieldWhere>;
  options?: InputMaybe<StructFieldOptions>;
};

export type QueryStructFieldsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<StructFieldWhere>;
  sort?: InputMaybe<Array<InputMaybe<StructFieldSort>>>;
};

export type QueryStructFieldsAggregateArgs = {
  where?: InputMaybe<StructFieldWhere>;
};

export type QueryDataTypesArgs = {
  where?: InputMaybe<DataTypeWhere>;
  options?: InputMaybe<DataTypeOptions>;
};

export type QueryDataTypesConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<DataTypeWhere>;
  sort?: InputMaybe<Array<InputMaybe<DataTypeSort>>>;
};

export type QueryDataTypesAggregateArgs = {
  where?: InputMaybe<DataTypeWhere>;
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

export type QueryDiffNodesAtResultsArgs = {
  where?: InputMaybe<DiffNodesAtResultWhere>;
  options?: InputMaybe<DiffNodesAtResultOptions>;
};

export type QueryDiffNodesAtResultsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<DiffNodesAtResultWhere>;
  sort?: InputMaybe<Array<InputMaybe<DiffNodesAtResultSort>>>;
};

export type QueryDiffNodesAtResultsAggregateArgs = {
  where?: InputMaybe<DiffNodesAtResultWhere>;
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

export type QuerySymbolFetchResultsArgs = {
  where?: InputMaybe<SymbolFetchResultWhere>;
  options?: InputMaybe<SymbolFetchResultOptions>;
};

export type QuerySymbolFetchResultsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<SymbolFetchResultWhere>;
  sort?: InputMaybe<Array<InputMaybe<SymbolFetchResultSort>>>;
};

export type QuerySymbolFetchResultsAggregateArgs = {
  where?: InputMaybe<SymbolFetchResultWhere>;
};

export type QueryStructFieldFetchResultsArgs = {
  where?: InputMaybe<StructFieldFetchResultWhere>;
  options?: InputMaybe<StructFieldFetchResultOptions>;
};

export type QueryStructFieldFetchResultsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<StructFieldFetchResultWhere>;
  sort?: InputMaybe<Array<InputMaybe<StructFieldFetchResultSort>>>;
};

export type QueryStructFieldFetchResultsAggregateArgs = {
  where?: InputMaybe<StructFieldFetchResultWhere>;
};

export type QueryStructFetchResultsArgs = {
  where?: InputMaybe<StructFetchResultWhere>;
  options?: InputMaybe<StructFetchResultOptions>;
};

export type QueryStructFetchResultsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<StructFetchResultWhere>;
  sort?: InputMaybe<Array<InputMaybe<StructFetchResultSort>>>;
};

export type QueryStructFetchResultsAggregateArgs = {
  where?: InputMaybe<StructFetchResultWhere>;
};

export type Mutation = {
  __typename?: "Mutation";
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
  createStructs: CreateStructsMutationResponse;
  deleteStructs: DeleteInfo;
  updateStructs: UpdateStructsMutationResponse;
  createStructFields: CreateStructFieldsMutationResponse;
  deleteStructFields: DeleteInfo;
  updateStructFields: UpdateStructFieldsMutationResponse;
  createDataTypes: CreateDataTypesMutationResponse;
  deleteDataTypes: DeleteInfo;
  updateDataTypes: UpdateDataTypesMutationResponse;
  createHashableNodeProps: CreateHashableNodePropsMutationResponse;
  deleteHashableNodeProps: DeleteInfo;
  updateHashableNodeProps: UpdateHashableNodePropsMutationResponse;
  createDiffNodesAtResults: CreateDiffNodesAtResultsMutationResponse;
  deleteDiffNodesAtResults: DeleteInfo;
  updateDiffNodesAtResults: UpdateDiffNodesAtResultsMutationResponse;
  createDiffItems: CreateDiffItemsMutationResponse;
  deleteDiffItems: DeleteInfo;
  updateDiffItems: UpdateDiffItemsMutationResponse;
  createSearchResults: CreateSearchResultsMutationResponse;
  deleteSearchResults: DeleteInfo;
  updateSearchResults: UpdateSearchResultsMutationResponse;
  createSymbolFetchResults: CreateSymbolFetchResultsMutationResponse;
  deleteSymbolFetchResults: DeleteInfo;
  updateSymbolFetchResults: UpdateSymbolFetchResultsMutationResponse;
  createStructFieldFetchResults: CreateStructFieldFetchResultsMutationResponse;
  deleteStructFieldFetchResults: DeleteInfo;
  updateStructFieldFetchResults: UpdateStructFieldFetchResultsMutationResponse;
  createStructFetchResults: CreateStructFetchResultsMutationResponse;
  deleteStructFetchResults: DeleteInfo;
  updateStructFetchResults: UpdateStructFetchResultsMutationResponse;
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

export type MutationCreateStructsArgs = {
  input: Array<StructCreateInput>;
};

export type MutationDeleteStructsArgs = {
  where?: InputMaybe<StructWhere>;
  delete?: InputMaybe<StructDeleteInput>;
};

export type MutationUpdateStructsArgs = {
  where?: InputMaybe<StructWhere>;
  update?: InputMaybe<StructUpdateInput>;
  connect?: InputMaybe<StructConnectInput>;
  disconnect?: InputMaybe<StructDisconnectInput>;
  create?: InputMaybe<StructRelationInput>;
  delete?: InputMaybe<StructDeleteInput>;
  connectOrCreate?: InputMaybe<StructConnectOrCreateInput>;
};

export type MutationCreateStructFieldsArgs = {
  input: Array<StructFieldCreateInput>;
};

export type MutationDeleteStructFieldsArgs = {
  where?: InputMaybe<StructFieldWhere>;
  delete?: InputMaybe<StructFieldDeleteInput>;
};

export type MutationUpdateStructFieldsArgs = {
  where?: InputMaybe<StructFieldWhere>;
  update?: InputMaybe<StructFieldUpdateInput>;
  connect?: InputMaybe<StructFieldConnectInput>;
  disconnect?: InputMaybe<StructFieldDisconnectInput>;
  create?: InputMaybe<StructFieldRelationInput>;
  delete?: InputMaybe<StructFieldDeleteInput>;
  connectOrCreate?: InputMaybe<StructFieldConnectOrCreateInput>;
};

export type MutationCreateDataTypesArgs = {
  input: Array<DataTypeCreateInput>;
};

export type MutationDeleteDataTypesArgs = {
  where?: InputMaybe<DataTypeWhere>;
  delete?: InputMaybe<DataTypeDeleteInput>;
};

export type MutationUpdateDataTypesArgs = {
  where?: InputMaybe<DataTypeWhere>;
  update?: InputMaybe<DataTypeUpdateInput>;
  connect?: InputMaybe<DataTypeConnectInput>;
  disconnect?: InputMaybe<DataTypeDisconnectInput>;
  create?: InputMaybe<DataTypeRelationInput>;
  delete?: InputMaybe<DataTypeDeleteInput>;
  connectOrCreate?: InputMaybe<DataTypeConnectOrCreateInput>;
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

export type MutationCreateDiffNodesAtResultsArgs = {
  input: Array<DiffNodesAtResultCreateInput>;
};

export type MutationDeleteDiffNodesAtResultsArgs = {
  where?: InputMaybe<DiffNodesAtResultWhere>;
};

export type MutationUpdateDiffNodesAtResultsArgs = {
  where?: InputMaybe<DiffNodesAtResultWhere>;
  update?: InputMaybe<DiffNodesAtResultUpdateInput>;
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

export type MutationCreateSymbolFetchResultsArgs = {
  input: Array<SymbolFetchResultCreateInput>;
};

export type MutationDeleteSymbolFetchResultsArgs = {
  where?: InputMaybe<SymbolFetchResultWhere>;
};

export type MutationUpdateSymbolFetchResultsArgs = {
  where?: InputMaybe<SymbolFetchResultWhere>;
  update?: InputMaybe<SymbolFetchResultUpdateInput>;
};

export type MutationCreateStructFieldFetchResultsArgs = {
  input: Array<StructFieldFetchResultCreateInput>;
};

export type MutationDeleteStructFieldFetchResultsArgs = {
  where?: InputMaybe<StructFieldFetchResultWhere>;
};

export type MutationUpdateStructFieldFetchResultsArgs = {
  where?: InputMaybe<StructFieldFetchResultWhere>;
  update?: InputMaybe<StructFieldFetchResultUpdateInput>;
};

export type MutationCreateStructFetchResultsArgs = {
  input: Array<StructFetchResultCreateInput>;
};

export type MutationDeleteStructFetchResultsArgs = {
  where?: InputMaybe<StructFetchResultWhere>;
};

export type MutationUpdateStructFetchResultsArgs = {
  where?: InputMaybe<StructFetchResultWhere>;
  update?: InputMaybe<StructFetchResultUpdateInput>;
};

export type Subscription = {
  __typename?: "Subscription";
  searchStream: SearchResult;
};

export type SubscriptionSearchStreamArgs = {
  commit_range: CommitRange;
  search_term: Scalars["String"]["input"];
};

export enum CommitHistoryDirection {
  Forward = "FORWARD",
  Backward = "BACKWARD",
}

export enum CommitScope {
  Single = "SINGLE",
  History = "HISTORY",
  HistoryWithUpdates = "HISTORY_WITH_UPDATES",
  Range = "RANGE",
}

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
  Symbol = "Symbol",
  Struct = "Struct",
  StructField = "StructField",
  DataType = "DataType",
}

export enum NodeType {
  Blob = "Blob",
  Tree = "Tree",
  WinRegValue = "WinRegValue",
  WinRegKey = "WinRegKey",
  Symbol = "Symbol",
  Struct = "Struct",
  StructField = "StructField",
  DataType = "DataType",
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
  has_structAggregate?: Maybe<BlobStructHas_StructAggregationSelection>;
  has_struct: Array<Struct>;
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
  where?: InputMaybe<StructWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type BlobHas_StructArgs = {
  where?: InputMaybe<StructWhere>;
  options?: InputMaybe<StructOptions>;
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
  node: Struct;
  properties: HasNameRel;
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
  properties: HasNameRel;
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

export type BlobStructHas_StructAggregationSelection = {
  __typename?: "BlobStructHas_structAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<BlobStructHas_StructNodeAggregateSelection>;
  edge?: Maybe<BlobStructHas_StructEdgeAggregateSelection>;
};

export type BlobStructHas_StructEdgeAggregateSelection = {
  __typename?: "BlobStructHas_structEdgeAggregateSelection";
  name: StringAggregateSelection;
};

export type BlobStructHas_StructNodeAggregateSelection = {
  __typename?: "BlobStructHas_structNodeAggregateSelection";
  hash: StringAggregateSelection;
  size: IntAggregateSelection;
  kind: StringAggregateSelection;
};

export type BlobSymbolHas_SymbolAggregationSelection = {
  __typename?: "BlobSymbolHas_symbolAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<BlobSymbolHas_SymbolNodeAggregateSelection>;
  edge?: Maybe<BlobSymbolHas_SymbolEdgeAggregateSelection>;
};

export type BlobSymbolHas_SymbolEdgeAggregateSelection = {
  __typename?: "BlobSymbolHas_symbolEdgeAggregateSelection";
  name: StringAggregateSelection;
};

export type BlobSymbolHas_SymbolNodeAggregateSelection = {
  __typename?: "BlobSymbolHas_symbolNodeAggregateSelection";
  hash: StringAggregateSelection;
  address: StringAggregateSelection;
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
  date: DateTimeAggregateSelection;
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
  date: Scalars["DateTime"]["output"];
  previousAggregate?: Maybe<CommitCommitPreviousAggregationSelection>;
  previous?: Maybe<Commit>;
  previousConnection: CommitPreviousConnection;
  nextAggregate?: Maybe<CommitCommitNextAggregationSelection>;
  next: Array<Commit>;
  nextConnection: CommitNextConnection;
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

export type CommitNextAggregateArgs = {
  where?: InputMaybe<CommitWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type CommitNextArgs = {
  where?: InputMaybe<CommitWhere>;
  options?: InputMaybe<CommitOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type CommitNextConnectionArgs = {
  where?: InputMaybe<CommitNextConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<CommitNextConnectionSort>>;
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
  date: DateTimeAggregateSelection;
};

export type CommitCommitNextAggregationSelection = {
  __typename?: "CommitCommitNextAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<CommitCommitNextNodeAggregateSelection>;
};

export type CommitCommitNextNodeAggregateSelection = {
  __typename?: "CommitCommitNextNodeAggregateSelection";
  hash: StringAggregateSelection;
  name: StringAggregateSelection;
  description: StringAggregateSelection;
  date: DateTimeAggregateSelection;
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
  date: DateTimeAggregateSelection;
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

export type CommitNextConnection = {
  __typename?: "CommitNextConnection";
  edges: Array<CommitNextRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
};

export type CommitNextRelationship = {
  __typename?: "CommitNextRelationship";
  cursor: Scalars["String"]["output"];
  node: Commit;
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

export type CreateDataTypesMutationResponse = {
  __typename?: "CreateDataTypesMutationResponse";
  info: CreateInfo;
  dataTypes: Array<DataType>;
};

export type CreateDiffItemsMutationResponse = {
  __typename?: "CreateDiffItemsMutationResponse";
  info: CreateInfo;
  diffItems: Array<DiffItem>;
};

export type CreateDiffNodesAtResultsMutationResponse = {
  __typename?: "CreateDiffNodesAtResultsMutationResponse";
  info: CreateInfo;
  diffNodesAtResults: Array<DiffNodesAtResult>;
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

export type CreateStructFetchResultsMutationResponse = {
  __typename?: "CreateStructFetchResultsMutationResponse";
  info: CreateInfo;
  structFetchResults: Array<StructFetchResult>;
};

export type CreateStructFieldFetchResultsMutationResponse = {
  __typename?: "CreateStructFieldFetchResultsMutationResponse";
  info: CreateInfo;
  structFieldFetchResults: Array<StructFieldFetchResult>;
};

export type CreateStructFieldsMutationResponse = {
  __typename?: "CreateStructFieldsMutationResponse";
  info: CreateInfo;
  structFields: Array<StructField>;
};

export type CreateStructsMutationResponse = {
  __typename?: "CreateStructsMutationResponse";
  info: CreateInfo;
  structs: Array<Struct>;
};

export type CreateSymbolFetchResultsMutationResponse = {
  __typename?: "CreateSymbolFetchResultsMutationResponse";
  info: CreateInfo;
  symbolFetchResults: Array<SymbolFetchResult>;
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

export type DataType = Hashable & {
  __typename?: "DataType";
  hash: Scalars["String"]["output"];
  type: Scalars["String"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  array_counter?: Maybe<Scalars["Int"]["output"]>;
  bit_position?: Maybe<Scalars["Int"]["output"]>;
  bit_length?: Maybe<Scalars["Int"]["output"]>;
  has_data_typeAggregate?: Maybe<DataTypeDataTypeHas_Data_TypeAggregationSelection>;
  has_data_type?: Maybe<DataType>;
  has_data_typeConnection: DataTypeHas_Data_TypeConnection;
};

export type DataTypeHas_Data_TypeAggregateArgs = {
  where?: InputMaybe<DataTypeWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type DataTypeHas_Data_TypeArgs = {
  where?: InputMaybe<DataTypeWhere>;
  options?: InputMaybe<DataTypeOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type DataTypeHas_Data_TypeConnectionArgs = {
  where?: InputMaybe<DataTypeHas_Data_TypeConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<DataTypeHas_Data_TypeConnectionSort>>;
};

export type DataTypeAggregateSelection = {
  __typename?: "DataTypeAggregateSelection";
  count: Scalars["Int"]["output"];
  hash: StringAggregateSelection;
  type: StringAggregateSelection;
  name: StringAggregateSelection;
  array_counter: IntAggregateSelection;
  bit_position: IntAggregateSelection;
  bit_length: IntAggregateSelection;
};

export type DataTypeDataTypeHas_Data_TypeAggregationSelection = {
  __typename?: "DataTypeDataTypeHas_data_typeAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<DataTypeDataTypeHas_Data_TypeNodeAggregateSelection>;
};

export type DataTypeDataTypeHas_Data_TypeNodeAggregateSelection = {
  __typename?: "DataTypeDataTypeHas_data_typeNodeAggregateSelection";
  hash: StringAggregateSelection;
  type: StringAggregateSelection;
  name: StringAggregateSelection;
  array_counter: IntAggregateSelection;
  bit_position: IntAggregateSelection;
  bit_length: IntAggregateSelection;
};

export type DataTypeEdge = {
  __typename?: "DataTypeEdge";
  cursor: Scalars["String"]["output"];
  node: DataType;
};

export type DataTypeHas_Data_TypeConnection = {
  __typename?: "DataTypeHas_data_typeConnection";
  edges: Array<DataTypeHas_Data_TypeRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
};

export type DataTypeHas_Data_TypeRelationship = {
  __typename?: "DataTypeHas_data_typeRelationship";
  cursor: Scalars["String"]["output"];
  node: DataType;
};

export type DataTypesConnection = {
  __typename?: "DataTypesConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<DataTypeEdge>;
};

export type DateTimeAggregateSelection = {
  __typename?: "DateTimeAggregateSelection";
  min?: Maybe<Scalars["DateTime"]["output"]>;
  max?: Maybe<Scalars["DateTime"]["output"]>;
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

export type DiffNodesAtResult = {
  __typename?: "DiffNodesAtResult";
  total_count: Scalars["Int"]["output"];
  items: Array<DiffItem>;
};

export type DiffNodesAtResultAggregateSelection = {
  __typename?: "DiffNodesAtResultAggregateSelection";
  count: Scalars["Int"]["output"];
  total_count: IntAggregateSelection;
};

export type DiffNodesAtResultEdge = {
  __typename?: "DiffNodesAtResultEdge";
  cursor: Scalars["String"]["output"];
  node: DiffNodesAtResult;
};

export type DiffNodesAtResultsConnection = {
  __typename?: "DiffNodesAtResultsConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<DiffNodesAtResultEdge>;
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

export type Struct = Hashable & {
  __typename?: "Struct";
  hash: Scalars["String"]["output"];
  size: Scalars["Int"]["output"];
  kind: Scalars["String"]["output"];
  fieldsAggregate?: Maybe<StructStructFieldFieldsAggregationSelection>;
  fields: Array<StructField>;
  fieldsConnection: StructFieldsConnection;
  blobAggregate?: Maybe<StructBlobBlobAggregationSelection>;
  blob: Blob;
  blobConnection: StructBlobConnection;
};

export type StructFieldsAggregateArgs = {
  where?: InputMaybe<StructFieldWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type StructFieldsArgs = {
  where?: InputMaybe<StructFieldWhere>;
  options?: InputMaybe<StructFieldOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type StructFieldsConnectionArgs = {
  where?: InputMaybe<StructFieldsConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<StructFieldsConnectionSort>>;
};

export type StructBlobAggregateArgs = {
  where?: InputMaybe<BlobWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type StructBlobArgs = {
  where?: InputMaybe<BlobWhere>;
  options?: InputMaybe<BlobOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type StructBlobConnectionArgs = {
  where?: InputMaybe<StructBlobConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<StructBlobConnectionSort>>;
};

export type StructAggregateSelection = {
  __typename?: "StructAggregateSelection";
  count: Scalars["Int"]["output"];
  hash: StringAggregateSelection;
  size: IntAggregateSelection;
  kind: StringAggregateSelection;
};

export type StructBlobBlobAggregationSelection = {
  __typename?: "StructBlobBlobAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<StructBlobBlobNodeAggregateSelection>;
  edge?: Maybe<StructBlobBlobEdgeAggregateSelection>;
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
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
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

export type StructFetchResult = {
  __typename?: "StructFetchResult";
  name: Scalars["String"]["output"];
  size: Scalars["Int"]["output"];
  kind: Scalars["String"]["output"];
  fields: Array<StructFieldFetchResult>;
};

export type StructFetchResultAggregateSelection = {
  __typename?: "StructFetchResultAggregateSelection";
  count: Scalars["Int"]["output"];
  name: StringAggregateSelection;
  size: IntAggregateSelection;
  kind: StringAggregateSelection;
};

export type StructFetchResultEdge = {
  __typename?: "StructFetchResultEdge";
  cursor: Scalars["String"]["output"];
  node: StructFetchResult;
};

export type StructFetchResultsConnection = {
  __typename?: "StructFetchResultsConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<StructFetchResultEdge>;
};

export type StructField = Hashable & {
  __typename?: "StructField";
  hash: Scalars["String"]["output"];
  offset: Scalars["Int"]["output"];
  data_type: Scalars["JSON"]["output"];
  structAggregate?: Maybe<StructFieldStructStructAggregationSelection>;
  struct: Struct;
  structConnection: StructFieldStructConnection;
};

export type StructFieldStructAggregateArgs = {
  where?: InputMaybe<StructWhere>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type StructFieldStructArgs = {
  where?: InputMaybe<StructWhere>;
  options?: InputMaybe<StructOptions>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type StructFieldStructConnectionArgs = {
  where?: InputMaybe<StructFieldStructConnectionWhere>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  directed?: InputMaybe<Scalars["Boolean"]["input"]>;
  sort?: InputMaybe<Array<StructFieldStructConnectionSort>>;
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

export type StructFieldFetchResult = {
  __typename?: "StructFieldFetchResult";
  name: Scalars["String"]["output"];
  offset: Scalars["Int"]["output"];
  data_type: Scalars["JSON"]["output"];
};

export type StructFieldFetchResultAggregateSelection = {
  __typename?: "StructFieldFetchResultAggregateSelection";
  count: Scalars["Int"]["output"];
  name: StringAggregateSelection;
  offset: IntAggregateSelection;
};

export type StructFieldFetchResultEdge = {
  __typename?: "StructFieldFetchResultEdge";
  cursor: Scalars["String"]["output"];
  node: StructFieldFetchResult;
};

export type StructFieldFetchResultsConnection = {
  __typename?: "StructFieldFetchResultsConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<StructFieldFetchResultEdge>;
};

export type StructFieldsConnection = {
  __typename?: "StructFieldsConnection";
  edges: Array<StructFieldsRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
};

export type StructFieldsRelationship = {
  __typename?: "StructFieldsRelationship";
  cursor: Scalars["String"]["output"];
  node: StructField;
  properties: HasNameRel;
};

export type StructFieldStructConnection = {
  __typename?: "StructFieldStructConnection";
  edges: Array<StructFieldStructRelationship>;
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
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
  node?: Maybe<StructFieldStructStructNodeAggregateSelection>;
  edge?: Maybe<StructFieldStructStructEdgeAggregateSelection>;
};

export type StructFieldStructStructEdgeAggregateSelection = {
  __typename?: "StructFieldStructStructEdgeAggregateSelection";
  name: StringAggregateSelection;
};

export type StructFieldStructStructNodeAggregateSelection = {
  __typename?: "StructFieldStructStructNodeAggregateSelection";
  hash: StringAggregateSelection;
  size: IntAggregateSelection;
  kind: StringAggregateSelection;
};

export type StructsConnection = {
  __typename?: "StructsConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<StructEdge>;
};

export type StructStructFieldFieldsAggregationSelection = {
  __typename?: "StructStructFieldFieldsAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<StructStructFieldFieldsNodeAggregateSelection>;
  edge?: Maybe<StructStructFieldFieldsEdgeAggregateSelection>;
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

export type Symbol = Hashable & {
  __typename?: "Symbol";
  hash: Scalars["String"]["output"];
  address: Scalars["String"]["output"];
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
  hash: StringAggregateSelection;
  address: StringAggregateSelection;
};

export type SymbolBlobBlobAggregationSelection = {
  __typename?: "SymbolBlobBlobAggregationSelection";
  count: Scalars["Int"]["output"];
  node?: Maybe<SymbolBlobBlobNodeAggregateSelection>;
  edge?: Maybe<SymbolBlobBlobEdgeAggregateSelection>;
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
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
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

export type SymbolFetchResult = {
  __typename?: "SymbolFetchResult";
  name: Scalars["String"]["output"];
  address: Scalars["String"]["output"];
};

export type SymbolFetchResultAggregateSelection = {
  __typename?: "SymbolFetchResultAggregateSelection";
  count: Scalars["Int"]["output"];
  name: StringAggregateSelection;
  address: StringAggregateSelection;
};

export type SymbolFetchResultEdge = {
  __typename?: "SymbolFetchResultEdge";
  cursor: Scalars["String"]["output"];
  node: SymbolFetchResult;
};

export type SymbolFetchResultsConnection = {
  __typename?: "SymbolFetchResultsConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<SymbolFetchResultEdge>;
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

export type UpdateDataTypesMutationResponse = {
  __typename?: "UpdateDataTypesMutationResponse";
  info: UpdateInfo;
  dataTypes: Array<DataType>;
};

export type UpdateDiffItemsMutationResponse = {
  __typename?: "UpdateDiffItemsMutationResponse";
  info: UpdateInfo;
  diffItems: Array<DiffItem>;
};

export type UpdateDiffNodesAtResultsMutationResponse = {
  __typename?: "UpdateDiffNodesAtResultsMutationResponse";
  info: UpdateInfo;
  diffNodesAtResults: Array<DiffNodesAtResult>;
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

export type UpdateStructFetchResultsMutationResponse = {
  __typename?: "UpdateStructFetchResultsMutationResponse";
  info: UpdateInfo;
  structFetchResults: Array<StructFetchResult>;
};

export type UpdateStructFieldFetchResultsMutationResponse = {
  __typename?: "UpdateStructFieldFetchResultsMutationResponse";
  info: UpdateInfo;
  structFieldFetchResults: Array<StructFieldFetchResult>;
};

export type UpdateStructFieldsMutationResponse = {
  __typename?: "UpdateStructFieldsMutationResponse";
  info: UpdateInfo;
  structFields: Array<StructField>;
};

export type UpdateStructsMutationResponse = {
  __typename?: "UpdateStructsMutationResponse";
  info: UpdateInfo;
  structs: Array<Struct>;
};

export type UpdateSymbolFetchResultsMutationResponse = {
  __typename?: "UpdateSymbolFetchResultsMutationResponse";
  info: UpdateInfo;
  symbolFetchResults: Array<SymbolFetchResult>;
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

export type BlobConnectInput = {
  has_winreg?: InputMaybe<BlobHas_WinregConnectFieldInput>;
  has_symbol?: InputMaybe<Array<BlobHas_SymbolConnectFieldInput>>;
  has_struct?: InputMaybe<Array<BlobHas_StructConnectFieldInput>>;
};

export type BlobConnectOrCreateInput = {
  has_winreg?: InputMaybe<BlobHas_WinregConnectOrCreateFieldInput>;
  has_symbol?: InputMaybe<Array<BlobHas_SymbolConnectOrCreateFieldInput>>;
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
  edge?: InputMaybe<HasNameRelAggregationWhereInput>;
};

export type BlobHas_StructConnectFieldInput = {
  edge: HasNameRelCreateInput;
  where?: InputMaybe<StructConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<Array<StructConnectInput>>;
};

export type BlobHas_StructConnectionSort = {
  node?: InputMaybe<StructSort>;
  edge?: InputMaybe<HasNameRelSort>;
};

export type BlobHas_StructConnectionWhere = {
  AND?: InputMaybe<Array<BlobHas_StructConnectionWhere>>;
  OR?: InputMaybe<Array<BlobHas_StructConnectionWhere>>;
  NOT?: InputMaybe<BlobHas_StructConnectionWhere>;
  node?: InputMaybe<StructWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<StructWhere>;
  edge?: InputMaybe<HasNameRelWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  edge_NOT?: InputMaybe<HasNameRelWhere>;
};

export type BlobHas_StructConnectOrCreateFieldInput = {
  where: StructConnectOrCreateWhere;
  onCreate: BlobHas_StructConnectOrCreateFieldInputOnCreate;
};

export type BlobHas_StructConnectOrCreateFieldInputOnCreate = {
  node: StructOnCreateInput;
  edge: HasNameRelCreateInput;
};

export type BlobHas_StructCreateFieldInput = {
  edge: HasNameRelCreateInput;
  node: StructCreateInput;
};

export type BlobHas_StructDeleteFieldInput = {
  where?: InputMaybe<BlobHas_StructConnectionWhere>;
  delete?: InputMaybe<StructDeleteInput>;
};

export type BlobHas_StructDisconnectFieldInput = {
  where?: InputMaybe<BlobHas_StructConnectionWhere>;
  disconnect?: InputMaybe<StructDisconnectInput>;
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
  node?: InputMaybe<StructUpdateInput>;
  edge?: InputMaybe<HasNameRelUpdateInput>;
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
  edge?: InputMaybe<HasNameRelAggregationWhereInput>;
};

export type BlobHas_SymbolConnectFieldInput = {
  edge: HasNameRelCreateInput;
  where?: InputMaybe<SymbolConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<Array<SymbolConnectInput>>;
};

export type BlobHas_SymbolConnectionSort = {
  node?: InputMaybe<SymbolSort>;
  edge?: InputMaybe<HasNameRelSort>;
};

export type BlobHas_SymbolConnectionWhere = {
  AND?: InputMaybe<Array<BlobHas_SymbolConnectionWhere>>;
  OR?: InputMaybe<Array<BlobHas_SymbolConnectionWhere>>;
  NOT?: InputMaybe<BlobHas_SymbolConnectionWhere>;
  node?: InputMaybe<SymbolWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<SymbolWhere>;
  edge?: InputMaybe<HasNameRelWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  edge_NOT?: InputMaybe<HasNameRelWhere>;
};

export type BlobHas_SymbolConnectOrCreateFieldInput = {
  where: SymbolConnectOrCreateWhere;
  onCreate: BlobHas_SymbolConnectOrCreateFieldInputOnCreate;
};

export type BlobHas_SymbolConnectOrCreateFieldInputOnCreate = {
  node: SymbolOnCreateInput;
  edge: HasNameRelCreateInput;
};

export type BlobHas_SymbolCreateFieldInput = {
  edge: HasNameRelCreateInput;
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
  connectOrCreate?: InputMaybe<Array<BlobHas_SymbolConnectOrCreateFieldInput>>;
  connect?: InputMaybe<Array<BlobHas_SymbolConnectFieldInput>>;
  create?: InputMaybe<Array<BlobHas_SymbolCreateFieldInput>>;
};

export type BlobHas_SymbolNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<BlobHas_SymbolNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<BlobHas_SymbolNodeAggregationWhereInput>>;
  NOT?: InputMaybe<BlobHas_SymbolNodeAggregationWhereInput>;
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

export type BlobHas_SymbolUpdateConnectionInput = {
  node?: InputMaybe<SymbolUpdateInput>;
  edge?: InputMaybe<HasNameRelUpdateInput>;
};

export type BlobHas_SymbolUpdateFieldInput = {
  where?: InputMaybe<BlobHas_SymbolConnectionWhere>;
  connectOrCreate?: InputMaybe<Array<BlobHas_SymbolConnectOrCreateFieldInput>>;
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
  has_struct?: InputMaybe<StructWhere>;
  /** @deprecated Use `has_struct_NONE` instead. */
  has_struct_NOT?: InputMaybe<StructWhere>;
  /** Return Blobs where all of the related Structs match this filter */
  has_struct_ALL?: InputMaybe<StructWhere>;
  /** Return Blobs where none of the related Structs match this filter */
  has_struct_NONE?: InputMaybe<StructWhere>;
  /** Return Blobs where one of the related Structs match this filter */
  has_struct_SINGLE?: InputMaybe<StructWhere>;
  /** Return Blobs where some of the related Structs match this filter */
  has_struct_SOME?: InputMaybe<StructWhere>;
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
  date_EQUAL?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MIN_EQUAL?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MAX_EQUAL?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_GT?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MIN_GT?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MAX_GT?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_GTE?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MIN_GTE?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MAX_GTE?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_LT?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MIN_LT?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MAX_LT?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_LTE?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MIN_LTE?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MAX_LTE?: InputMaybe<Scalars["DateTime"]["input"]>;
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
  next?: InputMaybe<Array<CommitNextConnectFieldInput>>;
  filesystem?: InputMaybe<CommitFilesystemConnectFieldInput>;
};

export type CommitConnectOrCreateInput = {
  previous?: InputMaybe<CommitPreviousConnectOrCreateFieldInput>;
  next?: InputMaybe<Array<CommitNextConnectOrCreateFieldInput>>;
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
  date: Scalars["DateTime"]["input"];
  previous?: InputMaybe<CommitPreviousFieldInput>;
  next?: InputMaybe<CommitNextFieldInput>;
  filesystem?: InputMaybe<CommitFilesystemFieldInput>;
};

export type CommitDeleteInput = {
  previous?: InputMaybe<CommitPreviousDeleteFieldInput>;
  next?: InputMaybe<Array<CommitNextDeleteFieldInput>>;
  filesystem?: InputMaybe<CommitFilesystemDeleteFieldInput>;
};

export type CommitDisconnectInput = {
  previous?: InputMaybe<CommitPreviousDisconnectFieldInput>;
  next?: InputMaybe<Array<CommitNextDisconnectFieldInput>>;
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

export type CommitNextAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<CommitNextAggregateInput>>;
  OR?: InputMaybe<Array<CommitNextAggregateInput>>;
  NOT?: InputMaybe<CommitNextAggregateInput>;
  node?: InputMaybe<CommitNextNodeAggregationWhereInput>;
};

export type CommitNextConnectFieldInput = {
  where?: InputMaybe<CommitConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<Array<CommitConnectInput>>;
};

export type CommitNextConnectionSort = {
  node?: InputMaybe<CommitSort>;
};

export type CommitNextConnectionWhere = {
  AND?: InputMaybe<Array<CommitNextConnectionWhere>>;
  OR?: InputMaybe<Array<CommitNextConnectionWhere>>;
  NOT?: InputMaybe<CommitNextConnectionWhere>;
  node?: InputMaybe<CommitWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<CommitWhere>;
};

export type CommitNextConnectOrCreateFieldInput = {
  where: CommitConnectOrCreateWhere;
  onCreate: CommitNextConnectOrCreateFieldInputOnCreate;
};

export type CommitNextConnectOrCreateFieldInputOnCreate = {
  node: CommitOnCreateInput;
};

export type CommitNextCreateFieldInput = {
  node: CommitCreateInput;
};

export type CommitNextDeleteFieldInput = {
  where?: InputMaybe<CommitNextConnectionWhere>;
  delete?: InputMaybe<CommitDeleteInput>;
};

export type CommitNextDisconnectFieldInput = {
  where?: InputMaybe<CommitNextConnectionWhere>;
  disconnect?: InputMaybe<CommitDisconnectInput>;
};

export type CommitNextFieldInput = {
  connectOrCreate?: InputMaybe<Array<CommitNextConnectOrCreateFieldInput>>;
  connect?: InputMaybe<Array<CommitNextConnectFieldInput>>;
  create?: InputMaybe<Array<CommitNextCreateFieldInput>>;
};

export type CommitNextNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CommitNextNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<CommitNextNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CommitNextNodeAggregationWhereInput>;
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
  date_EQUAL?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MIN_EQUAL?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MAX_EQUAL?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_GT?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MIN_GT?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MAX_GT?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_GTE?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MIN_GTE?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MAX_GTE?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_LT?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MIN_LT?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MAX_LT?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_LTE?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MIN_LTE?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MAX_LTE?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type CommitNextUpdateConnectionInput = {
  node?: InputMaybe<CommitUpdateInput>;
};

export type CommitNextUpdateFieldInput = {
  where?: InputMaybe<CommitNextConnectionWhere>;
  connectOrCreate?: InputMaybe<Array<CommitNextConnectOrCreateFieldInput>>;
  connect?: InputMaybe<Array<CommitNextConnectFieldInput>>;
  disconnect?: InputMaybe<Array<CommitNextDisconnectFieldInput>>;
  create?: InputMaybe<Array<CommitNextCreateFieldInput>>;
  update?: InputMaybe<CommitNextUpdateConnectionInput>;
  delete?: InputMaybe<Array<CommitNextDeleteFieldInput>>;
};

export type CommitOnCreateInput = {
  hash: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  date: Scalars["DateTime"]["input"];
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
  date_EQUAL?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MIN_EQUAL?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MAX_EQUAL?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_GT?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MIN_GT?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MAX_GT?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_GTE?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MIN_GTE?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MAX_GTE?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_LT?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MIN_LT?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MAX_LT?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** @deprecated Aggregation filters that are not relying on an aggregating function will be deprecated. */
  date_LTE?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MIN_LTE?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_MAX_LTE?: InputMaybe<Scalars["DateTime"]["input"]>;
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

export type CommitRange = {
  startCommit: Scalars["String"]["input"];
  scope: CommitScope;
  endCommit?: InputMaybe<Scalars["String"]["input"]>;
};

export type CommitRelationInput = {
  previous?: InputMaybe<CommitPreviousCreateFieldInput>;
  next?: InputMaybe<Array<CommitNextCreateFieldInput>>;
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
  date?: InputMaybe<Scalars["DateTime"]["input"]>;
  previous?: InputMaybe<CommitPreviousUpdateFieldInput>;
  next?: InputMaybe<Array<CommitNextUpdateFieldInput>>;
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
  date?: InputMaybe<Scalars["DateTime"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  date_NOT?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_IN?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  date_NOT_IN?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
  date_LT?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_LTE?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_GT?: InputMaybe<Scalars["DateTime"]["input"]>;
  date_GTE?: InputMaybe<Scalars["DateTime"]["input"]>;
  OR?: InputMaybe<Array<CommitWhere>>;
  AND?: InputMaybe<Array<CommitWhere>>;
  NOT?: InputMaybe<CommitWhere>;
  previous?: InputMaybe<CommitWhere>;
  previous_NOT?: InputMaybe<CommitWhere>;
  previousConnection?: InputMaybe<CommitPreviousConnectionWhere>;
  previousConnection_NOT?: InputMaybe<CommitPreviousConnectionWhere>;
  previousAggregate?: InputMaybe<CommitPreviousAggregateInput>;
  /** @deprecated Use `next_SOME` instead. */
  next?: InputMaybe<CommitWhere>;
  /** @deprecated Use `next_NONE` instead. */
  next_NOT?: InputMaybe<CommitWhere>;
  /** Return Commits where all of the related Commits match this filter */
  next_ALL?: InputMaybe<CommitWhere>;
  /** Return Commits where none of the related Commits match this filter */
  next_NONE?: InputMaybe<CommitWhere>;
  /** Return Commits where one of the related Commits match this filter */
  next_SINGLE?: InputMaybe<CommitWhere>;
  /** Return Commits where some of the related Commits match this filter */
  next_SOME?: InputMaybe<CommitWhere>;
  /** @deprecated Use `nextConnection_SOME` instead. */
  nextConnection?: InputMaybe<CommitNextConnectionWhere>;
  /** @deprecated Use `nextConnection_NONE` instead. */
  nextConnection_NOT?: InputMaybe<CommitNextConnectionWhere>;
  /** Return Commits where all of the related CommitNextConnections match this filter */
  nextConnection_ALL?: InputMaybe<CommitNextConnectionWhere>;
  /** Return Commits where none of the related CommitNextConnections match this filter */
  nextConnection_NONE?: InputMaybe<CommitNextConnectionWhere>;
  /** Return Commits where one of the related CommitNextConnections match this filter */
  nextConnection_SINGLE?: InputMaybe<CommitNextConnectionWhere>;
  /** Return Commits where some of the related CommitNextConnections match this filter */
  nextConnection_SOME?: InputMaybe<CommitNextConnectionWhere>;
  nextAggregate?: InputMaybe<CommitNextAggregateInput>;
  filesystem?: InputMaybe<TreeWhere>;
  filesystem_NOT?: InputMaybe<TreeWhere>;
  filesystemConnection?: InputMaybe<CommitFilesystemConnectionWhere>;
  filesystemConnection_NOT?: InputMaybe<CommitFilesystemConnectionWhere>;
  filesystemAggregate?: InputMaybe<CommitFilesystemAggregateInput>;
};

export type DataTypeConnectInput = {
  has_data_type?: InputMaybe<DataTypeHas_Data_TypeConnectFieldInput>;
};

export type DataTypeConnectOrCreateInput = {
  has_data_type?: InputMaybe<DataTypeHas_Data_TypeConnectOrCreateFieldInput>;
};

export type DataTypeConnectOrCreateWhere = {
  node: DataTypeUniqueWhere;
};

export type DataTypeConnectWhere = {
  node: DataTypeWhere;
};

export type DataTypeCreateInput = {
  hash: Scalars["String"]["input"];
  type: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  array_counter?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length?: InputMaybe<Scalars["Int"]["input"]>;
  has_data_type?: InputMaybe<DataTypeHas_Data_TypeFieldInput>;
};

export type DataTypeDeleteInput = {
  has_data_type?: InputMaybe<DataTypeHas_Data_TypeDeleteFieldInput>;
};

export type DataTypeDisconnectInput = {
  has_data_type?: InputMaybe<DataTypeHas_Data_TypeDisconnectFieldInput>;
};

export type DataTypeHas_Data_TypeAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<DataTypeHas_Data_TypeAggregateInput>>;
  OR?: InputMaybe<Array<DataTypeHas_Data_TypeAggregateInput>>;
  NOT?: InputMaybe<DataTypeHas_Data_TypeAggregateInput>;
  node?: InputMaybe<DataTypeHas_Data_TypeNodeAggregationWhereInput>;
};

export type DataTypeHas_Data_TypeConnectFieldInput = {
  where?: InputMaybe<DataTypeConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<DataTypeConnectInput>;
};

export type DataTypeHas_Data_TypeConnectionSort = {
  node?: InputMaybe<DataTypeSort>;
};

export type DataTypeHas_Data_TypeConnectionWhere = {
  AND?: InputMaybe<Array<DataTypeHas_Data_TypeConnectionWhere>>;
  OR?: InputMaybe<Array<DataTypeHas_Data_TypeConnectionWhere>>;
  NOT?: InputMaybe<DataTypeHas_Data_TypeConnectionWhere>;
  node?: InputMaybe<DataTypeWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<DataTypeWhere>;
};

export type DataTypeHas_Data_TypeConnectOrCreateFieldInput = {
  where: DataTypeConnectOrCreateWhere;
  onCreate: DataTypeHas_Data_TypeConnectOrCreateFieldInputOnCreate;
};

export type DataTypeHas_Data_TypeConnectOrCreateFieldInputOnCreate = {
  node: DataTypeOnCreateInput;
};

export type DataTypeHas_Data_TypeCreateFieldInput = {
  node: DataTypeCreateInput;
};

export type DataTypeHas_Data_TypeDeleteFieldInput = {
  where?: InputMaybe<DataTypeHas_Data_TypeConnectionWhere>;
  delete?: InputMaybe<DataTypeDeleteInput>;
};

export type DataTypeHas_Data_TypeDisconnectFieldInput = {
  where?: InputMaybe<DataTypeHas_Data_TypeConnectionWhere>;
  disconnect?: InputMaybe<DataTypeDisconnectInput>;
};

export type DataTypeHas_Data_TypeFieldInput = {
  connectOrCreate?: InputMaybe<DataTypeHas_Data_TypeConnectOrCreateFieldInput>;
  connect?: InputMaybe<DataTypeHas_Data_TypeConnectFieldInput>;
  create?: InputMaybe<DataTypeHas_Data_TypeCreateFieldInput>;
};

export type DataTypeHas_Data_TypeNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<DataTypeHas_Data_TypeNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<DataTypeHas_Data_TypeNodeAggregationWhereInput>>;
  NOT?: InputMaybe<DataTypeHas_Data_TypeNodeAggregationWhereInput>;
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

export type DataTypeHas_Data_TypeUpdateConnectionInput = {
  node?: InputMaybe<DataTypeUpdateInput>;
};

export type DataTypeHas_Data_TypeUpdateFieldInput = {
  where?: InputMaybe<DataTypeHas_Data_TypeConnectionWhere>;
  connectOrCreate?: InputMaybe<DataTypeHas_Data_TypeConnectOrCreateFieldInput>;
  connect?: InputMaybe<DataTypeHas_Data_TypeConnectFieldInput>;
  disconnect?: InputMaybe<DataTypeHas_Data_TypeDisconnectFieldInput>;
  create?: InputMaybe<DataTypeHas_Data_TypeCreateFieldInput>;
  update?: InputMaybe<DataTypeHas_Data_TypeUpdateConnectionInput>;
  delete?: InputMaybe<DataTypeHas_Data_TypeDeleteFieldInput>;
};

export type DataTypeOnCreateInput = {
  hash: Scalars["String"]["input"];
  type: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  array_counter?: InputMaybe<Scalars["Int"]["input"]>;
  bit_position?: InputMaybe<Scalars["Int"]["input"]>;
  bit_length?: InputMaybe<Scalars["Int"]["input"]>;
};

export type DataTypeOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more DataTypeSort objects to sort DataTypes by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<DataTypeSort>>;
};

export type DataTypeRelationInput = {
  has_data_type?: InputMaybe<DataTypeHas_Data_TypeCreateFieldInput>;
};

/** Fields to sort DataTypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one DataTypeSort object. */
export type DataTypeSort = {
  hash?: InputMaybe<SortDirection>;
  type?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  array_counter?: InputMaybe<SortDirection>;
  bit_position?: InputMaybe<SortDirection>;
  bit_length?: InputMaybe<SortDirection>;
};

export type DataTypeUniqueWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
};

export type DataTypeUpdateInput = {
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
  has_data_type?: InputMaybe<DataTypeHas_Data_TypeUpdateFieldInput>;
};

export type DataTypeWhere = {
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
  OR?: InputMaybe<Array<DataTypeWhere>>;
  AND?: InputMaybe<Array<DataTypeWhere>>;
  NOT?: InputMaybe<DataTypeWhere>;
  has_data_type?: InputMaybe<DataTypeWhere>;
  has_data_type_NOT?: InputMaybe<DataTypeWhere>;
  has_data_typeConnection?: InputMaybe<DataTypeHas_Data_TypeConnectionWhere>;
  has_data_typeConnection_NOT?: InputMaybe<DataTypeHas_Data_TypeConnectionWhere>;
  has_data_typeAggregate?: InputMaybe<DataTypeHas_Data_TypeAggregateInput>;
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

export type DiffNodesAtResultCreateInput = {
  total_count: Scalars["Int"]["input"];
};

export type DiffNodesAtResultOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more DiffNodesAtResultSort objects to sort DiffNodesAtResults by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<DiffNodesAtResultSort>>;
};

/** Fields to sort DiffNodesAtResults by. The order in which sorts are applied is not guaranteed when specifying many fields in one DiffNodesAtResultSort object. */
export type DiffNodesAtResultSort = {
  total_count?: InputMaybe<SortDirection>;
};

export type DiffNodesAtResultUpdateInput = {
  total_count?: InputMaybe<Scalars["Int"]["input"]>;
  total_count_INCREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  total_count_DECREMENT?: InputMaybe<Scalars["Int"]["input"]>;
};

export type DiffNodesAtResultWhere = {
  total_count?: InputMaybe<Scalars["Int"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  total_count_NOT?: InputMaybe<Scalars["Int"]["input"]>;
  total_count_IN?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  total_count_NOT_IN?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  total_count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  total_count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  total_count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  total_count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  OR?: InputMaybe<Array<DiffNodesAtResultWhere>>;
  AND?: InputMaybe<Array<DiffNodesAtResultWhere>>;
  NOT?: InputMaybe<DiffNodesAtResultWhere>;
};

export type DiffNodesOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  status_filter?: InputMaybe<Array<DiffStatus>>;
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

export type HasNameRelAggregationWhereInput = {
  AND?: InputMaybe<Array<HasNameRelAggregationWhereInput>>;
  OR?: InputMaybe<Array<HasNameRelAggregationWhereInput>>;
  NOT?: InputMaybe<HasNameRelAggregationWhereInput>;
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

export type HasNameRelCreateInput = {
  name: Scalars["String"]["input"];
};

export type HasNameRelSort = {
  name?: InputMaybe<SortDirection>;
};

export type HasNameRelUpdateInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type HasNameRelWhere = {
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
  OR?: InputMaybe<Array<HasNameRelWhere>>;
  AND?: InputMaybe<Array<HasNameRelWhere>>;
  NOT?: InputMaybe<HasNameRelWhere>;
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

export type StructBlobAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<StructBlobAggregateInput>>;
  OR?: InputMaybe<Array<StructBlobAggregateInput>>;
  NOT?: InputMaybe<StructBlobAggregateInput>;
  node?: InputMaybe<StructBlobNodeAggregationWhereInput>;
  edge?: InputMaybe<HasNameRelAggregationWhereInput>;
};

export type StructBlobConnectFieldInput = {
  edge: HasNameRelCreateInput;
  where?: InputMaybe<BlobConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<BlobConnectInput>;
};

export type StructBlobConnectionSort = {
  node?: InputMaybe<BlobSort>;
  edge?: InputMaybe<HasNameRelSort>;
};

export type StructBlobConnectionWhere = {
  AND?: InputMaybe<Array<StructBlobConnectionWhere>>;
  OR?: InputMaybe<Array<StructBlobConnectionWhere>>;
  NOT?: InputMaybe<StructBlobConnectionWhere>;
  node?: InputMaybe<BlobWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<BlobWhere>;
  edge?: InputMaybe<HasNameRelWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  edge_NOT?: InputMaybe<HasNameRelWhere>;
};

export type StructBlobConnectOrCreateFieldInput = {
  where: BlobConnectOrCreateWhere;
  onCreate: StructBlobConnectOrCreateFieldInputOnCreate;
};

export type StructBlobConnectOrCreateFieldInputOnCreate = {
  node: BlobOnCreateInput;
  edge: HasNameRelCreateInput;
};

export type StructBlobCreateFieldInput = {
  edge: HasNameRelCreateInput;
  node: BlobCreateInput;
};

export type StructBlobDeleteFieldInput = {
  where?: InputMaybe<StructBlobConnectionWhere>;
  delete?: InputMaybe<BlobDeleteInput>;
};

export type StructBlobDisconnectFieldInput = {
  where?: InputMaybe<StructBlobConnectionWhere>;
  disconnect?: InputMaybe<BlobDisconnectInput>;
};

export type StructBlobFieldInput = {
  connectOrCreate?: InputMaybe<StructBlobConnectOrCreateFieldInput>;
  connect?: InputMaybe<StructBlobConnectFieldInput>;
  create?: InputMaybe<StructBlobCreateFieldInput>;
};

export type StructBlobNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StructBlobNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<StructBlobNodeAggregationWhereInput>>;
  NOT?: InputMaybe<StructBlobNodeAggregationWhereInput>;
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

export type StructBlobUpdateConnectionInput = {
  node?: InputMaybe<BlobUpdateInput>;
  edge?: InputMaybe<HasNameRelUpdateInput>;
};

export type StructBlobUpdateFieldInput = {
  where?: InputMaybe<StructBlobConnectionWhere>;
  connectOrCreate?: InputMaybe<StructBlobConnectOrCreateFieldInput>;
  connect?: InputMaybe<StructBlobConnectFieldInput>;
  disconnect?: InputMaybe<StructBlobDisconnectFieldInput>;
  create?: InputMaybe<StructBlobCreateFieldInput>;
  update?: InputMaybe<StructBlobUpdateConnectionInput>;
  delete?: InputMaybe<StructBlobDeleteFieldInput>;
};

export type StructConnectInput = {
  fields?: InputMaybe<Array<StructFieldsConnectFieldInput>>;
  blob?: InputMaybe<StructBlobConnectFieldInput>;
};

export type StructConnectOrCreateInput = {
  fields?: InputMaybe<Array<StructFieldsConnectOrCreateFieldInput>>;
  blob?: InputMaybe<StructBlobConnectOrCreateFieldInput>;
};

export type StructConnectOrCreateWhere = {
  node: StructUniqueWhere;
};

export type StructConnectWhere = {
  node: StructWhere;
};

export type StructCreateInput = {
  hash: Scalars["String"]["input"];
  size: Scalars["Int"]["input"];
  kind: Scalars["String"]["input"];
  fields?: InputMaybe<StructFieldsFieldInput>;
  blob?: InputMaybe<StructBlobFieldInput>;
};

export type StructDeleteInput = {
  fields?: InputMaybe<Array<StructFieldsDeleteFieldInput>>;
  blob?: InputMaybe<StructBlobDeleteFieldInput>;
};

export type StructDisconnectInput = {
  fields?: InputMaybe<Array<StructFieldsDisconnectFieldInput>>;
  blob?: InputMaybe<StructBlobDisconnectFieldInput>;
};

export type StructFetchResultCreateInput = {
  name: Scalars["String"]["input"];
  size: Scalars["Int"]["input"];
  kind: Scalars["String"]["input"];
};

export type StructFetchResultOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more StructFetchResultSort objects to sort StructFetchResults by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<StructFetchResultSort>>;
};

/** Fields to sort StructFetchResults by. The order in which sorts are applied is not guaranteed when specifying many fields in one StructFetchResultSort object. */
export type StructFetchResultSort = {
  name?: InputMaybe<SortDirection>;
  size?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type StructFetchResultUpdateInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  size?: InputMaybe<Scalars["Int"]["input"]>;
  size_INCREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  size_DECREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  kind?: InputMaybe<Scalars["String"]["input"]>;
};

export type StructFetchResultWhere = {
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
  OR?: InputMaybe<Array<StructFetchResultWhere>>;
  AND?: InputMaybe<Array<StructFetchResultWhere>>;
  NOT?: InputMaybe<StructFetchResultWhere>;
};

export type StructFieldConnectInput = {
  struct?: InputMaybe<StructFieldStructConnectFieldInput>;
};

export type StructFieldConnectOrCreateInput = {
  struct?: InputMaybe<StructFieldStructConnectOrCreateFieldInput>;
};

export type StructFieldConnectOrCreateWhere = {
  node: StructFieldUniqueWhere;
};

export type StructFieldConnectWhere = {
  node: StructFieldWhere;
};

export type StructFieldCreateInput = {
  hash: Scalars["String"]["input"];
  offset: Scalars["Int"]["input"];
  data_type: Scalars["JSON"]["input"];
  struct?: InputMaybe<StructFieldStructFieldInput>;
};

export type StructFieldDeleteInput = {
  struct?: InputMaybe<StructFieldStructDeleteFieldInput>;
};

export type StructFieldDisconnectInput = {
  struct?: InputMaybe<StructFieldStructDisconnectFieldInput>;
};

export type StructFieldFetchResultCreateInput = {
  name: Scalars["String"]["input"];
  offset: Scalars["Int"]["input"];
  data_type: Scalars["JSON"]["input"];
};

export type StructFieldFetchResultOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more StructFieldFetchResultSort objects to sort StructFieldFetchResults by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<StructFieldFetchResultSort>>;
};

/** Fields to sort StructFieldFetchResults by. The order in which sorts are applied is not guaranteed when specifying many fields in one StructFieldFetchResultSort object. */
export type StructFieldFetchResultSort = {
  name?: InputMaybe<SortDirection>;
  offset?: InputMaybe<SortDirection>;
  data_type?: InputMaybe<SortDirection>;
};

export type StructFieldFetchResultUpdateInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  offset_INCREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  offset_DECREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  data_type?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type StructFieldFetchResultWhere = {
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
  data_type?: InputMaybe<Scalars["JSON"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  data_type_NOT?: InputMaybe<Scalars["JSON"]["input"]>;
  data_type_IN?: InputMaybe<Array<Scalars["JSON"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  data_type_NOT_IN?: InputMaybe<Array<Scalars["JSON"]["input"]>>;
  OR?: InputMaybe<Array<StructFieldFetchResultWhere>>;
  AND?: InputMaybe<Array<StructFieldFetchResultWhere>>;
  NOT?: InputMaybe<StructFieldFetchResultWhere>;
};

export type StructFieldOnCreateInput = {
  hash: Scalars["String"]["input"];
  offset: Scalars["Int"]["input"];
  data_type: Scalars["JSON"]["input"];
};

export type StructFieldOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more StructFieldSort objects to sort StructFields by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<StructFieldSort>>;
};

export type StructFieldRelationInput = {
  struct?: InputMaybe<StructFieldStructCreateFieldInput>;
};

export type StructFieldsAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<StructFieldsAggregateInput>>;
  OR?: InputMaybe<Array<StructFieldsAggregateInput>>;
  NOT?: InputMaybe<StructFieldsAggregateInput>;
  node?: InputMaybe<StructFieldsNodeAggregationWhereInput>;
  edge?: InputMaybe<HasNameRelAggregationWhereInput>;
};

export type StructFieldsConnectFieldInput = {
  edge: HasNameRelCreateInput;
  where?: InputMaybe<StructFieldConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<Array<StructFieldConnectInput>>;
};

export type StructFieldsConnectionSort = {
  node?: InputMaybe<StructFieldSort>;
  edge?: InputMaybe<HasNameRelSort>;
};

export type StructFieldsConnectionWhere = {
  AND?: InputMaybe<Array<StructFieldsConnectionWhere>>;
  OR?: InputMaybe<Array<StructFieldsConnectionWhere>>;
  NOT?: InputMaybe<StructFieldsConnectionWhere>;
  node?: InputMaybe<StructFieldWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<StructFieldWhere>;
  edge?: InputMaybe<HasNameRelWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  edge_NOT?: InputMaybe<HasNameRelWhere>;
};

export type StructFieldsConnectOrCreateFieldInput = {
  where: StructFieldConnectOrCreateWhere;
  onCreate: StructFieldsConnectOrCreateFieldInputOnCreate;
};

export type StructFieldsConnectOrCreateFieldInputOnCreate = {
  node: StructFieldOnCreateInput;
  edge: HasNameRelCreateInput;
};

export type StructFieldsCreateFieldInput = {
  edge: HasNameRelCreateInput;
  node: StructFieldCreateInput;
};

export type StructFieldsDeleteFieldInput = {
  where?: InputMaybe<StructFieldsConnectionWhere>;
  delete?: InputMaybe<StructFieldDeleteInput>;
};

export type StructFieldsDisconnectFieldInput = {
  where?: InputMaybe<StructFieldsConnectionWhere>;
  disconnect?: InputMaybe<StructFieldDisconnectInput>;
};

export type StructFieldsFieldInput = {
  connectOrCreate?: InputMaybe<Array<StructFieldsConnectOrCreateFieldInput>>;
  connect?: InputMaybe<Array<StructFieldsConnectFieldInput>>;
  create?: InputMaybe<Array<StructFieldsCreateFieldInput>>;
};

export type StructFieldsNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StructFieldsNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<StructFieldsNodeAggregationWhereInput>>;
  NOT?: InputMaybe<StructFieldsNodeAggregationWhereInput>;
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

/** Fields to sort StructFields by. The order in which sorts are applied is not guaranteed when specifying many fields in one StructFieldSort object. */
export type StructFieldSort = {
  hash?: InputMaybe<SortDirection>;
  offset?: InputMaybe<SortDirection>;
  data_type?: InputMaybe<SortDirection>;
};

export type StructFieldStructAggregateInput = {
  count?: InputMaybe<Scalars["Int"]["input"]>;
  count_LT?: InputMaybe<Scalars["Int"]["input"]>;
  count_LTE?: InputMaybe<Scalars["Int"]["input"]>;
  count_GT?: InputMaybe<Scalars["Int"]["input"]>;
  count_GTE?: InputMaybe<Scalars["Int"]["input"]>;
  AND?: InputMaybe<Array<StructFieldStructAggregateInput>>;
  OR?: InputMaybe<Array<StructFieldStructAggregateInput>>;
  NOT?: InputMaybe<StructFieldStructAggregateInput>;
  node?: InputMaybe<StructFieldStructNodeAggregationWhereInput>;
  edge?: InputMaybe<HasNameRelAggregationWhereInput>;
};

export type StructFieldStructConnectFieldInput = {
  edge: HasNameRelCreateInput;
  where?: InputMaybe<StructConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<StructConnectInput>;
};

export type StructFieldStructConnectionSort = {
  node?: InputMaybe<StructSort>;
  edge?: InputMaybe<HasNameRelSort>;
};

export type StructFieldStructConnectionWhere = {
  AND?: InputMaybe<Array<StructFieldStructConnectionWhere>>;
  OR?: InputMaybe<Array<StructFieldStructConnectionWhere>>;
  NOT?: InputMaybe<StructFieldStructConnectionWhere>;
  node?: InputMaybe<StructWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<StructWhere>;
  edge?: InputMaybe<HasNameRelWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  edge_NOT?: InputMaybe<HasNameRelWhere>;
};

export type StructFieldStructConnectOrCreateFieldInput = {
  where: StructConnectOrCreateWhere;
  onCreate: StructFieldStructConnectOrCreateFieldInputOnCreate;
};

export type StructFieldStructConnectOrCreateFieldInputOnCreate = {
  node: StructOnCreateInput;
  edge: HasNameRelCreateInput;
};

export type StructFieldStructCreateFieldInput = {
  edge: HasNameRelCreateInput;
  node: StructCreateInput;
};

export type StructFieldStructDeleteFieldInput = {
  where?: InputMaybe<StructFieldStructConnectionWhere>;
  delete?: InputMaybe<StructDeleteInput>;
};

export type StructFieldStructDisconnectFieldInput = {
  where?: InputMaybe<StructFieldStructConnectionWhere>;
  disconnect?: InputMaybe<StructDisconnectInput>;
};

export type StructFieldStructFieldInput = {
  connectOrCreate?: InputMaybe<StructFieldStructConnectOrCreateFieldInput>;
  connect?: InputMaybe<StructFieldStructConnectFieldInput>;
  create?: InputMaybe<StructFieldStructCreateFieldInput>;
};

export type StructFieldStructNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<StructFieldStructNodeAggregationWhereInput>>;
  OR?: InputMaybe<Array<StructFieldStructNodeAggregationWhereInput>>;
  NOT?: InputMaybe<StructFieldStructNodeAggregationWhereInput>;
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

export type StructFieldStructUpdateConnectionInput = {
  node?: InputMaybe<StructUpdateInput>;
  edge?: InputMaybe<HasNameRelUpdateInput>;
};

export type StructFieldStructUpdateFieldInput = {
  where?: InputMaybe<StructFieldStructConnectionWhere>;
  connectOrCreate?: InputMaybe<StructFieldStructConnectOrCreateFieldInput>;
  connect?: InputMaybe<StructFieldStructConnectFieldInput>;
  disconnect?: InputMaybe<StructFieldStructDisconnectFieldInput>;
  create?: InputMaybe<StructFieldStructCreateFieldInput>;
  update?: InputMaybe<StructFieldStructUpdateConnectionInput>;
  delete?: InputMaybe<StructFieldStructDeleteFieldInput>;
};

export type StructFieldsUpdateConnectionInput = {
  node?: InputMaybe<StructFieldUpdateInput>;
  edge?: InputMaybe<HasNameRelUpdateInput>;
};

export type StructFieldsUpdateFieldInput = {
  where?: InputMaybe<StructFieldsConnectionWhere>;
  connectOrCreate?: InputMaybe<Array<StructFieldsConnectOrCreateFieldInput>>;
  connect?: InputMaybe<Array<StructFieldsConnectFieldInput>>;
  disconnect?: InputMaybe<Array<StructFieldsDisconnectFieldInput>>;
  create?: InputMaybe<Array<StructFieldsCreateFieldInput>>;
  update?: InputMaybe<StructFieldsUpdateConnectionInput>;
  delete?: InputMaybe<Array<StructFieldsDeleteFieldInput>>;
};

export type StructFieldUniqueWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
};

export type StructFieldUpdateInput = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  offset_INCREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  offset_DECREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  data_type?: InputMaybe<Scalars["JSON"]["input"]>;
  struct?: InputMaybe<StructFieldStructUpdateFieldInput>;
};

export type StructFieldWhere = {
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
  data_type?: InputMaybe<Scalars["JSON"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  data_type_NOT?: InputMaybe<Scalars["JSON"]["input"]>;
  data_type_IN?: InputMaybe<Array<Scalars["JSON"]["input"]>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  data_type_NOT_IN?: InputMaybe<Array<Scalars["JSON"]["input"]>>;
  OR?: InputMaybe<Array<StructFieldWhere>>;
  AND?: InputMaybe<Array<StructFieldWhere>>;
  NOT?: InputMaybe<StructFieldWhere>;
  struct?: InputMaybe<StructWhere>;
  struct_NOT?: InputMaybe<StructWhere>;
  structConnection?: InputMaybe<StructFieldStructConnectionWhere>;
  structConnection_NOT?: InputMaybe<StructFieldStructConnectionWhere>;
  structAggregate?: InputMaybe<StructFieldStructAggregateInput>;
};

export type StructOnCreateInput = {
  hash: Scalars["String"]["input"];
  size: Scalars["Int"]["input"];
  kind: Scalars["String"]["input"];
};

export type StructOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more StructSort objects to sort Structs by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<StructSort>>;
};

export type StructRelationInput = {
  fields?: InputMaybe<Array<StructFieldsCreateFieldInput>>;
  blob?: InputMaybe<StructBlobCreateFieldInput>;
};

/** Fields to sort Structs by. The order in which sorts are applied is not guaranteed when specifying many fields in one StructSort object. */
export type StructSort = {
  hash?: InputMaybe<SortDirection>;
  size?: InputMaybe<SortDirection>;
  kind?: InputMaybe<SortDirection>;
};

export type StructUniqueWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
};

export type StructUpdateInput = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  size?: InputMaybe<Scalars["Int"]["input"]>;
  size_INCREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  size_DECREMENT?: InputMaybe<Scalars["Int"]["input"]>;
  kind?: InputMaybe<Scalars["String"]["input"]>;
  fields?: InputMaybe<Array<StructFieldsUpdateFieldInput>>;
  blob?: InputMaybe<StructBlobUpdateFieldInput>;
};

export type StructWhere = {
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
  OR?: InputMaybe<Array<StructWhere>>;
  AND?: InputMaybe<Array<StructWhere>>;
  NOT?: InputMaybe<StructWhere>;
  /** @deprecated Use `fields_SOME` instead. */
  fields?: InputMaybe<StructFieldWhere>;
  /** @deprecated Use `fields_NONE` instead. */
  fields_NOT?: InputMaybe<StructFieldWhere>;
  /** Return Structs where all of the related StructFields match this filter */
  fields_ALL?: InputMaybe<StructFieldWhere>;
  /** Return Structs where none of the related StructFields match this filter */
  fields_NONE?: InputMaybe<StructFieldWhere>;
  /** Return Structs where one of the related StructFields match this filter */
  fields_SINGLE?: InputMaybe<StructFieldWhere>;
  /** Return Structs where some of the related StructFields match this filter */
  fields_SOME?: InputMaybe<StructFieldWhere>;
  /** @deprecated Use `fieldsConnection_SOME` instead. */
  fieldsConnection?: InputMaybe<StructFieldsConnectionWhere>;
  /** @deprecated Use `fieldsConnection_NONE` instead. */
  fieldsConnection_NOT?: InputMaybe<StructFieldsConnectionWhere>;
  /** Return Structs where all of the related StructFieldsConnections match this filter */
  fieldsConnection_ALL?: InputMaybe<StructFieldsConnectionWhere>;
  /** Return Structs where none of the related StructFieldsConnections match this filter */
  fieldsConnection_NONE?: InputMaybe<StructFieldsConnectionWhere>;
  /** Return Structs where one of the related StructFieldsConnections match this filter */
  fieldsConnection_SINGLE?: InputMaybe<StructFieldsConnectionWhere>;
  /** Return Structs where some of the related StructFieldsConnections match this filter */
  fieldsConnection_SOME?: InputMaybe<StructFieldsConnectionWhere>;
  fieldsAggregate?: InputMaybe<StructFieldsAggregateInput>;
  blob?: InputMaybe<BlobWhere>;
  blob_NOT?: InputMaybe<BlobWhere>;
  blobConnection?: InputMaybe<StructBlobConnectionWhere>;
  blobConnection_NOT?: InputMaybe<StructBlobConnectionWhere>;
  blobAggregate?: InputMaybe<StructBlobAggregateInput>;
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
  edge?: InputMaybe<HasNameRelAggregationWhereInput>;
};

export type SymbolBlobConnectFieldInput = {
  edge: HasNameRelCreateInput;
  where?: InputMaybe<BlobConnectWhere>;
  /** Whether or not to overwrite any matching relationship with the new properties. */
  overwrite?: Scalars["Boolean"]["input"];
  connect?: InputMaybe<BlobConnectInput>;
};

export type SymbolBlobConnectionSort = {
  node?: InputMaybe<BlobSort>;
  edge?: InputMaybe<HasNameRelSort>;
};

export type SymbolBlobConnectionWhere = {
  AND?: InputMaybe<Array<SymbolBlobConnectionWhere>>;
  OR?: InputMaybe<Array<SymbolBlobConnectionWhere>>;
  NOT?: InputMaybe<SymbolBlobConnectionWhere>;
  node?: InputMaybe<BlobWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  node_NOT?: InputMaybe<BlobWhere>;
  edge?: InputMaybe<HasNameRelWhere>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  edge_NOT?: InputMaybe<HasNameRelWhere>;
};

export type SymbolBlobConnectOrCreateFieldInput = {
  where: BlobConnectOrCreateWhere;
  onCreate: SymbolBlobConnectOrCreateFieldInputOnCreate;
};

export type SymbolBlobConnectOrCreateFieldInputOnCreate = {
  node: BlobOnCreateInput;
  edge: HasNameRelCreateInput;
};

export type SymbolBlobCreateFieldInput = {
  edge: HasNameRelCreateInput;
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
  edge?: InputMaybe<HasNameRelUpdateInput>;
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

export type SymbolConnectOrCreateWhere = {
  node: SymbolUniqueWhere;
};

export type SymbolConnectWhere = {
  node: SymbolWhere;
};

export type SymbolCreateInput = {
  hash: Scalars["String"]["input"];
  address: Scalars["String"]["input"];
  blob?: InputMaybe<SymbolBlobFieldInput>;
};

export type SymbolDeleteInput = {
  blob?: InputMaybe<SymbolBlobDeleteFieldInput>;
};

export type SymbolDisconnectInput = {
  blob?: InputMaybe<SymbolBlobDisconnectFieldInput>;
};

export type SymbolFetchResultCreateInput = {
  name: Scalars["String"]["input"];
  address: Scalars["String"]["input"];
};

export type SymbolFetchResultOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more SymbolFetchResultSort objects to sort SymbolFetchResults by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<SymbolFetchResultSort>>;
};

/** Fields to sort SymbolFetchResults by. The order in which sorts are applied is not guaranteed when specifying many fields in one SymbolFetchResultSort object. */
export type SymbolFetchResultSort = {
  name?: InputMaybe<SortDirection>;
  address?: InputMaybe<SortDirection>;
};

export type SymbolFetchResultUpdateInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  address?: InputMaybe<Scalars["String"]["input"]>;
};

export type SymbolFetchResultWhere = {
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
  OR?: InputMaybe<Array<SymbolFetchResultWhere>>;
  AND?: InputMaybe<Array<SymbolFetchResultWhere>>;
  NOT?: InputMaybe<SymbolFetchResultWhere>;
};

export type SymbolOnCreateInput = {
  hash: Scalars["String"]["input"];
  address: Scalars["String"]["input"];
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
  hash?: InputMaybe<SortDirection>;
  address?: InputMaybe<SortDirection>;
};

export type SymbolUniqueWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
};

export type SymbolUpdateInput = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  address?: InputMaybe<Scalars["String"]["input"]>;
  blob?: InputMaybe<SymbolBlobUpdateFieldInput>;
};

export type SymbolWhere = {
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
  hash?: boolean;
  address?: boolean;
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

export interface StructAggregateSelectionInput {
  count?: boolean;
  hash?: boolean;
  size?: boolean;
  kind?: boolean;
}

export declare class StructModel {
  public find(args?: {
    where?: StructWhere;

    options?: StructOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<Struct[]>;
  public create(args: {
    input: StructCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateStructsMutationResponse>;
  public update(args: {
    where?: StructWhere;
    update?: StructUpdateInput;
    connect?: StructConnectInput;
    disconnect?: StructDisconnectInput;
    create?: StructCreateInput;
    connectOrCreate?: StructConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateStructsMutationResponse>;
  public delete(args: {
    where?: StructWhere;
    delete?: StructDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: StructWhere;

    aggregate: StructAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<StructAggregateSelection>;
}

export interface StructFieldAggregateSelectionInput {
  count?: boolean;
  hash?: boolean;
  offset?: boolean;
}

export declare class StructFieldModel {
  public find(args?: {
    where?: StructFieldWhere;

    options?: StructFieldOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<StructField[]>;
  public create(args: {
    input: StructFieldCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateStructFieldsMutationResponse>;
  public update(args: {
    where?: StructFieldWhere;
    update?: StructFieldUpdateInput;
    connect?: StructFieldConnectInput;
    disconnect?: StructFieldDisconnectInput;
    create?: StructFieldCreateInput;
    connectOrCreate?: StructFieldConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateStructFieldsMutationResponse>;
  public delete(args: {
    where?: StructFieldWhere;
    delete?: StructFieldDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: StructFieldWhere;

    aggregate: StructFieldAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<StructFieldAggregateSelection>;
}

export interface DataTypeAggregateSelectionInput {
  count?: boolean;
  hash?: boolean;
  type?: boolean;
  name?: boolean;
  array_counter?: boolean;
  bit_position?: boolean;
  bit_length?: boolean;
}

export declare class DataTypeModel {
  public find(args?: {
    where?: DataTypeWhere;

    options?: DataTypeOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<DataType[]>;
  public create(args: {
    input: DataTypeCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateDataTypesMutationResponse>;
  public update(args: {
    where?: DataTypeWhere;
    update?: DataTypeUpdateInput;
    connect?: DataTypeConnectInput;
    disconnect?: DataTypeDisconnectInput;
    create?: DataTypeCreateInput;
    connectOrCreate?: DataTypeConnectOrCreateInput;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateDataTypesMutationResponse>;
  public delete(args: {
    where?: DataTypeWhere;
    delete?: DataTypeDeleteInput;
    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: DataTypeWhere;

    aggregate: DataTypeAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<DataTypeAggregateSelection>;
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

export interface DiffNodesAtResultAggregateSelectionInput {
  count?: boolean;
  total_count?: boolean;
}

export declare class DiffNodesAtResultModel {
  public find(args?: {
    where?: DiffNodesAtResultWhere;

    options?: DiffNodesAtResultOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<DiffNodesAtResult[]>;
  public create(args: {
    input: DiffNodesAtResultCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateDiffNodesAtResultsMutationResponse>;
  public update(args: {
    where?: DiffNodesAtResultWhere;
    update?: DiffNodesAtResultUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateDiffNodesAtResultsMutationResponse>;
  public delete(args: {
    where?: DiffNodesAtResultWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: DiffNodesAtResultWhere;

    aggregate: DiffNodesAtResultAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<DiffNodesAtResultAggregateSelection>;
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

export interface SymbolFetchResultAggregateSelectionInput {
  count?: boolean;
  name?: boolean;
  address?: boolean;
}

export declare class SymbolFetchResultModel {
  public find(args?: {
    where?: SymbolFetchResultWhere;

    options?: SymbolFetchResultOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<SymbolFetchResult[]>;
  public create(args: {
    input: SymbolFetchResultCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateSymbolFetchResultsMutationResponse>;
  public update(args: {
    where?: SymbolFetchResultWhere;
    update?: SymbolFetchResultUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateSymbolFetchResultsMutationResponse>;
  public delete(args: {
    where?: SymbolFetchResultWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: SymbolFetchResultWhere;

    aggregate: SymbolFetchResultAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<SymbolFetchResultAggregateSelection>;
}

export interface StructFieldFetchResultAggregateSelectionInput {
  count?: boolean;
  name?: boolean;
  offset?: boolean;
}

export declare class StructFieldFetchResultModel {
  public find(args?: {
    where?: StructFieldFetchResultWhere;

    options?: StructFieldFetchResultOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<StructFieldFetchResult[]>;
  public create(args: {
    input: StructFieldFetchResultCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateStructFieldFetchResultsMutationResponse>;
  public update(args: {
    where?: StructFieldFetchResultWhere;
    update?: StructFieldFetchResultUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateStructFieldFetchResultsMutationResponse>;
  public delete(args: {
    where?: StructFieldFetchResultWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: StructFieldFetchResultWhere;

    aggregate: StructFieldFetchResultAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<StructFieldFetchResultAggregateSelection>;
}

export interface StructFetchResultAggregateSelectionInput {
  count?: boolean;
  name?: boolean;
  size?: boolean;
  kind?: boolean;
}

export declare class StructFetchResultModel {
  public find(args?: {
    where?: StructFetchResultWhere;

    options?: StructFetchResultOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<StructFetchResult[]>;
  public create(args: {
    input: StructFetchResultCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateStructFetchResultsMutationResponse>;
  public update(args: {
    where?: StructFetchResultWhere;
    update?: StructFetchResultUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateStructFetchResultsMutationResponse>;
  public delete(args: {
    where?: StructFetchResultWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: StructFetchResultWhere;

    aggregate: StructFetchResultAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<StructFetchResultAggregateSelection>;
}

export interface ModelMap {
  Blob: BlobModel;
  Tree: TreeModel;
  Commit: CommitModel;
  Branch: BranchModel;
  WinRegValue: WinRegValueModel;
  WinRegKey: WinRegKeyModel;
  Symbol: SymbolModel;
  Struct: StructModel;
  StructField: StructFieldModel;
  DataType: DataTypeModel;
  HashableNodeProps: HashableNodePropsModel;
  DiffNodesAtResult: DiffNodesAtResultModel;
  DiffItem: DiffItemModel;
  SearchResult: SearchResultModel;
  SymbolFetchResult: SymbolFetchResultModel;
  StructFieldFetchResult: StructFieldFetchResultModel;
  StructFetchResult: StructFetchResultModel;
}
