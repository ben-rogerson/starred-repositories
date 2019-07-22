/**
 *  Node APIs
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')
const { getUniqueTopics } = require('./src/utils')

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions

    return new Promise((resolve, reject) => {
        const blogPostTemplate = path.resolve(`./src/templates/repo-detail.js`)
        const topicsListTemplate = path.resolve(
            `./src/templates/topics-list.js`
        )

        resolve(
            graphql(`
                {
                    allGithubViewer {
                        edges {
                            node {
                                starredRepositories {
                                    totalCount
                                    edges {
                                        starredAgo: starredAt(fromNow: true)
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
                                            createdAgo: createdAt(fromNow: true)
                                            diskUsage
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `).then(result => {
                if (result.errors) reject(result.errors)

                /**
                 * Create repo detail
                 */
                const repos = result.data.allGithubViewer.edges
                repos.forEach(({ node }) => {
                    node.starredRepositories.edges.forEach(repo => {
                        createPage({
                            path: repo.node.name,
                            component: blogPostTemplate,
                            layout: `detail`,
                            context: repo,
                        })
                    })
                })

                const topics = repos.map(({ node }) =>
                    node.starredRepositories.edges.map(repo =>
                        repo.node.repositoryTopics.edges.map(
                            t => t.node.topic.name
                        )
                    )
                )

                const topicValues = getUniqueTopics(...topics)

                topicValues.forEach(topic => {
                    if (topic.length === 0) return

                    const reps = repos[0].node.starredRepositories.edges

                    const repoMatches = reps
                        .map(r => {
                            const topics = r.node.repositoryTopics.edges.map(
                                p =>
                                    p.node.topic.name === topic &&
                                    p.node.name !== p.node.topic.name
                            )
                            return topics.some(t => t === true) ? r : null
                        })
                        .filter(Boolean)

                    const topicData = {
                        path: `/topic/${topic}`,
                        component: topicsListTemplate,
                        layout: `index`,
                        context: {
                            topic: topic,
                            repos: repoMatches,
                        },
                    }
                    createPage(topicData)
                })
            })
        )
    })
}
