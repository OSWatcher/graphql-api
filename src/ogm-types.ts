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
};

export type Query = {
  __typename?: "Query";
  diffCommits: DiffResult;
  fetchCommitHistory: Array<Commit>;
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
  diffResults: Array<DiffResult>;
  diffResultsConnection: DiffResultsConnection;
  diffResultsAggregate: DiffResultAggregateSelection;
  diffItems: Array<DiffItem>;
  diffItemsConnection: DiffItemsConnection;
  diffItemsAggregate: DiffItemAggregateSelection;
  users: Array<User>;
  usersConnection: UsersConnection;
  usersAggregate: UserAggregateSelection;
};

export type QueryDiffCommitsArgs = {
  base_commit_hash: Scalars["String"]["input"];
  diffee_commit_hash: Scalars["String"]["input"];
};

export type QueryFetchCommitHistoryArgs = {
  branch_name: Scalars["String"]["input"];
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

export type QueryDiffResultsArgs = {
  where?: InputMaybe<DiffResultWhere>;
  options?: InputMaybe<DiffResultOptions>;
};

export type QueryDiffResultsConnectionArgs = {
  first?: InputMaybe<Scalars["Int"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  where?: InputMaybe<DiffResultWhere>;
};

export type QueryDiffResultsAggregateArgs = {
  where?: InputMaybe<DiffResultWhere>;
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
  createDiffResults: CreateDiffResultsMutationResponse;
  deleteDiffResults: DeleteInfo;
  updateDiffResults: UpdateDiffResultsMutationResponse;
  createDiffItems: CreateDiffItemsMutationResponse;
  deleteDiffItems: DeleteInfo;
  updateDiffItems: UpdateDiffItemsMutationResponse;
  createUsers: CreateUsersMutationResponse;
  deleteUsers: DeleteInfo;
  updateUsers: UpdateUsersMutationResponse;
};

export type MutationMergeTreeArgs = {
  input: TreeCreateInput;
};

export type MutationCreateBlobsArgs = {
  input: Array<BlobCreateInput>;
};

export type MutationDeleteBlobsArgs = {
  where?: InputMaybe<BlobWhere>;
};

export type MutationUpdateBlobsArgs = {
  where?: InputMaybe<BlobWhere>;
  update?: InputMaybe<BlobUpdateInput>;
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

export type MutationCreateDiffResultsArgs = {
  input: Array<DiffResultCreateInput>;
};

export type MutationDeleteDiffResultsArgs = {
  where?: InputMaybe<DiffResultWhere>;
};

export type MutationUpdateDiffResultsArgs = {
  where?: InputMaybe<DiffResultWhere>;
  update?: InputMaybe<DiffResultUpdateInput>;
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

export enum HashableImplementation {
  Blob = "Blob",
  Tree = "Tree",
  Commit = "Commit",
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

export type BlobsConnection = {
  __typename?: "BlobsConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<BlobEdge>;
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

export type CreateDiffResultsMutationResponse = {
  __typename?: "CreateDiffResultsMutationResponse";
  info: CreateInfo;
  diffResults: Array<DiffResult>;
};

/** Information about the number of nodes and relationships created during a create mutation */
export type CreateInfo = {
  __typename?: "CreateInfo";
  /** @deprecated This field has been deprecated because bookmarks are now handled by the driver. */
  bookmark?: Maybe<Scalars["String"]["output"]>;
  nodesCreated: Scalars["Int"]["output"];
  relationshipsCreated: Scalars["Int"]["output"];
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
  path: Scalars["String"]["output"];
  old_hash?: Maybe<Scalars["String"]["output"]>;
  new_hash?: Maybe<Scalars["String"]["output"]>;
};

export type DiffItemAggregateSelection = {
  __typename?: "DiffItemAggregateSelection";
  count: Scalars["Int"]["output"];
  path: StringAggregateSelection;
  old_hash: StringAggregateSelection;
  new_hash: StringAggregateSelection;
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

export type DiffResult = {
  __typename?: "DiffResult";
  newitems: Array<Maybe<DiffItem>>;
  delitems: Array<Maybe<DiffItem>>;
  moditems: Array<Maybe<DiffItem>>;
};

export type DiffResultAggregateSelection = {
  __typename?: "DiffResultAggregateSelection";
  count: Scalars["Int"]["output"];
};

export type DiffResultEdge = {
  __typename?: "DiffResultEdge";
  cursor: Scalars["String"]["output"];
  node: DiffResult;
};

export type DiffResultsConnection = {
  __typename?: "DiffResultsConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<DiffResultEdge>;
};

/**
 * The edge properties for the following fields:
 * * Tree.child_blobs
 * * Tree.child_trees
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

export type HashablesConnection = {
  __typename?: "HashablesConnection";
  totalCount: Scalars["Int"]["output"];
  pageInfo: PageInfo;
  edges: Array<HashableEdge>;
};

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"]["output"];
  hasPreviousPage: Scalars["Boolean"]["output"];
  startCursor?: Maybe<Scalars["String"]["output"]>;
  endCursor?: Maybe<Scalars["String"]["output"]>;
};

export type StringAggregateSelection = {
  __typename?: "StringAggregateSelection";
  shortest?: Maybe<Scalars["String"]["output"]>;
  longest?: Maybe<Scalars["String"]["output"]>;
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

export type UpdateDiffResultsMutationResponse = {
  __typename?: "UpdateDiffResultsMutationResponse";
  info: UpdateInfo;
  diffResults: Array<DiffResult>;
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

export type BlobConnectOrCreateWhere = {
  node: BlobUniqueWhere;
};

export type BlobConnectWhere = {
  node: BlobWhere;
};

export type BlobCreateInput = {
  hash: Scalars["String"]["input"];
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

/** Fields to sort Blobs by. The order in which sorts are applied is not guaranteed when specifying many fields in one BlobSort object. */
export type BlobSort = {
  hash?: InputMaybe<SortDirection>;
};

export type BlobUniqueWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
};

export type BlobUpdateInput = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
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
  date?: InputMaybe<SortDirection>;
};

export type CommitUniqueWhere = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
};

export type CommitUpdateInput = {
  hash?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
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
  path: Scalars["String"]["input"];
  old_hash?: InputMaybe<Scalars["String"]["input"]>;
  new_hash?: InputMaybe<Scalars["String"]["input"]>;
};

export type DiffItemOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  /** Specify one or more DiffItemSort objects to sort DiffItems by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<DiffItemSort>>;
};

/** Fields to sort DiffItems by. The order in which sorts are applied is not guaranteed when specifying many fields in one DiffItemSort object. */
export type DiffItemSort = {
  path?: InputMaybe<SortDirection>;
  old_hash?: InputMaybe<SortDirection>;
  new_hash?: InputMaybe<SortDirection>;
};

export type DiffItemUpdateInput = {
  path?: InputMaybe<Scalars["String"]["input"]>;
  old_hash?: InputMaybe<Scalars["String"]["input"]>;
  new_hash?: InputMaybe<Scalars["String"]["input"]>;
};

export type DiffItemWhere = {
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
  old_hash?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  old_hash_NOT?: InputMaybe<Scalars["String"]["input"]>;
  old_hash_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  old_hash_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  old_hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  old_hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  old_hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  old_hash_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  old_hash_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  old_hash_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  new_hash?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  new_hash_NOT?: InputMaybe<Scalars["String"]["input"]>;
  new_hash_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  new_hash_NOT_IN?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  new_hash_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  new_hash_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  new_hash_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  new_hash_NOT_CONTAINS?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  new_hash_NOT_STARTS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  /** @deprecated Negation filters will be deprecated, use the NOT operator to achieve the same behavior */
  new_hash_NOT_ENDS_WITH?: InputMaybe<Scalars["String"]["input"]>;
  OR?: InputMaybe<Array<DiffItemWhere>>;
  AND?: InputMaybe<Array<DiffItemWhere>>;
  NOT?: InputMaybe<DiffItemWhere>;
};

export type DiffResultCreateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type DiffResultOptions = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type DiffResultUpdateInput = {
  /** Appears because this input type would be empty otherwise because this type is composed of just generated and/or relationship properties. See https://neo4j.com/docs/graphql-manual/current/troubleshooting/faqs/ */
  _emptyInput?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type DiffResultWhere = {
  OR?: InputMaybe<Array<DiffResultWhere>>;
  AND?: InputMaybe<Array<DiffResultWhere>>;
  NOT?: InputMaybe<DiffResultWhere>;
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
};

export type TreeChild_BlobsDisconnectFieldInput = {
  where?: InputMaybe<TreeChild_BlobsConnectionWhere>;
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

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateBlobsMutationResponse>;
  public delete(args: {
    where?: BlobWhere;

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

export interface DiffResultAggregateSelectionInput {
  count?: boolean;
}

export declare class DiffResultModel {
  public find(args?: {
    where?: DiffResultWhere;

    options?: DiffResultOptions;
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<DiffResult[]>;
  public create(args: {
    input: DiffResultCreateInput[];
    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<CreateDiffResultsMutationResponse>;
  public update(args: {
    where?: DiffResultWhere;
    update?: DiffResultUpdateInput;

    selectionSet?: string | DocumentNode | SelectionSetNode;
    args?: any;
    context?: any;
    rootValue?: any;
  }): Promise<UpdateDiffResultsMutationResponse>;
  public delete(args: {
    where?: DiffResultWhere;

    context?: any;
    rootValue?: any;
  }): Promise<{ nodesDeleted: number; relationshipsDeleted: number }>;
  public aggregate(args: {
    where?: DiffResultWhere;

    aggregate: DiffResultAggregateSelectionInput;
    context?: any;
    rootValue?: any;
  }): Promise<DiffResultAggregateSelection>;
}

export interface DiffItemAggregateSelectionInput {
  count?: boolean;
  path?: boolean;
  old_hash?: boolean;
  new_hash?: boolean;
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

export interface ModelMap {
  Blob: BlobModel;
  Tree: TreeModel;
  Commit: CommitModel;
  Branch: BranchModel;
  DiffResult: DiffResultModel;
  DiffItem: DiffItemModel;
  User: UserModel;
}
