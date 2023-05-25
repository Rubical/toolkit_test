export interface IUserRepositories {
  nodes: INode[];
  totalCount: number;
}

export interface INode {
  name: string;
  updatedAt: string;
  url: string;
  stargazers: { totalCount: number };
}

export interface ICurrentRepo extends INode {
  description: string;
  languages: { nodes: TypeLanguage[] };
  collaborators: { nodes: TypeCollaborators[] };
}

type TypeLanguage = {
  name: string;
};

type TypeCollaborators = {
  avatarUrl?: string;
  name: string;
  url: string;
};
