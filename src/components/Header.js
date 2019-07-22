import React from 'react'

const Header = props => (
    <div className="header">
        <div className="name">
            <a href="/">Ben's Starred Repositories</a>
        </div>
        <ul>
            <li>
                <a href="https://github.com/ben-rogerson/starred-repositories">
                    Project code
                </a>
            </li>
            <li>
                <a href="https://github.com/ben-rogerson?tab=stars">
                    Github stars page
                </a>
            </li>
        </ul>
    </div>
)

export default Header
