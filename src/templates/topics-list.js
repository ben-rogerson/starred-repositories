import React from 'react'
import Link from 'gatsby-link'
import TimeAgo from 'react-timeago'
import styled from '@emotion/styled/macro'
// import { graphql } from 'gatsby'
import { Header } from './../components'

const Language = styled.div`
    margin-top: 0.75em;
    font-size: 0.85em;
    letter-spacing: 0.03em;
    font-weight: bold;
    text-transform: uppercase;
`

// const Topics = styled.div`
//     a {
//         margin-right: 10px;
//     }
// `

const topicsListTemplate = props => {
    const repos = props.pageContext.repos
    return (
        <main>
            <Header />
            <div className="page">
                <h1>{props.pageContext.topic}</h1>
                <ul className="list">
                    {repos.map(repo => {
                        {
                            const {
                                id,
                                name,
                                description,
                                primaryLanguage,
                            } = repo.node
                            return (
                                <li key={id}>
                                    <Link to={name}>{name}</Link>
                                    <div className="desc">
                                        <TimeAgo
                                            className="posted"
                                            date={repo.starredAt}
                                        />{' '}
                                        - {description}
                                        {primaryLanguage && (
                                            <Language
                                                theme={primaryLanguage.color}
                                            >
                                                {primaryLanguage.name}
                                            </Language>
                                        )}
                                    </div>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
        </main>
    )
}

export default topicsListTemplate
