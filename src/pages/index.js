import React, { useState } from 'react'
import Link from 'gatsby-link'
import TimeAgo from 'react-timeago'
import { graphql } from 'gatsby'
import styled from '@emotion/styled/macro'
import { Header, Topics } from './../components'
import { getRepos } from './../utils'

const Language = styled.div`
    margin-top: 0.75em;
    font-size: 0.85em;
    letter-spacing: 0.03em;
    font-weight: bold;
    text-transform: uppercase;
`
const ToggleCloud = styled.button`
    display: inline-block;
    background-color: transparent;
    border: 0;
    color: inherit;
    padding: 0;
    margin: 0 0 0 1em;
    &:hover,
    &:focus {
        color: #fff;
        cursor: pointer;
        outline: 0;
    }
`

const Welcome = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const IndexPage = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false)
    const repos = getRepos(data)
    return (
        <main>
            <Header />
            <div className="page">
                <Welcome className="welcome">
                    Showing last 100 starred - Rebuilds daily at 9:00am (ACDT){' '}
                    <ToggleCloud
                        onClick={() => {
                            setIsOpen(!isOpen)
                        }}
                    >
                        Toggle tagcloud
                    </ToggleCloud>
                </Welcome>
                <Topics {...{ repos, isOpen }} />
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
