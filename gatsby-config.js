module.exports = {
  siteMetadata: {
    title: 'Rogie ⭐ Repositories',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-github',
      options: {
        headers: {
          Authorization: `Bearer e21f44e567076c363fd4d39d358ae271f314f960`, // https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/
        },
        queries: [
          `{
            viewer {
              name
              login
              url
              starredRepositories(
                last: 100
              ) {
                totalCount
                edges {
                  cursor
                  starredAt
                  node {
                    
                    id
                    name
                    nameWithOwner
                    owner {
                        login
                    }
                    description
                    readme: object(expression: "master:README.md") {
                      ... on Blob {
                        text
                      }
                    }
                    readmeLowercase: object(expression: "master:readme.md") {
                      ... on Blob {
                        text
                      }
                    }
                    url
                    repositoryTopics(last: 100) {
                        edges {
                            node {
                                url
                                topic {
                                  name
                                }
                            }
                        }
                    }
                    primaryLanguage {
                        name
                        color
                    }
                    createdAt
                    diskUsage

                  }
                }
              }
            }
          }`,
        ],
      },
    },
  ],
}