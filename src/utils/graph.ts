export const currentUserRepo = `{
  viewer {
    repositories(
      affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]
      first: 100
    ) {
      totalCount
      nodes {
        name
        id
        url
        updatedAt
        stargazers {
          totalCount
        }
      }
    }
  }
}`;

export const getDetailedRepoCard = (repoId: string): string => {
  return `{
  node(id: "${repoId}") {
    ... on Repository {
      name
      url
      updatedAt
      description
      languages(first: 10) {
        nodes {
          name
        }
      }
      stargazers {
        totalCount
      }
      collaborators {
        nodes {
          avatarUrl
          name
          url
        }
      }
    }
  }
}`;
};

export const getSearchedRepo = (repoName: string): string => {
  return `{
  search(query: "${repoName}", type: REPOSITORY, first: 100) {
    nodes {
      ... on Repository {
        id
        name
        stargazers {
            totalCount
          }
        url
        updatedAt
      }
    }
    repositoryCount
  }
}`;
};
