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
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}`;
