import React from 'react'
import Link from 'gatsby-link'
import TimeAgo from 'react-timeago'
import { graphql } from 'gatsby'
import styled from '@emotion/styled/macro'
import { Header } from './../components'
import { getRepos, getUniqueTagsFromRepos } from './../utils'

const Language = styled.div`
    margin-top: 0.75em;
    font-size: 0.85em;
    letter-spacing: 0.03em;
    font-weight: bold;
    text-transform: uppercase;
`

const Topics = styled.div`
    a {
        margin-right: 10px;
    }
`

const IndexPage = ({ data }) => {
    const repos = getRepos(data)
    const topics = getUniqueTagsFromRepos(repos)
    return (
        <main>
            <Header />
            <div className="page">
                <Topics>
                    {topics.map((item, index) => (
                        <a key={index} href={`topic/${item}`}>
                            {item}
                        </a>
                    ))}
                </Topics>
                <div className="welcome">
                    Showing last 100 starred - Rebuilds daily at 9:00am (ACDT)
                </div>
                <ul className="list">
                    {repos.map(repo => {
                        const { path, context } = repo.node
                        const {
                            id,
                            name,
                            description,
                            primaryLanguage,
                        } = context.node
                        return (
                            <li key={id}>
                                <Link to={path.toLowerCase()}>{name}</Link>
                                <div className="desc">
                                    <TimeAgo
                                        className="posted"
                                        date={context.starredAt}
                                    />{' '}
                                    - {description}
                                    {primaryLanguage && (
                                        <Language theme={primaryLanguage.color}>
                                            {primaryLanguage.name}
                                        </Language>
                                    )}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </main>
    )
}

export default IndexPage

export const query = graphql`
    query detailPagesQuery {
        allSitePage(sort: { fields: [context___starredAt], order: DESC }) {
            totalCount
            edges {
                node {
                    path
                    context {
                        starredAt
                        node {
                            id
                            name
                            description
                            createdAt
                            primaryLanguage {
                                name
                                color
                            }
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
                        }
                    }
                }
            }
        }
    }
`
