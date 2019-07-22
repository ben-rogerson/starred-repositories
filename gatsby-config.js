module.exports = {
  siteMetadata: {
    title: '⭐⭐⭐⭐⭐',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
        resolve: `gatsby-plugin-emotion`,
        options: {
          // Accepts all options defined by `babel-plugin-emotion` plugin.
      },
    },
    {
      resolve: 'gatsby-source-github',
      options: {
        headers: {
          Authorization: `Bearer 9df4c4103bf5aa03c967269c46c6426f1089d1b5`, // https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/
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