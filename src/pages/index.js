import React from 'react'
import Link from 'gatsby-link'
// import Countdown from 'react-countdown-now';
import TimeAgo from 'react-timeago';


const IndexPage = ({ data }) => (
  <main>
    <p className="welcome">👋<br/><br/> This page displays a running list of <br/><a href="https://github.com/ben-rogerson?tab=stars">the github repositories I've starred</a>.<br/><br/>It rebuilds daily at 9.00am (ACDT).</p>
    {/* <Countdown date={Date.now() + 10000} /> */}
    <ul className="list">
      {data.allSitePage.edges.map(repo => {
        const { path, context } = repo.node
        const { id, name, description, createdAt } = context.node

        const posted = new Date(createdAt);
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

 const postedIso = posted.toISOString();
        {/* const postedIso = posted.toISOString(); */}
        return (
          <li key={id}>
            <Link to={path.toLowerCase()}>{name}</Link>
            <div className="desc">
            <TimeAgo className="posted" date={postedIso} /> -
            {description}
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



