import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => (
  <main>
    <p>Last {data.allSitePage.totalCount} starred github repositories</p>
    <ul>
      {data.allSitePage.edges.map(repo => {
        const { path, context } = repo.node
        const { id, name, description } = context.node
        return (
          <li key={id}><Link to={path.toLowerCase()}>{name}</Link> - {description}</li>
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
            node {
              id
              name
              description
            }
          }
        }
      }
    }
  }
`



