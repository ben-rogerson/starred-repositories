import React from 'react'
import Link from 'gatsby-link'
import TimeAgo from 'react-timeago';
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => (
  <main>
    <div class="header">
      <div>Ben's Starred Repositories</div>
      <ul><li><a href="https://github.com/ben-rogerson/starred-repositories">Project code ⤴</a></li><li><a href="https://github.com/ben-rogerson?tab=stars">Github stars page ⤴</a></li></ul>
    </div>
    <div className="page">
    <div className="welcome">
      Showing last 100 starred - Rebuilds daily at 9:00am (ACDT)
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
    </div>
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



