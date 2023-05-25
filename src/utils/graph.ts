export const currentUserRepo = `{
  viewer {
    repositories(
      affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]
      first: 100
    ) {
      totalCount
      nodes {
        name
        url
        updatedAt
        stargazers {
          totalCount
        }
      }
    }
  }
}`;

export const getDetailedRepoCard = (repoName: string): string => {
  return `{
  viewer {
    repository(name: "${repoName}") {
      name
      url
      updatedAt
      description
      languages(first: 10) {
        nodes {
          name
        }
      }
      collaborators(first: 10) {
        nodes {
          avatarUrl
          name
          url
        }
      }
      stargazers {
        totalCount
      }
    }
  }
}`;
};
