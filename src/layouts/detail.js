import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

const Layout = ({ children, data }) => (
    <div>
        <Helmet title={data.site.siteMetadata.title} />
        <div
            style={{
                margin: '0 auto',
                maxWidth: 960,
                padding: '0px 2.0875rem 1.45rem',
                paddingTop: 0,
            }}
        >
            {children}
        </div>
    </div>
)

Layout.propTypes = {
    children: PropTypes.func,
}

export default Layout

export const query = graphql`
    query DetailTitleQuery {
        site {
            siteMetadata {
                title
            }
        }
    }
`
