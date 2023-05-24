export interface IUserRepositories {
  nodes: TypeNode;
  pageInfo: TypePageInfo;
  totalCount: number;
}

export type TypeNode = {
  name: string;
  updatedAt: string;
  url: string;
  stargazers: { totalCount: number };
};

export type TypePageInfo = {
  endCursor: string;
  hasNextPage: boolean;
};
