import React from 'react'
import Link from 'gatsby-link'
import TimeAgo from 'react-timeago';


const IndexPage = ({ data }) => (
  <main>
    <p className="welcome">👋<br/><br/> This page displays a running list of <br/><a href="https://github.com/ben-rogerson?tab=stars">the github repositories I've starred</a>.<br/><br/>It rebuilds daily at 9.00am (ACDT).<br/>See the code on <a href="https://github.com/ben-rogerson/starred-repositories">Github</a>.</p>


    <ul className="list">
      {data.allSitePage.edges.map(repo => {
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
      filter: {layout: {eq: "detail"}},
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



