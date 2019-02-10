/**
 *  Node APIs
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = ({
    actions,
    graphql
}) => {

    const { createPage } = actions;

    return new Promise((resolve, reject) => {

        const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);

        resolve(
            graphql(`
                {
                    allGithubViewer {
                        edges {
                            node {
                                starredRepositories {
                                totalCount
                                edges {
                                    starredAgo: starredAt(fromNow:true)
                                    starredAt
                                    cursor
                                    node {
                                        id
                                        name
                                        nameWithOwner
                                        owner {
                                            login
                                        }
                                        description
                                        readme {
                                            text
                                        }
                                        readmeLowercase {
                                            text
                                        }
                                        url
                                        repositoryTopics {
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
                                        createdAgo: createdAt(fromNow:true)
                                        diskUsage
                                    }
                                }
                            }
                        }
                    }
                }
            }
          `).then(result => {

                if (result.errors) reject(result.errors);

                // Create pages for each markdown file.
                result.data.allGithubViewer.edges.forEach(({ node }) => {

                    node.starredRepositories.edges.forEach(repo => {
                        const path = repo.node.name;
                        createPage({
                            path,
                            component: blogPostTemplate,
                            layout: `detail`,
                            context: repo,
                        });
                    })

                });

            })
        );
    });
};