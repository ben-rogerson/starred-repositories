import React from 'react'
import Link from 'gatsby-link'
import TimeAgo from 'react-timeago';
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => (
  <main>
    <div className="welcome">
      <p>Starred Repositories</p>
      <p>Below is a list of <a href="https://github.com/ben-rogerson?tab=stars">the github repositories I've starred</a></p>
      <ul>
      <li>This page rebuilds daily at 9.00am (ACDT)</li>
      <li>View the code on <a href="https://github.com/ben-rogerson/starred-repositories">Github</a></li>
      </ul>
  </div>
    <ul className="list">
      {data.allSitePage.edges.filter(repo => (repo.node.context && repo.node.context.node)).map(repo => {
        const { path, context } = repo.node
        const { id, name, description } = context.node

        return (
          <li key={id}>
            <Link to={path.toLowerCase()}>{name}</Link>
            <div className="desc">
            <TimeAgo className="posted" date={context.starredAt} /> -{description}
            </div>
          </li>
        )
      })}
    </ul>
  </main>
)

export default IndexPage

export const query = graphql`
  query detailPagesQuery {
    allSitePage(
      sort: {fields: [context___starredAt], order: DESC }
    ) {
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
            }
          }
        }
      }
    }
  }
`



