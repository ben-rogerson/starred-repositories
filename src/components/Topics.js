import React from 'react'
import styled from '@emotion/styled/macro'
import { getUniqueTagsFromRepos } from './../utils'

const Container = styled.div(({ isOpen }) => [
    !isOpen && `display: none;`,
    `padding: 2em;
    border: 1px solid rgba(255,255,255,.1);
    border-radius: .25em;
    background-color: rgba(0,0,0,.2);
    a { margin-right: 10px; }`,
])

export default ({ repos, isOpen = false }) => {
    const topics = getUniqueTagsFromRepos(repos)
    return (
        <Container {...{ isOpen }}>
            {topics.map((item, index) => (
                <a key={index} href={`topic/${item}`}>
                    {item}
                </a>
            ))}
        </Container>
    )
}
