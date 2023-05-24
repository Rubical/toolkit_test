export const currentUserRepo = `{
  viewer {
    repositories(
      affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]
      first: 10
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
